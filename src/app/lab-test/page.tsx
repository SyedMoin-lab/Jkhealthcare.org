import { Suspense } from "react";
import LabTestsClient from "./lab-test-client";

function LabTestsFallback() {
  return (
    <div className="min-h-screen bg-background">
      <div className="jk-container flex flex-col items-center justify-center gap-4 py-28 text-center">
        <div className="text-sm font-medium text-muted-foreground">
          Loading lab tests…
        </div>
      </div>
    </div>
  );
}

export default function LabTestsPage() {
  return (
    <Suspense fallback={<LabTestsFallback />}>
      <LabTestsClient />
    </Suspense>
  );
}
