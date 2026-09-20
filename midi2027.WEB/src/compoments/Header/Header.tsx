"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileMenu } from "../MobileMenu";

import logoMidiBlack from "../../../public/logos/MIDI-Logotipas.png"
import Image from "next/image";
import Link from "next/link";
import burgerIcon from "../../../public/icons/burgerIcon.svg"
import closeIcon from "../../../public/icons/closeIcon.svg"
import { useLanguage } from "@/context/LanguageContext";
import { LangToggle } from "../LangToggle";
import { text } from "@/compoments/Header/HeaderText";


const links = [
    { href: "/", label: { en: "Home", lt: "Pagrindinis" } },
    { href: "/contacts", label: { en: "Contacts", lt: "Kontaktai" } },
    { href: "/activities", label: { en: "Activities", lt: "Veiklos" } },
];

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { lang } = useLanguage();
    const t = text[lang];

    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex h-17 items-center justify-between border-b border-[#dcdcdc] bg-white px-10">
            <Link href="/" className="flex items-center gap-3">
                <Image
                    src={logoMidiBlack}
                    alt="MIDI logo"
                    className="h-11 w-auto object-contain"
                    priority
                />

                <div className="text-left">
                    <div className="text-[11px] font-bold uppercase leading-[1.4] tracking-[0.2em] text-[#0075b5]">
                        {t.titleTop}
                    </div>

                    <div className="text-[9px] font-medium uppercase leading-[1.4] tracking-[0.08em] text-[#404041]/70">
                        {t.titleBottom}
                    </div>
                </div>
            </Link>

            <div className="flex items-center gap-6 min-[550px]:hidden">

                <LangToggle />

                <button
                    className="shrink-0"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                    <Image
                        src={menuOpen ? closeIcon : burgerIcon}
                        alt={menuOpen ? "Close menu" : "Open menu"}
                        className="h-8 w-auto transition-transform active:scale-90 shrink-0"
                    />
                </button>

            </div>

            <MobileMenu
                menuOpen={menuOpen}
                links={links}
                onClose={() => setMenuOpen(false)}
            />

            <div className="flex items-center gap-2 max-[550px]:hidden">
                <nav className="flex gap-1 ">
                    {links.map(({ href, label }) => {
                        const active = pathname === href;

                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`rounded px-4 py-1.75 text-sm font-medium uppercase tracking-[0.08em] transition-all duration-150 ${active
                                    ? "bg-[#e8f4fb] font-bold text-[#0075b5]"
                                    : "text-[#404041] hover:bg-[#f2f2f2]"
                                    }`}
                            >
                                {label[lang]}
                            </Link>
                        );
                    })}
                </nav>

                <LangToggle />
            </div>

        </header>
    );
}