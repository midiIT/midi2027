"use client";

import { useState, useEffect } from 'react';
import { SLIDES } from '@/app/pageSlides';
import { useLanguage } from '@/context/LanguageContext';
import { aboutText } from './AboutText';

export default function HistorySlideshow() {
    const { lang } = useLanguage();
    const slides = SLIDES[lang];
    const t = aboutText[lang];
    const [index, setIndex] = useState(0);
    const [flash, setFlash] = useState(false);

    const slide = slides[index];

    const changeSlide = (newIndex: number) => {
        setFlash(true);
        setTimeout(() => {
            setIndex(newIndex);
            setTimeout(() => setFlash(false), 400);
        }, 400);
    };

    const goPrev = () => changeSlide(index === 0 ? slides.length - 1 : index - 1);
    const goNext = () => changeSlide(index === slides.length - 1 ? 0 : index + 1);

    useEffect(() => {
        const interval = setInterval(() => {
            goNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [index, slides.length]);

    return (
        <div>
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#333]/50 mb-5">
                {t.historyLabel}
            </p>

            <div className="relative rounded-md overflow-hidden h-[460px] bg-black">
                <img
                    key={slide.year}
                    src={slide.img}
                    alt={slide.alt}
                    className={`absolute inset-0 w-full h-full object-cover ${slide.bw ? 'grayscale' : ''}`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute left-8 bottom-8 max-w-[520px]">
                    <div className="text-[56px] font-extrabold text-white/35 leading-none">
                        {slide.year}
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1">
                        {slide.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed mt-2 max-w-[600px]">
                        {slide.body}
                    </p>
                </div>

                <div
                    className={`absolute inset-0 z-20 bg-black pointer-events-none transition-opacity duration-[400ms] ${
                        flash ? 'opacity-100' : 'opacity-0'
                    }`}
                />

                <button
                    onClick={goPrev}
                    aria-label="Previous slide"
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white text-lg hover:bg-black/60 transition-colors z-30"
                >
                    ‹
                </button>
                <button
                    onClick={goNext}
                    aria-label="Next slide"
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white text-lg hover:bg-black/60 transition-colors z-30"
                >
                    ›
                </button>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex gap-6">
                    {slides.map((s, i) => (
                        <button
                            key={s.year}
                            onClick={() => changeSlide(i)}
                            className={`flex flex-col items-start gap-2 text-sm font-bold transition-colors ${
                                i === index ? 'text-[#0075b5]' : 'text-[#333]/40 hover:text-[#333]/70'
                            }`}
                        >
                            {s.year}
                            <span
                                className={`block h-0.5 w-full rounded-full transition-colors ${
                                    i === index ? 'bg-[#0075b5]' : 'bg-transparent'
                                }`}
                            />
                        </button>
                    ))}
                </div>

                <p className="text-sm text-[#333]/40">
                    {index + 1} / {slides.length}
                </p>
            </div>
        </div>
    );
}