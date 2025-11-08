"use client";

import { Badge } from "@/components/ui/badge";
import { defaultFaqContent, type FaqContent } from "@/lib/home-content";

type FaqProps = {
  content?: FaqContent;
};

export const Faq = ({ content = defaultFaqContent }: FaqProps) => {
  return (
    <section className="py-32">
      <div className="jk-container">
        <div className="text-center">
          <Badge className="text-xs font-medium">{content.badge}</Badge>
          <h1 className="mt-4 text-4xl font-semibold">{content.heading}</h1>
          <p className="mt-6 font-medium text-muted-foreground">
            {content.description}
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-screen-sm">
          {content.items.map((faq, index) => (
            <div key={`${faq.question}-${index}`} className="mb-8 flex gap-4">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-xs text-primary">
                {index + 1}
              </span>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{faq.question}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
