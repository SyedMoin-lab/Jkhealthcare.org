"use client";

import { useState } from "react";
import { Header } from "@/common/layout/header";
import { Footer } from "@/common/layout/footer";
import { NumberTicker } from "@/components/ui/number-ticker";
import { PatientForm, PartnershipForm } from "@/common/forms";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Marquee } from "@/components/ui/marquee";
import type { PatientsContent } from "@/lib/patients-content";

type PatientsPageClientProps = {
  content: PatientsContent;
};

export function PatientsPageClient({ content }: PatientsPageClientProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPartnerFormOpen, setIsPartnerFormOpen] = useState(false);

  return (
    <>
      <Header />
      <main>
        <section className="relative flex items-center justify-center py-16 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />
          </div>
          <div className="relative z-10 w-full px-4 sm:px-6">
            <div className="mx-auto max-w-5xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                {content.hero.title}
              </h1>
              <p className="mt-2 text-base text-muted-foreground sm:text-2xl">
                {content.hero.subtitle}
              </p>
              <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Button
                  size="lg"
                  className="w-full cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
                  onClick={() => setIsFormOpen(true)}
                >
                  {content.hero.primaryCtaLabel}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full cursor-pointer border-primary text-primary hover:bg-primary/10 sm:w-auto"
                  onClick={() => setIsPartnerFormOpen(true)}
                >
                  {content.hero.secondaryCtaLabel}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Modal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title="Get Help as a Patient"
          className="w-full max-w-4xl"
        >
          <PatientForm />
        </Modal>

        <Modal
          isOpen={isPartnerFormOpen}
          onClose={() => setIsPartnerFormOpen(false)}
          title="Become a Partner"
          className="w-full max-w-4xl"
        >
          <PartnershipForm />
        </Modal>

        <section className="pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="rounded-2xl border bg-card p-8 text-center sm:p-12">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {content.stats.heading}
              </span>
              <div className="mt-4 text-5xl font-extrabold sm:text-7xl">
                <NumberTicker value={content.stats.value} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {content.stats.caption}
              </p>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-4 text-center text-2xl font-semibold sm:text-3xl">
              {content.testimonialsHeading}
            </h2>
            <Marquee
              pauseOnHover
              className="rounded-lg border bg-card/60 p-4"
            >
              {content.testimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className="mx-2 w-[280px] shrink-0 rounded-lg border bg-background p-4 shadow-sm sm:mx-3 sm:w-[320px]"
                >
                  <p className="text-base text-foreground sm:text-lg">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                    &mdash; {testimonial.name}
                    {testimonial.location ? `, ${testimonial.location}` : ""}
                  </p>
                </div>
              ))}
            </Marquee>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
