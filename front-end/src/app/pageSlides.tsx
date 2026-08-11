import { Lang } from "@/context/LanguageContext";

const img1976 = '/img1976.png';
const img1989 = '/img1989.png';
const img1993 = '/img1993.jpg';
const img1997 = '/img1997.jpg';
const img1999 = '/img1999.jpg';

type Slide = {
    year: string;
    title: string;
    body: string;
    img: string;
    alt: string;
    bw: boolean;
    accent: boolean;
};

export const SLIDES: Record<Lang, Slide[]> = {
    en: [
        {
            year: '1976',
            title: 'The beginning — Matematikų Dienos',
            body: 'The first Matematikų Dienos took place in spring 1976. The faculty was still called the Mathematics Faculty — no informatics programmes existed yet. Scientific events, mathematical research presentations, and the first academic group performances were held.',
            img: img1976,
            alt: 'Students and faculty at the first Matematikų Dienos, 1976',
            bw: true,
            accent: false,
        },
        {
            year: '1989',
            title: 'A pause — political changes',
            body: 'Having just gained momentum, MADI paused in 1989 due to political reasons. The reform movement sweeping Lithuania is thought to have influenced this, as did internal restructuring at the faculty.',
            img: img1989,
            alt: 'A student writing — the quiet pause of 1989',
            bw: true,
            accent: false,
        },
        {
            year: '1993',
            title: 'Revival by dean Ričardas Kudžma',
            body: "After four years, MADI was revived thanks to then-dean of VU MaF, docent Ričardas Kudžma. Under his initiative MADI once again became an integral part of the faculty's life.",
            img: img1993,
            alt: 'Participants at a MIDI event in 1993',
            bw: false,
            accent: false,
        },
        {
            year: '1997',
            title: 'The first MADI website',
            body: 'As the IT sector grew, the first MADI website was launched — a place to publish news and activities and reach a wider audience beyond the faculty walls.',
            img: img1997,
            alt: 'Blue backlit laptop keyboard, 1997',
            bw: false,
            accent: false,
        },
        {
            year: '1999',
            title: 'MADI becomes MIDI',
            body: 'The growing field of informatics brought new study programmes to the faculty. In 1999 MADI officially became MIDI — Matematikų ir Informatikų Dienos — reflecting the two communities it serves.',
            img: img1999,
            alt: 'Students at laptops during a MIDI event, 1999',
            bw: false,
            accent: true,
        },
    ],

    lt: [
        {
            year: '1976',
            title: 'Pradžia — Matematikų Dienos',
            body: 'Pirmosios Matematikų Dienos įvyko 1976 m. pavasarį. Fakultetas tuomet dar vadinosi Matematikos fakultetu — informatikos programų dar nebuvo. Vyko moksliniai renginiai, matematinių tyrimų pristatymai ir pirmieji akademinių grupių pasirodymai.',
            img: img1976,
            alt: 'Studentai ir dėstytojai pirmosiose Matematikų Dienose, 1976 m.',
            bw: true,
            accent: false,
        },
        {
            year: '1989',
            title: 'Pertrauka — politiniai pokyčiai',
            body: 'Vos įsibėgėjęs, MADI 1989 m. sustojo dėl politinių priežasčių. Manoma, kad tam įtakos turėjo Lietuvą apėmęs reformų judėjimas bei vidinė fakulteto pertvarka.',
            img: img1989,
            alt: 'Rašantis studentas — tyli 1989 m. pertrauka',
            bw: true,
            accent: false,
        },
        {
            year: '1993',
            title: 'Atgaivino dekanas Ričardas Kudžma',
            body: 'Po ketverių metų MADI atgaivino tuometinis VU MaF dekanas docentas Ričardas Kudžma. Jo iniciatyva MADI vėl tapo neatsiejama fakulteto gyvenimo dalimi.',
            img: img1993,
            alt: 'MIDI renginio dalyviai 1993 m.',
            bw: false,
            accent: false,
        },
        {
            year: '1997',
            title: 'Pirmoji MADI svetainė',
            body: 'Augant IT sektoriui, buvo sukurta pirmoji MADI svetainė — vieta naujienoms ir veikloms skelbti bei pasiekti platesnę auditoriją už fakulteto ribų.',
            img: img1997,
            alt: 'Mėlynai pašviesta nešiojamojo kompiuterio klaviatūra, 1997 m.',
            bw: false,
            accent: false,
        },
        {
            year: '1999',
            title: 'MADI tampa MIDI',
            body: 'Augant informatikos sričiai, fakultete atsirado naujų studijų programų. 1999 m. MADI oficialiai tapo MIDI — Matematikų ir Informatikų Dienomis — atspindinčiu abi bendruomenes, kurioms jis skirtas.',
            img: img1999,
            alt: 'Studentai prie nešiojamųjų kompiuterių MIDI renginyje, 1999 m.',
            bw: false,
            accent: true,
        },
    ],
};