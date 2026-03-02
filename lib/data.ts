// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Home",   href: "#home" },
  { label: "Story",  href: "#story" },
  { label: "Mascot", href: "#mascot" },
  { label: "Menu",   href: "#menu" },
];

// ─── Menu Items ───────────────────────────────────────────────────────────────

export type MenuItem = {
  name:  string;
  price: string;
  desc:  string;
  img:   string;
  badge: string | null;
  notes: string[];
};

export const MENU_ITEMS: MenuItem[] = [
  {
    name:  "Signature Espresso",
    price: "Rp 35.000",
    desc:  "A bold, rich shot of our finest single-origin Arabica blend with a perfect golden crema.",
    img:   "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=480&q=80",
    badge: "Best Seller",
    notes: ["Bold", "Nutty", "Dark Chocolate"],
  },
  {
    name:  "Forest Latte",
    price: "Rp 42.000",
    desc:  "Smooth espresso married with velvety steamed milk and a whisper of earthy forest notes.",
    img:   "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=480&q=80",
    badge: "New",
    notes: ["Creamy", "Earthy", "Smooth"],
  },
  {
    name:  "Triple A Special",
    price: "Rp 48.000",
    desc:  "Our triple-shot masterpiece — caramel, vanilla, and house-made brown-butter syrup.",
    img:   "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=480&q=80",
    badge: "Signature",
    notes: ["Caramel", "Vanilla", "Rich"],
  },
  {
    name:  "Cold Brew Delight",
    price: "Rp 38.000",
    desc:  "16-hour slow cold-steeped coffee for a silky, naturally sweet, low-acid experience.",
    img:   "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=480&q=80",
    badge: null,
    notes: ["Sweet", "Silky", "Low Acid"],
  },
  {
    name:  "Caramel Macchiato",
    price: "Rp 45.000",
    desc:  "Layered espresso over vanilla-sweetened milk, crowned with a lattice of caramel drizzle.",
    img:   "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=480&q=80",
    badge: null,
    notes: ["Caramel", "Sweet", "Layered"],
  },
  {
    name:  "Matcha Harmony",
    price: "Rp 43.000",
    desc:  "Ceremonial-grade matcha whisked to a froth, paired with cold oat milk and honey.",
    img:   "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=480&q=80",
    badge: null,
    notes: ["Grassy", "Honey", "Refreshing"],
  },
];

// ─── Brand Story Pillars ──────────────────────────────────────────────────────

export type StoryPillar = {
  letter: string;
  title:  string;
  desc:   string;
};

export const STORY_PILLARS: StoryPillar[] = [
  {
    letter: "A",
    title:  "Authentic",
    desc:   "Every bean is sourced transparently from family-owned farms across Sumatra, Flores, and Toraja. No shortcuts — only honest coffee.",
  },
  {
    letter: "A",
    title:  "Aroma",
    desc:   "From the first crack of the roast to the final pour, we craft every cup to deliver an aroma that tells a story before you even taste it.",
  },
  {
    letter: "A",
    title:  "Atmosphere",
    desc:   "We believe a great cup deserves a great setting. Triple A is not just a café — it is a sanctuary where moments become memories.",
  },
];

// ─── Operational Hours ────────────────────────────────────────────────────────

export const HOURS = [
  { day: "Monday – Friday", time: "07:00 – 22:00" },
  { day: "Saturday",        time: "08:00 – 23:00" },
  { day: "Sunday",          time: "08:00 – 21:00" },
  { day: "Public Holidays", time: "09:00 – 20:00" },
];
