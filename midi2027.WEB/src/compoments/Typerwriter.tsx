"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
    text: string;
};

export function Typewriter({ text }: TypewriterProps) {
    const [displayed, setDisplayed] = useState("");
    const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");

    useEffect(() => {
        setDisplayed("");
        setPhase("typing");
    }, [text]);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        if (phase === "typing") {
            if (displayed.length < text.length) {
                timeout = setTimeout(() => {
                    setDisplayed(text.slice(0, displayed.length + 1));
                }, 50);
            } else {
                timeout = setTimeout(() => {setPhase("pause");}, 2000);
            }
        }

        if (phase === "pause") {
            timeout = setTimeout(() => {setPhase("erasing");}, 400);
        }

        if (phase === "erasing") {
            if (displayed.length > 0) {
                timeout = setTimeout(() => {setDisplayed(displayed.slice(0, -1));}, 30);
            } else {
                timeout = setTimeout(() => {setPhase("typing");}, 500);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayed, phase, text]);

    return (
        <span className="inline-flex items-center">
            {displayed}

            <span className="ml-0.5 inline-block h-[1em] w-0.5 animate-pulse bg-white/60" />
        </span>
    );
}