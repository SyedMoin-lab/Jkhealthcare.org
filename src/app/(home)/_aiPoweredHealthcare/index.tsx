"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mic,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  type Variants,
} from "motion/react";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

import {
  type AiContent,
  defaultAiContent,
  type AiCard as HomeAiCard,
} from "@/lib/home-content";
import { cn } from "@/lib/utils";

type BentoItem = HomeAiCard & { id?: string };

const VOICE_BAR_KEYS = Array.from(
  { length: 48 },
  (_, idx) => `voice-bar-${idx}`,
);
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const SpotlightFeature = ({ items }: { items: string[] }) => {
  return (
    <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <motion.div
          key={`spotlight-${item.toLowerCase().replace(/\s+/g, "-")}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className="flex items-center gap-2"
        >
          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="text-sm text-muted-foreground">{item}</span>
        </motion.div>
      ))}
    </div>
  );
};

const CounterAnimation = ({
  start,
  end,
  suffix = "",
}: {
  start: number;
  end: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    let currentFrame = 0;
    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easedProgress = 1 - (1 - progress) ** 3;
      const current = start + (end - start) * easedProgress;

      setCount(Math.min(current, end));

      if (currentFrame === totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [start, end]);

  return (
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-bold text-foreground">
        {count.toFixed(1).replace(/\.0$/, "")}
      </span>
      <span className="text-xl font-medium text-foreground">{suffix}</span>
    </div>
  );
};

const IconsFeature = () => {
  const healthcarePartners = [
    "Sher-e-Kashmir Institute of Medical Sciences (SKIMS)",
    "All India Institute of Medical Sciences (AIIMS) - Kashmir",
    "Government Medical College (GMC) Srinagar",
    "Kashmir Nursing Home",
    "Bone & Joint Hospital Barzulla",
    "Lalla Ded Hospital",
    "Jawaharlal Nehru Memorial Hospital",
    "District Hospital Anantnag",
    "District Hospital Baramulla",
    "Kashmir Medical College",
  ];

  return (
    <div className="mt-4">
      <ul className="space-y-2">
        {healthcarePartners.map((partner, partnerIndex) => (
          <motion.li
            key={partner}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * partnerIndex }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
            <span className="text-sm text-muted-foreground">{partner}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

const TimelineFeature = ({
  timeline,
}: {
  timeline: Array<{ year: string; event: string }>;
}) => {
  return (
    <div className="mt-3 relative">
      <div className="absolute top-0 bottom-0 left-[9px] w-[2px] bg-muted" />
      {timeline.map((item) => (
        <motion.div
          key={`timeline-${item.year}-${item.event
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          className="flex gap-3 mb-3 relative"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: (0.15 * Number.parseInt(item.year ?? "0", 10)) % 10,
          }}
        >
          <div className="w-5 h-5 rounded-full bg-card border-2 border-border flex-shrink-0 z-10 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-foreground">
              {item.year}
            </div>
            <div className="text-xs text-muted-foreground">{item.event}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const TypingCodeFeature = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);

          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        },
        Math.random() * 30 + 10,
      ); // Random typing speed for realistic effect

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  // Reset animation when component unmounts and remounts
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-3 relative">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-xs text-muted-foreground">server.ts</div>
      </div>
      <div
        ref={terminalRef}
        className="bg-background text-foreground p-3 rounded-md text-xs font-mono h-[150px] overflow-y-auto"
      >
        <pre className="whitespace-pre-wrap">
          {displayedText}
          <span className="animate-pulse">|</span>
        </pre>
      </div>
    </div>
  );
};

const MetricsFeature = ({
  metrics,
}: {
  metrics: Array<{
    label: string;
    value: number;
    suffix?: string;
    color?: string;
  }>;
}) => {
  const getColorClass = (color = "emerald") => {
    const colors = {
      emerald: "bg-emerald-500 dark:bg-emerald-400",
      blue: "bg-blue-500 dark:bg-blue-400",
      violet: "bg-violet-500 dark:bg-violet-400",
      amber: "bg-amber-500 dark:bg-amber-400",
      rose: "bg-rose-500 dark:bg-rose-400",
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <div className="mt-3 space-y-3">
      {metrics.map((metric, index) => (
        <motion.div
          key={`metric-${metric.label.toLowerCase().replace(/\s+/g, "-")}`}
          className="space-y-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 * index }}
        >
          <div className="flex justify-between items-center text-sm">
            <div className="text-muted-foreground font-medium flex items-center gap-1.5">
              {metric.label === "Uptime" && <Clock className="w-3.5 h-3.5" />}
              {metric.label === "Response time" && (
                <Zap className="w-3.5 h-3.5" />
              )}
              {metric.label === "Cost reduction" && (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              {metric.label}
            </div>
            <div className="text-muted-foreground font-semibold">
              {metric.value}
              {metric.suffix}
            </div>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${getColorClass(metric.color)}`}
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, metric.value)}%`,
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 0.15 * index,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

function AIInput_Voice() {
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isDemo, setIsDemo] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (submitted) {
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      setTime(0);
    }

    return () => clearInterval(intervalId);
  }, [submitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!isDemo) return;

    let timeoutId: NodeJS.Timeout;
    const runAnimation = () => {
      setSubmitted(true);
      timeoutId = setTimeout(() => {
        setSubmitted(false);
        timeoutId = setTimeout(runAnimation, 1000);
      }, 3000);
    };

    const initialTimeout = setTimeout(runAnimation, 100);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, [isDemo]);

  const handleClick = () => {
    if (isDemo) {
      setIsDemo(false);
      setSubmitted(false);
    } else {
      setSubmitted((prev) => !prev);
    }
  };

  return (
    <div className="w-full py-4">
      <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
        <button
          className={cn(
            "group w-16 h-16 rounded-xl flex items-center justify-center transition-colors",
            submitted
              ? "bg-none"
              : "bg-none hover:bg-black/10 dark:hover:bg-white/10",
          )}
          type="button"
          onClick={handleClick}
        >
          {submitted ? (
            <div
              className="w-6 h-6 rounded-sm animate-spin bg-black  dark:bg-white cursor-pointer pointer-events-auto"
              style={{ animationDuration: "3s" }}
            />
          ) : (
            <Mic className="w-6 h-6 text-black/70 dark:text-white/70" />
          )}
        </button>

        <span
          className={cn(
            "font-mono text-sm transition-opacity duration-300",
            submitted
              ? "text-black/70 dark:text-white/70"
              : "text-black/30 dark:text-white/30",
          )}
        >
          {formatTime(time)}
        </span>

        <div className="h-4 w-64 flex items-center justify-center gap-0.5">
          {VOICE_BAR_KEYS.map((key, index) => (
            <div
              key={key}
              className={cn(
                "w-0.5 rounded-full transition-all duration-300",
                submitted
                  ? "bg-black/50 dark:bg-white/50 animate-pulse"
                  : "bg-black/10 dark:bg-white/10 h-1",
              )}
              style={
                submitted && isClient
                  ? {
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${index * 0.05}s`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <p className="h-4 text-xs text-black/70 dark:text-white/70">
          {submitted
            ? "Analyzing your health concern..."
            : "Click to describe your symptoms"}
        </p>
      </div>
    </div>
  );
}

const BentoCard = ({ item }: { item: BentoItem }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <Link
        href={item.href || "#"}
        className={`
                    group relative flex flex-col gap-4 h-full rounded-xl p-5
                    bg-gradient-to-b from-neutral-50/60 via-neutral-50/40 to-neutral-50/30 
                    dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-neutral-900/30
                    border border-border
                    before:absolute before:inset-0 before:rounded-xl
                    before:bg-gradient-to-b before:from-white/10 before:via-white/20 before:to-transparent 
                    dark:before:from-black/10 dark:before:via-black/20 dark:before:to-transparent
                    before:opacity-100 before:transition-opacity before:duration-500
                    after:absolute after:inset-0 after:rounded-xl after:bg-card/70 after:z-[-1]
                    backdrop-blur-[4px]
                    shadow-[0_4px_20px_rgb(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)]
                    hover:border-border/50
                    hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]
                    hover:backdrop-blur-[6px]
                    hover:bg-gradient-to-b hover:from-neutral-50/60 hover:via-neutral-50/30 hover:to-neutral-50/20
                    dark:hover:from-neutral-800/60 dark:hover:via-neutral-800/30 dark:hover:to-neutral-800/20
                    transition-all duration-500 ease-out ${item.className}
                `}
        tabIndex={0}
        aria-label={`${item.title} - ${item.description}`}
      >
        <div
          className="relative z-10 flex flex-col gap-3 h-full"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="space-y-2 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                {item.title}
              </h3>
              <div className="text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>

            <p className="text-sm text-muted-foreground tracking-tight">
              {item.description}
            </p>

            {/* Feature specific content */}
            {item.feature === "spotlight" && item.spotlightItems && (
              <SpotlightFeature items={item.spotlightItems} />
            )}

            {item.feature === "counter" && item.statistic && (
              <div className="mt-auto pt-3">
                <CounterAnimation
                  start={item.statistic.start || 0}
                  end={item.statistic.end || 100}
                  suffix={item.statistic.suffix}
                />
              </div>
            )}

            {item.feature === "timeline" && item.timeline && (
              <TimelineFeature timeline={item.timeline} />
            )}

            {item.feature === "icons" && <IconsFeature />}

            {item.feature === "typing" && item.typingText && (
              <TypingCodeFeature text={item.typingText} />
            )}

            {item.feature === "metrics" && item.metrics && (
              <MetricsFeature metrics={item.metrics} />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

type AiSectionProps = {
  content?: AiContent;
};

export default function BentoGrid({
  content = defaultAiContent,
}: AiSectionProps) {
  const cardsSource =
    content.cards.length > 0 ? content.cards : defaultAiContent.cards;
  const cards: BentoItem[] = cardsSource.map((card) => ({
    ...card,
    id: card.identifier,
  }));
  const mainCard = cards[0] ?? {
    ...defaultAiContent.cards[0],
    id: defaultAiContent.cards[0].identifier,
  };
  const secondaryCard = cards[1] ?? {
    ...defaultAiContent.cards[1],
    id: defaultAiContent.cards[1].identifier,
  };
  const tertiaryCard = cards[2] ?? {
    ...defaultAiContent.cards[2],
    id: defaultAiContent.cards[2].identifier,
  };

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24 lg:py-32">
      <div className="jk-container">
        {/* Header Section */}
        <div className="mb-16 text-center sm:mb-20">
          <div className="mb-6 inline-flex items-center space-x-2 rounded-full bg-primary/10 px-5 py-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-primary">
              {content.badge}
            </span>
          </div>

          <h2 className="mb-6 text-3xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {content.headingPrimary}
            </span>
            <br />
            <span className="text-foreground">{content.headingSecondary}</span>
          </h2>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground sm:max-w-4xl sm:text-lg">
            {content.description}
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-6"
        >
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div variants={fadeInUp} className="md:col-span-1">
              <BentoCard item={mainCard} />
            </motion.div>
            <motion.div variants={fadeInUp} className="md:col-span-2">
              <BentoCard item={secondaryCard} />
            </motion.div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div variants={fadeInUp} className="md:col-span-1">
              <BentoCard item={tertiaryCard} />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="md:col-span-1 rounded-xl overflow-hidden bg-gradient-to-b from-card/80 to-card border border-border/50 hover:border-border/30 hover:shadow-lg hover:shadow-card/20 transition-all duration-300"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {content.voiceAssistant.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground tracking-tight mb-4">
                  {content.voiceAssistant.description}
                </p>
                <AIInput_Voice />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
