"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const years = Array.from({ length: 10 }, (_, index) => 2026 - index);
const copy = {
    lt: { label: "MIDI / SKAITMENINĖ KOLEKCIJA", title: "Kiekvieni metai. Kita istorija.", intro: "Nuo pirmųjų puslapių iki virtualių pasaulių. Atsiversk ankstesnių metų MIDI ir atrask, kaip keitėsi mūsų šventė.", open: "Atverti svetainę", unavailable: "Peržiūra laikinai nepasiekiama", note: "", collection: "Svetainių archyvas", preview: "svetainės peržiūra" },
    en: { label: "MIDI / DIGITAL COLLECTION", title: "Every year. A different story.", intro: "From early websites to vtual worlds. Open a past edition of MIDI and discover how our celebration has changed.", open: "Visit website", unavailable: "Preview temporarily unavailable", note: "The 2023 website is currently returning a server error.", collection: "Website archive", preview: "website preview" },
};

export default function ArchivesPage() {
    const { lang } = useLanguage();
    const t = copy[lang];
    return (
        <div className="min-h-[70vh] bg-[#f4f6f8] text-[#404041]">
            <section className="relative overflow-hidden bg-[#0075b5] px-6 py-16 text-white sm:px-10 sm:py-24">
                <div aria-hidden="true" className="pointer-events-none absolute -right-5 bottom-[-35px] text-[clamp(120px,23vw,330px)] font-extrabold leading-none tracking-tighter text-white/[0.04]">ARCHIVE</div>
                <div className="relative mx-auto max-w-[1180px]">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">{t.label}</p>
                    <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">{t.title}</h1>
                    <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
                        <p className="max-w-xl text-lg leading-8 text-white/65">{t.intro}</p>
                        <span className="rounded-full border border-white/25 px-5 py-2 text-sm font-bold tracking-widest">2017 — 2026</span>
                    </div>
                </div>
            </section>
            <section className="mx-auto max-w-[1260px] px-6 py-12 sm:px-10 sm:py-16" aria-labelledby="archive-heading">
                <div className="mb-8 flex items-center justify-between border-b border-[#102c3c]/15 pb-5">
                    <h2 id="archive-heading" className="text-xl font-bold">{t.collection}</h2>
                    <span className="text-sm tabular-nums text-[#404041]/50">01 — 10</span>
                </div>
                <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {years.map((year, index) => (
                        <li key={year}>
                            <a href={`https://midi.lt/${year}/`} className="group block h-full overflow-hidden rounded-xl border border-[#102c3c]/10 bg-white shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0075b5] motion-reduce:transform-none">
                                <div className="flex items-center gap-1.5 border-b border-[#102c3c]/10 bg-white px-4 py-3" aria-hidden="true">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#0075b5]/25" /><span className="h-1.5 w-1.5 rounded-full bg-[#0075b5]/15" /><span className="h-1.5 w-1.5 rounded-full bg-[#0075b5]/10" />
                                    <span className="ml-3 text-[11px] tracking-wide text-[#404041]/45">midi.lt/{year}</span>
                                    <span className="ml-auto text-[10px] text-[#404041]/35">{String(index + 1).padStart(2, "0")}</span>
                                </div>
                                <div className="relative aspect-[16/10] overflow-hidden bg-[#e8edf1]">
                                    {year === 2023 ? <div className="flex h-full flex-col items-center justify-center gap-3 bg-[#e6ebee] px-6 text-center"><span className="text-6xl font-extrabold text-[#102c3c]/15">2023</span><span className="text-sm text-[#102c3c]/60">{t.unavailable}</span></div> : <Image src={`/archives/${year}.webp`} alt={`MIDI ${year} – ${t.preview}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 390px" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transform-none" />}
                                </div>
                                <div className="flex items-center justify-between gap-4 p-6">
                                    <div><p className="text-[10px] font-bold tracking-[0.2em] text-[#404041]/45">MIDI</p><h3 className="mt-1 text-3xl font-extrabold tracking-tight text-[#102c3c]">{year}</h3></div>
                                    <span className="flex items-center gap-3 text-xs font-semibold text-[#0075b5]">{t.open}<span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f4fb] text-lg transition-colors group-hover:bg-[#0075b5] group-hover:text-white">↗</span></span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
                <p className="mt-8 text-sm text-[#404041]/55">{t.note}</p>
            </section>
        </div>
    );
}
