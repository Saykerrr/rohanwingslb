import { Suspense } from "react";
import { CompareByIdClient } from "@/components/CompareByIdClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Scooters",
  description: "Compare electric scooter specs side by side to find your perfect ride.",
};

export default function ComparePage() {
  return (
    <div>
      <Suspense fallback={<div style={{ padding: 32, textAlign: "center", color: "#888" }}>Loading comparison...</div>}>
        <CompareByIdClient />
      </Suspense>
    </div>
  );
}
