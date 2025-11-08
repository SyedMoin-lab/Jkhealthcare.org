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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Asterisk,
  ClipboardList,
  ClockIcon,
  Globe2,
  MapPinIcon,
  Mail,
  PhoneIcon,
  ShieldCheck,
  UserIcon,
} from "lucide-react";

type PatientFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  preferredLanguage: string;
  preferredContactMethod: string;
  preferredContactTime: string;
  reasonForVisit: string;
  insuranceProvider: string;
  additionalNotes: string;
  consent: boolean;
};

type PatientFormProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
};

const initialState: PatientFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  location: "",
  preferredLanguage: "",
  preferredContactMethod: "",
  preferredContactTime: "",
  reasonForVisit: "",
  insuranceProvider: "",
  additionalNotes: "",
  consent: false,
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

const contactMethodOptions = ["Phone Call", "WhatsApp", "Email"] as const;

const contactTimeOptions = [
  "Morning (8 AM - 11 AM)",
  "Midday (11 AM - 2 PM)",
  "Afternoon (2 PM - 5 PM)",
  "Evening (5 PM - 8 PM)",
  "Anytime",
] as const;

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

export function PatientForm({
  title = "Patient Assistance",
  description = "Tell us a little about your medical need and our coordination team will reach out within minutes.",
  ctaLabel = "Request care coordination",
}: PatientFormProps) {
  const [formState, setFormState] = useState<PatientFormState>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isSubmitDisabled = useMemo(
    () =>
      !formState.firstName.trim() ||
      !formState.location.trim() ||
      !formState.phoneNumber.trim() ||
      !formState.consent ||
      isLoading,
    [
      formState.consent,
      formState.firstName,
      formState.location,
      formState.phoneNumber,
      isLoading,
    ],
  );

  const handleChange = <Field extends keyof PatientFormState>(
    field: Field,
    value: PatientFormState[Field],
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    if (!formState.firstName.trim()) {
      setError("Please tell us who we are helping.");
      return false;
    }

    if (!formState.location.trim()) {
      setError("We need your location to connect you to the nearest facility.");
      return false;
    }

    const digits = formState.phoneNumber.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Please enter a valid phone number so we can coordinate care.");
      return false;
    }

    if (
      formState.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)
    ) {
      setError("The email address seems invalid. Could you double-check it?");
      return false;
    }

    if (!formState.consent) {
      setError("Please confirm you consent to being contacted by our team.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setError(null);

    const formattedPhone = normalizePhoneNumber(formState.phoneNumber);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "patient" as const,
          data: {
            firstName: formState.firstName.trim(),
            lastName: formState.lastName.trim() || undefined,
            email: formState.email.trim() || undefined,
            phoneNumber: formattedPhone,
            location: formState.location.trim(),
            preferredLanguage: formState.preferredLanguage || undefined,
            preferredContactMethod:
              formState.preferredContactMethod || undefined,
            preferredContactTime: formState.preferredContactTime || undefined,
            reasonForVisit: formState.reasonForVisit.trim() || undefined,
            insuranceProvider:
              formState.insuranceProvider.trim() || undefined,
            additionalNotes: formState.additionalNotes.trim() || undefined,
            consent: formState.consent,
          },
        }),
      });

      if (!response.ok) {
        const message = await response.text().catch(() => "");
        throw new Error(
          message || "We couldn't save your request. Please try once more.",
        );
      }

      setIsSubmitted(true);
      setFormState(initialState);
    } catch (submissionError) {
      if (submissionError instanceof Error) {
        setError(submissionError.message);
      } else {
        setError("Something went wrong. Please try again in a moment.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="mx-auto w-full max-w-xl">
        <CardContent className="space-y-4 pt-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <ShieldCheck className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-800">
            We have your request!
          </h3>
          <p className="text-sm text-muted-foreground">
            A care coordinator will contact you shortly to guide the next steps.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="w-full"
            variant="outline"
          >
            Submit another request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
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
              <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="firstName"
                name="firstName"
                placeholder="Priya"
                className="pl-10"
                value={formState.firstName}
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
              placeholder="Menon"
              value={formState.lastName}
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
                value={formState.email}
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
                maxLength={10}
                value={formState.phoneNumber}
                onChange={(event) => handleChange("phoneNumber", event.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2 sm:col-span-2 lg:col-span-1">
            <Label htmlFor="location" className="flex items-center gap-1">
              Location <Asterisk className="h-3 w-3 text-red-500" />
            </Label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="location"
                name="location"
                placeholder="City or neighbourhood"
                className="pl-10"
                value={formState.location}
                onChange={(event) => handleChange("location", event.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredLanguage">Preferred Language</Label>
            <div className="relative">
              <Globe2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                id="preferredLanguage"
                name="preferredLanguage"
                className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
                value={formState.preferredLanguage}
                onChange={(event) => handleChange("preferredLanguage", event.target.value)}
              >
                <option value="">Let us know</option>
                {languageOptions.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                id="preferredContactMethod"
                name="preferredContactMethod"
                className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
                value={formState.preferredContactMethod}
                onChange={(event) => handleChange("preferredContactMethod", event.target.value)}
              >
                <option value="">Any channel works</option>
                {contactMethodOptions.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredContactTime">Preferred Contact Time</Label>
            <div className="relative">
              <ClockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                id="preferredContactTime"
                name="preferredContactTime"
                className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
                value={formState.preferredContactTime}
                onChange={(event) => handleChange("preferredContactTime", event.target.value)}
              >
                <option value="">Anytime works</option>
                {contactTimeOptions.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="insuranceProvider">Insurance Provider</Label>
            <Input
              id="insuranceProvider"
              name="insuranceProvider"
              placeholder="If applicable"
              value={formState.insuranceProvider}
              onChange={(event) => handleChange("insuranceProvider", event.target.value)}
            />
          </div>

          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <Label htmlFor="reasonForVisit">Reason for Visit</Label>
            <div className="relative">
              <ClipboardList className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <textarea
                id="reasonForVisit"
                name="reasonForVisit"
                rows={3}
                placeholder="Describe the symptoms or care needed."
                className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
                value={formState.reasonForVisit}
                onChange={(event) => handleChange("reasonForVisit", event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows={3}
              placeholder="Allergies, past surgeries, or anything else we should know."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
              value={formState.additionalNotes}
              onChange={(event) => handleChange("additionalNotes", event.target.value)}
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <div className="flex items-start gap-3 rounded-md border border-muted bg-muted/30 p-4">
              <Checkbox
                id="consent"
                checked={formState.consent}
                onCheckedChange={(checked) =>
                  handleChange("consent", checked === true)
                }
              />
              <div className="space-y-1">
                <Label
                  htmlFor="consent"
                  className="flex items-center gap-1 text-sm font-medium text-foreground"
                >
                  I consent to be contacted{" "}
                  <Asterisk className="h-3 w-3 text-red-500" />
                </Label>
                <p className="text-xs text-muted-foreground">
                  We will use this information strictly to coordinate medical care and will
                  never share it without your permission.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-3 sm:flex-row sm:items-center sm:justify-end">
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitDisabled}>
              {isLoading ? "Submitting..." : ctaLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default PatientForm;
