import Image from "next/image";
import Link from "next/link";
import { Header } from "@/common/layout/header";
import { Footer } from "@/common/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Star } from "lucide-react";
import { loadDoctorProfiles } from "@/lib/doctor-profiles";
import { route } from "@/common/config/route";

export default async function DoctorsListPage() {
  const doctors = await loadDoctorProfiles();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="pt-24 pb-12">
          <div className="jk-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Handpicked Experts
              </p>
              <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-5xl">
                Doctors recommended by JK Healthcare AI
              </h1>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                Browse verified specialists across Kashmir. Every profile is reviewed with medical credentials, experience, and patient impact metrics so you can book with confidence.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {doctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="flex flex-col gap-6 border-border/70 bg-card/90 p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-muted lg:h-48 lg:w-48">
                      {doctor.photo ? (
                        <Image
                          src={doctor.photo.src}
                          alt={doctor.photo.alt ?? doctor.name}
                          width={400}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                          Photo pending
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h2 className="text-2xl font-semibold text-foreground">{doctor.name}</h2>
                        {doctor.degrees.length > 0 && (
                          <p className="text-sm text-muted-foreground">
                            {doctor.degrees.join(" • ")}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {doctor.licenseNumber && (
                          <span>
                            License:{" "}
                            <strong className="font-semibold text-foreground">
                              {doctor.licenseNumber}
                            </strong>
                          </span>
                        )}
                        {doctor.yearsExperience !== undefined && (
                          <span>
                            Experience:{" "}
                            <strong className="font-semibold text-foreground">
                              {doctor.yearsExperience}+ yrs
                            </strong>
                          </span>
                        )}
                        {doctor.patientsTreated !== undefined && (
                          <span>
                            Patients treated:{" "}
                            <strong className="font-semibold text-foreground">
                              {doctor.patientsTreated.toLocaleString()}
                            </strong>
                          </span>
                        )}
                      </div>
                      {doctor.rating !== undefined && (
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                          <Star className="h-4 w-4" fill="currentColor" />
                          {doctor.rating.toFixed(1)} / 5.0
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 text-sm text-muted-foreground lg:grid-cols-2">
                    {doctor.location && (
                      <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                          Consultation Location
                        </p>
                        <p className="mt-2 text-base text-foreground">{doctor.location}</p>
                      </div>
                    )}
                    {doctor.awards.length > 0 && (
                      <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                          Awards
                        </p>
                        <p className="mt-2 text-base text-foreground">{doctor.awards.join(", ")}</p>
                      </div>
                    )}
                  </div>

                  {(doctor.specialization || doctor.superSpecialization) && (
                    <div className="rounded-xl border border-dashed border-border/70 p-4">
                      <div className="grid gap-4 text-sm sm:grid-cols-2">
                        {doctor.specialization && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                              Specialization
                            </p>
                            <p className="mt-1 text-base text-foreground">{doctor.specialization}</p>
                          </div>
                        )}
                        {doctor.superSpecialization && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                              Super Specialization
                            </p>
                            <p className="mt-1 text-base text-foreground">
                              {doctor.superSpecialization}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <Button asChild className="px-6">
                      <Link href={doctor.bookUrl ?? route.contact.path} target="_blank">
                        Book Consultation
                      </Link>
                    </Button>
                    {doctor.phoneNumber && (
                      <Button variant="outline" asChild className="px-4">
                        <Link href={`tel:${doctor.phoneNumber.replace(/\\s+/g, "")}`}>
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Link>
                      </Button>
                    )}
                    <span className="text-xs text-muted-foreground">
                      Verified by JK Healthcare AI • Response within 12 hours
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
