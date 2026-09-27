import type { Metadata } from "next";
import { ContactLanding } from "@/components/ContactLanding";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Worknaro sales or create an account to get started with your workspace.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactLanding />;
}
