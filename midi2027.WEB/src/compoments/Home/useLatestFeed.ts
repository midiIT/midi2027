"use client";

import { useEffect, useState } from "react";
import { loadPosts } from "@/utils/api";
import { maxPosts, platformOptions, postLimit } from "@/utils/feed";
import type { FeedState, Filter, Platform, Post } from "@/utils/feed";

function interleavePosts(feeds: Post[][]): Post[] {
    const posts: Post[] = [];
    for (let index = 0; index < Math.max(...feeds.map(feed => feed.length)); index++) {
        for (const feed of feeds) {
            if (feed[index]) posts.push(feed[index]);
        }
    }
    return posts;
}

export function useLatestFeed() {
    const [feeds, setFeeds] = useState<Record<Platform, FeedState>>({
        instagram: { status: "loading" },
        tiktok: { status: "loading" },
        facebook: { status: "loading" },
    });
    const [filter, setFilter] = useState<Filter>("all");
    const [loadingMore, setLoadingMore] = useState(false);
    const [moreError, setMoreError] = useState(false);

    useEffect(() => {
        let active = true;
        for (const platform of platformOptions) {
            loadPosts(platform)
                .then(page => {
                    if (active) setFeeds(current => ({ ...current, [platform]: { status: "ready", ...page } }));
                })
                .catch(() => {
                    if (active) setFeeds(current => ({ ...current, [platform]: { status: "unavailable" } }));
                });
        }
        return () => { active = false; };
    }, []);

    const visiblePlatforms: Platform[] = filter === "all" ? platformOptions : [filter];
    const posts = interleavePosts(visiblePlatforms.map(platform => {
        const feed = feeds[platform];
        return feed.status === "ready" ? feed.posts : [];
    }));
    const loading = visiblePlatforms.some(platform => feeds[platform].status === "loading");
    const canLoadMore = visiblePlatforms.some(platform => feeds[platform].status === "ready" && feeds[platform].hasMore);
    const unavailablePlatforms = visiblePlatforms.filter(platform => feeds[platform].status === "unavailable");
    const allUnavailable = platformOptions.every(platform => feeds[platform].status === "unavailable");

    function selectFilter(value: Filter) {
        setFilter(value);
        setMoreError(false);
    }

    function retry(platform: Platform) {
        setFeeds(current => ({ ...current, [platform]: { status: "loading" } }));
        loadPosts(platform)
            .then(page => setFeeds(current => ({ ...current, [platform]: { status: "ready", ...page } })))
            .catch(() => setFeeds(current => ({ ...current, [platform]: { status: "unavailable" } })));
    }

    async function loadMore() {
        if (loadingMore) return;
        setLoadingMore(true);
        setMoreError(false);
        const targets = visiblePlatforms.filter(platform => feeds[platform].status === "ready" && feeds[platform].hasMore);
        const results = await Promise.allSettled(targets.map(async platform => {
            const feed = feeds[platform];
            if (feed.status !== "ready") return;
            const page = await loadPosts(platform, Math.min(feed.limit + postLimit, maxPosts));
            setFeeds(current => ({ ...current, [platform]: { status: "ready", ...page } }));
        }));
        setMoreError(results.some(result => result.status === "rejected"));
        setLoadingMore(false);
    }

    return {
        posts, filter, selectFilter, loading, loadingMore, canLoadMore,
        moreError, unavailablePlatforms, allUnavailable, retry, loadMore,
    };
}
