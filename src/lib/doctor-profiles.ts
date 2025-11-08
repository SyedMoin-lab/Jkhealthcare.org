import { fetchStrapi, resolveStrapiAssetUrl } from "./strapi";

type Nullable<T> = T | null | undefined;

type StrapiMedia = {
  id?: number;
  url?: string | null;
  alternativeText?: string | null;
  attributes?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
};

type StrapiMediaRelation = {
  data?: StrapiMedia | null;
};

type StrapiDoctorProfileAttributes = {
  name?: string | null;
  degrees?: string | null;
  license_number?: string | null;
  phone_number?: string | null;
  years_experience?: number | null;
  patients_treated?: number | null;
  rating?: number | null;
  location?: string | null;
  awards?: string | null;
  specialization?: string | null;
  super_specialization?: string | null;
  book_url?: string | null;
  photo?: StrapiMediaRelation | StrapiMedia | null;
};

type StrapiDoctorProfileDocument = {
  id?: number;
  attributes?: StrapiDoctorProfileAttributes | null;
};

type StrapiDoctorProfileResponse = {
  data?: StrapiDoctorProfileDocument[] | null;
};

export type DoctorProfile = {
  id: number;
  name: string;
  photo?: {
    src: string;
    alt?: string;
  };
  degrees: string[];
  licenseNumber?: string;
  phoneNumber?: string;
  yearsExperience?: number;
  patientsTreated?: number;
  rating?: number;
  location?: string;
  awards: string[];
  specialization?: string;
  superSpecialization?: string;
  bookUrl?: string;
};

const DEFAULT_DOCTORS: DoctorProfile[] = [
  {
    id: 1,
    name: "Dr. Aisha Qureshi",
    photo: {
      src: "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=640&h=640&fit=crop",
      alt: "Dr. Aisha Qureshi",
    },
    degrees: ["MBBS", "MD (Internal Medicine)"],
    licenseNumber: "JKMC-45219",
    phoneNumber: "+91 70001 23456",
    yearsExperience: 14,
    patientsTreated: 6400,
    rating: 4.9,
    location: "SKIMS, Srinagar & Online",
    awards: ["AIIMS Young Physician Award", "JK Health Excellence 2023"],
    specialization: "Internal Medicine",
    superSpecialization: "Autoimmune disorders & critical care",
  },
  {
    id: 2,
    name: "Dr. Arjun Mir",
    photo: {
      src: "https://images.unsplash.com/photo-1554727242-741c14fa561c?w=640&h=640&fit=crop",
      alt: "Dr. Arjun Mir",
    },
    degrees: ["MBBS", "MS (Orthopedics)", "Fellowship (Sports Medicine)"],
    licenseNumber: "JKMC-33985",
    phoneNumber: "+91 70002 33445",
    yearsExperience: 11,
    patientsTreated: 5100,
    rating: 4.8,
    location: "JK Sports Medicine Centre, Baramulla",
    awards: ["Kashmir Mobility Pioneer", "IOC Emerging Surgeon"],
    specialization: "Orthopedic Surgery",
    superSpecialization: "Sports injuries & advanced arthroscopy",
  },
];

const DOCTOR_PROFILES_REVALIDATE_SECONDS = 300;

function splitList(value: Nullable<string>): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(/[,\\n]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function hasMediaData(
  media: Nullable<StrapiDoctorProfileAttributes["photo"]>
): media is StrapiMediaRelation {
  if (!media || typeof media !== "object") {
    return false;
  }

  return "data" in media;
}

function normalizeMedia(
  media: Nullable<StrapiDoctorProfileAttributes["photo"]>
): Nullable<StrapiMedia> {
  if (!media) {
    return null;
  }

  if (hasMediaData(media)) {
    return media.data ?? null;
  }

  return media;
}

function extractPhoto(media: Nullable<StrapiDoctorProfileAttributes["photo"]>) {
  if (!media) {
    return undefined;
  }

  const data = normalizeMedia(media);
  const url = data?.attributes?.url ?? data?.url ?? undefined;
  if (!url) {
    return undefined;
  }

  const resolvedUrl = resolveStrapiAssetUrl(url);
  if (!resolvedUrl) {
    return undefined;
  }

  return {
    src: resolvedUrl,
    alt:
      data?.attributes?.alternativeText ?? data?.alternativeText ?? undefined,
  };
}

function mapDoctorProfile(
  doc: StrapiDoctorProfileDocument
): DoctorProfile | null {
  const attrs = doc.attributes;
  if (!attrs) {
    return null;
  }

  const name = attrs.name?.trim();
  if (!name) {
    return null;
  }

  return {
    id: doc.id ?? 0,
    name,
    photo: extractPhoto(attrs.photo),
    degrees: splitList(attrs.degrees),
    licenseNumber: attrs.license_number?.trim() || undefined,
    phoneNumber: attrs.phone_number?.trim() || undefined,
    yearsExperience: attrs.years_experience ?? undefined,
    patientsTreated: attrs.patients_treated ?? undefined,
    rating: attrs.rating ?? undefined,
    location: attrs.location?.trim() || undefined,
    awards: splitList(attrs.awards),
    specialization: attrs.specialization?.trim() || undefined,
    superSpecialization: attrs.super_specialization?.trim() || undefined,
    bookUrl: attrs.book_url?.trim() || undefined,
  };
}

export async function loadDoctorProfiles(): Promise<DoctorProfile[]> {
  try {
    const response = await fetchStrapi<StrapiDoctorProfileResponse>(
      "/api/doctor-profiles?populate=photo",
      { revalidate: DOCTOR_PROFILES_REVALIDATE_SECONDS }
    );

    const entries = response.data ?? [];
    const doctors = entries
      .map(mapDoctorProfile)
      .filter((doctor): doctor is DoctorProfile => doctor !== null);

    return doctors.length > 0 ? doctors : DEFAULT_DOCTORS;
  } catch (error) {
    console.error("Failed to load doctor profiles:", error);
    return DEFAULT_DOCTORS;
  }
}
