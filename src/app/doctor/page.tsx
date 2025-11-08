import { Suspense } from "react";
import DoctorsClient from "./doctor-client";

function DoctorsFallback() {
  return (
    <div className="min-h-screen bg-background">
      <div className="jk-container flex flex-col items-center justify-center gap-4 py-28 text-center">
        <div className="text-sm font-medium text-muted-foreground">
          Loading doctor directory…
        </div>
      </div>
    </div>
  );
}

export default function DoctorsPage() {
  return (
    <Suspense fallback={<DoctorsFallback />}>
      <DoctorsClient />
    </Suspense>
  );
}
