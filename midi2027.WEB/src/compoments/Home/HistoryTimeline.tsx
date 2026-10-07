"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { historyText } from "./HistoryText";

const images = ["/history/img1976.png", "/history/img1989.png", "/history/img1993.jpg", "/history/img1999.jpg", "/history/img1997.jpg"];

export default function HistoryTimeline() {
    const { lang } = useLanguage();
    const t = historyText[lang];
    const [selected, setSelected] = useState(0);
    const item = t.items[selected];
    const lt = lang === "lt";
    return (
        <section className="mt-16" aria-labelledby="midi-history-title">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#0075b5]">{lt ? "NUO 1976 METŲ" : "SINCE 1976"}</p>
                    <h3 id="midi-history-title" className="text-3xl font-extrabold text-[#333] sm:text-4xl">{t.title}</h3>
                </div>
                <p className="text-sm text-[#333]/60">{lt ? "Pasirink metus. Atrask istoriją." : "Choose a year. Discover the story."}</p>
            </div>
            <div className="overflow-hidden rounded-2xl bg-[#102c3c]">
                <div className="grid md:grid-cols-2">
                    <div className="relative min-h-64 md:min-h-[430px]">
                        <Image src={images[selected]} alt="" fill sizes="(max-width: 768px) 100vw, 550px" className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#102c3c]/90 via-[#102c3c]/10 to-transparent" />
                        <p className="absolute bottom-6 left-6 text-[clamp(64px,10vw,120px)] font-extrabold leading-none tracking-tighter text-white/85" aria-hidden="true">{item.year}</p>
                        <p className="absolute left-6 top-5 rounded-full bg-black/40 px-3 py-1 text-xs text-white/80">{lt ? "MIDI akimirkos · iliustracija" : "MIDI moments · illustration"}</p>
                    </div>
                    <div id="history-story" className="flex flex-col justify-center p-7 text-white sm:p-10" aria-live="polite" aria-atomic="true">
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#79cfee]">{item.year} / MIDI</p>
                        <h4 className="text-3xl font-extrabold leading-tight sm:text-4xl">{item.title}</h4>
                        <p className="mt-6 text-base leading-8 text-white/75">{item.body}</p>
                        <div className="mt-8 flex items-center gap-3">
                            <button type="button" onClick={() => setSelected((selected + t.items.length - 1) % t.items.length)} aria-label={lt ? "Ankstesnis įvykis" : "Previous event"} className="h-11 w-11 rounded-full border border-white/30 transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4">←</button>
                            <button type="button" onClick={() => setSelected((selected + 1) % t.items.length)} aria-label={lt ? "Kitas įvykis" : "Next event"} className="h-11 w-11 rounded-full border border-white/30 transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4">→</button>
                            <span className="ml-auto text-sm tabular-nums text-white/45">0{selected + 1} / 0{t.items.length}</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-5 border-t border-white/15" aria-label={lt ? "Istorijos metai" : "History years"}>
                    {t.items.map((event, index) => <button key={event.year} type="button" aria-pressed={selected === index} aria-controls="history-story" onClick={() => setSelected(index)} className={`border-b-4 py-5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-5px] sm:text-lg ${selected === index ? "border-[#79cfee] bg-white/10 text-white" : "border-transparent text-white/45 hover:bg-white/5 hover:text-white"}`}>{event.year}</button>)}
                </div>
            </div>
            <div className="mt-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <p className="max-w-2xl text-sm leading-7 text-[#333]/70">{t.closing}</p>
                <Link href="/archives" className="shrink-0 rounded-full border border-[#0075b5]/30 px-6 py-3 font-bold text-[#0075b5] hover:bg-[#e8f4fb]">{lt ? "Naršyti archyvus" : "Explore archives"} <span aria-hidden="true">↗</span></Link>
            </div>
        </section>
    );
}
