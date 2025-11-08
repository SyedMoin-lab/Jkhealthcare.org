"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asterisk, ClockIcon, Globe2, Mail, User } from "lucide-react";
import type { AICallFormData } from "@/lib/ai-call";

type ContactFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  preferredLanguage: string;
  preferredCallTime: string;
  message: string;
};

type ContactFormProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  showTitle?: boolean;
  onFormSubmit?: (data: AICallFormData & { email?: string }) => Promise<void> | void;
};

const languageOptions = [
  "English",
  "Hindi",
  "Kannada",
  "Tamil",
  "Telugu",
  "Malayalam",
  "Other",
] as const;

const callTimeOptions = [
  "8 AM - 11 AM",
  "11 AM - 2 PM",
  "2 PM - 5 PM",
  "5 PM - 8 PM",
  "Anytime",
] as const;

const initialState: ContactFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  location: "",
  preferredLanguage: "",
  preferredCallTime: "",
  message: "",
};

function normalizePhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("91") && digits.length === 12) {
    return `+${digits}`;
  }
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (digits.startsWith("0") && digits.length === 11) {
    return `+91${digits.slice(1)}`;
  }
  return `+${digits}`;
}

export function ContactForm({
  title = "Talk to an AI care coordinator",
  description = "Share your details and we will schedule an AI-assisted call tailored to your needs.",
  ctaLabel = "Request a Call",
  showTitle = true,
  onFormSubmit,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormFields>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isSubmitDisabled = useMemo(
    () =>
      !formData.firstName.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.location.trim() ||
      isLoading,
    [formData.firstName, formData.location, formData.phoneNumber, isLoading],
  );

  const handleChange = (
    field: keyof ContactFormFields,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    if (!formData.firstName.trim()) {
      setError("Please share your first name so we know how to address you.");
      return false;
    }

    const numericPhone = formData.phoneNumber.replace(/\D/g, "");
    if (numericPhone.length < 10) {
      setError("Please enter a valid phone number so we can reach you.");
      return false;
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("The email address you entered looks incorrect.");
      return false;
    }

    if (!formData.location.trim()) {
      setError("Let us know your city or area so we can route the call correctly.");
      return false;
    }

    setError(null);
    return true;
  };

  const submitToBackend = async (payload: {
    firstName: string;
    lastName?: string;
    email?: string;
    phoneNumber: string;
    location: string;
    preferredLanguage?: string;
    preferredCallTime?: string;
    message?: string;
  }) => {
    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "contact" as const,
        data: payload,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(errorText || "Failed to save your details. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setIsSubmitted(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setError(null);

    const formattedPhone = normalizePhoneNumber(formData.phoneNumber);

    try {
      await submitToBackend({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim() || undefined,
        email: formData.email.trim() || undefined,
        phoneNumber: formattedPhone,
        location: formData.location.trim(),
        preferredLanguage: formData.preferredLanguage || undefined,
        preferredCallTime: formData.preferredCallTime || undefined,
        message: formData.message.trim() || undefined,
      });

      if (onFormSubmit) {
        await onFormSubmit({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim() || undefined,
          phone: formattedPhone,
          location: formData.location.trim(),
        });
      }

      resetForm();
    } catch (submissionError) {
      if (submissionError instanceof Error) {
        setError(submissionError.message);
      } else {
        setError("Something went wrong while submitting the form.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">
            Request received!
          </CardTitle>
          <CardDescription>
            Our coordination team will reach out shortly at the number you shared.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            className="w-full"
            onClick={() => setIsSubmitted(false)}
          >
            Submit another request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl">
      {showTitle && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </CardHeader>
      )}
      <CardContent>
        {!showTitle && (
          <div className="space-y-2 mb-6">
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
        )}

        {error ? (
          <p className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <Label htmlFor="firstName" className="flex items-center gap-1">
              First Name <Asterisk className="h-3 w-3 text-red-500" />
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="firstName"
                name="firstName"
                placeholder="Alex"
                className="pl-10"
                value={formData.firstName}
                onChange={(event) => handleChange("firstName", event.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Sharma"
              value={formData.lastName}
              onChange={(event) => handleChange("lastName", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                value={formData.email}
                onChange={(event) => handleChange("email", event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="flex items-center gap-1">
              Phone Number <Asterisk className="h-3 w-3 text-red-500" />
            </Label>
            <div className="flex">
              <span className="inline-flex h-10 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                +91
              </span>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="9876543210"
                className="rounded-l-none"
                value={formData.phoneNumber}
                maxLength={10}
                onChange={(event) => handleChange("phoneNumber", event.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-1">
              City / Area <Asterisk className="h-3 w-3 text-red-500" />
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="Bengaluru, Koramangala"
              value={formData.location}
              onChange={(event) => handleChange("location", event.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredLanguage">Preferred Language</Label>
            <div className="relative">
              <Globe2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                id="preferredLanguage"
                name="preferredLanguage"
                className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.preferredLanguage}
                onChange={(event) => handleChange("preferredLanguage", event.target.value)}
              >
                <option value="">Select</option>
                {languageOptions.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredCallTime">Preferred Call Time</Label>
            <div className="relative">
              <ClockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                id="preferredCallTime"
                name="preferredCallTime"
                className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.preferredCallTime}
                onChange={(event) => handleChange("preferredCallTime", event.target.value)}
              >
                <option value="">Select</option>
                {callTimeOptions.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <Label htmlFor="message">How can we help?</Label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Share any symptoms or details we should know about."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.message}
              onChange={(event) => handleChange("message", event.target.value)}
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitDisabled}>
              {isLoading ? "Submitting..." : ctaLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ContactForm;


