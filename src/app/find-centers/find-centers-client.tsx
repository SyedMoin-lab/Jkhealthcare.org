"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/common/layout/header";
import { Footer } from "@/common/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Building2,
  MapPin,
  Navigation,
  Phone,
  Search,
  Star,
} from "lucide-react";
import { useDirectoryData } from "@/lib/directory-data";
import { route } from "@/common/config/route";

export default function FindCentersClient() {
  const { items } = useDirectoryData("centers");
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const feature = searchParams.get("feature");
    const location = searchParams.get("location") ?? "";

    setSearchQuery(q);
    setActiveTag(feature && feature.length > 0 ? feature : "all");
    setLocationFilter(location);
  }, [searchParams]);

  const tags = useMemo(() => {
    const allTags = new Set<string>();
    items.forEach((item) => item.tags.forEach((tag) => allTags.add(tag)));
    return Array.from(allTags);
  }, [items]);

  const filteredCenters = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return items.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        item.services.some((service) => service.toLowerCase().includes(query));

      const matchesTag =
        activeTag === "all" ||
        item.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase());

      const matchesLocation =
        locationFilter === "" ||
        item.location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesQuery && matchesTag && matchesLocation;
    });
  }, [items, searchQuery, activeTag, locationFilter]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="pt-28 pb-12">
          <div className="jk-container">
            <div className="text-center">
              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
                <Building2 className="h-4 w-4" aria-hidden />
                Curated by JK Health Care AI
              </div>
              <h1 className="text-3xl font-bold text-foreground sm:text-5xl">
                Discover trusted healthcare centers across Kashmir
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Every listing is verified by our clinical team. Use the search below to find the
                right facility, compare services, and book appointments instantly.
              </p>
            </div>

            <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by center name, location, or speciality"
                  className="pl-9"
                />
              </div>
              {locationFilter && (
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                  Showing care near {locationFilter}
                </div>
              )}
              {tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTag("all")}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                      activeTag === "all"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-primary"
                    }`}
                  >
                    All specialities
                  </button>
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                        activeTag === tag
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="jk-container">
            {items.length === 0 ? (
              <Card className="border-dashed border-border/70 bg-muted/10 p-8 text-center">
                <h2 className="text-lg font-semibold text-foreground">
                  Centers will appear here once your clinical team adds them.
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Log in to the clinician dashboard to publish your first location.
                </p>
                <Button asChild className="mt-4">
                  <Link href={route.dashboardFindCenters.path}>Go to clinician dashboard</Link>
                </Button>
              </Card>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Showing {filteredCenters.length} of {items.length} centers
                  </span>
                  <span>Updated in real-time by JK Health Care AI partners</span>
                </div>
                {filteredCenters.length === 0 ? (
                  <Card className="border-dashed border-border/70 bg-muted/10 p-8 text-center text-sm text-muted-foreground">
                    No centers match your search. Adjust your filters or explore all listings.
                  </Card>
                ) : (
                  <div className="grid gap-6 lg:grid-cols-2">
                    {filteredCenters.map((center) => (
                      <Card
                        key={center.id}
                        className="overflow-hidden border-border/70 bg-card/90 shadow-sm transition hover:border-primary/40 hover:shadow-lg"
                      >
                        <div className="grid gap-5 p-5 sm:grid-cols-[170px_1fr]">
                          <div className="overflow-hidden rounded-lg bg-muted">
                            <img
                              src={center.imageUrl}
                              alt={center.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-between">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h2 className="text-lg font-semibold text-foreground">
                                    {center.title}
                                  </h2>
                                  <p className="text-sm text-muted-foreground">{center.subtitle}</p>
                                </div>
                                {typeof center.rating === "number" && (
                                  <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                                    <Star className="h-3 w-3" aria-hidden />
                                    {center.rating.toFixed(1)}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary" aria-hidden />
                                <span>{center.location}</span>
                              </div>
                              {center.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 text-xs font-medium">
                                  {center.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="rounded-full bg-primary/10 px-3 py-1 text-primary"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {center.services.length > 0 && (
                                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                  {center.services.map((service) => (
                                    <span
                                      key={service}
                                      className="rounded-full bg-muted px-3 py-1 font-medium"
                                    >
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                {typeof center.reviewCount === "number" && (
                                  <span>{center.reviewCount} patient reviews</span>
                                )}
                                {center.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="h-3.5 w-3.5 text-primary" aria-hidden />
                                    {center.phone}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-3">
                              {center.directionsUrl && (
                                <Button asChild variant="outline" className="h-9 px-4 text-sm">
                                  <a
                                    href={center.directionsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Navigation className="mr-2 h-4 w-4" aria-hidden />
                                    Directions
                                  </a>
                                </Button>
                              )}
                              {center.appointmentUrl && (
                                <Button asChild className="h-9 px-4 text-sm">
                                  <a
                                    href={center.appointmentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Book appointment
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
