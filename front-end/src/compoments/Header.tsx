"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";

import logoMidiBlack from "../../public/MIDI-Logotipas.png"
import Image from "next/image";
import Link from "next/link";
import burgerIcon from "../../public/burgerIcon.svg"
import closeIcon from "../../public/closeIcon.svg"


const links = [
    { href: "/", label: "Home" },
    { href: "/contacts", label: "Contacts" },
    { href: "/activities", label: "Activities" },
];

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex h-17 items-center justify-between border-b border-[#dcdcdc] bg-white px-12">
            <Link href="/" className="flex items-center gap-3">
                <Image
                    src={logoMidiBlack}
                    alt="MIDI logo"
                    className="h-11 w-auto object-contain"
                    priority
                />

                <div className="text-left">
                    <div className="text-[11px] font-bold uppercase leading-[1.2] tracking-[0.2em] text-[#0075b5]">
                        MIDI
                    </div>

                    <div className="text-[9px] font-medium uppercase leading-[1.2] tracking-[0.08em] text-[#404041]/70">
                        Matematiku ir Informatiku Dienos
                    </div>
                </div>
            </Link>

            {menuOpen ? (
                <button
                    className="min-[549px]:hidden"
                    onClick={() => setMenuOpen(false)}
                >
                    <Image
                        src={closeIcon}
                        alt="burger icon"
                        className="h-8 w-auto transition-transform active:scale-90"
                    />

                <MobileMenu 
                    menuOpen={menuOpen}
                    links={links}
                    onClose={() => setMenuOpen(false)}
                />
                </button>
            ) : (
                <button
                    className="min-[549px]:hidden"
                    onClick={() => setMenuOpen(true)}
                >
                    <Image
                        src={burgerIcon}
                        alt="burger icon"
                        className="h-8 w-auto transition-transform active:scale-90"
                    />
                </button>
            )}

            <nav className="flex gap-1 max-[550px]:hidden">
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
                            {label}
                        </Link>
                    );
                })}
            </nav>

        </header>
    );
}