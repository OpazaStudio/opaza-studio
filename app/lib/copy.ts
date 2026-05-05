// Opaza Studio — bilingual copy (FR primary, EN translated).
// First-person / impersonal voice. Never "nous" / "we as a team".

export type Lang = "fr" | "en";

export type Copy = {
  nav: { services: string; methode: string; journal: string; apropos: string; cta: string };
  hero: {
    eyebrow: string;
    titles: Record<string, string[]>;
    sub: string;
    services: [string, string][];
    footL: string;
    footR: string;
  };
  services: {
    eyebrow: string;
    title: string;
    lede: string;
    items: { n: string; title: string; tag: string; body: string; deliverables: string[] }[];
  };
  methode: {
    eyebrow: string;
    title: string;
    lede: string;
    steps: { n: string; title: string; dur: string; body: string }[];
  };
  stack: {
    eyebrow: string;
    title: string;
    lede: string;
    primary: { name: string; role: string; v: string }[];
    secondary: string[];
    marquee: string[];
  };
  apropos: {
    eyebrow: string;
    title: string;
    bio: string[];
    facts: [string, string][];
    collabs: { title: string; list: [string, string][] };
    distinctions: { title: string; list: string[] };
  };
  journal: {
    eyebrow: string;
    title: string;
    lede: string;
    cta: string;
    backToIndex: string;
    publishedOn: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lede: string;
    cta: string;
    ctaSub: string;
    orForm: string;
    form: {
      name: string;
      email: string;
      project: string;
      budget: string;
      budgets: string[];
      send: string;
    };
    direct: string;
    hours: string;
  };
  footer: { sign: string; year: string; mention: string };
};

export const COPY: Record<Lang, Copy> = {
  fr: {
    nav: {
      services: "Services",
      methode: "Méthode",
      journal: "Journal",
      apropos: "À propos",
      cta: "Prendre rendez-vous",
    },
    hero: {
      eyebrow: "studio · la rochelle, france",
      titles: {
        "Pensé, conçu, livré.": ["Pensé,", "conçu,", "<em>livré.</em>"],
        "Sites & applications, de bout en bout.": ["Sites &", "applications,", "de bout", "<em>en bout.</em>"],
        "Du concept à la mise en ligne.": ["Du concept", "à la mise", "<em>en ligne.</em>"],
        "Un développeur. Un projet. Du début à la fin.": ["Un développeur.", "Un projet.", "<em>Du début à la fin.</em>"],
        "Studio indépendant de développement web et mobile.": ["Studio indépendant", "de développement", "<em>web et mobile.</em>"],
        "Des produits numériques qui tiennent la route.": ["Des produits", "numériques qui", "<em>tiennent la route.</em>"],
        "Web et mobile, faits sur mesure.": ["Web et mobile,", "<em>faits sur mesure.</em>"],
      },
      sub: "Conception, design et développement d'applications web et mobiles, du brief à la mise en ligne. Un seul interlocuteur — Ethan.",
      services: [
        ["01", "Applis mobiles"],
        ["02", "Sites web"],
        ["03", "Refonte & audit"],
        ["04", "SEO & performances"],
      ],
      footL: "2026 — disponible pour vos projets",
      footR: "fr / en",
    },
    services: {
      eyebrow: "ce que je fais",
      title: "Quatre offres,<br>une seule <em>signature</em>.",
      lede: "Du brief à la production, je travaille en bout-en-bout. Pas d'intermédiaires, pas de hand-off. Le code, le design et la conception sortent de la même tête.",
      items: [
        {
          n: "01",
          title: "Applis mobiles",
          tag: "iOS · Android · Expo",
          body: "Des applications natives en React Native / Expo, pensées pour la performance et la maintenabilité. Mise en ligne sur App Store et Play Store comprise — je gère les certificats, les builds et les versions.",
          deliverables: ["Build iOS + Android", "Stores & TestFlight", "Push & analytics"],
        },
        {
          n: "02",
          title: "Sites web",
          tag: "Next.js · Laravel · sur-mesure",
          body: "Sites vitrine, plateformes métier, espaces clients. Du Next.js côté front, du Laravel côté back quand le métier l'exige. Aucune solution toute faite — chaque ligne est écrite pour le projet.",
          deliverables: ["Architecture sur-mesure", "Back-office si besoin", "Hébergement & CI/CD"],
        },
        {
          n: "03",
          title: "Refonte & audit",
          tag: "Modernisation · Dette technique",
          body: "Une appli qui rame, un code qui fait peur, une équipe qui n'arrive plus à livrer ? J'audite, je documente, et je propose un chemin de modernisation par étapes — sans tout casser.",
          deliverables: ["Audit technique écrit", "Plan de remédiation", "Refonte progressive"],
        },
        {
          n: "04",
          title: "SEO & performances",
          tag: "Core Web Vitals · SEO technique",
          body: "Lighthouse 95+, Core Web Vitals au vert, indexation propre, schema.org. L'optimisation, c'est du code et de la rigueur, pas une potion magique. Résultats mesurés, jamais promis.",
          deliverables: ["Audit Lighthouse", "Refonte des perfs", "SEO technique on-page"],
        },
      ],
    },
    methode: {
      eyebrow: "comment je travaille",
      title: "Cinq étapes,<br>aucune <em>improvisation</em>.",
      lede: "Une méthode, ce n'est pas un PowerPoint d'agence. C'est une discipline qui évite les mauvaises surprises et qui rend chaque livraison prévisible.",
      steps: [
        { n: "01", title: "Cadrage", dur: "1 — 2 sem.", body: "On commence par comprendre le besoin réel, pas la liste de fonctionnalités. Périmètre, contraintes, hypothèses risquées. Si on doit dire non à quelque chose, c'est maintenant." },
        { n: "02", title: "Conception", dur: "1 — 3 sem.", body: "Architecture technique, parcours utilisateur, modèle de données. Les décisions structurantes sont prises ici, par écrit, pour ne plus avoir à y revenir pendant la production." },
        { n: "03", title: "Design", dur: "2 — 4 sem.", body: "Charte, prototypes interactifs, system de composants. Le design n'est jamais découplé du code : ce qui est dessiné est tenu de fonctionner techniquement et esthétiquement." },
        { n: "04", title: "Développement itératif", dur: "4 — 12 sem.", body: "Sprints courts, livraisons régulières sur environnement de recette, QA continue. Vous voyez le projet grandir chaque semaine — pas de boîte noire, pas de big-bang final." },
        { n: "05", title: "Livraison accompagnée", dur: "1 — 2 sem.", body: "Mise en production, formation à la prise en main, documentation écrite. Vous repartez autonome, avec un projet maintenable et une connaissance du code qui vous appartient." },
      ],
    },
    stack: {
      eyebrow: "outils du quotidien",
      title: "Une stack <em>resserrée</em>,<br>maîtrisée à fond.",
      lede: "Pas de mode du mois. Trois piliers, choisis pour leur stabilité et leur écosystème. Hébergement et services européens privilégiés — Infomaniak en tête.",
      primary: [
        { name: "Laravel", role: "back-end, API, métier complexe", v: "v13" },
        { name: "Next.js", role: "front-end web, App Router", v: "v16" },
        { name: "Expo", role: "mobile iOS / Android, OTA updates", v: "SDK 55" },
      ],
      secondary: ["MySQL", "PostgreSQL", "Tailwind", "FilamentPHP", "Pest", "Storybook", "Stripe", "Redis", "Infomaniak", "Vercel", "GitHub Actions"],
      marquee: ["Laravel", "Next.js", "Expo", "TypeScript", "Tailwind", "PostgreSQL", "FilamentPHP", "Stripe", "Pest", "Storybook", "Infomaniak"],
    },
    apropos: {
      eyebrow: "à propos",
      title: "Ethan,<br><em>développeur fullstack.</em>",
      bio: [
        "Bac+5 en développement web. Alternance à 3Codes, où je tourne sur des projets web et mobile à fortes contraintes — délais courts, qualité non-négociable. En parallèle, je porte Opaza, mon studio, pour les missions que je choisis.",
        "Le combo agence + freelance, c'est ma vraie force : un regard méthodique sur la livraison, et la souplesse de l'indépendant. Vous avez un seul interlocuteur, mais l'exigence d'une équipe.",
      ],
      facts: [
        ["Localisation", "La Rochelle, FR"],
        ["Statut", "Indépendant, marque Opaza"],
        ["Hébergement", "Infomaniak (CH/UE), souveraineté européenne"],
        ["Langues", "Français, English"],
      ],
      collabs: {
        title: "Quelques collaborations",
        list: [
          ["FIM EWC", "Plateformes événementiel sport live"],
          ["FIM SGP", "Outils de production temps réel"],
          ["UCI Mountain Bike", "Diffusion & data live"],
          ["3Codes", "CDI · projets clients agence"],
        ],
      },
      distinctions: {
        title: "Ce qui me distingue",
        list: [
          "Un seul interlocuteur, du concept au déploiement",
          "Combo agence + freelance, double regard sur les projets",
          "Expérience sport / événementiel haute exigence",
          "Maîtrise du workflow IA-augmenté (Claude Code, MCP)",
        ],
      },
    },
    journal: {
      eyebrow: "journal",
      title: "Notes <em>de production</em>.",
      lede: "Retours d'expérience, choix techniques argumentés, et quelques opinions tranchées. Mises à jour irrégulières — quand j'ai vraiment quelque chose à dire.",
      cta: "Lire tous les articles",
      backToIndex: "← Tous les articles",
      publishedOn: "Publié le",
    },
    contact: {
      eyebrow: "travailler ensemble",
      title: "Un projet <em>en tête</em> ?",
      lede: "Le plus rapide, c'est un appel de 30 minutes. On voit si le projet a du sens, et si oui, comment on l'attaque.",
      cta: "Réserver un créneau",
      ctaSub: "via Calendly · 30 min · gratuit",
      orForm: "Ou écrivez-moi directement",
      form: {
        name: "Votre nom",
        email: "Adresse email",
        project: "Le projet, en quelques lignes",
        budget: "Budget indicatif (optionnel)",
        budgets: ["< 10 k€", "10 — 25 k€", "25 — 50 k€", "50 k€ +", "À discuter"],
        send: "Envoyer",
      },
      direct: "ethan@opaza.studio",
      hours: "Réponse sous 24h ouvrées · CET",
    },
    footer: {
      sign: "Opaza Studio · La Rochelle, France",
      year: "© 2026 — Tous droits réservés",
      mention: "Site conçu et développé par Ethan, sans gabarit.",
    },
  },

  en: {
    nav: {
      services: "Services",
      methode: "Method",
      journal: "Journal",
      apropos: "About",
      cta: "Book a call",
    },
    hero: {
      eyebrow: "studio · la rochelle, france",
      titles: {
        "Pensé, conçu, livré.": ["Designed,", "built,", "<em>shipped.</em>"],
        "Sites & applications, de bout en bout.": ["Sites &", "applications,", "<em>end-to-end.</em>"],
        "Du concept à la mise en ligne.": ["From concept", "<em>to launch.</em>"],
        "Un développeur. Un projet. Du début à la fin.": ["One developer.", "One project.", "<em>Start to finish.</em>"],
        "Studio indépendant de développement web et mobile.": ["Independent studio", "for web & mobile", "<em>development.</em>"],
        "Des produits numériques qui tiennent la route.": ["Digital products", "<em>built to last.</em>"],
        "Web et mobile, faits sur mesure.": ["Web and mobile,", "<em>tailor-made.</em>"],
      },
      sub: "Strategy, design and development of web and mobile products, from brief to launch. A single point of contact — Ethan.",
      services: [
        ["01", "Mobile apps"],
        ["02", "Websites"],
        ["03", "Rebuilds & audits"],
        ["04", "SEO & performance"],
      ],
      footL: "2026 — booking new projects",
      footR: "fr / en",
    },
    services: {
      eyebrow: "what i do",
      title: "Four offerings,<br>one <em>signature</em>.",
      lede: "Brief through ship, end-to-end. No hand-offs, no middlemen. Code, design and strategy come out of the same head.",
      items: [
        {
          n: "01",
          title: "Mobile apps",
          tag: "iOS · Android · Expo",
          body: "Native apps in React Native / Expo, built for performance and maintainability. Store delivery included — I handle certs, builds and releases.",
          deliverables: ["iOS + Android build", "Stores & TestFlight", "Push & analytics"],
        },
        {
          n: "02",
          title: "Websites",
          tag: "Next.js · Laravel · custom",
          body: "Marketing sites, business platforms, customer portals. Next.js on the front, Laravel on the back when the domain calls for it. Nothing off-the-shelf.",
          deliverables: ["Custom architecture", "Back-office if needed", "Hosting & CI/CD"],
        },
        {
          n: "03",
          title: "Rebuilds & audits",
          tag: "Modernisation · Tech debt",
          body: "Slow app, scary codebase, team that can't ship anymore? I audit, document, and propose a stepwise modernisation path — without breaking everything.",
          deliverables: ["Written tech audit", "Remediation plan", "Progressive rebuild"],
        },
        {
          n: "04",
          title: "SEO & performance",
          tag: "Core Web Vitals · technical SEO",
          body: "Lighthouse 95+, Core Web Vitals in the green, clean indexing, schema.org. Optimisation is code and discipline, not a magic spell. Measured, never promised.",
          deliverables: ["Lighthouse audit", "Perf rebuild", "Technical on-page SEO"],
        },
      ],
    },
    methode: {
      eyebrow: "how i work",
      title: "Five stages,<br>no <em>improvisation</em>.",
      lede: "A method isn't an agency slide deck. It's a discipline that prevents bad surprises and makes every delivery predictable.",
      steps: [
        { n: "01", title: "Framing", dur: "1 — 2 wks", body: "We start with the real need, not a feature list. Scope, constraints, risky assumptions. If anything has to be said no to, it happens now." },
        { n: "02", title: "Architecture", dur: "1 — 3 wks", body: "Technical architecture, user flows, data model. Structural decisions get made and written down — so we don't revisit them mid-build." },
        { n: "03", title: "Design", dur: "2 — 4 wks", body: "Visual identity, interactive prototypes, component system. Design is never decoupled from code — what gets drawn must work technically and aesthetically." },
        { n: "04", title: "Iterative build", dur: "4 — 12 wks", body: "Short sprints, regular releases on a staging environment, continuous QA. You see the project grow each week — no black box, no final big-bang." },
        { n: "05", title: "Guided launch", dur: "1 — 2 wks", body: "Production deployment, hands-on training, written documentation. You leave autonomous, with a maintainable project and codebase knowledge that's yours." },
      ],
    },
    stack: {
      eyebrow: "daily tools",
      title: "A <em>tight</em> stack,<br>mastered deeply.",
      lede: "No flavour-of-the-month. Three pillars, picked for stability and ecosystem.",
      primary: [
        { name: "Laravel", role: "back-end, APIs, complex domains", v: "v13" },
        { name: "Next.js", role: "web front-end, App Router", v: "v16" },
        { name: "Expo", role: "mobile iOS / Android, OTA updates", v: "SDK 55" },
      ],
      secondary: ["MySQL", "PostgreSQL", "Tailwind", "FilamentPHP", "Pest", "Storybook", "Stripe", "Redis", "Infomaniak", "Vercel", "GitHub Actions"],
      marquee: ["Laravel", "Next.js", "Expo", "TypeScript", "Tailwind", "PostgreSQL", "FilamentPHP", "Stripe", "Pest", "Storybook", "Infomaniak"],
    },
    apropos: {
      eyebrow: "about",
      title: "Ethan,<br><em>fullstack developer.</em>",
      bio: [
        "Master's in web development. Apprenticeship then full-time at 3Codes, working on web and mobile projects with tight deadlines and non-negotiable quality. Alongside, I run Opaza — my studio, for the missions I pick.",
        "The agency-plus-freelance combo is the real edge: methodical delivery instincts with the agility of an independent. One contact, the rigour of a team.",
      ],
      facts: [
        ["Location", "La Rochelle, FR"],
        ["Status", "Independent, Opaza brand"],
        ["Hosting", "Infomaniak (CH/EU), European sovereignty"],
        ["Languages", "Français, English"],
      ],
      collabs: {
        title: "Selected collaborations",
        list: [
          ["FIM EWC", "Live event sport platforms"],
          ["FIM SGP", "Real-time production tools"],
          ["UCI Mountain Bike", "Live broadcast & data"],
          ["3Codes", "Full-time · agency client work"],
        ],
      },
      distinctions: {
        title: "What sets me apart",
        list: [
          "A single point of contact, concept to deployment",
          "Agency + freelance combo, dual perspective on every project",
          "High-stakes sport / event experience",
          "Mastery of AI-augmented workflow (Claude Code, MCP)",
        ],
      },
    },
    journal: {
      eyebrow: "journal",
      title: "Field <em>notes</em>.",
      lede: "Lessons learned, technical decisions argued out, and a few sharp opinions. Updates are irregular — only when there's something to actually say.",
      cta: "Read all articles",
      backToIndex: "← All articles",
      publishedOn: "Published on",
    },
    contact: {
      eyebrow: "working together",
      title: "Got a <em>project</em>?",
      lede: "Fastest path is a 30-minute call. We see if it makes sense, and if so, how to attack it.",
      cta: "Book a slot",
      ctaSub: "via Calendly · 30 min · free",
      orForm: "Or write to me directly",
      form: {
        name: "Your name",
        email: "Email address",
        project: "The project, in a few lines",
        budget: "Indicative budget (optional)",
        budgets: ["< 10 k€", "10 — 25 k€", "25 — 50 k€", "50 k€ +", "Let's discuss"],
        send: "Send",
      },
      direct: "ethan@opaza.studio",
      hours: "Reply within 24 business hours · CET",
    },
    footer: {
      sign: "Opaza Studio · La Rochelle, France",
      year: "© 2026 — All rights reserved",
      mention: "Designed and built by Ethan, no template.",
    },
  },
};

export const HERO_TITLE_KEY = "Pensé, conçu, livré.";

export const LOCALES = ["fr", "en"] as const satisfies readonly Lang[];
export const DEFAULT_LOCALE: Lang = "fr";

export function isLocale(value: string): value is Lang {
  return (LOCALES as readonly string[]).includes(value);
}
