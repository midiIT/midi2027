"use client";

import { ArrowLeft, ArrowRight, Plus, RotateCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { text } from "@/app/pageText";
import { useLanguage } from "@/context/LanguageContext";
import { filterOptions } from "@/utils/feed";
import { FeedCard, FeedSkeleton, FeedUnavailable } from "./LatestFeedSlides";
import { useLatestFeed } from "./useLatestFeed";

export function LatestFeed() {
    const { lang } = useLanguage();
    const t = text[lang].latestFeed;
    const feed = useLatestFeed();
    const trackRef = useRef<HTMLDivElement>(null);
    const [scrollState, setScrollState] = useState({ previous: false, next: false });

    useEffect(() => {
        trackRef.current?.scrollTo({ left: 0 });
    }, [feed.filter]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const measure = () => setScrollState({
            previous: track.scrollLeft > 2,
            next: track.scrollLeft + track.clientWidth < track.scrollWidth - 2,
        });
        const observer = new ResizeObserver(measure);
        observer.observe(track);
        track.addEventListener("scroll", measure, { passive: true });
        measure();
        return () => {
            observer.disconnect();
            track.removeEventListener("scroll", measure);
        };
    }, [feed.filter, feed.posts.length, feed.loading, feed.canLoadMore]);

    function scroll(direction: number) {
        const track = trackRef.current;
        if (!track) return;
        const card = track.querySelector("article");
        const distance = card ? card.getBoundingClientRect().width + 20 : track.clientWidth;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        track.scrollBy({ left: direction * distance, behavior: reducedMotion ? "instant" : "smooth" });
    }

    async function loadMore() {
        const track = trackRef.current;
        const left = track?.scrollLeft ?? 0;
        track?.focus({ preventScroll: true });
        await feed.loadMore();
        requestAnimationFrame(() => track?.scrollTo({ left, behavior: "instant" }));
    }

    return (
        <section className="bg-[#102c3c] px-6 py-14 text-white sm:px-10 sm:py-16" aria-labelledby="latest-feed-title">
            <div className="mx-auto max-w-[1100px]">
                <p className="text-xs font-bold uppercase text-white/55">{t.label}</p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
                    <h2 id="latest-feed-title" className="text-3xl font-extrabold sm:text-4xl">{t.title}</h2>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => scroll(-1)} disabled={!scrollState.previous}
                            aria-label={t.previous} title={t.previous}
                            className="flex h-11 w-11 items-center justify-center rounded border border-white/30 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-default disabled:opacity-25">
                            <ArrowLeft size={20} aria-hidden="true" />
                        </button>
                        <button type="button" onClick={() => scroll(1)} disabled={!scrollState.next}
                            aria-label={t.next} title={t.next}
                            className="flex h-11 w-11 items-center justify-center rounded border border-white/30 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-default disabled:opacity-25">
                            <ArrowRight size={20} aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <div role="group" aria-label={t.filterLabel} className="mt-6 flex gap-1 border-b border-white/15">
                    {filterOptions.map(value => (
                        <button key={value} type="button" aria-pressed={feed.filter === value}
                            onClick={() => feed.selectFilter(value)}
                            className={`min-h-11 border-b-2 px-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${feed.filter === value ? "border-[#72d4ec] text-white" : "border-transparent text-white/55 hover:text-white"}`}>
                            {t.filters[value]}
                        </button>
                    ))}
                </div>
                <div ref={trackRef} role="region" aria-label={t.regionLabel} tabIndex={0}
                    onKeyDown={event => {
                        if (event.target === event.currentTarget && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
                            event.preventDefault();
                            scroll(event.key === "ArrowLeft" ? -1 : 1);
                        }
                    }}
                    className="mt-6 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto pb-5 [overflow-anchor:none] [scrollbar-color:#72d4ec_#ffffff15] [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70">
                    {feed.posts.map(post => <FeedCard key={`${post.platform}:${post.id}`} post={post} t={t} />)}
                    {feed.loading && Array.from({ length: 3 }, (_, index) => <FeedSkeleton key={index} label={t.loading} />)}
                    {feed.canLoadMore && !feed.loading && (
                        <div className="flex w-44 shrink-0 snap-end items-center justify-center self-stretch px-2">
                            <button type="button" onClick={loadMore} disabled={feed.loadingMore}
                                className="flex min-h-11 items-center gap-2 rounded border border-white/30 px-4 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-wait disabled:opacity-60">
                                {feed.loadingMore ? <RotateCw size={16} aria-hidden="true" className="motion-safe:animate-spin" /> : <Plus size={16} aria-hidden="true" />}
                                {feed.loadingMore ? t.loading : t.loadMore}
                            </button>
                        </div>
                    )}
                </div>
                {feed.posts.length > 0 && (
                    <div className="mt-4">
                        <span aria-live="polite" className="text-xs text-white/55">{feed.posts.length} {t.postCount}</span>
                    </div>
                )}
                {feed.moreError && <p role="status" className="mt-3 text-sm text-white/65">{t.moreError}</p>}
                {feed.unavailablePlatforms.map(platform => (
                    <FeedUnavailable key={platform} platform={platform} t={t} onRetry={() => feed.retry(platform)} />
                ))}
            </div>
        </section>
    );
}
