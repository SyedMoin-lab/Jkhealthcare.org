"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  FlaskConical,
  MapPin,
  Search,
  Stethoscope,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { route } from "@/common/config/route";
import {
  GLOBAL_SEARCH_FEATURES,
  GLOBAL_SEARCH_LOCATIONS,
  GLOBAL_SEARCH_PLACEHOLDERS,
} from "./search-data";

type GlobalSearchProps = {
  className?: string;
};

const ROUTE_KEYWORDS: Array<{
  path: string;
  patterns: RegExp[];
}> = [
  {
    path: route.doctors.path,
    patterns: [/doctor/, /\bdr\b/, /physician/, /specialist/],
  },
  {
    path: route.labTests.path,
    patterns: [/lab/, /test/, /diagnostic/, /blood/, /scan/],
  },
];

function resolveTargetRoute(query: string) {
  const normalized = query.toLowerCase();
  if (!normalized) {
    return route.findCenters.path;
  }

  for (const candidate of ROUTE_KEYWORDS) {
    if (candidate.patterns.some((pattern) => pattern.test(normalized))) {
      return candidate.path;
    }
  }

  return route.findCenters.path;
}

const QUICK_LINKS = [
  {
    label: "Find Centers",
    description: "Hospitals & clinics across Kashmir",
    icon: Compass,
    href: route.findCenters.path,
  },
  {
    label: "Doctors",
    description: "Verified specialists & consultants",
    icon: Stethoscope,
    href: route.doctors.path,
  },
  {
    label: "Doctors List",
    description: "Featured doctors curated by jkhealthcare.org",
    icon: Stethoscope,
    href: route.doctorsList.path,
  },
  {
    label: "Lab Tests",
    description: "Diagnostics & home sample collection",
    icon: FlaskConical,
    href: route.labTests.path,
  },
];

export function GlobalSearch({ className }: GlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayLocation, setOverlayLocation] = useState<string>(
    GLOBAL_SEARCH_LOCATIONS[0] ?? "Srinagar"
  );
  const [overlayQuery, setOverlayQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(
        /macintosh|macintel|macppc|mac68k|mac os x/i.test(
          window.navigator.userAgent
        )
      );
    }
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPlaceholderIndex((current) =>
        current + 1 >= GLOBAL_SEARCH_PLACEHOLDERS.length ? 0 : current + 1
      );
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        (isMac ? event.metaKey : event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isMac]);

  const placeholder = useMemo(
    () =>
      GLOBAL_SEARCH_PLACEHOLDERS[placeholderIndex] ??
      GLOBAL_SEARCH_PLACEHOLDERS[0],
    [placeholderIndex]
  );

  const executeSearch = (searchQuery: string, locationValue?: string) => {
    const trimmed = searchQuery.trim();
    const params = new URLSearchParams();
    if (trimmed) {
      params.set("q", trimmed);
    }
    if (locationValue && locationValue.length > 0) {
      params.set("location", locationValue);
    }

    const destination = resolveTargetRoute(trimmed);
    router.push(
      params.toString() ? `${destination}?${params.toString()}` : destination
    );
  };

  const handleOverlaySubmit = (event: FormEvent) => {
    event.preventDefault();
    setQuery(overlayQuery);
    executeSearch(
      overlayQuery,
      overlayLocation !== "All Kashmir" ? overlayLocation : undefined
    );
    setOverlayOpen(false);
  };

  const openOverlay = () => {
    setOverlayQuery(query);
    setOverlayOpen(true);
  };

  const handleSuggestionSelect = (value: string) => {
    setOverlayQuery(value);
    executeSearch(
      value,
      overlayLocation !== "All Kashmir" ? overlayLocation : undefined
    );
    setOverlayOpen(false);
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          openOverlay();
        }}
        className={cn(
          "w-full cursor-pointer rounded-xl border border-border/60 bg-background shadow-sm px-2 py-1.5",
          className
        )}
      >
        <div className="relative flex items-center">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            aria-label="Search healthcare"
            autoComplete="off"
            readOnly
            onFocus={(event) => {
              event.preventDefault();
              openOverlay();
            }}
            className="h-10 flex-1 border-0 bg-transparent pl-9 pr-20 text-sm shadow-none focus-visible:ring-0"
          />
          <button
            type="button"
            onClick={openOverlay}
            className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-border bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
          >
            {isMac ? "⌘" : "Ctrl"} K
          </button>
        </div>
      </form>

      {overlayOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 py-10 sm:py-24">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border/60 bg-background shadow-[0_25px_70px_rgba(15,23,42,0.18)]">
            <div className="flex items-center gap-3 border-b border-border/50 px-5 py-4">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={overlayQuery}
                  onChange={(event) => setOverlayQuery(event.target.value)}
                  placeholder="Type a command or search..."
                  className="h-11 rounded-2xl border border-border/60 bg-background pl-10 text-sm focus-visible:ring-0"
                  autoFocus
                />
              </div>
              <button
                type="button"
                aria-label="Close search"
                className="rounded-full p-2 text-muted-foreground transition hover:bg-muted/70"
                onClick={() => setOverlayOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleOverlaySubmit}
              className="flex flex-col gap-4 border-b border-border/50 px-5 py-4 sm:flex-row"
            >
              <div className="relative flex-1">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <select
                  value={overlayLocation}
                  onChange={(event) => setOverlayLocation(event.target.value)}
                  className="h-11 w-full rounded-2xl border border-border/60 bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-0"
                >
                  {["All Kashmir", ...GLOBAL_SEARCH_LOCATIONS].map((city) => (
                    <option value={city} key={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="h-11 rounded-2xl sm:w-40">
                Search
              </Button>
            </form>

            <div className="grid max-h-[420px] grid-cols-1 gap-6 overflow-y-auto px-5 py-4 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Links
                </p>
                <div className="rounded-2xl border border-border/50">
                  {QUICK_LINKS.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm text-foreground transition hover:bg-muted/50",
                        index !== QUICK_LINKS.length - 1 &&
                          "border-b border-border/40"
                      )}
                      onClick={() => setOverlayOpen(false)}
                    >
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Specialities
                </p>
                <div className="rounded-2xl border border-border/50">
                  {GLOBAL_SEARCH_FEATURES.slice(0, 12).map((feature, index) => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => handleSuggestionSelect(feature)}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-muted/40",
                        index !== 11 && "border-b border-border/40"
                      )}
                    >
                      <span className="flex items-center gap-3 text-foreground">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        {feature}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Speciality
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
