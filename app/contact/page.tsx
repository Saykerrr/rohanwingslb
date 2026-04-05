import { client, BRANCHES_QUERY } from "@/lib/sanity";
import { ContactClient } from "@/components/ContactClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Find our branches in Lebanon or reach us on WhatsApp. We're here to help.",
};

export const revalidate = 300;

const demoBranches = [
  {
    _id: "branch-1",
    name: "Rohan Wings — Beirut (Main)",
    phone: "+961 71 234 567",
    whatsappNumber: "96171234567",
    mapsLink: "https://maps.google.com/?q=Beirut,Lebanon",
    address: "Hamra Street, Beirut",
  },
  {
    _id: "branch-2",
    name: "Rohan Wings — Jounieh",
    phone: "+961 76 234 567",
    whatsappNumber: "96176234567",
    mapsLink: "https://maps.google.com/?q=Jounieh,Lebanon",
    address: "Highway Street, Jounieh",
  },
  {
    _id: "branch-3",
    name: "Rohan Wings — Verdun",
    phone: "+961 78 234 567",
    whatsappNumber: "96178234567",
    mapsLink: "https://maps.google.com/?q=Verdun,Beirut",
    address: "Verdun, Beirut",
  },
];

export default async function ContactPage() {
  let branches = [];
  try {
    branches = await client.fetch(BRANCHES_QUERY);
  } catch {
    // Sanity not configured
  }

  if (!branches.length) branches = demoBranches;

  return <ContactClient branches={branches} />;
}
