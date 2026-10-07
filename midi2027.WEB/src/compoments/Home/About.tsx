"use client";

import AboutPillars from './AboutPillars';
import HistorySlideshow from './HistorySlideShow';
import { aboutText } from './AboutText';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
    const { lang } = useLanguage();
    const t = aboutText[lang];

    return (
        <div className="bg-white px-12 pt-24 pb-20">
            <div className="max-w-[1100px] mx-auto">
                {/* Section header */}
                <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
                    <div>
                        <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#0075b5] mb-2.5">
                            {t.label}
                        </p>
                        <h2 className="text-[clamp(28px,4vw,52px)] font-extrabold text-[#333] tracking-tight leading-[1.1]">
                            {t.title}
                        </h2>
                    </div>
                    <p className="text-[15px] text-[#333]/60 leading-relaxed max-w-[420px]">
                        {t.intro}
                    </p>
                </div>

                <AboutPillars pillars={t.pillars} />

                <HistorySlideshow />
            </div>
        </div>
    );
}