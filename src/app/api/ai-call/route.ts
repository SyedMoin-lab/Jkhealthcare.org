import { NextRequest, NextResponse } from "next/server";

const CALLKARO_ENDPOINT =
  process.env.CALLKARO_API_URL ??
  process.env.NEXT_PUBLIC_CALLKARO_API_URL ??
  "https://api.callkaro.ai/call/outbound";
const CALLKARO_AGENT_ID =
  process.env.CALLKARO_AGENT_ID ??
  process.env.NEXT_PUBLIC_CALLKARO_AGENT_ID ??
  "68dfd968237e47f930f6a614";
const CALLKARO_API_KEY =
  process.env.CALLKARO_API_KEY ?? process.env.NEXT_PUBLIC_CALLKARO_API_KEY;

interface AICallRequestBody {
  firstName?: string;
  lastName?: string;
  phone: string;
  location?: string;
  [key: string]: unknown;
}

function formatPhoneNumber(phone: string) {
  const trimmed = phone.trim();

  if (!trimmed) {
    throw new Error("Missing phone number for AI call");
  }

  if (trimmed.startsWith("+")) {
    return trimmed;
  }

  const numericPhone = trimmed.replace(/\D/g, "");

  if (!numericPhone) {
    throw new Error("Missing phone number for AI call");
  }

  if (numericPhone.startsWith("91")) {
    return `+${numericPhone}`;
  }

  if (numericPhone.startsWith("0")) {
    return `+91${numericPhone.slice(1)}`;
  }

  return `+91${numericPhone}`;
}

export async function POST(request: NextRequest) {
  try {
    if (!CALLKARO_API_KEY) {
      console.error("Missing CallKaro API key");
      return NextResponse.json(
        { error: "Call service is not configured. Please try again later." },
        { status: 500 },
      );
    }

    if (!CALLKARO_AGENT_ID) {
      console.error("Missing CallKaro agent id");
      return NextResponse.json(
        { error: "Call service is not configured. Please try again later." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as AICallRequestBody;

    if (!body?.phone) {
      return NextResponse.json(
        { error: "Missing phone number for AI call." },
        { status: 400 },
      );
    }

    const formattedPhone = formatPhoneNumber(body.phone);

    const payload = {
      to_number: formattedPhone,
      agent_id: CALLKARO_AGENT_ID,
      metadata: {
        ...body,
        phone: formattedPhone,
      },
      min_trigger_time: "08:30",
      max_trigger_time: "20:30",
      carry_over: true,
      number_of_retries: 3,
      gap_between_retries: [60, 120],
    };

    const response = await fetch(CALLKARO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": CALLKARO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("CallKaro API error", response.status, errorText);

      return NextResponse.json(
        {
          error:
            "We could not start the AI call right now. Please try again in a moment.",
        },
        { status: 502 },
      );
    }

    const data = await response.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Unexpected error while triggering AI call", error);
    return NextResponse.json(
      { error: "Unable to start the AI call. Please try again later." },
      { status: 500 },
    );
  }
}
