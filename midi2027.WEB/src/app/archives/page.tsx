"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArchiveCard } from "@/compoments/Archives/ArchiveCard";
import { text } from "./pageText";
import { SLIDES } from "./pageSlides";

export default function ArchivesPage() {
    const { lang } = useLanguage();
    const t = text[lang];
    const slides = SLIDES[lang];

    return (
        <div className="min-h-[70vh] bg-[#f4f6f8] text-[#404041]">
            <section className="relative overflow-hidden bg-[#0075b5] px-6 py-16 text-white sm:px-10 sm:py-24">
                <div aria-hidden="true" className="pointer-events-none absolute -right-5 bottom-[-35px] text-[clamp(120px,23vw,330px)] font-extrabold leading-none tracking-tighter text-white/[0.04]">{t.watermark}</div>
                <div className="relative mx-auto max-w-[1180px]">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">{t.label}</p>
                    <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">{t.title}</h1>
                    <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
                        <p className="max-w-xl text-lg leading-8 text-white/65">{t.intro}</p>
                        <span className="rounded-full border border-white/25 px-5 py-2 text-sm font-bold tracking-widest">{t.yearRange}</span>
                    </div>
                </div>
            </section>
            <section className="mx-auto max-w-[1260px] px-6 py-12 sm:px-10 sm:py-16" aria-labelledby="archive-heading">
                <div className="mb-8 flex items-center justify-between border-b border-[#102c3c]/15 pb-5">
                    <h2 id="archive-heading" className="text-xl font-bold">{t.collection}</h2>
                    <span className="text-sm tabular-nums text-[#404041]/50">{String(1).padStart(2, "0")} &ndash; {String(slides.length).padStart(2, "0")}</span>
                </div>
                <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {slides.map((slide, index) => (
                        <li key={slide.id}><ArchiveCard slide={slide} index={index} t={t} /></li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
