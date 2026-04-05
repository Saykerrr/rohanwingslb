import { ACCESSORIES } from "@/lib/data";
import { AccessoryProductClient } from "@/components/AccessoryProductClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ACCESSORIES.map(a => ({ id: String(a.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const acc = ACCESSORIES.find(a => String(a.id) === id);
  if (!acc) return { title: "Not Found" };
  return { title: acc.name, description: acc.desc };
}

export default async function AccessoryPage({ params }: PageProps) {
  const { id } = await params;
  const acc = ACCESSORIES.find(a => String(a.id) === id);
  if (!acc) notFound();

  const related = ACCESSORIES.filter(a => a.id !== acc.id && a.cat === acc.cat).slice(0, 4);

  return <AccessoryProductClient accessory={acc} related={related} />;
}
