/*
 * Editorial homepages for TCF Journal categories (/journal/category/<slug>).
 *
 * Each entry gives one category its own hero copy, SEO, sections and layout
 * personality; components/journal/CategoryHome.tsx (and NewsHome.tsx for
 * News) render them from live CMS articles. Categories without an entry here
 * fall back to the standard paginated listing.
 *
 * Topic sections pick articles from the category whose tags or headline match
 * one of `topics` (case-insensitive). Tag articles consistently in the CMS —
 * e.g. "AI tools", "Branding", "SEO" — and they land in the right section.
 * A section with no matching articles is simply not shown.
 */

export type Personality = "ai" | "technology" | "design" | "marketing" | "business" | "news";

/** How the lead block is composed. */
export type LeadLayout =
  | "stack" // dominant story + 2–3 secondary stories stacked beside it
  | "banner" // full-width image banner, secondaries in a row below
  | "mosaic" // image-led: one tall feature + two image tiles
  | "split" // big headline-led split
  | "text"; // restrained, text-first

/** How a topic section lays out its stories. */
export type SectionLayout = "grid" | "duo" | "list" | "row";

export interface TopicSection {
  title: string;
  description: string;
  topics: string[];
  /** Also include articles from these categories (used by the News page). */
  categories?: string[];
  layout: SectionLayout;
}

export interface CategoryPage {
  slug: string;
  personality: Personality;
  seo: { title: string; description: string };
  /** H1, one entry per line. */
  heading: string[];
  intro: string[];
  secondary?: string;
  /** e.g. "THE AI EDIT" */
  editTitle: string;
  latestTitle: string;
  leadLayout: LeadLayout;
  sections: TopicSection[];
  /** Topics the Journal will cover, shown honestly while the category is empty. */
  ending: string[];
  /** Closing TCF call to action. */
  cta: { text: string; label: string; href: string };
}

export const categoryPages: Record<string, CategoryPage> = {
  ai: {
    slug: "ai",
    personality: "ai",
    seo: {
      title: "AI News, Tools & Insights | TCF Journal",
      description:
        "Explore artificial intelligence news, AI tools, generative technology, automation and practical insights for creatives, marketers and businesses from TCF Journal.",
    },
    heading: ["ARTIFICIAL", "INTELLIGENCE"],
    intro: ["The ideas, tools and technologies reshaping how we create, work and think."],
    secondary:
      "From generative AI and intelligent automation to emerging models and creative workflows, TCF Journal explores what artificial intelligence means beyond the hype.",
    editTitle: "THE AI EDIT",
    latestTitle: "LATEST IN AI",
    leadLayout: "stack",
    sections: [
      {
        title: "AI TOOLS & WORKFLOWS",
        description: "Tools worth knowing. Workflows worth trying.",
        topics: ["ai tools", "tools", "image generation", "video generation", "llm", "llms", "automation", "ai agents", "agents", "workflow", "workflows", "productivity"],
        layout: "grid",
      },
      {
        title: "GENERATIVE AI",
        description: "Tracking the rapidly changing world of machine-generated images, video, audio, code and ideas.",
        topics: ["generative ai", "generative", "genai", "text-to-image", "text-to-video", "diffusion", "ai video", "ai image", "ai audio", "ai music"],
        layout: "duo",
      },
      {
        title: "AI FOR CREATIVES",
        description: "How artificial intelligence is changing design, filmmaking, advertising, photography and content production.",
        topics: ["ai for creatives", "creatives", "design", "filmmaking", "film", "advertising", "photography", "content production", "agencies"],
        layout: "list",
      },
    ],
    ending: ["Machines can generate.", "Ideas still need direction."],
    cta: { text: "Exploring AI in your creative work? Talk to The Creative Factory.", label: "START A CONVERSATION", href: "/contact" },
  },

  technology: {
    slug: "technology",
    personality: "technology",
    seo: {
      title: "Technology, Innovation & Digital Culture | TCF Journal",
      description:
        "Technology news, emerging products, digital innovation, software and the ideas shaping our increasingly connected world.",
    },
    heading: ["TECHNOLOGY"],
    intro: ["The technology changing how we live, create and build."],
    secondary:
      "New platforms. New devices. New possibilities. We look beyond specifications to understand where technology is actually taking us.",
    editTitle: "THE TECH EDIT",
    latestTitle: "LATEST IN TECH",
    leadLayout: "banner",
    sections: [
      {
        title: "EMERGING TECH",
        description: "Ideas moving from experimental to inevitable.",
        topics: ["emerging tech", "robotics", "spatial computing", "ar", "vr", "ar/vr", "xr", "automation", "iot", "computing", "future interfaces", "hardware"],
        layout: "row",
      },
      {
        title: "DIGITAL LIFE",
        description: "The products, platforms and technologies becoming part of everyday life.",
        topics: ["digital life", "smartphones", "apps", "platforms", "smart home", "wearables", "consumer tech", "internet"],
        layout: "list",
      },
      {
        title: "CREATOR TECH",
        description: "Technology built for people who make things.",
        topics: ["creator tech", "cameras", "camera", "computers", "displays", "audio", "creative software", "production technology", "real-time rendering", "creator tools"],
        layout: "grid",
      },
    ],
    ending: ["Technology moves fast.", "Understanding where it's going matters more."],
    cta: { text: "Building with new technology? See what The Creative Factory makes.", label: "OUR SERVICES", href: "/services" },
  },

  design: {
    slug: "design",
    personality: "design",
    seo: {
      title: "Design, Branding & Creative Culture | TCF Journal",
      description:
        "Explore graphic design, branding, visual culture, digital experiences, typography and creative inspiration from TCF Journal.",
    },
    heading: ["DESIGN"],
    intro: ["Ideas made visible."],
    secondary: "We explore the identities, interfaces, images and creative decisions shaping contemporary visual culture.",
    editTitle: "THE DESIGN EDIT",
    latestTitle: "LATEST IN DESIGN",
    leadLayout: "mosaic",
    sections: [
      {
        title: "BRANDING",
        description: "More than a logo. The systems, ideas and decisions that turn businesses into recognizable brands.",
        topics: ["branding", "brand identity", "logo", "logo design", "rebranding", "rebrand", "packaging", "brand systems", "creative direction"],
        layout: "duo",
      },
      {
        title: "DIGITAL DESIGN",
        description: "Where visual thinking meets interaction.",
        topics: ["digital design", "web design", "ui", "ux", "ui/ux", "motion", "motion design", "3d", "interactive", "typography", "digital typography"],
        layout: "grid",
      },
      {
        title: "VISUAL CULTURE",
        description: "The aesthetics, movements and ideas influencing what the world looks like.",
        topics: ["visual culture", "trends", "design trends", "aesthetics", "art", "illustration", "culture"],
        layout: "duo",
      },
    ],
    ending: ["Good design gets noticed.", "Great design gets remembered."],
    cta: { text: "Need a brand people remember? See our design work.", label: "DESIGN SERVICES", href: "/services/design" },
  },

  marketing: {
    slug: "marketing",
    personality: "marketing",
    seo: {
      title: "Marketing, Advertising & Social Media Insights | TCF Journal",
      description:
        "Digital marketing, advertising, social media, content strategy, branding and practical growth insights for modern businesses.",
    },
    heading: ["MARKETING"],
    intro: ["Attention is everywhere.", "Getting it is the hard part."],
    secondary: "Strategies, campaigns and ideas for brands trying to matter in an increasingly crowded digital world.",
    editTitle: "THE MARKETING EDIT",
    latestTitle: "LATEST IN MARKETING",
    leadLayout: "split",
    sections: [
      {
        title: "SOCIAL",
        description: "Platforms change. Human attention doesn't.",
        topics: ["social", "social media", "instagram", "tiktok", "facebook", "linkedin", "social strategy", "creators", "influencer marketing", "influencers", "algorithms"],
        layout: "row",
      },
      {
        title: "ADVERTISING",
        description: "Creative that earns attention instead of demanding it.",
        topics: ["advertising", "ads", "campaigns", "creative advertising", "digital ads", "video advertising", "performance creative", "media"],
        layout: "duo",
      },
      {
        title: "SEO & CONTENT",
        description: "Being discoverable is part of being relevant.",
        topics: ["seo", "google", "content marketing", "content", "search", "search strategy", "website optimization", "organic growth"],
        layout: "list",
      },
      {
        title: "BRAND GROWTH",
        description: "Building audiences is easy to measure. Building brands is harder.",
        topics: ["brand growth", "brand building", "brand strategy", "growth", "audience"],
        layout: "grid",
      },
    ],
    ending: ["Don't just reach people.", "Give them something worth remembering."],
    cta: { text: "Want campaigns that perform? Talk to our marketing team.", label: "PERFORMANCE MARKETING", href: "/services/performance-marketing" },
  },

  business: {
    slug: "business",
    personality: "business",
    seo: {
      title: "Business, Entrepreneurship & Digital Growth | TCF Journal",
      description:
        "Ideas, strategies and perspectives on entrepreneurship, digital business, startups, leadership and building modern companies.",
    },
    heading: ["BUSINESS"],
    intro: ["Ideas are easy.", "Building something that lasts is harder."],
    secondary: "Entrepreneurship, strategy, technology and the decisions behind businesses trying to move forward.",
    editTitle: "THE BUSINESS EDIT",
    latestTitle: "LATEST IN BUSINESS",
    leadLayout: "text",
    sections: [
      {
        title: "ENTREPRENEURSHIP",
        description: "Starting is only the beginning.",
        topics: ["entrepreneurship", "startups", "startup", "founders", "small business", "small businesses", "business models"],
        layout: "list",
      },
      {
        title: "DIGITAL BUSINESS",
        description: "How technology is changing what businesses can become.",
        topics: ["digital business", "digital transformation", "e-commerce", "ecommerce", "automation", "ai for business", "online business", "saas"],
        layout: "grid",
      },
      {
        title: "GROWTH",
        description: "More customers isn't always the same as a better business.",
        topics: ["growth", "growth strategy", "customer acquisition", "operations", "scaling", "leadership"],
        layout: "list",
      },
      {
        title: "SRI LANKA",
        description: "Ideas, businesses and opportunities closer to home.",
        topics: ["sri lanka", "sri lankan", "colombo"],
        layout: "duo",
      },
    ],
    ending: ["Build smarter.", "Grow deliberately."],
    cta: { text: "Growing a brand? See how The Creative Factory can help.", label: "OUR SERVICES", href: "/services" },
  },

  news: {
    slug: "news",
    personality: "news",
    seo: {
      title: "Latest Creative, Technology & Digital News | TCF Journal",
      description:
        "Latest news covering artificial intelligence, technology, design, marketing, business and the creative industries from TCF Journal.",
    },
    heading: ["NEWS"],
    intro: ["What's happening.", "And why it matters."],
    editTitle: "LATEST",
    latestTitle: "JUST IN",
    leadLayout: "stack",
    sections: [
      {
        title: "AI & TECH",
        description: "",
        topics: ["ai", "artificial intelligence", "technology", "tech", "software", "hardware"],
        categories: ["ai", "technology"],
        layout: "row",
      },
      {
        title: "CREATIVE INDUSTRIES",
        description: "",
        topics: ["design", "advertising", "film", "production", "media", "creative technology", "creative", "photography", "animation"],
        categories: ["design", "creative"],
        layout: "row",
      },
      {
        title: "BUSINESS",
        description: "",
        topics: ["business", "digital economy", "economy", "startups", "marketing"],
        categories: ["business", "marketing"],
        layout: "row",
      },
    ],
    ending: ["Stay curious.", "Stay informed."],
    cta: { text: "Get TCF Journal news as it's published.", label: "RSS FEED", href: "/journal/rss.xml" },
  },
};

export function getCategoryPage(slug: string): CategoryPage | undefined {
  return categoryPages[slug];
}

/** Does an article belong in a topic section? Category list, exact tags, or whole words in the headline. */
export function matchesSection(
  article: { tags: string[]; title: string; category: { slug: string } },
  section: Pick<TopicSection, "topics" | "categories">,
): boolean {
  if (section.categories?.includes(article.category.slug)) return true;
  const tags = article.tags.map((tag) => tag.toLowerCase().trim());
  const title = ` ${article.title.toLowerCase().replace(/[^a-z0-9/+-]+/g, " ")} `;
  return section.topics.some((topic) => tags.includes(topic) || title.includes(` ${topic} `));
}
