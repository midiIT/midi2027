import { Lang } from "@/context/LanguageContext";

type ContactCardText = { title: string; description: string; handle: string };
type FaqItem = { question: string; answer: string };

type ContactsPageText = {
  eyebrow: string;
  watermark: string;
  title: string;
  intro: string;
  channelsEyebrow: string;
  stats: Array<{ value: number; label: string }>;
  cards: Record<"email" | "instagram" | "facebook" | "linkedin" | "tiktok", ContactCardText>;
  faq: { eyebrow: string; title: string; intro: string; items: FaqItem[] };
};

export const text: Record<Lang, ContactsPageText> = {
  en: {
    eyebrow: "Get in touch",
    watermark: "CONTACT",
    title: "Reach us however works for you.",
    intro: "Want to become a partner, sponsor, follow the news or just say hello? Pick the channel that suits you best.",
    channelsEyebrow: "Find us here",
    stats: [
      { value: 50, label: "Years of history" },
      { value: 20, label: "Events held" },
      { value: 5000, label: "Students reached" },
      { value: 100, label: "Partner companies" },
    ],
    cards: {
      email: { title: "Email us", description: "Best for formal enquiries, partnerships, and sponsorships.", handle: "info@midi.lt" },
      instagram: { title: "Instagram", description: "Follow our updates, event highlights, and behind-the-scenes.", handle: "@midi.lt" },
      facebook: { title: "Facebook", description: "Event announcements and community discussions.", handle: "MIDI" },
      linkedin: { title: "LinkedIn", description: "Professional network — connect with our organisation.", handle: "MIDI" },
      tiktok: { title: "TikTok", description: "Watch short videos, event moments, and behind-the-scenes content.", handle: "@midi.lt" },
    },
    faq: {
      eyebrow: "FAQ",
      title: "Common questions",
      intro: "Can't find what you're looking for? Email us directly.",
      items: [
        { question: "What is MIDI?", answer: "MIDI — Mathematics and Informatics Days — is an annual student event at Vilnius University's Faculty of Mathematics and Informatics, connecting students with industry, academia, and the broader tech community." },
        { question: "How can our company get involved?", answer: "There are several ways: sponsorship packages, speaking slots, workshop hosting, and career fair participation. Reach out via email and we will send you our partnership deck." },
        { question: "When does MIDI 2027 take place?", answer: "The exact dates are being finalised. Follow our social channels to be the first to know when they are announced." },
        { question: "Who organises MIDI?", answer: "MIDI is organised by VU SA MIF — the student representation body of the Faculty of Mathematics and Informatics at Vilnius University." },
        { question: "Is participation free for students?", answer: "Yes — MIDI events are free for students. Some workshops may require prior registration due to limited capacity." },
      ],
    },
  },
  lt: {
    eyebrow: "Susisiekime",
    watermark: "KONTAKTAI",
    title: "Susisiekite jums patogiausiu būdu.",
    intro: "Norite tapti partneriu, rėmėju, sekti naujienas ar tiesiog pasisveikinti? Pasirinkite jums tinkamiausią kanalą.",
    channelsEyebrow: "Raskite mus čia",
    stats: [
      { value: 50, label: "Metų istorijos" },
      { value: 20, label: "Įvykusių renginių" },
      { value: 5000, label: "Pasiektų studentų" },
      { value: 100, label: "Įmonių partnerių" },
    ],
    cards: {
      email: { title: "El. paštas", description: "Oficialioms užklausoms, partnerystėms ir rėmimo pasiūlymams.", handle: "info@midi.lt" },
      instagram: { title: "Instagram", description: "Sekite naujienas, renginio akimirkas ir pasiruošimo užkulisius.", handle: "@midi.lt" },
      facebook: { title: "Facebook", description: "Renginių pranešimai ir bendruomenės diskusijos.", handle: "MIDI" },
      linkedin: { title: "LinkedIn", description: "Profesinis tinklas ir ryšys su mūsų organizacija.", handle: "MIDI" },
      tiktok: { title: "TikTok", description: "Žiūrėkite trumpus vaizdo įrašus, renginio akimirkas ir užkulisius.", handle: "@midi.lt" },
    },
    faq: {
      eyebrow: "DUK",
      title: "Dažniausi klausimai",
      intro: "Neradote atsakymo? Parašykite mums el. paštu.",
      items: [
        { question: "Kas yra MIDI?", answer: "MIDI — Matematikų ir Informatikų Dienos — yra kasmetinis Vilniaus universiteto Matematikos ir informatikos fakulteto studentų renginys, jungiantis studentus, verslą, akademinę bendruomenę ir technologijų sektorių." },
        { question: "Kaip mūsų įmonė gali prisidėti?", answer: "Prisidėti galima remiant renginį, skaitant pranešimus, organizuojant dirbtuves ar dalyvaujant karjeros mugėje. Parašykite mums el. paštu ir atsiųsime partnerystės pasiūlymą." },
        { question: "Kada vyks MIDI 2027?", answer: "Tikslios datos dar derinamos. Sekite mūsų socialinius kanalus ir apie jas sužinosite pirmieji." },
        { question: "Kas organizuoja MIDI?", answer: "MIDI organizuoja VU SA MIF — Vilniaus universiteto Matematikos ir informatikos fakulteto studentų atstovybė." },
        { question: "Ar dalyvavimas studentams nemokamas?", answer: "Taip, MIDI renginiai studentams yra nemokami. Į kai kurias dirbtuves dėl riboto vietų skaičiaus gali reikėti registruotis iš anksto." },
      ],
    },
  },
};
