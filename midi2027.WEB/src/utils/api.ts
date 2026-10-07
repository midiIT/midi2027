import { maxPosts, platforms, postLimit } from "./feed";
import type { FeedPage, Platform, Post } from "./feed";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "")
    ?? (process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://midi.lt");
const pendingRequests = new Map<string, Promise<FeedPage>>();
const memoryPosts = new Map<Platform, FeedPage>();

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function safeUrl(value: unknown): string | undefined {
    if (typeof value !== "string") return undefined;
    try {
        const url = new URL(value);
        return url.protocol === "https:" ? url.href : undefined;
    } catch {
        return undefined;
    }
}

export function normalizePosts(value: unknown, platform: Platform, limit = postLimit): Post[] {
    if (!Array.isArray(value)) throw new Error("Invalid feed response");
    return value.filter(isRecord).filter(post => typeof post.id === "string").slice(0, limit).map(post => ({
        id: post.id as string,
        platform,
        imageUrl: platform === "instagram"
            ? safeUrl(post.thumbnail_url) ?? (post.media_type !== "VIDEO" ? safeUrl(post.media_url) : undefined)
            : safeUrl(post.cover_image_url),
        description: String(platform === "instagram" ? post.caption ?? "" : post.title || post.video_description || ""),
        href: safeUrl(platform === "instagram" ? post.permalink : post.share_url) ?? platforms[platform].profile,
        timestamp: platform === "instagram" && typeof post.timestamp === "string"
            ? post.timestamp
            : typeof post.create_time === "number" ? new Date(post.create_time * 1000).toISOString() : undefined,
    }));
}

function readStoredPage(cacheKey: string, platform: Platform): FeedPage | undefined {
    try {
        const cached = sessionStorage.getItem(cacheKey);
        if (!cached) return undefined;
        const page: unknown = JSON.parse(cached);
        if (isRecord(page) && typeof page.limit === "number" && Number.isInteger(page.limit)
            && page.limit >= 1 && page.limit <= maxPosts && Array.isArray(page.posts)
            && page.posts.length > 0 && page.posts.length <= page.limit && page.posts.every(post => isRecord(post)
                && typeof post.id === "string" && post.platform === platform
                && typeof post.description === "string" && !!safeUrl(post.href)
                && (post.imageUrl === undefined || !!safeUrl(post.imageUrl))
                && (post.timestamp === undefined || typeof post.timestamp === "string"))) {
            return {
                posts: page.posts as Post[],
                limit: page.limit,
                hasMore: page.posts.length >= page.limit && page.limit < maxPosts,
            };
        }
        sessionStorage.removeItem(cacheKey);
    } catch {
        // Private browsing or full storage must not prevent the feed from loading.
    }
    return undefined;
}

export function loadPosts(platform: Platform, limit = postLimit): Promise<FeedPage> {
    if (!Number.isInteger(limit) || limit < 1 || limit > maxPosts) {
        return Promise.reject(new Error("Invalid feed limit"));
    }

    const memory = memoryPosts.get(platform);
    if (memory && (memory.limit >= limit || !memory.hasMore)) return Promise.resolve(memory);

    const cacheKey = `midi-feed-v3:${apiBase}:${platform}`;
    const stored = readStoredPage(cacheKey, platform);
    if (stored) {
        memoryPosts.set(platform, stored);
        if (stored.limit >= limit || !stored.hasMore) return Promise.resolve(stored);
    }

    const requestKey = `${platform}:${limit}`;
    const pending = pendingRequests.get(requestKey);
    if (pending) return pending;

    const request = (async () => {
        const response = await fetch(`${apiBase}/api/latest-feed/${platform}?limit=${limit}`, {
            cache: "no-store",
            signal: AbortSignal.timeout(15000),
        });
        if (!response.ok) throw new Error(`Feed request failed: ${response.status}`);

        const posts = normalizePosts(await response.json(), platform, limit);
        if (posts.length === 0) throw new Error("No posts available");

        const page: FeedPage = { posts, limit, hasMore: posts.length >= limit && limit < maxPosts };
        const newer = memoryPosts.get(platform);
        if (newer && newer.limit > limit) return newer;
        memoryPosts.set(platform, page);
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify(page));
        } catch {
            // The successfully loaded posts are still usable without storage.
        }
        return page;
    })().finally(() => pendingRequests.delete(requestKey));
    pendingRequests.set(requestKey, request);
    return request;
}
