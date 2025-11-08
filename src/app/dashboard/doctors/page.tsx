"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Stethoscope,
  Trash2,
} from "lucide-react";
import { route } from "@/common/config/route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  addDirectoryItem,
  createDirectoryItemId,
  DirectoryItem,
  removeDirectoryItem,
  stringToList,
  useDirectoryData,
} from "@/lib/directory-data";

const INITIAL_FORM = {
  title: "",
  subtitle: "",
  description: "",
  imageUrl: "",
  location: "",
  rating: "",
  reviewCount: "",
  tags: "",
  services: "",
  phone: "",
  directionsUrl: "",
  appointmentUrl: "",
};

export default function ManageDoctorsPage() {
  const router = useRouter();
  const { items, refresh } = useDirectoryData("doctors");
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setMessage("");

    if (!form.title.trim() || !form.subtitle.trim()) {
      setStatus("error");
      setMessage("Doctor name and speciality are required.");
      return;
    }

    if (!form.imageUrl.trim()) {
      setStatus("error");
      setMessage("Please provide a profile image URL.");
      return;
    }

    if (!form.appointmentUrl.trim()) {
      setStatus("error");
      setMessage("Please provide a booking or contact link.");
      return;
    }

    const ratingValue = form.rating
      ? Number.parseFloat(form.rating)
      : undefined;
    if (
      ratingValue !== undefined &&
      (Number.isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5)
    ) {
      setStatus("error");
      setMessage("Rating must be a number between 0 and 5.");
      return;
    }

    const reviewValue = form.reviewCount
      ? Number.parseInt(form.reviewCount, 10)
      : undefined;
    if (
      reviewValue === undefined ||
      Number.isNaN(reviewValue) ||
      reviewValue < 0
    ) {
      setStatus("error");
      setMessage("Review count must be a positive number.");
      return;
    }

    const payload: DirectoryItem = {
      id: createDirectoryItemId(),
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      description: form.description.trim() || undefined,
      imageUrl: form.imageUrl.trim(),
      location: form.location.trim(),
      rating: ratingValue,
      reviewCount: reviewValue,
      tags: stringToList(form.tags),
      services: stringToList(form.services),
      phone: form.phone.trim() || undefined,
      directionsUrl: form.directionsUrl.trim() || undefined,
      appointmentUrl: form.appointmentUrl.trim(),
      createdAt: new Date().toISOString(),
    };

    addDirectoryItem("doctors", payload);
    refresh();
    setForm(INITIAL_FORM);
    setStatus("success");
    setMessage("Doctor profile saved and published.");
  };

  const handleDelete = (id: string) => {
    removeDirectoryItem("doctors", id);
    refresh();
    setStatus("success");
    setMessage("Doctor removed.");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 border border-border hover:bg-primary/10"
              onClick={() => router.push(route.dashboard.path)}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              <span className="sr-only">Back to dashboard</span>
            </Button>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Directory
              </p>
              <h1 className="text-lg font-semibold text-foreground sm:text-xl">
                Manage Doctor Profiles
              </h1>
            </div>
          </div>
          <Link
            href={route.doctors.path}
            className="text-sm font-medium text-primary hover:text-primary/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            View live page
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <section className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
            <Stethoscope className="h-3.5 w-3.5" aria-hidden />
            Medical experts
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Highlight your trusted specialists
          </h2>
          <p className="text-sm text-muted-foreground">
            Add doctor credentials, special interests, and booking links.
            Updates appear instantly on the Doctors directory so patients can
            connect quickly.
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg border border-border bg-card/80 p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Doctor name *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="Dr. Aisha Mir"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Speciality & qualifications *</Label>
              <Input
                id="subtitle"
                value={form.subtitle}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, subtitle: event.target.value }))
                }
                placeholder="Cardiologist • MD, DM Cardiology"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Professional summary</Label>
            <textarea
              id="description"
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              rows={3}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              placeholder="Share experience, areas of interest, languages, or accolades."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Profile image URL *</Label>
              <Input
                id="imageUrl"
                value={form.imageUrl}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, imageUrl: event.target.value }))
                }
                placeholder="https://"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Primary location / hospital</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, location: event.target.value }))
                }
                placeholder="SKIMS, Srinagar"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (0 - 5)</Label>
              <Input
                id="rating"
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={form.rating}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, rating: event.target.value }))
                }
                placeholder="4.9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewCount">Review count</Label>
              <Input
                id="reviewCount"
                type="number"
                min={0}
                value={form.reviewCount}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    reviewCount: event.target.value,
                  }))
                }
                placeholder="180"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tags">Focus areas (comma separated)</Label>
              <Input
                id="tags"
                value={form.tags}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, tags: event.target.value }))
                }
                placeholder="Interventional cardiology, Preventive cardiology"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="services">
                Services offered (comma separated)
              </Label>
              <Input
                id="services"
                value={form.services}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, services: event.target.value }))
                }
                placeholder="Video consult, In-person, Emergency cover"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Direct phone / assistant</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, phone: event.target.value }))
                }
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="directionsUrl">Practice location link</Label>
              <Input
                id="directionsUrl"
                value={form.directionsUrl}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    directionsUrl: event.target.value,
                  }))
                }
                placeholder="https://maps.google.com/..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointmentUrl">
              Booking / consultation link *
            </Label>
            <Input
              id="appointmentUrl"
              value={form.appointmentUrl}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  appointmentUrl: event.target.value,
                }))
              }
              placeholder="https://calendly.com/..."
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            {status !== "idle" && (
              <div
                className={`flex items-center gap-2 text-sm ${
                  status === "success" ? "text-emerald-600" : "text-destructive"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle className="h-4 w-4" aria-hidden />
                ) : (
                  <AlertCircle className="h-4 w-4" aria-hidden />
                )}
                <span>{message}</span>
              </div>
            )}
            <Button type="submit" className="ml-auto">
              Apply updates
            </Button>
          </div>
        </form>

        <section className="mt-12 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Published doctors
            </h3>
            <span className="text-sm text-muted-foreground">
              {items.length} {items.length === 1 ? "profile" : "profiles"}
            </span>
          </div>

          {items.length === 0 ? (
            <Card className="border-dashed border-border/70 bg-muted/20 p-6 text-center text-sm text-muted-foreground">
              No doctor profiles published yet. Add one to guide patients to the
              right specialist.
            </Card>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className="border-border/70 bg-card/80 p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.subtitle}
                      </p>
                      {item.location && (
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Practising at:
                          </span>{" "}
                          {item.location}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 text-xs">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.services.map((service) => (
                          <span
                            key={service}
                            className="rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        {typeof item.rating === "number" && (
                          <span className="rounded-full bg-emerald-50 px-2 py-1 font-medium text-emerald-700">
                            Rating {item.rating.toFixed(1)}
                          </span>
                        )}
                        {typeof item.reviewCount === "number" && (
                          <span>{item.reviewCount} reviews</span>
                        )}
                        {item.phone && <span>📞 {item.phone}</span>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:items-end">
                      <div className="flex gap-2">
                        {item.directionsUrl && (
                          <Button
                            asChild
                            variant="outline"
                            className="h-9 px-3 text-xs"
                          >
                            <a
                              href={item.directionsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Directions
                            </a>
                          </Button>
                        )}
                        {item.appointmentUrl && (
                          <Button asChild className="h-9 px-3 text-xs">
                            <a
                              href={item.appointmentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Book
                            </a>
                          </Button>
                        )}
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-2 h-9 px-3 text-xs"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" aria-hidden />
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
