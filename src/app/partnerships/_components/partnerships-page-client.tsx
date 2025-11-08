"use client";

import { useMemo, useState } from "react";
import { Header } from "@/common/layout/header";
import { Footer } from "@/common/layout/footer";
import { NumberTicker } from "@/components/ui/number-ticker";
import { PartnershipForm, PatientForm } from "@/common/forms";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Marquee } from "@/components/ui/marquee";
import type { PartnershipsContent } from "@/lib/partnerships-content";

function Logo({
  name,
  logo,
}: {
  name: string;
  logo?: { src: string; alt: string };
}) {
  if (logo) {
    return (
      <img
        src={logo.src}
        alt={logo.alt || name}
        className="h-10 w-10 rounded-md object-cover"
      />
    );
  }

  const initials = useMemo(
    () =>
      name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase(),
    [name],
  );

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-sm font-semibold text-foreground">
      {initials}
    </div>
  );
}

type PartnershipsPageClientProps = {
  content: PartnershipsContent;
};

export function PartnershipsPageClient({
  content,
}: PartnershipsPageClientProps) {
  const [isPartnerFormOpen, setIsPartnerFormOpen] = useState(false);
  const [isPatientFormOpen, setIsPatientFormOpen] = useState(false);

  return (
    <>
      <Header />
      <main>
        <section className="relative flex items-center justify-center py-16 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />
          </div>
          <div className="relative z-10 w-full px-4 sm:px-6">
            <div className="mx-auto max-w-6xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                {content.hero.title}
              </h1>
              <p className="mt-3 mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
                {content.hero.subtitle}
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-2 text-4xl font-extrabold sm:flex-row sm:text-6xl">
                <NumberTicker value={content.hero.statCount} />
                <span className="text-base font-medium text-muted-foreground sm:ml-3 sm:text-lg">
                  {content.hero.statLabel}
                </span>
              </div>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Button
                  size="lg"
                  className="w-full cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
                  onClick={() => setIsPartnerFormOpen(true)}
                >
                  {content.hero.primaryCtaLabel}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full cursor-pointer border-primary text-primary hover:bg-primary/10 sm:w-auto"
                  onClick={() => setIsPatientFormOpen(true)}
                >
                  {content.hero.secondaryCtaLabel}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Modal
          isOpen={isPartnerFormOpen}
          onClose={() => setIsPartnerFormOpen(false)}
          title="Become a Partner"
          className="w-full max-w-4xl"
        >
          <PartnershipForm />
        </Modal>

        <Modal
          isOpen={isPatientFormOpen}
          onClose={() => setIsPatientFormOpen(false)}
          title="Get Help as a Patient"
          className="w-full max-w-4xl"
        >
          <PatientForm />
        </Modal>

        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-4 text-center text-2xl sm:text-3xl font-semibold">
              {content.partnersHeading}
            </h2>
            <Marquee
              pauseOnHover
              repeat={3}
              className="rounded-xl border bg-card/60 p-6"
            >
              {content.partners.map((partner) => (
                <article
                  key={`${partner.name}-${partner.location}`}
                  className="mx-2 w-[300px] shrink-0 rounded-2xl border bg-background p-6 shadow-sm sm:mx-3 sm:w-[520px] lg:mx-4 lg:w-[680px]"
                >
                  <div className="flex items-center gap-4">
                    <Logo name={partner.name} logo={partner.logo} />
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                        {partner.name}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {partner.location}
                      </p>
                      {partner.phone ? (
                        <a
                          href={`tel:${partner.phone}`}
                          className="text-xs sm:text-sm text-primary hover:underline"
                        >
                          {partner.phone}
                        </a>
                      ) : null}
                    </div>
                  </div>
                  {partner.reason ? (
                    <div className="mt-4 text-sm sm:text-base leading-relaxed text-foreground">
                      {partner.reason}
                    </div>
                  ) : null}
                </article>
              ))}
            </Marquee>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
