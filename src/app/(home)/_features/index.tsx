"use client";

import { Badge } from "@/components/ui/badge";
import {
  defaultFeaturesContent,
  type FeaturesContent,
} from "@/lib/home-content";
import { cn } from "@/lib/utils";

type PlusCardProps = {
  className?: string;
  title: string;
  description: string;
};

const PlusCard = ({ className = "", title, description }: PlusCardProps) => {
  return (
    <div
      className={cn(
        "relative border border-dashed border-border rounded-lg p-6 bg-card min-h-[200px]",
        "flex flex-col justify-between",
        className,
      )}
    >
      <CornerPlusIcons />
      {/* Content */}
      <div className="relative z-10 space-y-2">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const CornerPlusIcons = () => (
  <>
    <PlusIcon className="absolute -top-3 -left-3" />
    <PlusIcon className="absolute -top-3 -right-3" />
    <PlusIcon className="absolute -bottom-3 -left-3" />
    <PlusIcon className="absolute -bottom-3 -right-3" />
  </>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1"
    stroke="currentColor"
    className={`text-foreground size-6 ${className}`}
  >
    <title>Plus icon</title>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

type FeaturesProps = {
  content?: FeaturesContent;
};

const cardLayouts = [
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-4 lg:row-span-1",
  "lg:col-span-2 lg:row-span-1",
  "lg:col-span-2 lg:row-span-1",
  "lg:col-span-2 lg:row-span-1",
];

export default function Features({
  content = defaultFeaturesContent,
}: FeaturesProps) {
  const cards =
    content.cards.length > 0 ? content.cards : defaultFeaturesContent.cards;

  return (
    <section className="bg-background border border-border">
      <div className="jk-container border border-border py-12 border-t-0 mt-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge className="text-xs font-medium mb-4">{content.badge}</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {content.headingPrimary}
            </span>
            <br />
            <span className="text-foreground">{content.headingSecondary}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 justify-center">
          {cards.slice(0, cardLayouts.length).map((card, index) => (
            <PlusCard
              key={`${card.title}-${index}`}
              title={card.title}
              description={card.description}
              className={cardLayouts[index] ?? "lg:col-span-2 lg:row-span-1"}
            />
          ))}
        </div>

        {/* Section Footer Heading */}
        <div className="max-w-2xl ml-auto text-right px-4 mt-6 lg:-mt-20">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-black dark:text-white mb-4">
            {content.footerHeading}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            {content.footerDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
