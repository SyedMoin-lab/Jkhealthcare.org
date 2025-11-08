import { fetchStrapi, resolveStrapiAssetUrl } from "./strapi";

type Nullable<T> = T | null | undefined;

type StrapiStatEntry = {
  id?: number;
  __component?: string;
  label?: string | null;
  value?: number | string | null;
  attributes?: {
    label?: string | null;
    value?: number | string | null;
  } | null;
};

type StrapiFaqEntry = {
  id?: number;
  __component?: string;
  question?: string | null;
  answer?: string | null;
  attributes?: {
    question?: string | null;
    answer?: string | null;
  } | null;
};

type StrapiMediaItem = {
  id?: number;
  documentId?: string;
  url?: string | null;
  alternativeText?: string | null;
  attributes?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
};

type StrapiMediaField =
  | {
      data?: StrapiMediaItem[] | null;
    }
  | StrapiMediaItem[]
  | null;

type StrapiFeatureCard = {
  id?: number;
  title?: string | null;
  description?: string | null;
  attributes?: {
    title?: string | null;
    description?: string | null;
  } | null;
};

type StrapiPricingPlanFeature = {
  id?: number;
  text?: string | null;
  attributes?: {
    text?: string | null;
  } | null;
};

type StrapiPricingPlan = {
  id?: number;
  name?: string | null;
  price_display?: string | null;
  billing_period?: string | null;
  description?: string | null;
  button_label?: string | null;
  button_variant?: string | null;
  badge_label?: string | null;
  is_popular?: boolean | null;
  features?: StrapiPricingPlanFeature[] | null;
  attributes?: {
    name?: string | null;
    price_display?: string | null;
    billing_period?: string | null;
    description?: string | null;
    button_label?: string | null;
    button_variant?: string | null;
    badge_label?: string | null;
    is_popular?: boolean | null;
    features?: StrapiPricingPlanFeature[] | null;
  } | null;
};

type StrapiAiTextItem = {
  id?: number;
  value?: string | null;
  attributes?: {
    value?: string | null;
  } | null;
};

type StrapiAiTimelineEntry = {
  id?: number;
  year?: string | null;
  event?: string | null;
  attributes?: {
    year?: string | null;
    event?: string | null;
  } | null;
};

type StrapiAiMetric = {
  id?: number;
  label?: string | null;
  value?: string | null;
  suffix?: string | null;
  color?: string | null;
  attributes?: {
    label?: string | null;
    value?: string | null;
    suffix?: string | null;
    color?: string | null;
  } | null;
};

type StrapiAiStatistic = {
  id?: number;
  label?: string | null;
  start?: number | null;
  end?: number | null;
  suffix?: string | null;
  attributes?: {
    label?: string | null;
    start?: number | null;
    end?: number | null;
    suffix?: string | null;
  } | null;
};

type StrapiAiCard = {
  id?: number;
  identifier?: string | null;
  title?: string | null;
  description?: string | null;
  feature?: string | null;
  size?: string | null;
  class_name?: string | null;
  href?: string | null;
  show_icons?: boolean | null;
  spotlight_items?: StrapiAiTextItem[] | null;
  timeline?: StrapiAiTimelineEntry[] | null;
  metrics?: StrapiAiMetric[] | null;
  statistic?: StrapiAiStatistic | null;
  typing_text?: string | null;
  attributes?: {
    identifier?: string | null;
    title?: string | null;
    description?: string | null;
    feature?: string | null;
    size?: string | null;
    class_name?: string | null;
    href?: string | null;
    show_icons?: boolean | null;
    spotlight_items?: StrapiAiTextItem[] | null;
    timeline?: StrapiAiTimelineEntry[] | null;
    metrics?: StrapiAiMetric[] | null;
    statistic?: StrapiAiStatistic | null;
    typing_text?: string | null;
  } | null;
};

type StrapiSingleTypeDocument<
  TAttributes extends Record<string, unknown>,
> = {
  id?: number;
  documentId?: string;
  attributes?: TAttributes | null;
} & Partial<TAttributes>;

type StrapiSingleTypeResponse<
  TAttributes extends Record<string, unknown>,
> = {
  data?: StrapiSingleTypeDocument<TAttributes> | null;
};

interface StrapiHomeHeroAttributes {
  hero_badge_label?: string | null;
  hero_heading_lead?: string | null;
  hero_heading_highlight?: string | null;
  hero_heading_tail?: string | null;
  hero_subtitle?: string | null;
  hero_primary_cta_label?: string | null;
  hero_secondary_cta_label?: string | null;
  hero_offer_hospital?: string | null;
  hero_offer_phone?: string | null;
  hero_offer_discount?: string | null;
  hero_offer_price?: string | null;
  hero_offer_highlight_one_label?: string | null;
  hero_offer_highlight_one_value?: string | null;
  hero_offer_highlight_two_label?: string | null;
  hero_offer_highlight_two_value?: string | null;
  hero_stats?: StrapiStatEntry[] | null;
  hero_testimonial_rating?: string | null;
  hero_testimonial_subtitle?: string | null;
  hero_testimonial_highlight?: string | null;
  hero_testimonial_avatars?: StrapiMediaField | null;
  daily_offer_cards?: StrapiDailyOfferCard[] | null;
}

type StrapiDailyOfferCard = {
  id?: number;
  badge_label?: string | null;
  category_label?: string | null;
  name?: string | null;
  location?: string | null;
  contact_number?: string | null;
  rating?: number | string | null;
  offer_text?: string | null;
  package_text?: string | null;
  services?: string | null;
  accent_color?: string | null;
};

interface StrapiHomeFaqAttributes {
  faq_badge?: string | null;
  faq_heading?: string | null;
  faq_description?: string | null;
  faq_items?: StrapiFaqEntry[] | null;
}

interface StrapiHomeCtaAttributes {
  cta_heading?: string | null;
  cta_description?: string | null;
  cta_primary_label?: string | null;
  cta_secondary_label?: string | null;
  cta_secondary_tooltip?: string | null;
  cta_secondary_message?: string | null;
}

interface StrapiHomeFeaturesAttributes {
  features_badge?: string | null;
  features_heading_primary?: string | null;
  features_heading_secondary?: string | null;
  features_description?: string | null;
  features_cards?: StrapiFeatureCard[] | null;
  features_footer_heading?: string | null;
  features_footer_description?: string | null;
}

interface StrapiHomePricingAttributes {
  pricing_badge_label?: string | null;
  pricing_heading_primary?: string | null;
  pricing_heading_secondary?: string | null;
  pricing_description?: string | null;
  pricing_plans?: StrapiPricingPlan[] | null;
}

interface StrapiHomeAiAttributes {
  ai_badge_label?: string | null;
  ai_heading_primary?: string | null;
  ai_heading_secondary?: string | null;
  ai_description?: string | null;
  ai_cards?: StrapiAiCard[] | null;
  ai_voice_title?: string | null;
  ai_voice_description?: string | null;
}

type StrapiHomeHeroResponse =
  StrapiSingleTypeResponse<StrapiHomeHeroAttributes>;
type StrapiHomeFaqResponse = StrapiSingleTypeResponse<StrapiHomeFaqAttributes>;
type StrapiHomeCtaResponse = StrapiSingleTypeResponse<StrapiHomeCtaAttributes>;
type StrapiHomeFeaturesResponse =
  StrapiSingleTypeResponse<StrapiHomeFeaturesAttributes>;
type StrapiHomePricingResponse =
  StrapiSingleTypeResponse<StrapiHomePricingAttributes>;
type StrapiHomeAiResponse = StrapiSingleTypeResponse<StrapiHomeAiAttributes>;
export type HeroStat = {
  label: string;
  value: number;
};

export type HeroAvatar = {
  src: string;
  alt: string;
};

export type DailyOfferCard = {
  id: number;
  badge: string;
  name: string;
  category?: string;
  location?: string;
  contactNumber?: string;
  rating?: number;
  offerText?: string;
  packageText?: string;
  services: string[];
  accent?: string;
};

export type HeroContent = {
  badgeLabel: string;
  title: {
    lead: string;
    highlight: string;
    tail: string;
  };
  subtitle: string;
  ctas: {
    primary: {
      label: string;
    };
    secondary: {
      label: string;
    };
  };
  dailyOffer: {
    hospitalName: string;
    contactNumber: string;
    discount: string;
    price: string;
    highlights: Array<{
      label: string;
      value: string;
    }>;
  };
  dailyOfferCards: DailyOfferCard[];
  stats: HeroStat[];
  testimonial: {
    rating: string;
    subtitle: string;
    highlight: string;
    avatars: HeroAvatar[];
  };
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = {
  badge: string;
  heading: string;
  description: string;
  items: FaqItem[];
};

export type CtaContent = {
  heading: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  secondaryTooltip: string;
  secondaryMessage: string;
};

export type FeatureCard = {
  title: string;
  description: string;
};

export type FeaturesContent = {
  badge: string;
  headingPrimary: string;
  headingSecondary: string;
  description: string;
  cards: FeatureCard[];
  footerHeading: string;
  footerDescription: string;
};

export type PricingPlanButtonVariant = "primary" | "muted" | "outline";

export type PricingPlan = {
  name: string;
  price: string;
  billingPeriod: string;
  description: string;
  buttonLabel: string;
  buttonVariant: PricingPlanButtonVariant;
  badgeLabel?: string;
  isPopular: boolean;
  features: string[];
};

export type PricingContent = {
  badge: string;
  headingPrimary: string;
  headingSecondary: string;
  description: string;
  plans: PricingPlan[];
};

export type AiFeatureType =
  | "spotlight"
  | "counter"
  | "timeline"
  | "icons"
  | "typing"
  | "metrics"
  | "none";

export type AiTimelineEntry = {
  year: string;
  event: string;
};

export type AiMetric = {
  label: string;
  value: number;
  suffix?: string;
  color?: string;
};

export type AiStatistic = {
  label: string;
  start: number;
  end: number;
  suffix?: string;
};

export type AiCard = {
  identifier: string;
  title: string;
  description: string;
  feature: AiFeatureType;
  size: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  icons?: boolean;
  spotlightItems?: string[];
  timeline?: AiTimelineEntry[];
  metrics?: AiMetric[];
  statistic?: AiStatistic;
  typingText?: string;
};

export type AiContent = {
  badge: string;
  headingPrimary: string;
  headingSecondary: string;
  description: string;
  cards: AiCard[];
  voiceAssistant: {
    title: string;
    description: string;
  };
};

export type HomeContent = {
  hero: HeroContent;
  faq: FaqContent;
  cta: CtaContent;
  features: FeaturesContent;
  pricing: PricingContent;
  ai: AiContent;
};

export const defaultHeroContent: HeroContent = {
  badgeLabel: "AI-Powered Healthcare Center",
  title: {
    lead: "Revolutionizing",
    highlight: "Healthcare in Kashmir",
    tail: "with AI Technology",
  },
  subtitle:
    "Experience the future of healthcare with our AI-powered voice assistant. Talk directly to our intelligent voice assistant on the website, get instant medical guidance, symptom analysis, and connect with top specialists across Kashmir - available 24/7 in Urdu and English.",
  ctas: {
    primary: {
      label: "Call AI Health Assistant",
    },
    secondary: {
      label: "Try Voice Consultation",
    },
  },
  dailyOffer: {
    hospitalName: "Valley Care Hospital",
    contactNumber: "+91 70000 00000",
    discount: "15% off diagnostics today",
    price: "INR 2,499 health check bundle",
    highlights: [
      { label: "Availability", value: "24/7 emergency desk" },
      { label: "Includes", value: "Doctor consult + lab reports" },
    ],
  },
  dailyOfferCards: [
    {
      id: 1,
      badge: "Partner Hospital",
      category: "Hospitals",
      name: "Valley Care Hospital",
      location: "Srinagar City Centre",
      contactNumber: "+91 70000 00000",
      rating: 4.9,
      offerText: "15% off diagnostics today",
      packageText: "INR 2,499 health check bundle",
      services: ["24/7 emergency desk", "Doctor consult + lab reports"],
      accent: "#7dd3fc",
    },
    {
      id: 2,
      badge: "AI Voice Desk",
      category: "AI Assistant",
      name: "AI Health Assistant • Kashmir",
      location: "Available in every district",
      contactNumber: "+91 70000 21111",
      rating: 5,
      offerText: "Free AI triage today",
      packageText: "Connect in under 2 mins",
      services: ["24/7 voice assistant", "Emergency escalation"],
      accent: "#f472b6",
    },
    {
      id: 3,
      badge: "Diagnostics",
      category: "Lab Network",
      name: "Valley Diagnostics Express",
      location: "Srinagar • Baramulla",
      contactNumber: "+91 70000 33110",
      rating: 4.8,
      offerText: "20% off MRI & CT today",
      packageText: "Reports under 6 hrs",
      services: ["Home sample pickup", "Doctor verified results"],
      accent: "#60a5fa",
    },
    {
      id: 4,
      badge: "Emergency Fast Track",
      category: "Critical Care",
      name: "Critical Care Hotline",
      location: "Valley-wide coverage",
      contactNumber: "+91 70000 99000",
      rating: 4.7,
      offerText: "Priority admission support",
      packageText: "Response in 60 seconds",
      services: ["11 districts coverage", "Live bed availability"],
      accent: "#fbbf24",
    },
  ],
  stats: [
    { label: "Doctors", value: 120 },
    { label: "Health Centers", value: 35 },
    { label: "Labs", value: 18 },
    { label: "Minutes Consulted", value: 50000 },
    { label: "Patients Helped", value: 8000 },
  ],
  testimonial: {
    rating: "4.9/5",
    subtitle: "Trusted by",
    highlight: "5,000+ Kashmir residents",
    avatars: [
      {
        src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        alt: "Aisha Khan",
      },
      {
        src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
        alt: "Ahmed Sheikh",
      },
      {
        src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
        alt: "Fatima Mir",
      },
      {
        src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face",
        alt: "Mohammad Bhat",
      },
      {
        src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop&crop=face",
        alt: "Zara Lone",
      },
    ],
  },
};

export const defaultFaqContent: FaqContent = {
  badge: "FAQ",
  heading: "Frequently Asked Questions",
  description:
    "Get answers to common questions about our AI-powered healthcare platform and services.",
  items: [
    {
      question: "How does the AI health assistant work for Kashmir residents?",
      answer:
        "Our AI health assistant is specifically designed for Kashmir, supporting Urdu and English languages. It uses advanced machine learning to analyze symptoms, understand local health concerns, and connect you with appropriate healthcare providers across all districts of Kashmir. Simply call +91-700-AI-HEALTH and speak naturally about your health concerns.",
    },
    {
      question: "Is my health information secure and private?",
      answer:
        "Absolutely. We maintain the highest standards of data security and patient privacy, exceeding Indian healthcare data protection requirements. All your health information is encrypted and stored securely. We never share your personal data without your explicit consent, and our platform is regularly audited for security compliance.",
    },
    {
      question: "How accurate is the AI in diagnosing health issues?",
      answer:
        "Our AI system has a 99.2% accuracy rate in preliminary health assessments and symptom analysis. It's trained on extensive medical data including Kashmir-specific health conditions and patterns. However, our AI provides guidance and recommendations; it doesn't replace professional medical diagnosis. Always consult with healthcare providers for final medical decisions.",
    },
    {
      question:
        "Can I book appointments with doctors in Kashmir through the platform?",
      answer:
        "Yes! Our platform connects you with 500+ healthcare providers across all districts of Kashmir, including SKIMS, AIIMS, GMC Srinagar, and local clinics. You can book appointments directly, see real-time availability, and receive instant confirmations. We've reduced average appointment wait times by 70% compared to traditional booking methods.",
    },
    {
      question:
        "What healthcare services are available in Kashmir through your platform?",
      answer:
        "We partner with healthcare providers across all specialties including cardiology, dermatology, mental health, pediatrics, gynecology, and emergency care. Our network covers Srinagar, Anantnag, Baramulla, and remote areas of Kashmir. We also provide telemedicine services for consultations when physical visits are challenging due to weather or distance.",
    },
    {
      question: "How much does it cost to use the AI health assistant?",
      answer:
        "Our basic AI health guidance and doctor matching services are free. We offer affordable premium plans starting at Rs. 1,299 per month for advanced AI consultations and priority booking. We believe quality healthcare should be accessible to everyone in Kashmir, regardless of their financial situation.",
    },
    {
      question: "Can I use this for emergency medical situations in Kashmir?",
      answer:
        "Our AI can provide immediate health guidance and first-aid instructions during emergencies, but it should never replace emergency medical care. For life-threatening emergencies, always call 108 (ambulance) or go to the nearest emergency room immediately. Our AI is designed for non-emergency health questions and routine care coordination.",
    },
    {
      question: "How do I get started with the AI health assistant?",
      answer:
        "Getting started is simple! Call our AI Health Assistant at +91-700-AI-HEALTH and speak in your preferred language (Urdu or English). Our AI will guide you through creating your health profile, understanding your needs, and connecting you with the right healthcare providers in Kashmir. No app download required - just call and start talking!",
    },
  ],
};

export const defaultCtaContent: CtaContent = {
  heading: "Ready to Transform Healthcare in Kashmir?",
  description:
    "Join over 5,000 Kashmir residents who trust our AI-powered platform for smarter, faster, and more accessible healthcare solutions. Experience healthcare in your language, available 24/7 across all districts.",
  primaryLabel: "Call AI Health Assistant",
  secondaryLabel: "Download App",
  secondaryTooltip: "Coming soon",
  secondaryMessage:
    "Download the jkhealthcare.org App to access on-the-go health monitoring, offline health records for Kashmir, emergency features with local contacts, Kashmir-specific health tips, and multi-language support.\n\nComing soon to the Play Store and App Store!",
};
export const defaultFeaturesContent: FeaturesContent = {
  badge: "AI-Powered Healthcare",
  headingPrimary: "Revolutionary Healthcare",
  headingSecondary: "for Kashmir Valley",
  description:
    "Experience the future of healthcare with our AI-powered voice assistant. Get instant medical guidance, connect with top specialists, and access world-class healthcare services across all districts of Kashmir - available 24/7 in your preferred language.",
  cards: [
    {
      title: "AI Voice Health Assistant",
      description:
        "Speak naturally in Urdu and English about your health concerns. Our advanced AI understands symptoms, provides instant guidance, and connects you with the right specialists across Kashmir with 99.2% accuracy.",
    },
    {
      title: "24/7 Emergency Health Support",
      description:
        "Get immediate health guidance during emergencies. Our AI can assess urgent symptoms, provide first-aid instructions, and direct you to the nearest emergency care facility in Kashmir, available round the clock.",
    },
    {
      title: "Kashmir Healthcare Network",
      description:
        "Connect with 500+ healthcare providers across all districts of Kashmir including Srinagar, Anantnag, Baramulla, and remote areas. From SKIMS to local clinics, we ensure quality care reaches every corner of the valley.",
    },
    {
      title: "Multi-Language Health Records",
      description:
        "Maintain your health records in your preferred language. Our AI translates medical information between Urdu and English, ensuring clear communication with healthcare providers and better treatment outcomes.",
    },
    {
      title: "Instant Specialist Booking",
      description:
        "Book appointments with top specialists in Kashmir within minutes. Our AI matches you with the right doctor based on your symptoms, location, and preferences, reducing wait times by 70% compared to traditional methods.",
    },
    {
      title: "Telemedicine Integration",
      description:
        "Access virtual consultations with Kashmir's leading doctors from the comfort of your home. Our platform supports video calls, prescription management, and follow-up care, especially valuable during harsh weather conditions.",
    },
  ],
  footerHeading: "Built for Kashmir. Powered by AI.",
  footerDescription:
    "jkhealthcare.org revolutionizes healthcare access in Kashmir with AI-powered voice technology. Every feature is designed to overcome geographical barriers, language challenges, and accessibility issues unique to the Kashmir Valley, ensuring quality healthcare reaches every resident, everywhere.",
};

export const defaultPricingContent: PricingContent = {
  badge: "Simple Pricing",
  headingPrimary: "Choose your",
  headingSecondary: "AI healthcare plan",
  description:
    "Access AI-powered healthcare services designed for Kashmir. Get instant health guidance, connect with specialists, and book appointments - all through our intelligent voice assistant.",
  plans: [
    {
      name: "Basic",
      price: "₹10",
      billingPeriod: "/month",
      description: "Essential AI health guidance",
      buttonLabel: "Get Started Free",
      buttonVariant: "muted",
      badgeLabel: undefined,
      isPopular: false,
      features: [
        "Basic AI health guidance",
        "Find doctors in Kashmir",
        "Multi-language support",
        "Emergency health guidance",
      ],
    },
    {
      name: "AI Health Pro",
      price: "₹1299",
      billingPeriod: "/month",
      description: "AI consultations + specialist booking",
      buttonLabel: "Start AI Health Pro",
      buttonVariant: "primary",
      badgeLabel: "Most Popular",
      isPopular: true,
      features: [
        "Everything in Basic",
        "20 AI voice calls per month",
        "AI health guidance & advice",
        "Advanced symptom assessment",
        "Priority specialist booking",
        "Health records & history",
      ],
    },
    {
      name: "AI Health Premium",
      price: "₹1599",
      billingPeriod: "/month",
      description: "Unlimited AI consultations",
      buttonLabel: "Upgrade to AI Premium",
      buttonVariant: "outline",
      badgeLabel: undefined,
      isPopular: false,
      features: [
        "Everything in AI Health Pro",
        "Unlimited AI voice calls",
        "Advanced AI health analysis",
        "Personalized health plans",
        "24/7 priority AI support",
        "Detailed health reports",
      ],
    },
  ],
};

export const defaultAiContent: AiContent = {
  badge: "AI-Powered Healthcare for Kashmir",
  headingPrimary: "Intelligent Health",
  headingSecondary: "Voice Assistant",
  description:
    "Experience the future of healthcare with our advanced AI voice assistant designed specifically for Kashmir. Get instant medical guidance, symptom analysis, and personalized health recommendations through natural conversation in Urdu or English - available 24/7 across all districts of the valley.",
  cards: [
    {
      identifier: "main",
      title: "AI Voice Health Assistant",
      description:
        "Speak naturally in Urdu and English about your health concerns. Our advanced AI understands symptoms, provides instant guidance, and connects you with the right specialists across Kashmir through intelligent voice conversations.",
      feature: "spotlight",
      size: "lg",
      className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
      spotlightItems: [
        "24/7 AI health consultations in local languages",
        "Advanced symptom analysis & triage",
        "Medication reminders & health tracking",
        "Emergency health guidance for Kashmir",
        "Multi-language support (Urdu/English)",
      ],
    },
    {
      identifier: "stat1",
      title: "Kashmir Health Network",
      description:
        "Connected with 500+ healthcare providers across all districts of Kashmir, from Srinagar to remote villages, ensuring quality care reaches every corner of the valley",
      feature: "spotlight",
      size: "md",
      className: "col-span-2 row-span-1 col-start-1 col-end-3",
      spotlightItems: [
        "SKIMS & AIIMS integration",
        "Local clinic partnerships",
        "Emergency care coordination",
        "Telemedicine for remote areas",
      ],
    },
    {
      identifier: "partners",
      title: "Kashmir Healthcare Partners",
      description:
        "Connected with leading medical institutions and healthcare providers across Kashmir Valley and beyond",
      feature: "icons",
      size: "md",
      className: "col-span-1 row-span-1",
      icons: true,
    },
    {
      identifier: "innovation",
      title: "Healthcare Innovation in Kashmir",
      description:
        "Transforming healthcare access in Kashmir through AI-powered voice technology, overcoming geographical and language barriers",
      feature: "timeline",
      size: "sm",
      className: "col-span-1 row-span-1",
      timeline: [
        { year: "2020", event: "AI Health Platform for Kashmir Launch" },
        {
          year: "2021",
          event: "Multi-Language Voice Recognition (Urdu/Kashmiri)",
        },
        { year: "2022", event: "Kashmir Healthcare Network Integration" },
        {
          year: "2023",
          event: "Advanced AI Symptom Analysis for Local Conditions",
        },
        {
          year: "2024",
          event: "Real-time Health Monitoring & Emergency Alerts for Kashmir",
        },
      ],
    },
  ],
  voiceAssistant: {
    title: "Health Voice Assistant",
    description:
      "Speak naturally about your health concerns. Our AI understands symptoms, provides guidance, and connects you with the right healthcare professionals.",
  },
};
export async function loadHomeContent(fetchOptions?: {
  revalidate?: number;
}): Promise<HomeContent> {
  try {
    const heroPath = buildSingleTypeRequestPath("/api/home-hero", [
      "hero_stats",
      "hero_testimonial_avatars",
      "daily_offer_cards",
    ]);
    const faqPath = buildSingleTypeRequestPath("/api/home-faq", [
      "faq_items",
    ]);
    const featuresPath = buildSingleTypeRequestPath("/api/home-features", [
      "features_cards",
    ]);
    const pricingPath = buildSingleTypeRequestPath("/api/home-pricing", [
      "pricing_plans.features",
    ]);
    const aiPath = buildSingleTypeRequestPath("/api/home-ai", [
      "ai_cards.spotlight_items",
      "ai_cards.timeline",
      "ai_cards.metrics",
      "ai_cards.statistic",
    ]);

    const requestInit = {
      cache: "no-store" as RequestCache,
      revalidate: fetchOptions?.revalidate,
    };

    const [
      heroResponse,
      faqResponse,
      featuresResponse,
      pricingResponse,
      ctaResponse,
      aiResponse,
    ] = await Promise.all([
      fetchStrapi<StrapiHomeHeroResponse>(heroPath, requestInit),
      fetchStrapi<StrapiHomeFaqResponse>(faqPath, requestInit),
      fetchStrapi<StrapiHomeFeaturesResponse>(featuresPath, requestInit),
      fetchStrapi<StrapiHomePricingResponse>(pricingPath, requestInit),
      fetchStrapi<StrapiHomeCtaResponse>("/api/home-cta", requestInit),
      fetchStrapi<StrapiHomeAiResponse>(aiPath, requestInit),
    ]);

    const heroAttributes = extractAttributes<StrapiHomeHeroAttributes>(
      heroResponse?.data,
    );
    const faqAttributes = extractAttributes<StrapiHomeFaqAttributes>(
      faqResponse?.data,
    );
    const ctaAttributes = extractAttributes<StrapiHomeCtaAttributes>(
      ctaResponse?.data,
    );
    const featuresAttributes = extractAttributes<StrapiHomeFeaturesAttributes>(
      featuresResponse?.data,
    );
    const pricingAttributes = extractAttributes<StrapiHomePricingAttributes>(
      pricingResponse?.data,
    );
    const aiAttributes = extractAttributes<StrapiHomeAiAttributes>(
      aiResponse?.data,
    );

    return {
      hero: heroAttributes ? mapHeroContent(heroAttributes) : defaultHeroContent,
      faq: faqAttributes ? mapFaqContent(faqAttributes) : defaultFaqContent,
      cta: ctaAttributes ? mapCtaContent(ctaAttributes) : defaultCtaContent,
      features: featuresAttributes
        ? mapFeaturesContent(featuresAttributes)
        : defaultFeaturesContent,
      pricing: pricingAttributes
        ? mapPricingContent(pricingAttributes)
        : defaultPricingContent,
      ai: aiAttributes ? mapAiContent(aiAttributes) : defaultAiContent,
    };
  } catch (error) {
    console.error("Failed to load Strapi home content:", error);
    return {
      hero: defaultHeroContent,
      faq: defaultFaqContent,
      cta: defaultCtaContent,
      features: defaultFeaturesContent,
      pricing: defaultPricingContent,
      ai: defaultAiContent,
    };
  }
}

function buildSingleTypeRequestPath(
  basePath: string,
  populateFields: string[],
) {
  if (populateFields.length === 0) {
    return basePath;
  }

  const params = new URLSearchParams();
  for (const field of populateFields) {
    params.append("populate", field);
  }

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

function mapHeroContent(attributes: StrapiHomeHeroAttributes): HeroContent {
  const stats = sanitiseStats(attributes.hero_stats);
  const avatars = sanitiseAvatars(attributes.hero_testimonial_avatars);
  const dailyOfferDefaults = defaultHeroContent.dailyOffer;
  const offerHighlights = sanitiseOfferHighlights(attributes);
  const dailyOfferCards = mapDailyOfferCards(attributes.daily_offer_cards);

  return {
    badgeLabel: attributes.hero_badge_label ?? defaultHeroContent.badgeLabel,
    title: {
      lead: attributes.hero_heading_lead ?? defaultHeroContent.title.lead,
      highlight:
        attributes.hero_heading_highlight ?? defaultHeroContent.title.highlight,
      tail: attributes.hero_heading_tail ?? defaultHeroContent.title.tail,
    },
    subtitle: attributes.hero_subtitle ?? defaultHeroContent.subtitle,
    ctas: {
      primary: {
        label:
          attributes.hero_primary_cta_label ??
          defaultHeroContent.ctas.primary.label,
      },
      secondary: {
        label:
          attributes.hero_secondary_cta_label ??
          defaultHeroContent.ctas.secondary.label,
      },
    },
    dailyOffer: {
      hospitalName:
        attributes.hero_offer_hospital?.trim() ??
        dailyOfferDefaults.hospitalName,
      contactNumber:
        attributes.hero_offer_phone?.trim() ??
        dailyOfferDefaults.contactNumber,
      discount:
        attributes.hero_offer_discount?.trim() ?? dailyOfferDefaults.discount,
      price:
        attributes.hero_offer_price?.trim() ?? dailyOfferDefaults.price,
      highlights:
        offerHighlights.length > 0
          ? offerHighlights
          : dailyOfferDefaults.highlights,
    },
    dailyOfferCards:
      dailyOfferCards.length > 0
        ? dailyOfferCards
        : defaultHeroContent.dailyOfferCards,
    stats: stats.length > 0 ? stats : defaultHeroContent.stats,
    testimonial: {
      rating:
        attributes.hero_testimonial_rating ??
        defaultHeroContent.testimonial.rating,
      subtitle:
        attributes.hero_testimonial_subtitle ??
        defaultHeroContent.testimonial.subtitle,
      highlight:
        attributes.hero_testimonial_highlight ??
        defaultHeroContent.testimonial.highlight,
      avatars:
        avatars.length > 0 ? avatars : defaultHeroContent.testimonial.avatars,
    },
  };
}

function mapDailyOfferCards(
  cards: Nullable<StrapiDailyOfferCard[]>,
): DailyOfferCard[] {
  if (!Array.isArray(cards)) {
    return [];
  }

  const results: DailyOfferCard[] = [];

  for (const entry of cards) {
    if (!entry) {
      continue;
    }

    const name = entry.name?.trim();
    if (!name) {
      continue;
    }

    const ratingValue =
      typeof entry.rating === "number"
        ? entry.rating
        : typeof entry.rating === "string" && entry.rating.trim().length > 0
          ? Number(entry.rating)
          : undefined;

    results.push({
      id: entry.id ?? Math.floor(Math.random() * 100000),
      badge:
        entry.badge_label?.trim() ||
        entry.category_label?.trim() ||
        "Partner Offer",
      category: entry.category_label?.trim() || undefined,
      name,
      location: entry.location?.trim() || undefined,
      contactNumber: entry.contact_number?.trim() || undefined,
      rating:
        typeof ratingValue === "number" && !Number.isNaN(ratingValue)
          ? ratingValue
          : undefined,
      offerText: entry.offer_text?.trim() || undefined,
      packageText: entry.package_text?.trim() || undefined,
      services: splitList(entry.services),
      accent: entry.accent_color?.trim() || undefined,
    });
  }

  return results;
}

function sanitiseOfferHighlights(
  attributes: StrapiHomeHeroAttributes,
): HeroContent["dailyOffer"]["highlights"] {
  const highlights: HeroContent["dailyOffer"]["highlights"] = [];

  const firstLabel = attributes.hero_offer_highlight_one_label?.trim();
  const firstValue = attributes.hero_offer_highlight_one_value?.trim();
  if (firstLabel && firstValue) {
    highlights.push({ label: firstLabel, value: firstValue });
  }

  const secondLabel = attributes.hero_offer_highlight_two_label?.trim();
  const secondValue = attributes.hero_offer_highlight_two_value?.trim();
  if (secondLabel && secondValue) {
    highlights.push({ label: secondLabel, value: secondValue });
  }

  return highlights;
}

function sanitiseStats(stats: Nullable<StrapiStatEntry[]>): HeroStat[] {
  if (!Array.isArray(stats)) {
    return [];
  }

  const results: HeroStat[] = [];

  for (const stat of stats) {
    const source = extractAttributes(stat);
    const label = source?.label?.toString().trim();
    const rawValue = source?.value;
    const numericValue =
      typeof rawValue === "number"
        ? rawValue
        : rawValue !== null && rawValue !== undefined
          ? Number(rawValue)
          : Number.NaN;

    if (!label || Number.isNaN(numericValue)) {
      continue;
    }

    results.push({
      label,
      value: numericValue,
    });
  }

  return results;
}

function splitList(value: Nullable<string>): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(/[\n,]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}
function sanitiseFaqItems(entries: Nullable<StrapiFaqEntry[]>): FaqItem[] {
  if (!Array.isArray(entries)) {
    return [];
  }

  const items: FaqItem[] = [];

  for (const entry of entries) {
    const source = extractAttributes(entry);
    const question = source?.question ?? "";
    const answer = source?.answer ?? "";

    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    if (!trimmedQuestion || !trimmedAnswer) {
      continue;
    }

    items.push({
      question: trimmedQuestion,
      answer: trimmedAnswer,
    });
  }

  return items;
}
function sanitiseAvatars(field: Nullable<StrapiMediaField>): HeroAvatar[] {
  const items = Array.isArray(field)
    ? field
    : Array.isArray(field?.data)
      ? field.data
      : null;
  if (!Array.isArray(items)) {
    return [];
  }

  const avatars: HeroAvatar[] = [];

  for (const item of items) {
    const urlCandidate =
      item?.attributes?.url ??
      (typeof item?.url === "string" ? item.url : undefined);
    const url = resolveStrapiAssetUrl(urlCandidate);
    if (!url) {
      continue;
    }

    avatars.push({
      src: url,
      alt:
        item?.attributes?.alternativeText?.trim() ??
        item?.alternativeText?.trim() ??
        defaultHeroContent.testimonial.avatars[0]?.alt ??
        "Patient",
    });
  }

  return avatars;
}
function mapFaqContent(attributes: StrapiHomeFaqAttributes): FaqContent {
  const items = sanitiseFaqItems(attributes.faq_items);

  return {
    badge: attributes.faq_badge ?? defaultFaqContent.badge,
    heading: attributes.faq_heading ?? defaultFaqContent.heading,
    description: attributes.faq_description ?? defaultFaqContent.description,
    items: items.length > 0 ? items : defaultFaqContent.items,
  };
}

function mapCtaContent(attributes: StrapiHomeCtaAttributes): CtaContent {
  const heading = attributes.cta_heading?.trim();
  const description = attributes.cta_description?.trim();
  const primaryLabel = attributes.cta_primary_label?.trim();
  const secondaryLabel = attributes.cta_secondary_label?.trim();
  const secondaryTooltip = attributes.cta_secondary_tooltip?.trim();
  const secondaryMessage = attributes.cta_secondary_message?.trim();

  return {
    heading:
      heading && heading.length > 0 ? heading : defaultCtaContent.heading,
    description:
      description && description.length > 0
        ? description
        : defaultCtaContent.description,
    primaryLabel:
      primaryLabel && primaryLabel.length > 0
        ? primaryLabel
        : defaultCtaContent.primaryLabel,
    secondaryLabel:
      secondaryLabel && secondaryLabel.length > 0
        ? secondaryLabel
        : defaultCtaContent.secondaryLabel,
    secondaryTooltip:
      secondaryTooltip && secondaryTooltip.length > 0
        ? secondaryTooltip
        : defaultCtaContent.secondaryTooltip,
    secondaryMessage:
      secondaryMessage && secondaryMessage.length > 0
        ? secondaryMessage
        : defaultCtaContent.secondaryMessage,
  };
}

function mapFeaturesContent(
  attributes: StrapiHomeFeaturesAttributes,
): FeaturesContent {
  const cards = sanitiseFeatureCards(attributes.features_cards);

  return {
    badge: attributes.features_badge ?? defaultFeaturesContent.badge,
    headingPrimary:
      attributes.features_heading_primary ??
      defaultFeaturesContent.headingPrimary,
    headingSecondary:
      attributes.features_heading_secondary ??
      defaultFeaturesContent.headingSecondary,
    description:
      attributes.features_description ?? defaultFeaturesContent.description,
    cards: cards.length > 0 ? cards : defaultFeaturesContent.cards,
    footerHeading:
      attributes.features_footer_heading ??
      defaultFeaturesContent.footerHeading,
    footerDescription:
      attributes.features_footer_description ??
      defaultFeaturesContent.footerDescription,
  };
}

function mapPricingContent(
  attributes: StrapiHomePricingAttributes,
): PricingContent {
  const plans = sanitisePricingPlans(attributes.pricing_plans);

  return {
    badge: attributes.pricing_badge_label ?? defaultPricingContent.badge,
    headingPrimary:
      attributes.pricing_heading_primary ??
      defaultPricingContent.headingPrimary,
    headingSecondary:
      attributes.pricing_heading_secondary ??
      defaultPricingContent.headingSecondary,
    description:
      attributes.pricing_description ?? defaultPricingContent.description,
    plans: plans.length > 0 ? plans : defaultPricingContent.plans,
  };
}

function mapAiContent(attributes: StrapiHomeAiAttributes): AiContent {
  const cards = sanitiseAiCards(attributes.ai_cards);

  const voiceTitle =
    attributes.ai_voice_title?.trim() ?? defaultAiContent.voiceAssistant.title;
  const voiceDescription =
    attributes.ai_voice_description?.trim() ??
    defaultAiContent.voiceAssistant.description;

  return {
    badge: attributes.ai_badge_label ?? defaultAiContent.badge,
    headingPrimary:
      attributes.ai_heading_primary ?? defaultAiContent.headingPrimary,
    headingSecondary:
      attributes.ai_heading_secondary ?? defaultAiContent.headingSecondary,
    description: attributes.ai_description ?? defaultAiContent.description,
    cards: cards.length > 0 ? cards : defaultAiContent.cards,
    voiceAssistant: {
      title: voiceTitle,
      description: voiceDescription,
    },
  };
}
function sanitiseFeatureCards(
  entries: Nullable<StrapiFeatureCard[]>,
): FeatureCard[] {
  if (!Array.isArray(entries)) {
    return [];
  }

  const cards: FeatureCard[] = [];

  for (const entry of entries) {
    const source = extractAttributes(entry);
    const title = source?.title?.trim();
    const description = source?.description?.trim();

    if (!title || !description) {
      continue;
    }

    cards.push({ title, description });
  }

  return cards;
}
function sanitisePricingPlans(
  entries: Nullable<StrapiPricingPlan[]>,
): PricingPlan[] {
  if (!Array.isArray(entries)) {
    return [];
  }

  return entries.reduce<PricingPlan[]>((acc, entry) => {
    const source = extractAttributes(entry);
    if (!source) {
      return acc;
    }

    const name = source.name?.trim();
    const price = source.price_display?.trim();
    const billingPeriod =
      source.billing_period?.trim() ??
      defaultPricingContent.plans[0].billingPeriod;
    const description = source.description?.trim();
    const buttonLabel =
      source.button_label?.trim() ?? defaultPricingContent.plans[0].buttonLabel;
    const buttonVariant = normaliseButtonVariant(source.button_variant);
    const badgeLabel = source.badge_label?.trim() || undefined;
    const isPopular = Boolean(source.is_popular);
    const features = sanitisePricingPlanFeatures(source.features);

    if (!name || !price || !description || features.length === 0) {
      return acc;
    }

    acc.push({
      name,
      price,
      billingPeriod,
      description,
      buttonLabel,
      buttonVariant,
      badgeLabel,
      isPopular,
      features,
    });

    return acc;
  }, []);
}
function sanitisePricingPlanFeatures(
  entries: Nullable<StrapiPricingPlanFeature[]>,
): string[] {
  if (!Array.isArray(entries)) {
    return [];
  }

  const features: string[] = [];

  for (const entry of entries) {
    const source = extractAttributes(entry);
    const text = source?.text?.trim();

    if (!text || text.length === 0) {
      continue;
    }

    features.push(text);
  }

  return features;
}
function sanitiseAiCards(entries: Nullable<StrapiAiCard[]>): AiCard[] {
  if (!Array.isArray(entries)) {
    return [];
  }

  return entries.reduce<AiCard[]>((acc, entry, index) => {
    const source = extractAttributes(entry);
    if (!source) {
      return acc;
    }

    const title = source.title?.trim();
    const description = source.description?.trim();
    const feature = normaliseAiFeature(source.feature);
    const size = normaliseAiSize(source.size);
    const identifier = source.identifier?.trim() || `ai-card-${index + 1}`;
    const spotlightItems = sanitiseTextItems(source.spotlight_items);
    const timeline = sanitiseTimeline(source.timeline);
    const metrics = sanitiseMetrics(source.metrics);
    const statistic = sanitiseStatistic(source.statistic);
    const typingText = source.typing_text?.trim();
    const className = source.class_name?.trim();
    const href = source.href?.trim() || undefined;
    const icons = Boolean(source.show_icons);

    if (!title || !description) {
      return acc;
    }

    acc.push({
      identifier,
      title,
      description,
      feature,
      size,
      className: className || undefined,
      href,
      icons,
      spotlightItems: spotlightItems.length > 0 ? spotlightItems : undefined,
      timeline: timeline.length > 0 ? timeline : undefined,
      metrics: metrics.length > 0 ? metrics : undefined,
      statistic: statistic ?? undefined,
      typingText: typingText && typingText.length > 0 ? typingText : undefined,
    });

    return acc;
  }, []);
}

function sanitiseTextItems(entries: Nullable<StrapiAiTextItem[]>): string[] {
  if (!Array.isArray(entries)) {
    return [];
  }

  const values: string[] = [];

  for (const entry of entries) {
    const source = extractAttributes(entry);
    const value = source?.value?.trim();

    if (!value || value.length === 0) {
      continue;
    }

    values.push(value);
  }

  return values;
}
function sanitiseTimeline(
  entries: Nullable<StrapiAiTimelineEntry[]>,
): AiTimelineEntry[] {
  if (!Array.isArray(entries)) {
    return [];
  }

  const timeline: AiTimelineEntry[] = [];

  for (const entry of entries) {
    const source = extractAttributes(entry);
    const year = source?.year?.trim();
    const event = source?.event?.trim();

    if (!year || !event) {
      continue;
    }

    timeline.push({ year, event });
  }

  return timeline;
}
function sanitiseMetrics(entries: Nullable<StrapiAiMetric[]>): AiMetric[] {
  if (!Array.isArray(entries)) {
    return [];
  }

  const metrics: AiMetric[] = [];

  for (const entry of entries) {
    const source = extractAttributes(entry);
    const label = source?.label?.trim();
    const rawValue = source?.value;
    const numericValue =
      typeof rawValue === "number"
        ? rawValue
        : typeof rawValue === "string"
          ? Number(rawValue.trim())
          : Number.NaN;

    if (!label || Number.isNaN(numericValue)) {
      continue;
    }

    metrics.push({
      label,
      value: numericValue,
      suffix: source?.suffix?.trim() || undefined,
      color: source?.color?.trim() || undefined,
    });
  }

  return metrics;
}
function sanitiseStatistic(
  entry: Nullable<StrapiAiStatistic>,
): AiStatistic | null {
  if (!entry) {
    return null;
  }

  const source = extractAttributes(entry);
  if (!source) {
    return null;
  }

  const label = source.label?.trim();
  const end = source.end;
  if (!label || typeof end !== "number") {
    return null;
  }

  return {
    label,
    start: typeof source.start === "number" ? source.start : 0,
    end,
    suffix: source.suffix?.trim() || undefined,
  };
}

function normaliseButtonVariant(
  value: Nullable<string>,
): PricingPlanButtonVariant {
  switch ((value ?? "").toLowerCase()) {
    case "primary":
      return "primary";
    case "outline":
      return "outline";
    case "secondary":
    case "muted":
      return "muted";
    default:
      return "muted";
  }
}

function normaliseAiFeature(value: Nullable<string>): AiFeatureType {
  switch ((value ?? "").toLowerCase()) {
    case "spotlight":
    case "counter":
    case "timeline":
    case "icons":
    case "typing":
    case "metrics":
      return value as AiFeatureType;
    default:
      return "none";
  }
}

function normaliseAiSize(value: Nullable<string>): "sm" | "md" | "lg" {
  switch ((value ?? "").toLowerCase()) {
    case "sm":
      return "sm";
    case "lg":
      return "lg";
    default:
      return "md";
  }
}

function extractAttributes<T extends Record<string, unknown>>(
  source: Nullable<T & { attributes?: T | null }>,
): T | null {
  if (!source) {
    return null;
  }

  if ("attributes" in source && isRecord(source.attributes)) {
    return source.attributes as T;
  }

  return isRecord(source) ? (source as T) : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
