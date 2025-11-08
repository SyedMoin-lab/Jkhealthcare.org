import { fetchStrapi, resolveStrapiAssetUrl } from "./strapi";

type Nullable<T> = T | null | undefined;

type StrapiPartnerMedia = {
  id?: number;
  documentId?: string;
  url?: string | null;
  alternativeText?: string | null;
  attributes?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
  data?: {
    attributes?: {
      url?: string | null;
      alternativeText?: string | null;
    } | null;
  } | null;
} | null;

type StrapiPartnerAttributes = {
  name?: string | null;
  location?: string | null;
  phone?: string | null;
  reason?: string | null;
  logo?: StrapiPartnerMedia | null;
};

type StrapiPartner = ({
  id?: number;
  documentId?: string;
  attributes?: StrapiPartnerAttributes | null;
} & Partial<StrapiPartnerAttributes>) | null;

type StrapiPartnershipPageAttributes = {
  hero_title?: string | null;
  hero_subtitle?: string | null;
  hero_primary_cta_label?: string | null;
  hero_secondary_cta_label?: string | null;
  hero_stat_count?: number | null;
  hero_stat_label?: string | null;
  partners_heading?: string | null;
  partners?: StrapiPartner[] | null;
};

type StrapiPartnershipPageDocument = {
  id?: number;
  documentId?: string;
  attributes?: StrapiPartnershipPageAttributes | null;
} & Partial<StrapiPartnershipPageAttributes>;

type StrapiPartnershipPageResponse = {
  data?: StrapiPartnershipPageDocument | null;
};

export type Partner = {
  name: string;
  location: string;
  phone?: string;
  reason?: string;
  logo?: {
    src: string;
    alt: string;
  };
};

export type PartnershipsContent = {
  hero: {
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    statCount: number;
    statLabel: string;
  };
  partnersHeading: string;
  partners: Partner[];
};

export const defaultPartnershipsContent: PartnershipsContent = {
  hero: {
    title: "Our Partnerships",
    subtitle: "Trusted by healthcare providers across Kashmir Valley.",
    primaryCtaLabel: "Request a call back",
    secondaryCtaLabel: "Get help as a patient",
    statCount: 24,
    statLabel: "active partnerships",
  },
  partnersHeading: "Our partner network",
  partners: [
    {
      name: "Kashmir Health Center",
      location: "Srinagar, Jammu & Kashmir",
      phone: "+91 98765 43210",
      reason: "Faster access to verified specialists across the valley.",
    },
    {
      name: "Valley Diagnostics",
      location: "Baramulla, Jammu & Kashmir",
      phone: "+91 99887 76655",
      reason: "Streamlined lab bookings and real-time pricing visibility.",
    },
    {
      name: "North Care Hospital",
      location: "Kupwara, Jammu & Kashmir",
      phone: "+91 97979 12345",
      reason: "Digital triage and optimized appointment routing.",
    },
  ],
};

export async function loadPartnershipsContent(fetchOptions?: {
  revalidate?: number;
}): Promise<PartnershipsContent> {
  try {
    const response = await fetchStrapi<StrapiPartnershipPageResponse>(
      "/api/partnerships-page?populate=partners.logo",
      {
        cache: "no-store",
        revalidate: fetchOptions?.revalidate,
      },
    );
    const attributes = extractPartnershipAttributes(response?.data);
    if (!attributes) {
      return defaultPartnershipsContent;
    }

    return mapPartnershipsContent(attributes);
  } catch (error) {
    console.error("Failed to load Strapi partnerships content:", error);
    return defaultPartnershipsContent;
  }
}

function mapPartnershipsContent(
  attributes: StrapiPartnershipPageAttributes,
): PartnershipsContent {
  return {
    hero: {
      title: attributes.hero_title ?? defaultPartnershipsContent.hero.title,
      subtitle:
        attributes.hero_subtitle ?? defaultPartnershipsContent.hero.subtitle,
      primaryCtaLabel:
        attributes.hero_primary_cta_label ??
        defaultPartnershipsContent.hero.primaryCtaLabel,
      secondaryCtaLabel:
        attributes.hero_secondary_cta_label ??
        defaultPartnershipsContent.hero.secondaryCtaLabel,
      statCount:
        typeof attributes.hero_stat_count === "number"
          ? attributes.hero_stat_count
          : defaultPartnershipsContent.hero.statCount,
      statLabel:
        attributes.hero_stat_label ?? defaultPartnershipsContent.hero.statLabel,
    },
    partnersHeading:
      attributes.partners_heading ?? defaultPartnershipsContent.partnersHeading,
    partners: sanitisePartners(attributes.partners),
  };
}

function sanitisePartners(entries: Nullable<StrapiPartner[]>): Partner[] {
  if (!Array.isArray(entries)) {
    return defaultPartnershipsContent.partners;
  }

  const partners: Partner[] = [];

  for (const entry of entries) {
    const source = extractPartner(entry);
    if (!source) {
      continue;
    }

    const name = source.name?.trim();
    const location = source.location?.trim();
    if (!name || !location) {
      continue;
    }

    const phone = source.phone?.trim();
    const reason = source.reason?.trim();
    const media = extractPartnerMedia(source.logo);
    const logoUrl = resolveStrapiAssetUrl(media?.url ?? undefined);
    const logoAlt = media?.alt?.trim() || name;

    partners.push({
      name,
      location,
      phone: phone || undefined,
      reason: reason || undefined,
      logo: logoUrl
        ? {
            src: logoUrl,
            alt: logoAlt,
          }
        : undefined,
    });
  }

  return partners.length > 0 ? partners : defaultPartnershipsContent.partners;
}

function extractPartnershipAttributes(
  entry: StrapiPartnershipPageResponse["data"],
): StrapiPartnershipPageAttributes | null {
  if (!entry) {
    return null;
  }

  const candidate =
    typeof entry === "object" && "attributes" in entry && entry.attributes
      ? entry.attributes
      : entry;

  return typeof candidate === "object" && candidate !== null
    ? (candidate as StrapiPartnershipPageAttributes)
    : null;
}

function extractPartner(entry: StrapiPartner): StrapiPartnerAttributes | null {
  if (!entry) {
    return null;
  }

  const candidate =
    typeof entry === "object" && "attributes" in entry && entry.attributes
      ? entry.attributes
      : entry;

  return typeof candidate === "object" && candidate !== null
    ? (candidate as StrapiPartnerAttributes)
    : null;
}

function extractPartnerMedia(
  media: StrapiPartnerAttributes["logo"],
): { url?: string | null; alt?: string | null } | null {
  if (!media) {
    return null;
  }

  const candidate =
    typeof media === "object" && media !== null
      ? media
      : undefined;

  if (!candidate) {
    return null;
  }

  const directUrl = candidate.url ?? candidate.attributes?.url ?? candidate.data?.attributes?.url;
  const directAlt =
    candidate.alternativeText ??
    candidate.attributes?.alternativeText ??
    candidate.data?.attributes?.alternativeText;

  if (!directUrl && !directAlt) {
    return null;
  }

  return { url: directUrl, alt: directAlt ?? undefined };
}
