// Services and the three-question plan. The front of a card: `body` is the
// original homepage's wording, `title` its service names without the
// English in brackets (SEO keeps its full name). The back: `lead` is what
// we do, `includes` the services inside it (three, four for SEO; each one a
// thing a client can order, never a feature or a tactic), `fact` what we
// measure.

export const SERVICES = [
  {
    id: "ads",
    title: "Paid Advertising (Search & Social)",
    name: "Paid Advertising",
    body: "Campaigns on Google and social, built and scaled to drive sales, not just clicks.",
    lead: "We set up the campaigns, track every enquiry and move the budget to where it brings sales.",
    includes: [
      "Google Ads campaigns",
      "Meta ads on Facebook and Instagram",
      "Analytics and conversion tracking",
    ],
    fact: ["We measure", "Cost per enquiry, for every campaign"],
  },
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    name: "SEO",
    body: "Be first where your customers search, on Google and in AI search.",
    lead: "We put the site and its content in order, so customers find you just when they are looking for what you offer.",
    includes: [
      "Content writing",
      "Technical SEO",
      "Local SEO",
      "AEO, optimisation for AI search",
    ],
    fact: ["We measure", "Rankings, visits and enquiries from search"],
  },
  {
    id: "web",
    title: "Website Design & Development",
    name: "Web",
    body: "Fast sites built to convert, turning the traffic you pay for into customers.",
    lead: "We design and build a site that loads fast and leads the visitor to an enquiry or a purchase.",
    includes: [
      "Website or online shop design and build",
      "Calculators and custom tools",
      "Maintenance and support",
    ],
    fact: ["We measure", "Site speed and conversion rate"],
  },
  {
    id: "social",
    title: "Social Content & Presence",
    name: "Social",
    body: "On-brand social that feeds your other channels, not an island of its own.",
    lead: "We plan, design and publish the content, so your brand looks the same on social as on your site and in your ads.",
    includes: [
      "Content strategy and plan",
      "Content creation and publishing",
      "Profile management and reporting",
    ],
    fact: ["We measure", "Reach, engagement and visits to the site"],
  },
  {
    id: "brand",
    title: "Branding & Visual Identity",
    name: "Branding",
    body: "The positioning and visual system underneath it all, so you read as one brand.",
    lead: "We define what your brand says and how it looks, then apply it to the site, social and ads.",
    includes: [
      "Strategy and positioning",
      "Logo and visual identity",
      "Brand book and post templates",
    ],
    fact: ["Result", "The same look everywhere"],
  },
];

export const QUIZ = [
  {
    id: "izvor",
    q: "How do people usually find you?",
    options: [
      {
        id: "preporuka",
        label: "Word of mouth",
        w: { seo: 3, ads: 2, web: 2 },
        match: "pando-cleaning",
        gap: "Referral works until the circle runs out. After that there is nowhere for it to come from.",
      },
      {
        id: "placeno",
        label: "Ads we pay for",
        w: { seo: 3, brand: 2 },
        match: "pando-cleaning",
        gap: "Ads work while you pay. The day you stop, the calls stop with them.",
      },
      {
        id: "organski",
        label: "They find us on Google",
        w: { ads: 3, social: 2 },
        match: "pando-cleaning",
        gap: "A good base, but there is no lever when you need more work this month.",
      },
      {
        id: "mreze",
        label: "Through Instagram or Facebook",
        w: { seo: 3, web: 2 },
        match: "pando-cleaning",
        gap: "Social makes you known. Someone ready to buy still searches first.",
      },
      {
        id: "nista",
        label: "Honestly, I don't know",
        w: { web: 3, seo: 2, ads: 2 },
        match: "pando-cleaning",
        gap: "You're not alone. The first thing we do is find out, because without it every euro is a guess.",
      },
    ],
  },
  {
    id: "sajt",
    q: "Do you have a website, and are you happy with it?",
    options: [
      { id: "nemamo", label: "We don't have one", w: { web: 4, brand: 2 } },
      {
        id: "star",
        label: "We do, but it's old and slow",
        w: { web: 3, seo: 1 },
      },
      {
        id: "ok",
        label: "Looks fine, but nobody calls",
        w: { web: 2, ads: 1 },
      },
      { id: "dobar", label: "We're happy with it", w: { ads: 1, seo: 1 } },
    ],
  },
  {
    id: "cilj",
    q: "What would mean the most six months from now?",
    options: [
      {
        id: "brzo",
        label: "The phone ringing, soon",
        w: { ads: 4, web: 2 },
      },
      {
        id: "stabilno",
        label: "Work arriving without paying for ads",
        w: { seo: 4, web: 1 },
      },
      {
        id: "poznatost",
        label: "People knowing us by name",
        w: { brand: 4, social: 3 },
      },
      {
        id: "sve",
        label: "A bit of everything, not sure where to start",
        w: { web: 2, seo: 2, ads: 2, brand: 1 },
      },
    ],
  },
];

/** Answers (one option id per question) → ranked services, the gap line and the closest case. */
export function makePlan(answers) {
  const score = Object.fromEntries(SERVICES.map((s) => [s.id, 0]));
  const picked = QUIZ.map((q, i) => q.options.find((o) => o.id === answers[i]));
  for (const o of picked)
    for (const [k, v] of Object.entries(o?.w ?? {})) score[k] += v;
  const ranked = [...SERVICES]
    .sort((a, b) => score[b.id] - score[a.id])
    .map((s) => s.id);
  return {
    ranked,
    top: ranked.slice(0, 3),
    gap: picked[0]?.gap ?? "",
    match: picked[0]?.match ?? null,
    answers: picked.map((o, i) => `${QUIZ[i].q} ${o?.label ?? "-"}`),
  };
}

export const STEPS = [
  [
    "Discovery & Audit",
    "We analyse the business, goals, and numbers to see what's working and what isn't.",
  ],
  [
    "Strategy & Direction",
    "We set priorities, channel mix, and a clear growth plan.",
  ],
  [
    "Execution & Optimization",
    "We launch, test, and scale what earns its budget.",
  ],
  [
    "Reporting & Growth",
    "Clear reporting and concrete decisions on the next move.",
  ],
];

// Words you won't hear from us (not shown anywhere on this site).
export const NEVER = [
  "synergy",
  "disruptive",
  "360° solution",
  "growth hacking",
  "holistic approach",
  "omnichannel",
];

export const FAQ = [
  {
    q: "What types of businesses do you work with?",
    a: "From local companies to established brands, across any industry where clear marketing and real results matter.",
  },
  {
    q: "How long does it take to start?",
    a: "Usually 1 to 2 weeks from the first call, depending on scope and capacity.",
  },
  {
    q: "Ongoing marketing or one-time projects?",
    a: "Both, but we do our best work as an ongoing partner running the whole function.",
  },
  {
    q: "Do you offer contracts or long-term commitments?",
    a: "Flexible partnerships with a short initial commitment. We'd rather earn the renewal than lock you in.",
  },
  {
    q: "What services do you offer?",
    a: "Paid, web, SEO, social, and branding, run together as one system, not sold as separate line items.",
  },
];

export const CONTACT = {
  email: "hello@digitl.me",
  phone: "(+386) 41 962 522",
  tel: "+38641962522",
  // the client portal (digitl hub)
  hub: "https://hub.digitl.me/login",
  // the Serbian site
  sr: "https://www.digitl.rs",
};
