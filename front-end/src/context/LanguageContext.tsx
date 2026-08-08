"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "lt";

type LanguageContextType = {
    lang: Lang;
    setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export function LanguageProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [lang, setLangState] = useState<Lang>("en");

    useEffect(() => {
        const savedLang = localStorage.getItem("lang");

        if (savedLang === "en" || savedLang === "lt") {
            setLangState(savedLang);
            document.documentElement.lang = savedLang;
        }
    }, []);

    function setLang(newLang: Lang) {
        setLangState(newLang);

        localStorage.setItem("lang", newLang);

        document.documentElement.lang = newLang;
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used inside LanguageProvider"
        );
    }

    return context;
}