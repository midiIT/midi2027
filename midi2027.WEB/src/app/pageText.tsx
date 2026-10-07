import { Lang } from "@/context/LanguageContext";
import type { Filter } from "@/utils/feed";

export type LatestFeedText = {
    label: string;
    title: string;
    previous: string;
    next: string;
    filterLabel: string;
    filters: Record<Filter, string>;
    regionLabel: string;
    loading: string;
    empty: string;
    readMore: string;
    showLess: string;
    openPost: string;
    imageLinkLabel: string;
    dateLocale: string;
    postCount: string;
    loadMore: string;
    moreError: string;
    unavailable: string;
    unavailableTitle: string;
    unavailableDescription: string;
    retry: string;
    profile: string;
};

type FirstHalfPageText = {
    titleTop: string;
    subTitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    mainButton: string;
    volunteerButton: string;
    bottomSubTitle: string;
    latestFeed: LatestFeedText;
    updates: {
        label: string;
        title: string;
        description: string;
        button: string;
    };
};

export const text: Record<Lang, FirstHalfPageText> = {
    en: {
        titleTop: "Mathematics and Informatics Days",
        subTitle: "Get ready. MIDI is coming!",
        days: "DAYS",
        hours: "HOURS",
        minutes: "MINUTES",
        seconds: "SECONDS",
        mainButton: "GET IN TOUCH",
        volunteerButton: "BECOME A VOLUNTEER",
        bottomSubTitle: "TARGET LAUNCH - APRIL 10, 2027",
        latestFeed: {
            label: "MIDI SOCIAL",
            title: "Latest posts",
            previous: "Previous posts",
            next: "Next posts",
            filterLabel: "Post platform",
            filters: { all: "All", instagram: "Instagram", tiktok: "TikTok", facebook: "Facebook" },
            regionLabel: "Social posts",
            loading: "Loading…",
            empty: "The latest post from MIDI.",
            readMore: "Read more",
            showLess: "Show less",
            openPost: "View post",
            imageLinkLabel: "View {platform} post",
            dateLocale: "en-GB",
            postCount: "posts",
            loadMore: "Load more",
            moreError: "More posts could not be loaded. Please try again.",
            unavailable: "posts are temporarily unavailable.",
            unavailableTitle: "Find MIDI on social",
            unavailableDescription: "Posts are temporarily unavailable. Catch up with MIDI on our social channels.",
            retry: "Try again",
            profile: "Visit profile",
        },
        updates: {
            label: "MIDI 2027 · 10 APRIL",
            title: "Stay tuned – there’s more to come!",
            description: "As MIDI 2027 approaches, this website will be updated with the programme, event times and registration details. See you on 10 April 2027!",
            button: "Follow our updates",
        },
    },

    lt: {
        titleTop: "Matematikų ir Informatikų Dienos",
        subTitle: "Pasiruošk. MIDI artėja!",
        days: "DIENOS",
        hours: "VALANDOS",
        minutes: "MINUTĖS",
        seconds: "SEKUNDĖS",
        mainButton: "PARAŠYK MUMS",
        volunteerButton: "TAPK SAVANORIU",
        bottomSubTitle: "2027 M. BALANDŽIO 10 D.",
        latestFeed: {
            label: "MIDI SOCIAL",
            title: "Naujausi įrašai",
            previous: "Ankstesni įrašai",
            next: "Kiti įrašai",
            filterLabel: "Įrašų platforma",
            filters: { all: "Visi", instagram: "Instagram", tiktok: "TikTok", facebook: "Facebook" },
            regionLabel: "Socialinių tinklų įrašai",
            loading: "Kraunama…",
            empty: "Naujausias MIDI įrašas.",
            readMore: "Skaityti daugiau",
            showLess: "Rodyti mažiau",
            openPost: "Peržiūrėti įrašą",
            imageLinkLabel: "Atverti {platform} įrašą",
            dateLocale: "lt-LT",
            postCount: "įrašų",
            loadMore: "Rodyti daugiau",
            moreError: "Daugiau įrašų įkelti nepavyko. Bandykite dar kartą.",
            unavailable: "įrašų šiuo metu pasiekti nepavyko.",
            unavailableTitle: "Susitikime socialiniuose tinkluose",
            unavailableDescription: "Įrašai laikinai nepasiekiami. MIDI naujienas rasite mūsų socialiniuose tinkluose.",
            retry: "Bandyti dar kartą",
            profile: "Atverti profilį",
        },
        updates: {
            label: "MIDI 2027 · BALANDŽIO 10 D.",
            title: "Laukite naujienų – dar susitiksime!",
            description: "Artėjant MIDI 2027, svetainė atsinaujins: čia rasite renginių programą, laikus ir registracijos informaciją. Susitinkame 2027 m. balandžio 10 d.!",
            button: "Sekite naujienas",
        },
    },
};
