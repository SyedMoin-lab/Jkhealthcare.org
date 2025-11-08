import { Suspense } from "react";
import FindCentersClient from "./find-centers-client";

function FindCentersFallback() {
  return (
    <div className="min-h-screen bg-background">
      <div className="jk-container flex flex-col items-center justify-center gap-4 py-28 text-center">
        <div className="text-sm font-medium text-muted-foreground">
          Loading healthcare centers…
        </div>
      </div>
    </div>
  );
}

export default function FindCentersPage() {
  return (
    <Suspense fallback={<FindCentersFallback />}>
      <FindCentersClient />
    </Suspense>
  );
}
