import Link from "next/link"
import logoMidiBlack from "../../public/MIDI-Logotipas.png"
import logoVusaMif from "../../public/VUSAMIF.png"
import Image from "next/image"

export function Footer() {
    return (
        <footer className="flex flex-wrap items-center justify-between gap-6 border-t border-[#dcdcdc] bg-[#f2f2f2] px-12 py-6">
            <div className="flex items-center gap-3">
                <Image
                    src={logoMidiBlack}
                    alt="MIDI"
                    className="h-8 w-auto object-contain"
                />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#404041]/60">
                        Matematikų ir Informatikų Dienos
                    </span>
                </div>
            </div>
            <span className="text-sm font-semibold text-[#404041]/40">
                © 2026 MIDI. All rights reserved.
            </span>
            <Link
                href="https://mif.vusa.lt/lt"
                target="_blank"
                className="flex items-center gap-4"
            >
                <Image
                    src={logoVusaMif}
                    alt="VU SA MIF"
                    className="h-12 w-auto opacity-80"
                />

                <div className="flex flex-col">
                    <span className="text-sm text-[#404041]/40">
                        Organised by
                    </span>

                    <span className="text-sm font-semibold text-[#404041]/60">
                        VU SA MIF
                    </span>
                </div>
            </Link>
        </footer>
    )
}