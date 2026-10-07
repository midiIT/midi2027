import { Lang } from "@/context/LanguageContext";

type Pillar = {
    icon: string;
    title: string;
    body: string;
};

type AboutText = {
    label: string;
    title: string;
    intro: string;
    historyLabel: string;
    pillars: Pillar[];
};

export const aboutText: Record<Lang, AboutText> = {
    en: {
        label: "About us",
        title: "What is MIDI?",
        intro: "An annual event at Vilnius University's Faculty of Mathematics and Informatics — bringing together students, academics, and industry for lectures, competitions, and workshops since 1976.",
        historyLabel: "Our history",
        pillars: [
            { icon: '◎', title: 'Lectures & Talks', body: 'Industry professionals and academics share cutting-edge research and insights with students.' },
            { icon: '◈', title: 'Competitions', body: 'Mathematics and informatics olympiads and challenges that push students to their limits.' },
            { icon: '⬡', title: 'Networking', body: 'Connect students with companies, researchers, and alumni across the tech and science sectors.' },
        ],
    },
    lt: {
        label: "Apie mus",
        title: "Kas yra MIDI?",
        intro: "Kasmetinis renginys Vilniaus universiteto Matematikos ir informatikos fakultete — subūriantis studentus, akademikus ir verslo atstovus paskaitoms, konkursams ir seminarams jau nuo 1976 metų.",
        historyLabel: "Mūsų istorija",
        pillars: [
            { icon: '◎', title: 'Paskaitos ir pranešimai', body: 'Verslo specialistai ir akademikai dalinasi naujausiais tyrimais ir įžvalgomis su studentais.' },
            { icon: '◈', title: 'Konkursai', body: 'Matematikos ir informatikos olimpiados bei iššūkiai, skatinantys studentus siekti daugiau.' },
            { icon: '⬡', title: 'Bendravimas', body: 'Sujungia studentus su įmonėmis, mokslininkais ir absolventais technologijų ir mokslo srityse.' },
        ],
    },
};