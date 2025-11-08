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
  Clock,
  MapPin,
  Phone,
  Search,
  Stethoscope,
  TestTube2,
} from "lucide-react";
import { useDirectoryData } from "@/lib/directory-data";
import { route } from "@/common/config/route";

export default function LabTestsPage() {
  const { items } = useDirectoryData("labs");
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
    const set = new Set<string>();
    items.forEach((item) => item.tags.forEach((tag) => set.add(tag)));
    return Array.from(set);
  }, [items]);

  const filteredTests = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return items.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        item.services.some((service) => service.toLowerCase().includes(query)) ||
        (item.description?.toLowerCase().includes(query) ?? false);

      const matchesTag =
        activeTag === "all" ||
        item.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase());

      const matchesLocation =
        !locationFilter ||
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
                <TestTube2 className="h-4 w-4" aria-hidden />
                Diagnostics you can trust
              </div>
              <h1 className="text-3xl font-bold text-foreground sm:text-5xl">
                Book lab tests curated by Kashmir&apos;s leading clinicians
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                From preventive packages to specialised panels, every test listed here is maintained
                by our doctor partners with the latest preparation and reporting timelines.
              </p>
            </div>

            <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by test name, condition, or category"
                  className="pl-9"
                />
              </div>
              {locationFilter && (
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                  Showing diagnostics near {locationFilter}
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
                    All categories
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
                  Lab tests will appear here once your diagnostic team publishes them.
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Visit the clinician dashboard to create your first diagnostic package.
                </p>
                <Button asChild className="mt-4">
                  <Link href={route.dashboardLabs.path}>Go to clinician dashboard</Link>
                </Button>
              </Card>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Showing {filteredTests.length} of {items.length} lab tests
                  </span>
                  <span>Updated in collaboration with JK Health Care AI labs</span>
                </div>

                {filteredTests.length === 0 ? (
                  <Card className="border-dashed border-border/70 bg-muted/10 p-8 text-center text-sm text-muted-foreground">
                    Nothing matched your search. Try a different keyword or explore all tests.
                  </Card>
                ) : (
                  <div className="grid gap-6 lg:grid-cols-2">
                    {filteredTests.map((test) => (
                      <Card
                        key={test.id}
                        className="flex flex-col gap-4 border-border/70 bg-card/90 p-5 shadow-sm transition hover:border-primary/40 hover:shadow-lg"
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h2 className="text-lg font-semibold text-foreground">
                                {test.title}
                              </h2>
                              <p className="text-sm text-muted-foreground">{test.subtitle}</p>
                            </div>
                          </div>
                          {test.description && (
                            <p className="text-sm text-muted-foreground">{test.description}</p>
                          )}
                          {test.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Stethoscope className="h-4 w-4 text-primary" aria-hidden />
                              {test.location}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 text-xs font-medium">
                            {test.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-primary/10 px-3 py-1 text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                            {test.services.map((service) => (
                              <span
                                key={service}
                                className="rounded-full bg-muted px-3 py-1 text-muted-foreground"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            {test.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="h-3.5 w-3.5 text-primary" aria-hidden />
                                {test.phone}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {test.directionsUrl && (
                            <Button asChild variant="outline" className="h-9 px-4 text-sm">
                              <a
                                href={test.directionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Clock className="mr-2 h-4 w-4" aria-hidden />
                                Visit center
                              </a>
                            </Button>
                          )}
                          {test.appointmentUrl && (
                            <Button asChild className="h-9 px-4 text-sm">
                              <a
                                href={test.appointmentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Book test
                              </a>
                            </Button>
                          )}
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
