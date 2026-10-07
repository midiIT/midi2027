import type { Lang } from "@/context/LanguageContext";
import { text } from "./pageText";

export type ArchiveSlide = {
    id: string;
    title: string;
    address: string;
    href?: string;
    image?: string;
    alt: string;
    year?: number;
};

function createSlides(lang: Lang): ArchiveSlide[] {
    const t = text[lang];
    const years = Array.from({ length: 10 }, (_, index) => 2026 - index);
    return [
        ...years.map(year => ({
            id: String(year),
            title: String(year),
            address: `midi.lt/${year}`,
            href: year === 2023 ? undefined : `https://midi.lt/${year}/`,
            image: year === 2023 ? undefined : `/archives/${year}.webp`,
            alt: `${t.brand} ${year} – ${t.preview}`,
            year,
        })),
        { id: "main", title: t.mainTitle, address: "midi.lt/pagrindinis", href: "https://midi.lt/pagrindinis", image: "/archives/midi-pagrindinis.webp", alt: t.mainPreview },
        { id: "opera", title: t.operaTitle, address: "rokooperos.midi.lt", href: "https://rokooperos.midi.lt/", image: "/archives/roko-opera.webp", alt: t.operaPreview },
    ];
}

export const SLIDES: Record<Lang, ArchiveSlide[]> = {
    lt: createSlides("lt"),
    en: createSlides("en"),
};
