"use client";

import logoMidiBlack from "../../public/MIDI-Logotipas.png";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src={logoMidiBlack}
        alt="black midi logo"
        loading="eager"
        className="h-20 w-auto"
      />
    </div>
  );
}
