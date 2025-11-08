import { fetchStrapi } from "./strapi";

type Nullable<T> = T | null | undefined;

type StrapiPatientTestimonial = {
  id?: number;
  attributes?: {
    quote?: string | null;
    name?: string | null;
    location?: string | null;
  } | null;
} | null;

type StrapiPatientPageAttributes = {
  hero_title?: string | null;
  hero_subtitle?: string | null;
  hero_primary_cta_label?: string | null;
  hero_secondary_cta_label?: string | null;
  stats_heading?: string | null;
  stats_value?: number | null;
  stats_caption?: string | null;
  testimonials_heading?: string | null;
  testimonials?: StrapiPatientTestimonial[] | null;
};

type StrapiPatientPageDocument = {
  id?: number;
  documentId?: string;
  attributes?: StrapiPatientPageAttributes | null;
} & Partial<StrapiPatientPageAttributes>;

type StrapiPatientPageResponse = {
  data?: StrapiPatientPageDocument | null;
};

export type PatientTestimonial = {
  quote: string;
  name: string;
  location?: string;
};

export type PatientsContent = {
  hero: {
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  stats: {
    heading: string;
    value: number;
    caption: string;
  };
  testimonialsHeading: string;
  testimonials: PatientTestimonial[];
};

export const defaultPatientsContent: PatientsContent = {
  hero: {
    title: "India's First In-Hospital Concierge For You. And Your Family.",
    subtitle: "Available in Kashmir only",
    primaryCtaLabel: "Request a call back",
    secondaryCtaLabel: "Become a partner",
  },
  stats: {
    heading: "Total Patients Helped",
    value: 12876,
    caption:
      "and counting — thanks to our growing network of partners and clinicians.",
  },
  testimonialsHeading: "What patients are saying",
  testimonials: [
    {
      quote: "Booking tests was super easy. Got results same day!",
      name: "Aarav",
      location: "Srinagar",
    },
    {
      quote: "They connected us to the right specialist within minutes.",
      name: "Mehak",
      location: "Baramulla",
    },
    {
      quote: "Very polite and quick support. Highly recommended.",
      name: "Imran",
      location: "Anantnag",
    },
    {
      quote: "Transparent pricing and hassle-free appointments.",
      name: "Zoya",
      location: "Kupwara",
    },
  ],
};

export async function loadPatientsContent(fetchOptions?: {
  revalidate?: number;
}): Promise<PatientsContent> {
  try {
    const response = await fetchStrapi<StrapiPatientPageResponse>(
      "/api/patient-page?populate=testimonials",
      {
        cache: "no-store",
        revalidate: fetchOptions?.revalidate,
      },
    );

    const attributes = extractPatientAttributes(response?.data);
    if (!attributes) {
      return defaultPatientsContent;
    }

    return mapPatientsContent(attributes);
  } catch (error) {
    console.error("Failed to load Strapi patient content:", error);
    return defaultPatientsContent;
  }
}

function mapPatientsContent(
  attributes: StrapiPatientPageAttributes,
): PatientsContent {
  return {
    hero: {
      title: attributes.hero_title ?? defaultPatientsContent.hero.title,
      subtitle:
        attributes.hero_subtitle ?? defaultPatientsContent.hero.subtitle,
      primaryCtaLabel:
        attributes.hero_primary_cta_label ??
        defaultPatientsContent.hero.primaryCtaLabel,
      secondaryCtaLabel:
        attributes.hero_secondary_cta_label ??
        defaultPatientsContent.hero.secondaryCtaLabel,
    },
    stats: {
      heading: attributes.stats_heading ?? defaultPatientsContent.stats.heading,
      value:
        typeof attributes.stats_value === "number"
          ? attributes.stats_value
          : defaultPatientsContent.stats.value,
      caption: attributes.stats_caption ?? defaultPatientsContent.stats.caption,
    },
    testimonialsHeading:
      attributes.testimonials_heading ??
      defaultPatientsContent.testimonialsHeading,
    testimonials: sanitiseTestimonials(attributes.testimonials),
  };
}

function sanitiseTestimonials(
  entries: Nullable<StrapiPatientTestimonial[]>,
): PatientTestimonial[] {
  if (!Array.isArray(entries)) {
    return defaultPatientsContent.testimonials;
  }

  const testimonials: PatientTestimonial[] = [];

  for (const entry of entries) {
    const quote = entry?.attributes?.quote?.trim();
    const name = entry?.attributes?.name?.trim();
    const location = entry?.attributes?.location?.trim();

    if (!quote || !name) {
      continue;
    }

    testimonials.push({
      quote,
      name,
      location: location || undefined,
    });
  }

  return testimonials.length > 0
    ? testimonials
    : defaultPatientsContent.testimonials;
}

function extractPatientAttributes(
  entry: StrapiPatientPageResponse["data"],
): StrapiPatientPageAttributes | null {
  if (!entry) {
    return null;
  }

  const candidate =
    typeof entry === "object" && "attributes" in entry && entry.attributes
      ? entry.attributes
      : entry;

  return typeof candidate === "object" && candidate !== null
    ? (candidate as StrapiPatientPageAttributes)
    : null;
}
