"use client";

import type { FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { text } from "@/app/contacts/pageText";
import Image from "next/image";

type ContactCardProps = {
  href: string;
  iconPath: string;
  title: string;
  description: string;
  handle: string;
};

function ContactCard({
  href,
  iconPath,
  title,
  description,
  handle,
}: ContactCardProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex min-h-64 flex-col rounded-[10px] border border-[#dcdcdc] bg-white px-7 py-8 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-200 
      hover:-translate-y-1
    hover:border-[#0075b5]/70
      hover:ring-2 
    hover:ring-[#0075b5] 
      hover:shadow-[0_10px_30px_rgba(0,117,181,0.12)] 
      
      focus-visible:outline-none 
      focus-visible:ring-2 
      focus-visible:ring-[#0075b5]"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f2f2f2]">
        <Image
          src={iconPath}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
        />
      </span>

      <h2 className="mt-7 text-xl font-bold text-[#404041] group-hover:text-[#0075b5]">
        {title}
      </h2>
      <p className="mt-2 max-w-72 text-[15px] leading-6 text-[#404041]/55">
        {description}
      </p>
      <span className="mt-auto pt-6 text-sm font-semibold text-[#0075b5]">
        {handle}
        <span
          aria-hidden="true"
          className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
      
    </a>
  );
}


export default function ContactsPage() {
  const { lang } = useLanguage();
  const t = text[lang];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const organisation = String(formData.get("organisation") ?? "");
    const email = String(formData.get("email") ?? "");
    const enquiryType = String(formData.get("enquiryType") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = `${t.emailSubject}: ${organisation}`;
    const body = [
      `${t.form.organisation}: ${organisation}`,
      `${t.form.email}: ${email}`,
      `${t.form.type}: ${enquiryType}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:info@midi.lt?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const contacts = [
    {
      href: "mailto:info@midi.lt",
      iconPath: "/icons/mailIcon.svg",
      ...t.cards.email,
    },
    {
      href: "https://www.instagram.com/midi.lt/",
      iconPath: "/icons/instagramIcon.svg",
      ...t.cards.instagram,
    },
    {
      href: "https://www.facebook.com/midi.lt",
      iconPath: "/icons/facebookIcon.svg",
      ...t.cards.facebook,
    },
    {
      href: "https://www.linkedin.com/company/midi-lt/",
      iconPath: "/icons/linkedinIcon.svg",
      ...t.cards.linkedin,
    },
    {
      href: "https://www.tiktok.com/@midi.lt",
      iconPath: "/icons/tiktokIcon.svg",
      ...t.cards.tiktok,
    },
  ];

  return (
    <div className="bg-white text-[#404041]">
      <section className="bg-[#007dbb] px-6 pb-32 pt-14 text-white sm:px-10 lg:px-16 lg:pb-36 lg:pt-16">
        <div className="mx-auto max-w-295">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-145 text-[clamp(2.4rem,5vw,4.25rem)] font-extrabold leading-[1.04] tracking-tight">
            {t.title}
          </h1>
          <p className="mt-6 max-w-175 text-base leading-7 text-white/65 sm:text-lg">
            {t.intro}
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-16 grid max-w-295 grid-cols-1 gap-4 px-6 sm:px-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 lg:px-16 xl:px-0">
        {contacts.map((contact) => (
          <ContactCard key={contact.title} {...contact} />
        ))}
      </section>

      <div className="mx-auto flex max-w-295 items-center gap-5 px-6 pb-12 pt-20 sm:px-10 lg:px-16 lg:pt-24 xl:px-0">
        <span className="h-px flex-1 bg-[#dcdcdc]" />
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#404041]/35">
          {t.divider}
        </span>
        <span className="h-px flex-1 bg-[#dcdcdc]" />
      </div>

      <section className="mx-auto max-w-230 px-6 pb-24 sm:px-10 lg:pb-28">
        <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-[#0075b5]">
          {t.form.title}
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
          <label className="contact-field">
            <span>{t.form.organisation}</span>
            <input name="organisation" required placeholder={t.form.organisationPlaceholder} />
          </label>

          <label className="contact-field">
            <span>{t.form.email}</span>
            <input name="email" type="email" required placeholder={t.form.emailPlaceholder} />
          </label>

          <label className="contact-field sm:col-span-2">
            <span>{t.form.type}</span>
            <select name="enquiryType" required defaultValue="">
              <option value="" disabled>{t.form.typePlaceholder}</option>
              {t.form.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="contact-field sm:col-span-2">
            <span>{t.form.message}</span>
            <textarea name="message" required rows={6} placeholder={t.form.messagePlaceholder} />
          </label>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-[#0075b5] px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00679f] hover:shadow-[0_8px_24px_rgba(0,117,181,0.24)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0075b5]"
            >
              {t.form.submit} →
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
