import { NextRequest, NextResponse } from "next/server";

const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_WRITE_TOKEN =
  process.env.STRAPI_WRITE_TOKEN ?? process.env.STRAPI_API_TOKEN;

if (process.env.NODE_ENV !== "production") {
  console.log(
    "[submit-form] env",
    STRAPI_API_URL,
    STRAPI_WRITE_TOKEN ? `${STRAPI_WRITE_TOKEN.slice(0, 8)}…` : "missing",
  );
}

type ContactFormPayload = {
  firstName: string;
  lastName?: string;
  email?: string;
  phoneNumber: string;
  location: string;
  preferredLanguage?: string;
  preferredCallTime?: string;
  message?: string;
  source?: string;
};

type PatientFormPayload = {
  firstName: string;
  lastName?: string;
  email?: string;
  phoneNumber: string;
  location: string;
  preferredLanguage?: string;
  preferredContactMethod?: string;
  preferredContactTime?: string;
  reasonForVisit?: string;
  insuranceProvider?: string;
  additionalNotes?: string;
  consent: boolean;
  source?: string;
};

type PartnerFormPayload = {
  organizationName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  location?: string;
  organizationType?: string;
  servicesProvided?: string;
  monthlyPatientVolume?: string;
  website?: string;
  preferredContactTime?: string;
  message?: string;
  consent?: boolean;
  source?: string;
};

type SubmitFormBody =
  | { formType: "contact"; data: ContactFormPayload }
  | { formType: "patient"; data: PatientFormPayload }
  | { formType: "partner"; data: PartnerFormPayload };

type StrapiPayload = {
  endpoint: string;
  data: Record<string, unknown>;
};

const STRAPI_ENDPOINTS = {
  contact: "contact-requests",
  patient: "patient-requests",
  partner: "partner-requests",
} as const;

const FORM_SOURCE_DEFAULTS = {
  contact: "Contact Form",
  patient: "Patient Form",
  partner: "Partnership Form",
} as const;

const sanitize = (input: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(input).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );

function buildStrapiPayload(body: SubmitFormBody): StrapiPayload {
  const timestamp = new Date().toISOString();

  switch (body.formType) {
    case "contact": {
      const payload = body.data;
      return {
        endpoint: STRAPI_ENDPOINTS.contact,
        data: sanitize({
          first_name: payload.firstName,
          last_name: payload.lastName,
          phone_number: payload.phoneNumber,
          email: payload.email,
          location: payload.location,
          preferred_language: payload.preferredLanguage,
          preferred_call_time: payload.preferredCallTime,
          message: payload.message,
          source: payload.source ?? FORM_SOURCE_DEFAULTS.contact,
          timestamp,
        }),
      };
    }
    case "patient": {
      const payload = body.data;
      return {
        endpoint: STRAPI_ENDPOINTS.patient,
        data: sanitize({
          first_name: payload.firstName,
          last_name: payload.lastName,
          phone_number: payload.phoneNumber,
          email: payload.email,
          location: payload.location,
          preferred_language: payload.preferredLanguage,
          preferred_contact_method: payload.preferredContactMethod,
          preferred_contact_time: payload.preferredContactTime,
          reason_for_visit: payload.reasonForVisit,
          insurance_provider: payload.insuranceProvider,
          additional_notes: payload.additionalNotes,
          consent: payload.consent,
          source: payload.source ?? FORM_SOURCE_DEFAULTS.patient,
          timestamp,
        }),
      };
    }
    case "partner": {
      const payload = body.data;
      return {
        endpoint: STRAPI_ENDPOINTS.partner,
        data: sanitize({
          organization_name: payload.organizationName,
          contact_name: payload.contactName,
          email: payload.email,
          phone_number: payload.phoneNumber,
          location: payload.location,
          organization_type: payload.organizationType,
          services_provided: payload.servicesProvided,
          monthly_patient_volume: payload.monthlyPatientVolume,
          website: payload.website,
          preferred_contact_time: payload.preferredContactTime,
          message: payload.message,
          source: payload.source ?? FORM_SOURCE_DEFAULTS.partner,
          timestamp,
        }),
      };
    }
    default:
      throw new Error(
        `Unsupported form type: ${(body as SubmitFormBody).formType}`
      );
  }
}

async function persistToStrapi({ endpoint, data }: StrapiPayload) {
  if (!STRAPI_API_URL || !STRAPI_WRITE_TOKEN) {
    throw new Error(
      "Strapi connection is not configured. Set STRAPI_API_URL and STRAPI_WRITE_TOKEN (or STRAPI_API_TOKEN) in your environment."
    );
  }

  const response = await fetch(`${STRAPI_API_URL}/api/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_WRITE_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    let errorMessage = `Strapi request failed with status ${response.status}`;

    try {
      const errorBody = await response.json();
      errorMessage = `${errorMessage}: ${JSON.stringify(errorBody)}`;
    } catch (parseError) {
      const text = await response.text().catch(() => "");
      errorMessage = text ? `${errorMessage}: ${text}` : errorMessage;
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  let body: SubmitFormBody;

  try {
    body = (await request.json()) as SubmitFormBody;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  if (!body || !("formType" in body) || !("data" in body)) {
    return NextResponse.json(
      { error: "Request must include formType and data" },
      { status: 400 }
    );
  }

  try {
    const strapiPayload = buildStrapiPayload(body);
    // log the strapi payload
    console.log("Strapi payload:", strapiPayload);
    const result = await persistToStrapi(strapiPayload);

    return NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully",
        recordId: result?.data?.id ?? null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to persist form submission", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected error while saving your submission",
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
