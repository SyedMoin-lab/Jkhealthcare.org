type FetchStrapiOptions = RequestInit & {
  /**
   * Convenience wrapper to set Next.js revalidation time (in seconds).
   * When provided it is merged into the Next.js `next` fetch option unless
   * an explicit `next` config is passed.
   */
  revalidate?: number;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
  cache?: RequestCache;
  timeoutMs?: number;
};

const STRAPI_URL = process.env.STRAPI_API_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

function ensureStrapiUrl() {
  if (!STRAPI_URL) {
    throw new Error(
      "Environment variable STRAPI_API_URL is not set. Add it to your .env.local file.",
    );
  }
  return STRAPI_URL;
}

export function resolveStrapiAssetUrl(url?: string | null) {
  if (!url) {
    return undefined;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (!STRAPI_URL) {
    // Fall back to returning the relative URL so the caller can decide how to handle it.
    return url;
  }

  return `${STRAPI_URL}${url}`;
}

export async function fetchStrapi<TResponse>(
  path: string,
  options: FetchStrapiOptions = {},
): Promise<TResponse> {
  const baseUrl = ensureStrapiUrl();
  const {
    revalidate,
    next,
    headers,
    cache,
    timeoutMs,
    signal,
    ...init
  } = options;
  const effectiveNext =
    next ?? (revalidate !== undefined ? { revalidate } : undefined);
  const effectiveCache =
    cache ?? (effectiveNext ? undefined : ("no-store" as RequestCache));
  const requestTimeout = timeoutMs ?? 15000;

  const controller = signal ? undefined : new AbortController();
  const abortSignal = signal ?? controller?.signal;
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
  if (controller) {
    timeoutHandle = setTimeout(() => controller.abort(), requestTimeout);
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      cache: effectiveCache,
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
        ...headers,
      },
      next: effectiveNext,
      signal: abortSignal ?? undefined,
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(
        `Strapi request failed (${response.status} ${response.statusText})${body ? `: ${body}` : ""}`,
      );
    }

    return (await response.json()) as TResponse;
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "AbortError" &&
      !signal
    ) {
      throw new Error(
        `Strapi request timed out after ${requestTimeout}ms when requesting ${path}`,
      );
    }

    throw error;
  } finally {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
  }
}
