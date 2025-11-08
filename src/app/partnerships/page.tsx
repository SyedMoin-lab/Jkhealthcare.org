import { loadPartnershipsContent } from "@/lib/partnerships-content";
import { PartnershipsPageClient } from "./_components/partnerships-page-client";

export const dynamic = "force-dynamic";

export default async function PartnershipsPage() {
  const content = await loadPartnershipsContent();
  return <PartnershipsPageClient content={content} />;
}
