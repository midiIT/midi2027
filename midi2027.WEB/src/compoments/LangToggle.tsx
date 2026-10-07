"use client";

import { Lang, useLanguage } from "@/context/LanguageContext";

export function LangToggle() {
  const { lang, setLang } = useLanguage();

  const languages:Lang[] = ["en", "lt"];

  return (
    <div className="ml-3 inline-flex shrink-0 items-center gap-1.5">
      {languages.map((language, index) => (
        <span
          key={language}
          className="inline-flex items-center gap-1.5"
        >
          {index > 0 && (
            <span className="select-none text-[13px] font-light leading-none text-[#dcdcdc]">
              /
            </span>
          )}

          <button
            onClick={() => setLang(language)}
            className={`p-0 text-[13px] uppercase tracking-[0.12em] leading-none transition-opacity duration-200
              ${
                lang === language
                  ? "cursor-default font-extrabold text-[#0075b5] opacity-100"
                  : "cursor-pointer font-normal text-[#404041] opacity-40 hover:opacity-75"
              }
            `}
          >
            {language.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}