"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown, ChevronUp, RotateCw, WifiOff } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { LatestFeedText } from "@/app/pageText";
import { platforms } from "@/utils/feed";
import type { Platform, Post } from "@/utils/feed";

export function FeedCard({ post, t }: { post: Post; t: LatestFeedText }) {
    const [expanded, setExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);
    const [imageFailed, setImageFailed] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const textId = useId();
    const platform = platforms[post.platform];
    const date = post.timestamp ? new Date(post.timestamp) : undefined;
    const hasDate = date && !Number.isNaN(date.getTime());

    useEffect(() => {
        const element = textRef.current;
        if (!element || expanded) return;
        const measure = () => setCanExpand(element.scrollHeight > element.clientHeight + 1);
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        measure();
        return () => observer.disconnect();
    }, [expanded, post.description]);

    return (
        <article className="flex w-[280px] max-w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-white/15 bg-white text-[#404041] sm:w-[340px] sm:max-w-none">
            <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                aria-label={t.imageLinkLabel.replace("{platform}", platform.title)}
                className="relative block aspect-[16/11] bg-[#e8f4fb] focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[#0075b5]"
            >
                {post.imageUrl && !imageFailed ? (
                    <Image
                        src={post.imageUrl} alt="" fill unoptimized
                        sizes="(max-width: 640px) 280px, 340px"
                        className="object-cover" onError={() => setImageFailed(true)}
                    />
                ) : (
                    <span className="flex h-full items-center justify-center">
                        <Image src={platform.icon} width={40} height={40} alt="" className="opacity-50" />
                    </span>
                )}
            </a>
            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="flex items-center gap-2 text-sm font-bold">
                        <Image src={platform.icon} width={18} height={18} alt="" className="shrink-0" />
                        {platform.title}
                    </h3>
                    {hasDate && (
                        <time dateTime={post.timestamp} className="text-xs text-[#404041]/55">
                            {date.toLocaleDateString(t.dateLocale, { day: "numeric", month: "short", year: "numeric" })}
                        </time>
                    )}
                </div>
                <p
                    ref={textRef} id={textId}
                    className={`mt-4 min-h-[72px] whitespace-pre-line text-sm leading-6 text-[#404041]/75 [overflow-wrap:anywhere] ${expanded ? "" : "line-clamp-3"}`}
                >
                    {post.description || t.empty}
                </p>
                <div className="mt-1 min-h-10">
                    {(canExpand || expanded) && (
                        <button
                            type="button" onClick={() => setExpanded(value => !value)}
                            aria-expanded={expanded} aria-controls={textId}
                            className="flex min-h-10 items-center gap-1 text-xs font-bold text-[#0075b5] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            {expanded ? t.showLess : t.readMore}
                            {expanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
                        </button>
                    )}
                </div>
                <a
                    href={post.href} target="_blank" rel="noreferrer"
                    className="mt-3 flex items-center justify-between border-t border-[#102c3c]/10 pt-4 text-sm font-bold text-[#0075b5] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                    {t.openPost}<ArrowUpRight size={16} aria-hidden="true" />
                </a>
            </div>
        </article>
    );
}

export function FeedSkeleton({ label }: { label: string }) {
    return (
        <div role="status" aria-label={label} className="w-[280px] max-w-[85%] shrink-0 overflow-hidden rounded-lg bg-white/10 sm:w-[340px] sm:max-w-none motion-safe:animate-pulse">
            <div className="aspect-[16/11] bg-white/10" />
            <div className="h-[228px] p-5">
                <div className="h-4 w-24 rounded bg-white/15" />
                <div className="mt-5 h-16 rounded bg-white/10" />
            </div>
        </div>
    );
}

export function FeedUnavailable({ platform, t, onRetry }: {
    platform: Platform;
    t: LatestFeedText;
    onRetry: () => void;
}) {
    const source = platforms[platform];
    return (
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-4 text-sm text-white/65">
            <p>{source.title}: {t.unavailable}</p>
            <button type="button" onClick={onRetry} className="flex min-h-10 items-center gap-2 text-white hover:underline">
                <RotateCw size={14} aria-hidden="true" />{t.retry}
            </button>
            <a href={source.profile} target="_blank" rel="noreferrer" className="flex min-h-10 items-center gap-1 hover:text-white">
                {t.profile}<ArrowUpRight size={14} aria-hidden="true" />
            </a>
        </div>
    );
}

export function FeedOffline({ sources, t, onRetry }: {
    sources: Platform[];
    t: LatestFeedText;
    onRetry: () => void;
}) {
    return (
        <div className="mt-7 flex flex-col gap-6 border-t border-white/15 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#72d4ec]">
                    <WifiOff size={22} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                    <div role="status">
                        <h3 className="text-xl font-bold">{t.unavailableTitle}</h3>
                        <p className="mt-2 max-w-lg text-sm leading-6 text-white/65">{t.unavailableDescription}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                        {sources.map(platform => (
                            <a key={platform} href={platforms[platform].profile} target="_blank" rel="noreferrer"
                                className="flex min-h-11 items-center gap-2 text-sm font-bold text-white/85 hover:text-[#72d4ec] focus-visible:outline-2 focus-visible:outline-offset-4">
                                <Image src={platforms[platform].icon} width={18} height={18} alt="" />
                                {platforms[platform].title}<ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <button type="button" onClick={onRetry}
                className="flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded border border-white/25 px-4 text-sm font-bold transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 sm:self-center">
                <RotateCw size={16} aria-hidden="true" />{t.retry}
            </button>
        </div>
    );
}
