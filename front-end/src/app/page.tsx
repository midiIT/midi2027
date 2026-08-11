"use client";

import logoMidiWhite from "../../public/MIDI-Logotipas-baltas.png";
import Image from "next/image";
import { text } from "@/app/pageText";
import { useLanguage } from "@/context/LanguageContext";
import { Typewriter } from "@/compoments/Typerwriter";
import { Countdown } from "@/compoments/CountdownTimer";
import Link from "next/link";
import About from "@/compoments/Home/About";

export default function Home() {

    const { lang } = useLanguage();
    const t = text[lang];
    return (
        <>
            <div className="relative min-h-200 max-[700px]:min-h-200 overflow-hidden bg-[#0075b5]">
                <div
                    className="
          pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(180px,28vw,380px)] font-extrabold leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)]
          "
                >
                    MIDI
                </div>
                <div
                    className="
          pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_50%_40%,rgba(255,255,255,0.08)_0%,transparent_65%)]
          "
                />
                <div className="relative w-full max-w-160 py-8 text-center max-[1130px]:mx-auto">
                    <Image
                        src={logoMidiWhite}
                        alt="MIDI - Matematikų ir Informatikų Dienos"
                        loading="eager"
                        className="
              mx-auto mb-8 h-auto w-[clamp(100px,16vw,180px)] object-contain"
                    />
                </div>
                <div className="relative z-10 w-full px-8 text-center">
                    <h1 className="text-5xl font-bold text-white">
                        {t.titleTop}
                    </h1>

                    <div className="flex min-h-7 py-4 items-center justify-center">
                        <p className="text-xl text-white/65">
                            <Typewriter text={t.subTitle} />
                        </p>
                    </div>

                    <div className="py-10">
                        <Countdown
                            targetDate="2027-04-10T00:00:00+03:00"
                            labels={{
                                days: t.days,
                                hours: t.hours,
                                minutes: t.minutes,
                                seconds: t.seconds,
                            }}
                        />
                    </div>

                    <div className="py-6">
                        <Link
                            href="/contacts"
                            className="cta-main-btn text-lg py-5 px-7 font-bold tracking-widest text-[#0075b5] outline-white bg-white rounded-md transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_32px_rgba(0,0,0,0.3)]"
                        >
                            {t.mainButton}
                        </Link>
                    </div>
                    <div className="flex min-h-7 py-4 items-center justify-center">
                        <p className="text-lg font-bold text-white/30 tracking-widest">
                            {t.bottomSubTitle}
                        </p>
                    </div>
                </div>
            </div>

            <About />
        </>
    );
}