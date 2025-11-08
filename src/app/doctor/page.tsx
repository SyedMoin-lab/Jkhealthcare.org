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
  ArrowUpRight,
  MapPin,
  Phone,
  Search,
  Star,
  Stethoscope,
} from "lucide-react";
import { useDirectoryData } from "@/lib/directory-data";
import { route } from "@/common/config/route";

export default function DoctorsPage() {
  const { items } = useDirectoryData("doctors");
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

  const filteredDoctors = useMemo(() => {
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
                <Stethoscope className="h-4 w-4" aria-hidden />
                Verified Specialists
              </div>
              <h1 className="text-3xl font-bold text-foreground sm:text-5xl">
                Meet the doctors trusted by JK Health Care AI
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Search across experience, speciality, and locations to find the
                right physician for your family. Profiles are curated directly
                by our partner doctors.
              </p>
            </div>

            <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by doctor name, speciality, or hospital"
                  className="pl-9"
                />
              </div>
              {locationFilter && (
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                  Showing doctors near {locationFilter}
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
                    All focus areas
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
                  Doctor profiles will appear here once your team publishes
                  them.
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Head to the clinician dashboard to add your first specialist.
                </p>
                <Button asChild className="mt-4">
                  <Link href={route.dashboardDoctors.path}>
                    Go to clinician dashboard
                  </Link>
                </Button>
              </Card>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Showing {filteredDoctors.length} of {items.length} doctors
                  </span>
                  <span>Updated by JK Health Care AI doctor network</span>
                </div>

                {filteredDoctors.length === 0 ? (
                  <Card className="border-dashed border-border/70 bg-muted/10 p-8 text-center text-sm text-muted-foreground">
                    No doctors match your search yet. Try removing a filter or
                    explore all specialists.
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {filteredDoctors.map((doctor) => (
                      <Card
                        key={doctor.id}
                        className="flex flex-col gap-4 border-border/70 bg-card/90 p-5 shadow-sm transition hover:border-primary/40 hover:shadow-lg"
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h2 className="text-lg font-semibold text-foreground">
                                {doctor.title}
                              </h2>
                              <p className="text-sm text-muted-foreground">
                                {doctor.subtitle}
                              </p>
                            </div>
                            {typeof doctor.rating === "number" && (
                              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                                <Star className="h-3 w-3" aria-hidden />
                                {doctor.rating.toFixed(1)}
                              </div>
                            )}
                          </div>
                          {doctor.description && (
                            <p className="text-sm text-muted-foreground">
                              {doctor.description}
                            </p>
                          )}
                          {doctor.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin
                                className="h-4 w-4 text-primary"
                                aria-hidden
                              />
                              {doctor.location}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 text-xs font-medium">
                            {doctor.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-primary/10 px-3 py-1 text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                            {doctor.services.map((service) => (
                              <span
                                key={service}
                                className="rounded-full bg-muted px-3 py-1 text-muted-foreground"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            {typeof doctor.reviewCount === "number" && (
                              <span>{doctor.reviewCount} patient reviews</span>
                            )}
                            {doctor.phone && (
                              <span className="flex items-center gap-1">
                                <Phone
                                  className="h-3.5 w-3.5 text-primary"
                                  aria-hidden
                                />
                                {doctor.phone}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {doctor.directionsUrl && (
                            <Button
                              asChild
                              variant="outline"
                              className="h-9 px-4 text-sm"
                            >
                              <a
                                href={doctor.directionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Clinic location
                              </a>
                            </Button>
                          )}
                          {doctor.appointmentUrl && (
                            <Button asChild className="h-9 px-4 text-sm">
                              <a
                                href={doctor.appointmentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Schedule consultation
                                <ArrowUpRight
                                  className="ml-2 h-4 w-4"
                                  aria-hidden
                                />
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
