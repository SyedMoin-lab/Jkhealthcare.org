import { loadPatientsContent } from "@/lib/patients-content";
import { PatientsPageClient } from "./_components/patients-page-client";

export const dynamic = "force-dynamic";

export default async function PatientsPage() {
  const content = await loadPatientsContent();
  return <PatientsPageClient content={content} />;
}
