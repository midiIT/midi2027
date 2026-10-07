import type { Lang } from "@/context/LanguageContext";

export type TeamPageText = {
    eyebrow: string;
    title: string;
    intro: string;
    heading: string;
    emailLabel: string;
    photoAlt: string;
    roles: Record<"project" | "hr" | "organization" | "organizationCo" | "lan" | "marketing" | "partners" | "it" | "communication", string>;
};

export const text: Record<Lang, TeamPageText> = {
    lt: {
        eyebrow: "MIDI 2027",
        title: "MIDI komanda",
        intro: "Žmonės, kurie kuria Matematikų ir Informatikų Dienas.",
        heading: "Mūsų komanda",
        emailLabel: "Parašyti",
        photoAlt: "{name} portretas",
        roles: {
            project: "Projekto vadovė",
            hr: "Žmogiškųjų išteklių vadovė",
            organization: "Organizacinės srities vadovas",
            organizationCo: "Organizacinės srities vadovė",
            lan: "LAN Party vadovas",
            marketing: "Marketingo vadovė",
            partners: "Barterinių rėmėjų vadovas",
            it: "IT vadovas",
            communication: "Komunikacijos vadovė",
        },
    },
    en: {
        eyebrow: "MIDI 2027",
        title: "MIDI team",
        intro: "The people behind Mathematics and Informatics Days.",
        heading: "Our team",
        emailLabel: "Email",
        photoAlt: "Portrait of {name}",
        roles: {
            project: "Project Lead",
            hr: "Human Resources Lead",
            organization: "Organisation Lead",
            organizationCo: "Organisation Lead",
            lan: "LAN Party Lead",
            marketing: "Marketing Lead",
            partners: "Barter Partnerships Lead",
            it: "IT Lead",
            communication: "Communications Lead",
        },
    },
};
