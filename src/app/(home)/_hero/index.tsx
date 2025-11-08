"use client";
import { useEffect, useState } from "react";
import {
  PhoneIcon,
  MicIcon,
  StarIcon,
  BadgePercentIcon,
  CheckCircle2Icon,
  MapPinIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/common/form";
import { Modal } from "@/components/ui/modal";
import { NumberTicker } from "@/components/ui/number-ticker";
import { createAICallFormSubmitHandler } from "@/lib/ai-call";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  defaultHeroContent,
  type HeroContent,
  type DailyOfferCard as HeroDailyOfferCard,
} from "@/lib/home-content";

const offerTypes = [
  "Daily Offers",
  "Special Offers",
  "Partner Offers",
  "Passion Offers",
];

type HeroProps = {
  content?: HeroContent;
};

function Hero({ content = defaultHeroContent }: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const hero = content;

  // Carousel auto-scroll
  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const interval = setInterval(() => {
      if (!document.hidden) {
        carouselApi.scrollNext();
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [carouselApi]);

  // Typing animation effect
  useEffect(() => {
    const currentText = offerTypes[currentOfferIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentOfferIndex((prev) => (prev + 1) % offerTypes.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentOfferIndex]);

  const offerCards = hero.dailyOfferCards.length
    ? hero.dailyOfferCards
    : defaultHeroContent.dailyOfferCards;

  const handleFormSubmit = createAICallFormSubmitHandler(() =>
    setIsModalOpen(false)
  );

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-3 pt-20 pb-12 sm:px-4 sm:pt-24 sm:pb-16 md:px-6 md:pt-28 md:pb-20 lg:px-8 lg:pt-32 lg:pb-24">
      {/* GRID BG  */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30"></div>
      </div>

      {/* GRADIENT ORBS - Responsive sizing */}
      <div className="absolute top-10 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* CENTERED CONTENT */}
            <div className="w-full max-w-4xl space-y-6 sm:space-y-8 md:space-y-10">
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {/* BADGE */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-primary">
                    {hero.badgeLabel}
                  </span>
                </div>

                {/* MAIN HEADING - Better mobile sizing */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight sm:leading-tight">
                  <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent block">
                    {hero.title.lead}
                  </span>
                  <span className="text-blue-500 underline decoration-white decoration-2 underline-offset-2 sm:underline-offset-4 block mt-1">
                    {hero.title.highlight}
                  </span>
                  <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent block mt-1">
                    {hero.title.tail}
                  </span>
                </h1>

                {/* SUBTITLE - Better mobile spacing */}
                <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg font-medium leading-relaxed text-muted-foreground px-2 sm:px-0">
                  {hero.subtitle}
                </p>
              </div>

              {/* DAILY OFFERS - Carousel */}
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between px-1"></div>
                <div className="relative mx-auto w-full">
                  <Carousel
                    className="w-full pb-6"
                    opts={{ align: "start", loop: true }}
                    setApi={setCarouselApi}
                  >
                    <CarouselContent className="-ml-3 sm:-ml-4">
                      {offerCards.map((offer) => (
                        <CarouselItem
                          key={offer.id}
                          className="basis-full pl-3 sm:pl-4"
                        >
                          <DailyOfferCard offer={offer} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex -left-4 top-1/2 -translate-y-1/2 border border-border/70 bg-background/90 shadow-lg backdrop-blur" />
                    <CarouselNext className="hidden sm:flex -right-4 top-1/2 -translate-y-1/2 border border-border/70 bg-background/90 shadow-lg backdrop-blur" />
                  </Carousel>
                </div>
              </div>

              {/* CTA BUTTONS - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full px-2 sm:px-0">
                <Button
                  size={"lg"}
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 hover:cursor-pointer text-sm sm:text-base"
                  onClick={() => setIsModalOpen(true)}
                >
                  <PhoneIcon className="mr-2 size-4 sm:size-5" />
                  {hero.ctas.primary.label}
                </Button>

                <Button
                  size={"lg"}
                  variant={"outline"}
                  className="w-full sm:w-auto border-primary/30 hover:border-primary/50 hover:bg-primary/5 hover:cursor-pointer text-sm sm:text-base"
                  onClick={() => setIsModalOpen(true)}
                >
                  <MicIcon className="mr-2 size-4 sm:size-5" />
                  {hero.ctas.secondary.label}
                </Button>
              </div>

              {/* ALL STATISTICS - Mobile Responsive */}
              <div className="flex justify-center w-full px-2 sm:px-0">
                <div className="grid w-full max-w-5xl grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                  {hero.stats.map((stat, index) => (
                    <div
                      key={`${stat.label}-${index}`}
                      className="flex flex-col items-center text-center"
                    >
                      <NumberTicker
                        value={stat.value}
                        className="mb-1 text-xl sm:text-2xl md:text-3xl font-bold text-primary"
                        delay={0.1 + index * 0.1}
                      />
                      <span className="text-[10px] sm:text-xs font-medium text-muted-foreground whitespace-nowrap">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* USER TESTIMONIALS - Mobile Responsive */}
              <div className="pt-6 sm:pt-8 w-full">
                <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 sm:flex-row">
                  {/* USER AVATARS */}
                  <div className="flex -space-x-2 sm:-space-x-3 justify-center">
                    {hero.testimonial.avatars.map((avatar, index) => (
                      <Image
                        key={`${avatar.src}-${index}`}
                        src={avatar.src}
                        alt={avatar.alt}
                        width={48}
                        height={48}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 sm:ring-4 ring-background"
                        unoptimized
                      />
                    ))}
                  </div>

                  {/* RATING AND STATS */}
                  <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
                    {/* Rating Section */}
                    <div className="flex flex-col items-center space-y-1 text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-foreground">
                          {hero.testimonial.rating}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground px-2 sm:px-0">
                        {hero.testimonial.subtitle}{" "}
                        <span className="font-semibold text-foreground">
                          {hero.testimonial.highlight}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Call Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Connect with AI Health Assistant"
        className="w-full max-w-4xl"
      >
        <ContactForm
          onFormSubmit={handleFormSubmit}
          title=""
          description=""
          showTitle={false}
        />
      </Modal>
    </section>
  );
}

function DailyOfferCard({ offer }: { offer: HeroDailyOfferCard }) {
  const telHref = offer.contactNumber
    ? `tel:${offer.contactNumber.replace(/[^0-9+]/g, "")}`
    : null;
  const fallbackServices = [
    "24/7 emergency desk",
    "Doctor consult + lab reports",
  ];
  const trimmedServices = offer.services
    .map((service) => service.trim())
    .filter(Boolean);
  const services =
    trimmedServices.length > 0
      ? trimmedServices.slice(0, 2)
      : [...fallbackServices];
  while (services.length < 2) {
    services.push(fallbackServices[services.length] ?? fallbackServices[0]);
  }
  const serviceLabels = ["AVAILABILITY", "INCLUDES"];
  const serviceEntries = services.map((value, idx) => ({
    label: serviceLabels[idx] ?? "DETAILS",
    value,
  }));
  const packageText =
    offer.packageText?.trim() || defaultHeroContent.dailyOffer.price;
  const offerText =
    offer.offerText?.trim() || defaultHeroContent.dailyOffer.discount;
  const accentColor = offer.accent?.trim();

  return (
    <div
      className="flex h-full flex-col gap-6 rounded-[36px] border border-white/10 bg-gradient-to-br from-[#050505] via-[#0d0f1c] to-[#050505] px-5 py-6 text-white shadow-[0_30px_80px_rgba(5,5,5,0.65)]"
      style={
        accentColor
          ? {
              boxShadow: `0 30px 80px ${accentColor}33`,
              borderColor: `${accentColor}40`,
            }
          : undefined
      }
    >
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
        <div className="space-y-4 text-left">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70">
            <span className="inline-flex items-center gap-1">
              <BadgePercentIcon className="h-4 w-4" />
              {offer.badge || "Daily Offer"}
            </span>
            {offer.category && (
              <span className="rounded-full border border-white/15 px-3 py-1 text-[9px] tracking-[0.35em] text-white/70">
                {offer.category}
              </span>
            )}
            {typeof offer.rating === "number" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[9px]">
                <StarIcon
                  className="h-3.5 w-3.5 text-amber-400"
                  fill="currentColor"
                />
                {offer.rating.toFixed(1)}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="bg-gradient-to-r from-[#8b5cf6] via-[#6d67ff] to-[#34d399] bg-clip-text font-mono text-2xl font-semibold leading-tight text-transparent sm:text-3xl">
              {offer.name}
            </h3>
            {telHref && (
              <a
                href={telHref}
                className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-[18px] border border-emerald-400/50 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:border-emerald-300 hover:bg-emerald-400/10 sm:w-auto sm:justify-start"
              >
                <PhoneIcon className="h-4 w-4" />
                {offer.contactNumber}
              </a>
            )}
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
              <span className="inline-flex items-center gap-2 text-amber-300">
                <BadgePercentIcon className="h-4 w-4" />
                {offerText}
              </span>
              {offer.location && (
                <span className="inline-flex items-center gap-1 text-white/70">
                  <MapPinIcon className="h-4 w-4" />
                  {offer.location}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm self-stretch rounded-[30px] border border-white/10 bg-black/40 p-1 shadow-inner">
          <div
            className="flex h-full flex-col justify-center rounded-[24px] bg-gradient-to-r from-[#f72585] via-[#fb5607] to-[#ffb703] px-6 py-5 text-center text-white shadow-[0_25px_45px_rgba(0,0,0,0.35)]"
            style={
              accentColor
                ? {
                    backgroundImage: `linear-gradient(120deg, ${accentColor}, ${accentColor}dd, #fb5607)`,
                  }
                : undefined
            }
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/80">
              Package price
            </p>
            <p className="mt-2 text-2xl font-bold leading-tight">
              {packageText}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {serviceEntries.map((service) => (
          <div
            key={`${offer.id}-${service.label}-${service.value}`}
            className="flex items-center gap-3 rounded-[24px] border border-[#12233d] bg-gradient-to-br from-[#0b1529] via-[#101f36] to-[#0b1529] px-4 py-3 text-left shadow-inner"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-500/40 bg-sky-500/10 text-sky-300">
              <CheckCircle2Icon className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-sky-200">
                {service.label}
              </span>
              <span className="text-sm font-semibold text-white">
                {service.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
