import { Lang } from "@/context/LanguageContext";

type PageText = {
  titleTop: string;
  titleBottom: string;
  subTitle: string;
  backHome: string;
};

export const text: Record<Lang, PageText> = {
  en: {
    titleTop: "PAGE 404",
    titleBottom: "NOT FOUND",
    subTitle: "Looks like Micius couldn't find this page either.",
    backHome: "BACK HOME"
  },

  lt: {
    titleTop: "PUSLAPIS 404",
    titleBottom: "NERASTAS",
    subTitle: "Panašu, kad ir Micius šio puslapio nerado.",
    backHome: "Į PRADŽIĄ"
  },
};