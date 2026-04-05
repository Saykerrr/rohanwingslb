import { SCOOTERS, ACCESSORIES } from "@/lib/data";
import { ScooterProductClient } from "@/components/ScooterProductClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SCOOTERS.map(s => ({ slug: String(s.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const scooter = SCOOTERS.find(s => String(s.id) === slug);
  if (!scooter) return { title: "Not Found" };
  return { title: scooter.name, description: scooter.desc };
}

export default async function ScooterPage({ params }: PageProps) {
  const { slug } = await params;
  const scooter = SCOOTERS.find(s => String(s.id) === slug);
  if (!scooter) notFound();

  const related = SCOOTERS.filter(s => s.id !== scooter.id).slice(0, 3);

  return <ScooterProductClient scooter={scooter} related={related} accessories={ACCESSORIES} />;
}
