"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
  Stethoscope,
  TestTube,
  Home,
} from "lucide-react";
import { route } from "@/common/config/route";
import { useDirectoryData } from "@/lib/directory-data";

const ACTIONS = [
  {
    id: "centers",
    title: "Find Centers",
    description:
      "Add or update healthcare centers, facilities, and contact details. Perfect for keeping your network current.",
    href: route.dashboardFindCenters.path,
    icon: Building2,
    accent: "bg-blue-50 text-blue-600",
  },
  {
    id: "doctors",
    title: "Doctors",
    description:
      "Maintain doctor profiles, specialties, and consultation links so patients always meet the right expert.",
    href: route.dashboardDoctors.path,
    icon: Stethoscope,
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "labs",
    title: "Lab Tests",
    description:
      "Publish lab tests, pricing, and booking links to streamline diagnostics across your facilities.",
    href: route.dashboardLabs.path,
    icon: TestTube,
    accent: "bg-violet-50 text-violet-600",
  },
] as const;

export default function DashboardPage() {
  const router = useRouter();
  const { items: centers } = useDirectoryData("centers");
  const { items: doctors } = useDirectoryData("doctors");
  const { items: labs } = useDirectoryData("labs");

  const summary = {
    centers: centers.length,
    doctors: doctors.length,
    labs: labs.length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-muted/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              JK Health Care AI
            </p>
            <h1 className="text-2xl font-semibold text-foreground">
              Clinical Console
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hidden sm:flex border-border text-muted-foreground hover:bg-primary/5"
              onClick={() => router.push(route.home.path)}
            >
              <Home className="mr-2 h-4 w-4" />
              Back to site
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => router.push(route.dashboardFindCenters.path)}
            >
              Quick add
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="mb-10 space-y-3">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Welcome back
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Hello there
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Manage the clinical data that powers your patient experience. Choose
            a directory below to add new entries or refine existing details.
            Every change goes live instantly across the site.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
            const count = summary[action.id as keyof typeof summary];

            return (
              <Card
                key={action.id}
                className="flex flex-col justify-between border-border/70 bg-card/80 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <div className="p-6">
                  <div
                    className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full ${action.accent}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {action.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-6 py-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    {count} {count === 1 ? "entry" : "entries"}
                  </span>
                  <Button asChild className="h-9 px-3 text-sm">
                    <Link href={action.href}>
                      Manage
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              label: "Need to add a new facility?",
              href: route.dashboardFindCenters.path,
            },
            {
              label: "Onboard a specialist doctor?",
              href: route.dashboardDoctors.path,
            },
            {
              label: "Publish a diagnostic package?",
              href: route.dashboardLabs.path,
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-lg border border-dashed border-border/70 bg-muted/30 px-4 py-3 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              {item.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
