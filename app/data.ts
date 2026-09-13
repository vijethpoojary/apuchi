/**
 * ============================================================
 *  DATA.TS — Edit ALL your content here. No need to touch
 *  any component files.
 * ============================================================
 *
 *  REQUIRED IMAGE FILES — drop these into /public/images/
 *  ─────────────────────────────────────────────────────────
 *  /public/images/story-1.jpg   ← Our Story: First Met
 *  /public/images/story-2.jpg   ← Our Story: First Date
 *  /public/images/story-3.jpg   ← Our Story: First Trip Together
 *  /public/images/story-4.jpg   ← Our Story: Made It Official
 *  /public/images/story-5.jpg   ← Our Story: Our First Anniversary
 *  /public/images/story-6.jpg   ← Our Story: Forever & Always
 *
 *  /public/images/gallery-1.jpg ← Gallery Photo 1
 *  /public/images/gallery-2.jpg ← Gallery Photo 2
 *  /public/images/gallery-3.jpg ← Gallery Photo 3
 *  /public/images/gallery-4.jpg ← Gallery Photo 4
 *  /public/images/gallery-5.jpg ← Gallery Photo 5
 *  /public/images/gallery-6.jpg ← Gallery Photo 6
 *  /public/images/gallery-7.jpg ← Gallery Photo 7
 *  /public/images/gallery-8.jpg ← Gallery Photo 8
 *
 *  REQUIRED AUDIO FILE — drop into /public/audio/
 *  ─────────────────────────────────────────────────────────
 *  /public/audio/our-song.mp3   ← Your favourite song together
 *
 * ============================================================
 */

// ─── Hero ────────────────────────────────────────────────────
export const HERO = {
  name: "Chinchu",
  tagline: "Enna mokeda muddu kinni bodedi bangaruuuuu😁😁😘😘😘😘",
  subTagline: "Enna bodedig kaithal ithunda undudu deed cheepeda korthve👀👀👀😁, but durad ulletha so undonji kinya malthini😁💕",
};

// ─── Together Since (used by Countdown) ──────────────────────
// Change this to the exact date you became a couple
export const TOGETHER_SINCE = new Date("2023-01-14T00:00:00");

// ─── Next Anniversary ─────────────────────────────────────────
// Change year to the upcoming anniversary
export const NEXT_ANNIVERSARY = new Date("2026-01-14T00:00:00");

// ─── Our Story Timeline ──────────────────────────────────────
export interface StoryEntry {
  id: number;
  label: string;
  date: string;
  description: string;
  image: string;
  alt: string;
}

export const STORY: StoryEntry[] = [
  {
    id: 1,
    label: "First tuyini😁",
    date: "Date gothiji may be eer 8-9 ipvar 😁",
    description:
      "Deverna onji plan ithnd ancha eerenonji statusd tupuleka malder 😁",
    image: "/images/story-1.jpg",
    alt: "The day we first met",
  },
  {
    id: 2,
    label: "Undu nama rud jana real aadu tuyini😁",
    date: "Panerda jathre 😁",
    description:
      "Nama friends aaditha, eer jathreg barre pandithar, ancha deverg naman ottige tuvodu pand aase ithnd ancha rud janan ottige malder 😁😁ereg nenpunda enk kinkdar aani😁",
    image: "/images/story-2.jpg",
    alt: "Our first date",
  },
  {
    id: 3,
    label: "Undu namma current😁",
    date: "9/10/2026",
    description:
      "Mone mone tuyare podthondu ithinakl , itthe movie halld lastd kulludu bajil malthondulla👀👀😁😁",
    image: "/images/story-3.jpg",
    alt: "Our first trip together",
  },
  {
    id: 4,
    label: "Undu namma 5 years buddu 👀😁",
    date: "month boka date ellanji nigant dani tuka , year 2031😁😁",
    description:
      "Aaa dina yanonji monkeyn illag lethondu barpe , daily enk gobbare👀👀😁😁",
    image: "/images/story-4.jpg",
    alt: "The day we made it official",
  },
  {
    id: 5,
    label: "Undu enna mnkuna kinni version👀👀😁😁",
    date: "date eer panthar 2 year buddu pand😁, aathneta control aanda k , ijjinda madimedaniye🐍🐍 👀👀😁😁",
    description:
      "Yanonji 10 eerna versions malpodu pand ulle😁😁😁Bokka bodtanda discount malpuga k 😁",
    image: "/images/story-5.jpg",
    alt: "Our first anniversary",
  },
  {
    id: 6,
    label: "Forever & Always",
    date: "E musuntun daily enk tuvodu😁😁😁",
    description:
      "Daily morning lakknaga ee musuntula , onji uddada munkula daily tuvodu boka cheepeda korodu😁",
    image: "/images/story-6.jpg",
    alt: "Forever and always together",
  },
];

// ─── Gallery ─────────────────────────────────────────────────
export interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

export const GALLERY: GalleryPhoto[] = [
  { id: 1, src: "/images/gallery-1.jpg", alt: "Gallery photo 1", caption: "Pure happiness 💕" },
  { id: 2, src: "/images/gallery-2.jpg", alt: "Gallery photo 2", caption: "My favourite smile" },
  { id: 3, src: "/images/gallery-3.jpg", alt: "Gallery photo 3", caption: "Moments like these" },
  { id: 4, src: "/images/gallery-4.jpg", alt: "Gallery photo 4", caption: "Adventure awaits" },
  { id: 5, src: "/images/gallery-5.jpg", alt: "Gallery photo 5", caption: "Just us two" },
  { id: 6, src: "/images/gallery-6.jpg", alt: "Gallery photo 6", caption: "Golden hour" },
  { id: 7, src: "/images/gallery-7.jpg", alt: "Gallery photo 7", caption: "Always laughing" },
  { id: 8, src: "/images/gallery-8.jpg", alt: "Gallery photo 8", caption: "My world" },
];

// ─── Reasons I Love You ───────────────────────────────────────
export interface Reason {
  id: number;
  front: string;
  back: string;
}

export const REASONS: Reason[] = [
  { id: 1, front: "01", back: "Your laugh is the most beautiful sound I've ever heard — it fills every room with light." },
  { id: 2, front: "02", back: "The way you care so deeply for everyone around you melts my heart every single day." },
  { id: 3, front: "03", back: "You make ordinary moments feel extraordinary just by being in them." },
  { id: 4, front: "04", back: "Your strength and resilience inspire me to be a better version of myself." },
  { id: 5, front: "05", back: "The little things you do — like remembering what I said weeks ago — show how much you truly listen." },
  { id: 6, front: "06", back: "You're the first person I want to call when something good happens, and the only one I need when something doesn't." },
  { id: 7, front: "07", back: "Your kindness is quiet and genuine — never performed, always real." },
  { id: 8, front: "08", back: "Being with you feels like home, wherever we are in the world." },
  { id: 9, front: "09", back: "You challenge me, support me, and believe in me more than I sometimes believe in myself." },
  { id: 10, front: "10", back: "Simply put: you are the greatest thing that has ever walked into my life." },
];

// ─── Love Letter ─────────────────────────────────────────────
export const LOVE_LETTER = {
  salutation: "My dearest Chinchu,",
  body: `There are moments when I look at you and I'm completely overwhelmed — not by sadness, not by worry, but by a feeling so full and warm that no word has ever done it justice. It's gratitude, I think. Deep, quiet, overwhelming gratitude that somehow, in this vast and complicated world, your path curved into mine.

You didn't just walk into my life — you transformed it. You made me notice things I'd been rushing past. Slow mornings. The sound of rain. The particular kind of silence that only feels safe with the right person.

I want you to know that every single day, I am grateful. For your laugh, for your patience, for the way you love — completely and without conditions. For the way you see me, truly see me, even on the days I struggle to see myself clearly.

This isn't a perfect letter. It doesn't fully capture what I feel — nothing written ever could. But I hope it reminds you of one thing above all else: you are loved. Deeply, genuinely, endlessly loved. Not for what you do, but for exactly who you are.

Forever yours,`,
  signature: "Your Apuchi 💕",
};

// ─── Music ───────────────────────────────────────────────────
// PASTE AUDIO HERE: Our Song -> /public/audio/our-song.mp3
export const MUSIC = {
  src: "/audio/our-song.mp3",
  title: "Our Song",
  artist: "— for Chinchu",
};

// ─── Footer ──────────────────────────────────────────────────
export const FOOTER = {
  name: "Apuchi",
  note: "Made with every bit of love I have, just for you.",
  closing: "Always yours. Always.",
};
