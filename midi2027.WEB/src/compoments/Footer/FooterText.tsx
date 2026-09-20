import { Lang } from "@/context/LanguageContext";

type FooterText = {
  title: string;
  copyright: string;
  organisedBy: string;
};

export const text: Record<Lang, FooterText> = {
  en: {
    title: "Mathematics and Informatics Days",
    copyright: "© 2026 MIDI. All rights reserved.",
    organisedBy: "Organised by",
  },

  lt: {
    title: "Matematikų ir Informatikų Dienos",
    copyright: "© 2026 MIDI. Visos teisės saugomos.",
    organisedBy: "Organizuoja",
  },
};