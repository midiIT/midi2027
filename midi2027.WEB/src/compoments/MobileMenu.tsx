"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MobileMenuProps = {
    menuOpen: boolean;
    links: NavLink[];
    onClose: () => void;
}

type NavLink = {
    href: string;
    label: labelLang;
}

type labelLang = {
    en: string;
    lt: string;
}

export function MobileMenu({
    menuOpen,
    links,
    onClose,
}: MobileMenuProps) {
    const pathname = usePathname();
    const { lang } = useLanguage();

    return (
        <nav
            className={`fixed top-17 left-0 right-0 z-40 overflow-hidden bg-white border-b border-zinc-200 transition-all duration-300 min-[1100px]:hidden
                ${menuOpen
                    ? "max-h-80 shadow-lg"
                    : "max-h-0 shadow-none"
                }`}
        >
            {links.map(({ href, label }) => {
                const normalize = (path: string) => path === "/" ? "/" : path.replace(/\/+$/, "");
                const active = normalize(pathname) === normalize(href);

                return (
                    <Link
                        key={href}
                        href={href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={`block w-full border-b border-zinc-200 px-12 py-4 text-left font-medium uppercase tracking-wide transition-colors duration-150
                            ${active
                                ? "bg-[#e8f4fb] font-bold text-[#0075b5]"
                                : "bg-white text-[#404041] hover:bg-[#f2f2f2]"
                            }`}
                    >
                        {label[lang]}
                    </Link>
                );
            })}
        </nav>
        
    );
}
