"use client";

import { CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  defaultPricingContent,
  type PricingContent,
  type PricingPlan,
} from "@/lib/home-content";

type PricingSectionProps = {
  content?: PricingContent;
};

const buttonVariantClass: Record<PricingPlan["buttonVariant"], string> = {
  primary:
    "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300",
  muted:
    "bg-gradient-to-r from-muted to-muted/80 text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all duration-300",
  outline:
    "border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 rounded-xl font-semibold transition-all duration-300",
};

function PricingSection({
  content = defaultPricingContent,
}: PricingSectionProps) {
  const plans =
    content.plans.length > 0 ? content.plans : defaultPricingContent.plans;

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background via-muted/3 to-background">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_50%_at_50%_50%,#000_50%,transparent_85%)] opacity-30"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.06),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
            <span className="text-sm font-medium text-primary">
              {content.badge}
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              {content.headingPrimary}
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {content.headingSecondary}
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingPlanCard key={`${plan.name}-${index}`} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;

type PricingPlanCardProps = {
  plan: PricingPlan;
};

function PricingPlanCard({ plan }: PricingPlanCardProps) {
  const isPopular = plan.isPopular;
  const baseCardClasses =
    "relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500";
  const highlightCardClasses =
    "relative bg-gradient-to-br from-card/95 to-card/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary/20 scale-105";

  const containerClasses = isPopular
    ? highlightCardClasses
    : `${baseCardClasses} border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10`;

  const priceClasses = isPopular
    ? "text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
    : "text-4xl font-bold";

  const buttonClasses =
    buttonVariantClass[plan.buttonVariant] ?? buttonVariantClass.muted;

  return (
    <div className="relative group">
      {plan.badgeLabel && (
        <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 transform">
          <div className="rounded-full bg-gradient-to-r from-primary to-primary/80 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg">
            {plan.badgeLabel}
          </div>
        </div>
      )}

      <div className={containerClasses}>
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <div className="flex items-end gap-1">
              <span className={priceClasses}>{plan.price}</span>
              <span className="mb-1 text-muted-foreground">
                {plan.billingPeriod}
              </span>
            </div>
            <p className="text-muted-foreground">{plan.description}</p>
          </div>

          <Button
            className={`w-full py-3 cursor-pointer ${buttonClasses}`}
            variant={plan.buttonVariant === "outline" ? "outline" : undefined}
          >
            {plan.buttonLabel}
          </Button>

          <div className="space-y-4">
            {plan.features.map((feature) => (
              <div
                className="flex items-start gap-3"
                key={`${plan.name}-${feature}`}
              >
                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
