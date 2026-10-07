"use client";

import { useLanguage } from "@/context/LanguageContext";
import { TeamCard } from "@/compoments/Team/TeamCard";
import { text } from "./pageText";
import { SLIDES } from "./pageSlides";

export default function TeamPage() {
    const { lang } = useLanguage();
    const t = text[lang];

    return (
        <div className="min-h-[70vh] bg-white text-[#404041]">
            <section className="border-b border-[#102c3c]/15 px-6 pb-10 pt-14 sm:px-10 sm:pt-16">
                <div className="mx-auto max-w-[1100px]">
                    <p className="text-xs font-bold uppercase text-[#0075b5]">{t.eyebrow}</p>
                    <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{t.title}</h1>
                    <p className="mt-4 max-w-xl text-lg leading-7 text-[#404041]/65">{t.intro}</p>
                </div>
            </section>
            <section aria-label={t.heading} className="mx-auto max-w-[1180px] px-6 py-10 sm:px-10 sm:py-12">
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {SLIDES.map(member => (
                        <li key={member.id}><TeamCard member={member} t={t} /></li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
