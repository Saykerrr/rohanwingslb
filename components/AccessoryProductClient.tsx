"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ACCESSORIES, type Accessory } from "@/lib/data";
import { AccSVG } from "@/components/ScooterSVG";
import { useStore } from "@/lib/store";
import toast from "react-hot-toast";
import Link from "next/link";

const F = "'Oswald', sans-serif";

interface Props {
  accessory: Accessory;
  related: Accessory[];
}

export function AccessoryProductClient({ accessory: acc, related }: Props) {
  const router = useRouter();
  const { addToCart } = useStore();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const addCart = () => {
    addToCart({ id: String(acc.id), name: acc.name, price: acc.price, type: "accessory", slug: String(acc.id) });
    toast.success(`${acc.name} added to cart`);
  };

  const catLabel =
    acc.cat === "Protection" ? "Protective Gear"
    : acc.cat === "Gear" ? "Riding Accessories"
    : "Spare Parts";

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div className="prod-wrap" style={{ maxWidth: 1000, margin: "0 auto", padding: "32px" }}>

        {/* Back */}
        <button
          onClick={() => router.push("/#accessories")}
          style={{ color: "#555", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontFamily: F, background: "none", border: "none", cursor: "pointer", marginBottom: 32, display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Accessories
        </button>

        {/* Product */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 60 }} className="acc-detail-grid">
          {/* Visual */}
          <div style={{ background: "#F9FAFB", borderRadius: 20, border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 280, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 60%, ${acc.color}18 0%, transparent 65%)` }} />
            <div style={{ width: 120, height: 120, zIndex: 1 }}>
              <AccSVG type={acc.cat} color={acc.color} itemId={acc.id} />
            </div>
          </div>

          {/* Info */}
          <div>
            <span style={{ fontSize: 11, color: "#DC2626", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", fontFamily: F }}>{catLabel}</span>
            <h1 style={{ fontSize: 36, fontWeight: 800, fontFamily: F, textTransform: "uppercase", margin: "6px 0 16px", lineHeight: 1.1 }}>{acc.name}</h1>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, marginBottom: 24 }}>{acc.full}</p>

            {/* Price + CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 36, fontWeight: 800, fontFamily: F, color: "#DC2626" }}>${acc.price}</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={addCart}
                style={{ flex: 1, background: "#DC2626", color: "#fff", border: "none", borderRadius: 10, padding: "14px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase", transition: "background .2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#B91C1C")}
                onMouseLeave={e => (e.currentTarget.style.background = "#DC2626")}
              >
                Add to Cart
              </button>
              <a
                href={`https://wa.me/96179185184?text=${encodeURIComponent(`Hi! I'm interested in the ${acc.name} ($${acc.price}). Is it available?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: "#25D366", color: "#fff", border: "none", borderRadius: 10, padding: "14px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.716-1.244A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.326-.672-6.064-1.826l-.424-.282-3.106.819.863-3.151-.306-.488A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Inquire
              </a>
            </div>

            {/* Category badge */}
            <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ background: "#FEF2F2", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, fontFamily: F, letterSpacing: 1, color: "#DC2626" }}>{acc.cat}</div>
              <div style={{ background: "#F9FAFB", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, fontFamily: F, letterSpacing: 1, color: "#555" }}>Free delivery available</div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, fontFamily: F, textTransform: "uppercase", marginBottom: 20 }}>
              More in {acc.cat}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {related.map(r => (
                <Link key={r.id} href={`/accessories/${r.id}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 14, padding: 16, cursor: "pointer", transition: "all .3s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#DC2626"; (e.currentTarget as HTMLDivElement).style.background = "#FEF2F2"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLDivElement).style.background = "#F9FAFB"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: "#fff", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <AccSVG type={r.cat} color={r.color} itemId={r.id} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: "#111" }}>{r.name}</div>
                        <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{r.desc.substring(0, 50)}...</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                      <span style={{ fontFamily: F, fontWeight: 800, fontSize: 18, color: "#DC2626" }}>${r.price}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#888", fontFamily: F }}>View →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
