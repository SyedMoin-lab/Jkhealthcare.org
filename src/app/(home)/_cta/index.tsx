"use client";

import { useState } from "react";
import { Brain, Phone, Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/common/form";
import { Modal } from "@/components/ui/modal";
import { createAICallFormSubmitHandler } from "@/lib/ai-call";
import {
  defaultCtaContent,
  type CtaContent,
} from "@/lib/home-content";

type CtaProps = {
  content?: CtaContent;
};

export const CTA = ({ content = defaultCtaContent }: CtaProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = createAICallFormSubmitHandler(() =>
    setIsModalOpen(false),
  );

  const handleDownloadApp = () => {
    if (typeof window !== "undefined") {
      window.alert(content.secondaryMessage);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="jk-container">
        <div className="text-center">
          <div className="border rounded-3xl bg-primary/5 p-12">
            <Brain className="mx-auto mb-6 h-16 w-16 text-primary" />
            <h3 className="mb-4 text-3xl font-bold text-foreground">
              {content.heading}
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
              {content.description}
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center space-x-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Phone className="h-5 w-5" />
                <span>{content.primaryLabel}</span>
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="inline-flex items-center space-x-2 cursor-pointer border-primary text-primary hover:bg-primary/10"
                      onClick={handleDownloadApp}
                    >
                      <Download className="h-5 w-5" />
                      <span>{content.secondaryLabel}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{content.secondaryTooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

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
};
