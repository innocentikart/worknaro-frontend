import type { Metadata } from "next";
import { ResourcesLanding } from "@/components/ResourcesLanding";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Organitio resources and product guides. More documentation will appear here as it becomes available.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return <ResourcesLanding />;
}
