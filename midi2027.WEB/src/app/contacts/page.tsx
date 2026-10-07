"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { text } from "@/app/contacts/pageText";

type Brand = "email" | "instagram" | "facebook" | "linkedin" | "tiktok";

type ContactCardProps = {
  href: string;
  iconPath: string;
  title: string;
  description: string;
  handle: string;
  brand: Brand;
};

const brandHover: Record<Brand, string> = {
  email: "hover:border-[#0075b5] hover:bg-[#0075b5]",
  instagram: "hover:border-[#c13584] hover:bg-[linear-gradient(135deg,#833ab4,#e1306c,#f77737)]",
  facebook: "hover:border-[#1877f2] hover:bg-[#1877f2]",
  linkedin: "hover:border-[#0a66c2] hover:bg-[#0a66c2]",
  tiktok: "hover:border-[#111111] hover:bg-[#111111]",
};

function ContactCard({ href, iconPath, title, description, handle, brand }: ContactCardProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`group flex min-h-64 flex-col rounded-[10px] border border-[#dcdcdc] bg-white px-7 py-8 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:text-white hover:shadow-[0_14px_36px_rgba(0,0,0,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0075b5] ${brandHover[brand]}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f2f2f2] transition-colors duration-300 group-hover:bg-white/15">
        <Image
          src={iconPath}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 object-contain transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert"
        />
      </span>
      <h2 className="mt-7 text-xl font-bold text-[#404041] transition-colors duration-300 group-hover:text-white">
        {title}
      </h2>
      <p className="mt-2 max-w-72 text-[15px] leading-6 text-[#404041]/55 transition-colors duration-300 group-hover:text-white/75">
        {description}
      </p>
      <span className="mt-auto pt-6 text-sm font-semibold text-[#0075b5] transition-colors duration-300 group-hover:text-white">
        {handle}
        <span aria-hidden="true" className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </span>
    </a>
  );
}

function AnimatedStat({ value, label }: { value: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      const animationFrame = requestAnimationFrame(() => setDisplayValue(value));
      return () => cancelAnimationFrame(animationFrame);
    }

    const duration = 1600;
    let animationFrame = 0;
    let startTime: number | null = null;

    const countUp = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(countUp);
      }
    };

    animationFrame = requestAnimationFrame(countUp);

    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return (
    <div className="text-center sm:text-left">
      <div className="text-[clamp(2.75rem,5vw,4.5rem)] font-extrabold leading-none tracking-[-0.04em] text-white">
        {displayValue}+
      </div>
      <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45 sm:text-xs">
        {label}
      </div>
    </div>
  );
}

export default function ContactsPage() {
  const { lang } = useLanguage();
  const t = text[lang];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const contacts = [
    { href: "mailto:info@midi.lt", iconPath: "/icons/mailIcon.svg", brand: "email" as const, ...t.cards.email },
    { href: "https://www.instagram.com/midi.lt/", iconPath: "/icons/instagramIcon.svg", brand: "instagram" as const, ...t.cards.instagram },
    { href: "https://www.facebook.com/midi.lt", iconPath: "/icons/facebookIcon.svg", brand: "facebook" as const, ...t.cards.facebook },
    { href: "https://www.linkedin.com/company/midi-lt/", iconPath: "/icons/linkedinIcon.svg", brand: "linkedin" as const, ...t.cards.linkedin },
    { href: "https://www.tiktok.com/@midi.lt", iconPath: "/icons/tiktokIcon.svg", brand: "tiktok" as const, ...t.cards.tiktok },
  ];

  return (
    <div className="bg-white text-[#404041]">
      <section className="relative overflow-hidden bg-[#087eb8] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute left-[34%] top-25 whitespace-nowrap text-[clamp(9rem,24vw,23rem)] font-extrabold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.08)]">
          {t.watermark}
        </div>

        <div className="relative mx-auto max-w-295 px-6 pb-14 pt-16 sm:px-10 sm:pb-18 sm:pt-20 lg:px-16 xl:px-0">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/55">{t.eyebrow}</p>
          <h1 className="mt-6 max-w-235 text-[clamp(3rem,7vw,6.875rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
            {t.title}
          </h1>
          <p className="mt-7 max-w-175 text-base leading-7 text-white/65 sm:text-lg">{t.intro}</p>
        </div>

        <div className="relative border-t border-white/15">
          <div className="mx-auto grid max-w-295 grid-cols-2 gap-x-8 gap-y-10 px-6 py-12 sm:px-10 md:grid-cols-4 md:py-14 lg:px-16 xl:px-0">
            {t.stats.map((stat) => <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />)}
          </div>
        </div>
      </section>

      <section className="px-6 py-18 sm:px-10 sm:py-22 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-295">
          <p className="mb-10 text-xs font-bold uppercase tracking-[0.25em] text-[#0075b5]">{t.channelsEyebrow}</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {contacts.map((contact) => <ContactCard key={contact.title} {...contact} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#404041] px-6 py-18 text-white sm:px-10 sm:py-22 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-295 gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0075b5]">{t.faq.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(2.4rem,4vw,4rem)] font-extrabold leading-[1.05]">{t.faq.title}</h2>
            <p className="mt-5 max-w-85 text-base leading-7 text-white/45">{t.faq.intro}</p>
          </div>

          <div className="border-t border-white/15">
            {t.faq.items.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.question} className="border-b border-white/15">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left text-lg font-bold transition-colors hover:text-[#54c5f1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#54c5f1] sm:text-xl"
                  >
                    <span>{item.question}</span>
                    <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25">
                      <Image
                        src={isOpen ? "/closeIcon.svg" : "/icons/addIcon.svg"}
                        alt=""
                        width={18}
                        height={18}
                        className="h-4.5 w-4.5 brightness-0 invert"
                      />
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-170 pb-7 pr-12 text-base leading-7 text-white/55">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
