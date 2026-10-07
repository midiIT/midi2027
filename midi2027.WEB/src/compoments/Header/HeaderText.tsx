import { Lang } from "@/context/LanguageContext";

type PageText = {
  titleTop: string;
  titleBottom: string;
};

export const text: Record<Lang, PageText> = {
  en: {
    titleTop: "MIDI",
    titleBottom: "MATHEMATIC AND INFORMATICS DAYS",
  },

  lt: {
    titleTop: "MIDI",
    titleBottom: "MATEMATIKŲ IR INFORMATIKŲ DIENOS",
  },
};