import { Lang } from "@/context/LanguageContext";

type ContactCardText = {
  title: string;
  description: string;
  handle: string;
};

type ContactsPageText = {
  eyebrow: string;
  title: string;
  intro: string;
  divider: string;
  emailSubject: string;
  cards: Record<"email" | "instagram" | "facebook" | "linkedin" | "tiktok", ContactCardText>;
  form: {
    title: string;
    organisation: string;
    organisationPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    type: string;
    typePlaceholder: string;
    options: string[];
    message: string;
    messagePlaceholder: string;
    submit: string;
  };
};

export const text: Record<Lang, ContactsPageText> = {
  en: {
    eyebrow: "Get in touch",
    title: "Reach us however works for you.",
    intro: "Whether you want to partner, sponsor, follow along, or just say hello — pick the channel that fits.",
    divider: "Or send us a message",
    emailSubject: "MIDI partnership enquiry",
    cards: {
      email: {
        title: "Email us",
        description: "Best for formal enquiries, partnerships, and sponsorships.",
        handle: "info@midi.lt",
      },
      instagram: {
        title: "Instagram",
        description: "Follow our updates, event highlights, and behind-the-scenes.",
        handle: "@midi_dienos",
      },
      facebook: {
        title: "Facebook",
        description: "Event announcements and community discussions.",
        handle: "MIDI Dienos",
      },
      linkedin: {
        title: "LinkedIn",
        description: "Professional network — connect with our organisation.",
        handle: "MIDI Organisation",
      },
      tiktok: {
        title: "TikTok",
        description: "Watch short videos, event moments, and behind-the-scenes content.",
        handle: "@midi.lt",
      },
    },
    form: {
      title: "Partnership enquiry",
      organisation: "Organisation name",
      organisationPlaceholder: "e.g. Tech University",
      email: "Work email",
      emailPlaceholder: "contact@organisation.com",
      type: "Enquiry type",
      typePlaceholder: "Select type…",
      options: ["Partnership", "Sponsorship", "Media / Press", "Other"],
      message: "Message",
      messagePlaceholder: "Tell us about your organisation and how you'd like to collaborate…",
      submit: "Send enquiry",
    },
  },
  lt: {
    eyebrow: "Susisiekime",
    title: "Susisiekite jums patogiausiu būdu.",
    intro: "Norite tapti partneriu, rėmėju, sekti naujienas ar tiesiog pasisveikinti? Pasirinkite jums tinkamiausią kanalą.",
    divider: "Arba parašykite mums",
    emailSubject: "MIDI partnerystės užklausa",
    cards: {
      email: {
        title: "El. paštas",
        description: "Oficialioms užklausoms, partnerystėms ir rėmimo pasiūlymams.",
        handle: "info@midi.lt",
      },
      instagram: {
        title: "Instagram",
        description: "Sekite naujienas, renginio akimirkas ir pasiruošimo užkulisius.",
        handle: "@midi_dienos",
      },
      facebook: {
        title: "Facebook",
        description: "Renginių pranešimai ir bendruomenės diskusijos.",
        handle: "MIDI Dienos",
      },
      linkedin: {
        title: "LinkedIn",
        description: "Profesinis tinklas ir ryšys su mūsų organizacija.",
        handle: "MIDI Organisation",
      },
      tiktok: {
        title: "TikTok",
        description: "Žiūrėkite trumpus vaizdo įrašus, renginio akimirkas ir užkulisius.",
        handle: "@midi.lt",
      },
    },
    form: {
      title: "Partnerystės užklausa",
      organisation: "Organizacijos pavadinimas",
      organisationPlaceholder: "pvz., Technologijų universitetas",
      email: "Darbo el. paštas",
      emailPlaceholder: "kontaktai@organizacija.lt",
      type: "Užklausos tipas",
      typePlaceholder: "Pasirinkite tipą…",
      options: ["Partnerystė", "Rėmimas", "Žiniasklaida", "Kita"],
      message: "Žinutė",
      messagePlaceholder: "Papasakokite apie savo organizaciją ir kaip norėtumėte bendradarbiauti…",
      submit: "Siųsti užklausą",
    },
  },
};
