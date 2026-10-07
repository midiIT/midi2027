import instagramIcon from "../../public/icons/instagramIcon.svg";
import tiktokIcon from "../../public/icons/tiktokIcon.svg";
import facebookIcon from "../../public/icons/facebookIcon.svg";

export type Platform = "instagram" | "tiktok" | "facebook";
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
export const platformOptions: Platform[] = ["instagram", "tiktok", "facebook"];
export const filterOptions: Filter[] = ["all", ...platformOptions];
export const platforms: Record<Platform, { title: string; icon: string; profile: string }> = {
    instagram: {
        title: "Instagram",
        icon: instagramIcon.src,
        profile: "https://www.instagram.com/midi.lt/",
    },
    tiktok: {
        title: "TikTok",
        icon: tiktokIcon.src,
        profile: "https://www.tiktok.com/@midi.lt",
    },
    facebook: {
        title: "Facebook",
        icon: facebookIcon.src,
        profile: "https://www.facebook.com/midi.lt",
    },
};
