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
  Building2,
  Globe2,
  Link as LinkIcon,
  Mail,
  PhoneIcon,
  ShieldCheck,
  UserIcon,
} from "lucide-react";

type PartnershipFormState = {
  organizationName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  location: string;
  organizationType: string;
  servicesProvided: string;
  monthlyPatientVolume: string;
  website: string;
  preferredContactTime: string;
  message: string;
  consent: boolean;
};

type PartnershipFormProps = {
  title?: string;
  description?: string;
  ctaText?: string;
};

const initialState: PartnershipFormState = {
  organizationName: "",
  contactName: "",
  email: "",
  phoneNumber: "",
  location: "",
  organizationType: "",
  servicesProvided: "",
  monthlyPatientVolume: "",
  website: "",
  preferredContactTime: "",
  message: "",
  consent: false,
};

const organizationTypes = [
  "Hospital",
  "Clinic",
  "Diagnostic Center",
  "Insurance Provider",
  "Employer",
  "Telehealth Platform",
  "Other",
] as const;

const patientVolumeOptions = [
  "Under 100",
  "100 - 250",
  "250 - 500",
  "500 - 1000",
  "1000+",
] as const;

const contactTimeOptions = [
  "Morning (9 AM - 12 PM)",
  "Afternoon (12 PM - 3 PM)",
  "Evening (3 PM - 6 PM)",
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

export function PartnershipForm({
  title = "Partner with JK Healthcare",
  description = "Share a few details and our partnerships team will schedule a discovery call within one business day.",
  ctaText = "Request a call back",
}: PartnershipFormProps) {
  const [formState, setFormState] = useState<PartnershipFormState>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isSubmitDisabled = useMemo(
    () =>
      !formState.organizationName.trim() ||
      !formState.contactName.trim() ||
      !formState.email.trim() ||
      !formState.phoneNumber.trim() ||
      !formState.consent ||
      isLoading,
    [
      formState.consent,
      formState.contactName,
      formState.email,
      formState.organizationName,
      formState.phoneNumber,
      isLoading,
    ],
  );

  const handleChange = <Field extends keyof PartnershipFormState>(
    field: Field,
    value: PartnershipFormState[Field],
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    if (!formState.organizationName.trim()) {
      setError("Please share the organization name so we know who to speak with.");
      return false;
    }

    if (!formState.contactName.trim()) {
      setError("Let us know the best contact person for this partnership.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      setError("Please enter a valid work email address.");
      return false;
    }

    const digits = formState.phoneNumber.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Please provide a valid phone number where we can reach you.");
      return false;
    }

    if (!formState.consent) {
      setError("Please confirm you are comfortable with us reaching out.");
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
          formType: "partner" as const,
          data: {
            organizationName: formState.organizationName.trim(),
            contactName: formState.contactName.trim(),
            email: formState.email.trim(),
            phoneNumber: formattedPhone,
            location: formState.location.trim() || undefined,
            organizationType: formState.organizationType || undefined,
            servicesProvided: formState.servicesProvided.trim() || undefined,
            monthlyPatientVolume: formState.monthlyPatientVolume || undefined,
            website: formState.website.trim() || undefined,
            preferredContactTime: formState.preferredContactTime || undefined,
            message: formState.message.trim() || undefined,
            consent: formState.consent,
          },
        }),
      });

      if (!response.ok) {
        const message = await response.text().catch(() => "");
        throw new Error(
          message || "We couldn't save your request. Please try again.",
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-blue-900">
            Thanks for reaching out!
          </h3>
          <p className="text-sm text-muted-foreground">
            Our partnerships team will get in touch to understand your requirements and next steps.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="w-full"
            variant="outline"
          >
            Submit another enquiry
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
            <Label htmlFor="organizationName" className="flex items-center gap-1">
              Organization Name <Asterisk className="h-3 w-3 text-red-500" />
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="organizationName"
                name="organizationName"
                placeholder="Clinic or company name"
                className="pl-10"
                value={formState.organizationName}
                onChange={(event) => handleChange("organizationName", event.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactName" className="flex items-center gap-1">
              Contact Person <Asterisk className="h-3 w-3 text-red-500" />
            </Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="contactName"
                name="contactName"
                placeholder="Your name"
                className="pl-10"
                value={formState.contactName}
                onChange={(event) => handleChange("contactName", event.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-1">
              Work Email <Asterisk className="h-3 w-3 text-red-500" />
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                className="pl-10"
                value={formState.email}
                onChange={(event) => handleChange("email", event.target.value)}
                required
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

          <div className="space-y-2">
            <Label htmlFor="location">Headquarters / Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="City, Country"
              value={formState.location}
              onChange={(event) => handleChange("location", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organizationType">Organization Type</Label>
            <div className="relative">
              <Globe2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                id="organizationType"
                name="organizationType"
                className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
                value={formState.organizationType}
                onChange={(event) => handleChange("organizationType", event.target.value)}
              >
                <option value="">Select type</option>
                {organizationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyPatientVolume">Monthly patient volume</Label>
            <select
              id="monthlyPatientVolume"
              name="monthlyPatientVolume"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
              value={formState.monthlyPatientVolume}
              onChange={(event) => handleChange("monthlyPatientVolume", event.target.value)}
            >
              <option value="">Estimate volume</option>
              {patientVolumeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="website"
                name="website"
                type="url"
                placeholder="https://"
                className="pl-10"
                value={formState.website}
                onChange={(event) => handleChange("website", event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredContactTime">Preferred contact time</Label>
            <select
              id="preferredContactTime"
              name="preferredContactTime"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
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

          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <Label htmlFor="servicesProvided">Services offered</Label>
            <textarea
              id="servicesProvided"
              name="servicesProvided"
              rows={3}
              placeholder="Tell us about the services or specialties you offer."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
              value={formState.servicesProvided}
              onChange={(event) => handleChange("servicesProvided", event.target.value)}
            />
          </div>

          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <Label htmlFor="message">What would you like to explore?</Label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Share your partnership goals or questions."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
              value={formState.message}
              onChange={(event) => handleChange("message", event.target.value)}
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
                  I agree to be contacted{" "}
                  <Asterisk className="h-3 w-3 text-red-500" />
                </Label>
                <p className="text-xs text-muted-foreground">
                  We will only use these details to follow up on your partnership enquiry.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-3 sm:flex-row sm:items-center sm:justify-end">
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitDisabled}>
              {isLoading ? "Submitting..." : ctaText}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default PartnershipForm;
