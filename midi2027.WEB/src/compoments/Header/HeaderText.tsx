import { Lang } from "@/context/LanguageContext";

export const links = [
  { href: "/", label: { en: "Home", lt: "Pagrindinis" } },
  { href: "/contacts", label: { en: "Contacts", lt: "Kontaktai" } },
  { href: "/team", label: { en: "Team", lt: "Komanda" } },
  { href: "/activities", label: { en: "Activities", lt: "Veiklos" } },
  { href: "/archives", label: { en: "Archives", lt: "Archyvai" } },
];

type PageText = {
  titleTop: string;
  titleBottom: string;
};

export const text: Record<Lang, PageText> = {
  en: {
    titleTop: "MIDI",
    titleBottom: "MATHEMATICS AND INFORMATICS DAYS",
  },

  lt: {
    titleTop: "MIDI",
    titleBottom: "MATEMATIKŲ IR INFORMATIKŲ DIENOS",
  },
};
