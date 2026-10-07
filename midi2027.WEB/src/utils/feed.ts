export type Platform = "instagram" | "tiktok";
export type Filter = "all" | Platform;

export type Post = {
    id: string;
    platform: Platform;
    imageUrl?: string;
    description: string;
    href: string;
    timestamp?: string;
};

export type FeedPage = { posts: Post[]; limit: number; hasMore: boolean };
export type FeedState = { status: "loading" } | ({ status: "ready" } & FeedPage) | { status: "unavailable" };

export const postLimit = 8;
export const maxPosts = 20;
export const platformOptions: Platform[] = ["instagram", "tiktok"];
export const filterOptions: Filter[] = ["all", ...platformOptions];
export const platforms: Record<Platform, { title: string; icon: string; profile: string }> = {
    instagram: {
        title: "Instagram",
        icon: "/icons/instagramIcon.svg",
        profile: "https://www.instagram.com/midi.lt/",
    },
    tiktok: {
        title: "TikTok",
        icon: "/icons/tiktokIcon.svg",
        profile: "https://www.tiktok.com/@midi.lt",
    },
};
