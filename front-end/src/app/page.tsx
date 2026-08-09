"use client";

import logoMidiWhite from "../../public/MIDI-Logotipas-baltas.png";
import Image from "next/image";

export default function Home() {
  return (
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
      <div className="relative mt-16 w-full max-w-160 text-center">
        <Image
          src={logoMidiWhite}
          alt="white midi logo"
          loading="eager"
          className="mx-auto mb-8 h-auto w-[clamp(100px,16vw,180px)] object-contain"
        />
      </div>
      <div className="relative z-10">

      </div>

    </div>
  );
}
