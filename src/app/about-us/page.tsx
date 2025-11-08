"use client";

import { Header } from "@/common/layout/header";
import { Footer } from "@/common/layout/footer";
import {
  Heart,
  Users,
  Award,
  TrendingUp,
  Shield,
  Phone,
  MapPin,
  Mail,
  Linkedin,
  Target,
  Eye,
  Lightbulb,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const leadership = [
  {
    name: "Dr. Sarah Chen",
    title: "Chief Executive Officer & Co-Founder",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    background:
      "Former VP of Digital Health at Mayo Clinic, MD from Johns Hopkins",
    focus: "Strategic Vision & Healthcare Innovation",
  },
  {
    name: "Michael Rodriguez",
    title: "Chief Technology Officer & Co-Founder",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    background:
      "Former Senior Engineer at Google Health, MS Computer Science from MIT",
    focus: "AI Technology & Platform Development",
  },
  {
    name: "Dr. Jennifer Park",
    title: "Chief Medical Officer",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    background: "Board-certified Internal Medicine, Harvard Medical School",
    focus: "Clinical Excellence & Patient Safety",
  },
  {
    name: "David Thompson",
    title: "Chief Operating Officer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    background: "Former Operations Director at UnitedHealth, MBA from Wharton",
    focus: "Operations & Business Development",
  },
];

const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description:
      "jkhealthcare.org was founded with a mission to democratize healthcare access through AI technology.",
    icon: Lightbulb,
    color: "from-primary to-accent",
  },
  {
    year: "2021",
    title: "AI Platform Launch",
    description:
      "Launched our first AI-powered healthcare matching platform with 50+ provider partners.",
    icon: TrendingUp,
    color: "from-accent to-secondary",
  },
  {
    year: "2022",
    title: "National Expansion",
    description:
      "Expanded to 125+ cities nationwide, serving over 100,000 patients and 1,000+ healthcare providers.",
    icon: Globe,
    color: "from-secondary to-primary",
  },
  {
    year: "2023",
    title: "AI Assistant Launch",
    description:
      "Introduced our 24/7 AI health assistant, processing 50,000+ health queries monthly.",
    icon: Users,
    color: "from-primary to-destructive",
  },
  {
    year: "2024",
    title: "Leading Innovation",
    description:
      "Became the #1 AI-powered healthcare coordination platform with 500,000+ active users.",
    icon: Award,
    color: "from-destructive to-accent",
  },
];

const values = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description:
      "Every decision we make prioritizes patient health outcomes and experience above all else.",
  },
  {
    icon: Shield,
    title: "Trust & Privacy",
    description:
      "We maintain the highest standards of data security and patient privacy, exceeding HIPAA requirements.",
  },
  {
    icon: Users,
    title: "Collaborative Innovation",
    description:
      "We work closely with healthcare providers and patients to continuously improve our platform.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description:
      "We're committed to advancing healthcare technology through research and development.",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="jk-container">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full mb-6">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">
                  About jkhealthcare.org
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Transforming Healthcare
                </span>
                <br />
                <span className="text-foreground">Through AI Innovation</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                We're on a mission to make quality healthcare accessible to
                everyone through artificial intelligence, connecting millions of
                patients with the right care at the right time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    500K+
                  </div>
                  <div className="text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    1,000+
                  </div>
                  <div className="text-muted-foreground">
                    Healthcare Providers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    125+
                  </div>
                  <div className="text-muted-foreground">Cities Served</div>
                </div>
              </div>
            </div>

            {/* Mission, Vision, Values */}
            <div className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-card rounded-3xl p-8 shadow-lg border">
                  <Target className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To democratize healthcare access by leveraging artificial
                    intelligence to connect patients with the right healthcare
                    providers, services, and information when they need it most.
                  </p>
                </div>

                <div className="bg-card rounded-3xl p-8 shadow-lg border">
                  <Eye className="w-12 h-12 text-accent mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A world where every person has instant access to
                    personalized, high-quality healthcare guidance and services,
                    regardless of their location or background.
                  </p>
                </div>

                <div className="bg-card rounded-3xl p-8 shadow-lg border">
                  <Heart className="w-12 h-12 text-secondary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We've helped over 500,000 patients find appropriate care,
                    reduced average appointment wait times by 60%, and improved
                    health outcomes across communities nationwide.
                  </p>
                </div>
              </div>
            </div>

            {/* Company Values */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  The principles that guide everything we do and define who we
                  are as a company
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <div
                    key={value.title}
                    className="bg-card rounded-2xl p-6 shadow-lg border hover:border-primary/30 transition-all duration-500 text-center hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-3">{value.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 text-white text-center">
              <h3 className="text-3xl font-bold mb-4">
                Join Us in Transforming Healthcare
              </h3>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Whether you're a healthcare provider, patient, or technology
                partner, we'd love to connect and explore how we can work
                together.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-3 justify-center">
                  <Phone className="w-6 h-6" />
                  <span>+1-800-AI-HEALTH</span>
                </div>
                <div className="flex items-center space-x-3 justify-center">
                  <Mail className="w-6 h-6" />
                  <span>hello@jkhealthcare.org</span>
                </div>
                <div className="flex items-center space-x-3 justify-center">
                  <MapPin className="w-6 h-6" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() =>
                    alert(
                      "🤝 Partnership Opportunities\n\nCall +1-800-AI-HEALTH to explore:\n\n• Healthcare provider partnerships\n• Technology integrations\n• Investment opportunities\n• Strategic collaborations\n• Media and press inquiries\n\nLet's build the future of healthcare together!"
                    )
                  }
                  className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                >
                  Partner With Us
                </button>

                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
