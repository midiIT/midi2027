import { Lang } from "@/context/LanguageContext";

type PageText = {
  titleTop: string;
  titleBottom: string;
  subTitle: string;
  backHome: string;
};

export const text: Record<Lang, PageText> = {
  en: {
    titleTop: "UNDER",
    titleBottom: "CONSTRUCTION",
    subTitle: "Activities & Events — coming soon!",
    backHome: "BACK HOME"
  },

  lt: {
    titleTop: "PUSLAPIS",
    titleBottom: "ATNAUJINAMAS",
    subTitle: "Veiklos ir renginiai — jau netrukus!",
    backHome: "Į PRADŽIĄ"
  },
};