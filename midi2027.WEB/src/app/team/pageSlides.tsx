import type { TeamPageText } from "./pageText";

export type TeamMember = {
    id: string;
    name: string;
    role: keyof TeamPageText["roles"];
    email: string;
    photo?: string;
};

export const SLIDES: TeamMember[] = [
    { id: "emile", name: "Emilė Kavaliauskaitė", role: "project", email: "vadovas@midi.lt" },
    { id: "migle", name: "Miglė Jūraitė", role: "hr", email: "hr@midi.lt" },
    { id: "arijus", name: "Arijus Lingė", role: "organization", email: "arijus.linge@midi.lt" },
    { id: "ula-marija", name: "Ūla Marija Čėpaitytė", role: "organizationCo", email: "ulamarija@midi.lt" },
    { id: "julius", name: "Julius Bei", role: "lan", email: "lan@midi.lt" },
    { id: "arina", name: "Arina Vysockaja", role: "marketing", email: "marketingas@midi.lt" },
    { id: "gytis", name: "Gytis Kaminskas", role: "partners", email: "reklama@midi.lt" },
    { id: "jakub", name: "Jakub Ragoža", role: "it", email: "it@midi.lt" },
    { id: "nikoleta", name: "Nikoleta Aganina", role: "communication", email: "info@midi.lt" },
];
