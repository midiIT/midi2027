import type { Lang } from "@/context/LanguageContext";

export type ArchivesPageText = {
    label: string;
    title: string;
    intro: string;
    open: string;
    unavailable: string;
    collection: string;
    preview: string;
    watermark: string;
    yearRange: string;
    brand: string;
    mainTitle: string;
    mainPreview: string;
    operaTitle: string;
    operaPreview: string;
};

export const text: Record<Lang, ArchivesPageText> = {
    lt: {
        label: "MIDI / SKAITMENINĖ KOLEKCIJA",
        title: "Kiekvieni metai. Kita istorija.",
        intro: "Nuo pirmųjų puslapių iki virtualių pasaulių. Atsiversk ankstesnių metų MIDI ir atrask, kaip keitėsi mūsų šventė.",
        open: "Atverti svetainę",
        unavailable: "2023 m. archyvas šiuo metu nepasiekiamas",
        collection: "Svetainių archyvas",
        preview: "svetainės peržiūra",
        watermark: "ARCHIVE",
        yearRange: "2017 — 2026",
        brand: "MIDI",
        mainTitle: "MIDI Pagrindinis",
        mainPreview: "MIDI senosios pagrindinės svetainės peržiūra",
        operaTitle: "Roko opera",
        operaPreview: "MIDI Roko operos svetainės peržiūra",
    },
    en: {
        label: "MIDI / DIGITAL COLLECTION",
        title: "Every year. A different story.",
        intro: "From early websites to virtual worlds. Open a past edition of MIDI and discover how our celebration has changed.",
        open: "Visit website",
        unavailable: "The 2023 website archive is currently unavailable",
        collection: "Website archive",
        preview: "website preview",
        watermark: "ARCHIVE",
        yearRange: "2017 — 2026",
        brand: "MIDI",
        mainTitle: "MIDI Main",
        mainPreview: "MIDI old main website preview",
        operaTitle: "Rock Opera",
        operaPreview: "MIDI Rock Opera website preview",
    },
};
