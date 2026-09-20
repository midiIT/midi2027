import { Lang } from "@/context/LanguageContext";

type FirstHalfPageText = {
    titleTop: string;
    subTitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    mainButton: string;
    bottomSubTitle: string;
};

export const text: Record<Lang, FirstHalfPageText> = {
    en: {
        titleTop: "Mathematics and Informatics Days",
        subTitle: "Get ready. MIDI is coming!",
        days: "DAYS",
        hours: "HOURS",
        minutes: "MINUTES",
        seconds: "SECONDS",
        mainButton: "GET IN TOUCH",
        bottomSubTitle: "TARGET LAUNCH - APRIL 10, 2027"
    },

    lt: {
        titleTop: "Matematikų ir Informatikų Dienos",
        subTitle: "Pasiruošk. MIDI artėja!",
        days: "DIENOS",
        hours: "VALANDOS",
        minutes: "MINUTĖS",
        seconds: "SEKUNDĖS",
        mainButton: "PARAŠYK MUMS",
        bottomSubTitle: "2027 M. BALANDŽIO 10 D."
    },
};