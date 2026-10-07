import { Lang } from "@/context/LanguageContext";

type Pillar = {
    icon: string;
    title: string;
    body: string;
};

type AboutText = {
    label: string;
    title: string;
    intro: string;
    historyLabel: string;
    pillars: Pillar[];
};

export const aboutText: Record<Lang, AboutText> = {
    "lt": {
        "label": "Apie MIDI",
        "title": "Kas yra MIDI?",
        "intro": "MIDI – Matematikų ir informatikų dienos, Vilniaus universiteto Matematikos ir informatikos fakulteto studentų kuriama šventė. Viskas prasidėjo paprastai: matematikams pasidarė nuobodu, tad jie nusprendė patys susikurti renginių. 1976 metais gimė MADI, vėliau tapusios MIDI.",
        "historyLabel": "Mūsų istorija",
        "pillars": [
            {
                "icon": "calendar",
                "title": "Tradicija nuo 1976-ųjų",
                "body": "Pirmosios MADI išgarsėjo visame universitete. Po 1989 metų pertraukos R. Kudžma ir kiti entuziastai šventę atkūrė, o 1999 metais ji įgijo dabartinį MIDI vardą."
            },
            {
                "icon": "cat",
                "title": "MIDI katinas",
                "body": "Mūsų simbolis – MIDI katinas. Jį sutiksi svetainėje ir atpažinsi kaip mūsų šventės ženklą: smalsų, savitą ir studentišką."
            },
            {
                "icon": "people",
                "title": "Studentų kuriama šventė",
                "body": "Kasmet fakulteto studentai puoselėja, rengia ir tobulina MIDI. Čia gimsta bendros idėjos ir prisiminimai. Nori sužinoti daugiau ar prisidėti? Prisijunk!"
            }
        ]
    },
    "en": {
        "label": "About MIDI",
        "title": "What is MIDI?",
        "intro": "MIDI – Mathematics and Informatics Days – is a celebration created by students at Vilnius University’s Faculty of Mathematics and Informatics. It began with a simple idea: the mathematicians were bored, so they decided to create their own events. MADI was born in 1976 and later became MIDI.",
        "historyLabel": "Our history",
        "pillars": [
            {
                "icon": "calendar",
                "title": "A tradition since 1976",
                "body": "The first MADI made waves across the university. After a pause in 1989, R. Kudžma and fellow enthusiasts revived the celebration. In 1999, it took its current name: MIDI."
            },
            {
                "icon": "cat",
                "title": "The MIDI cat",
                "body": "Our symbol is the MIDI cat. You will spot it across the website as a familiar sign of our celebration: curious, distinctive and full of student spirit."
            },
            {
                "icon": "people",
                "title": "Created by students",
                "body": "Every year, faculty students nurture, organise and develop MIDI, creating shared ideas and memories. Want to learn more or get involved? Join us!"
            }
        ]
    }
};
