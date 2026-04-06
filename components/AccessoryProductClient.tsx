"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { type Accessory, type ColorOption } from "@/lib/data";
import { AccSVG } from "@/components/ScooterSVG";
import { useStore } from "@/lib/store";
import toast from "react-hot-toast";

const F = "'Oswald', sans-serif";

function ColorPicker({ options, selected, onSelect }: { options: ColorOption[]; selected: string; onSelect: (name: string) => void }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: F, letterSpacing: 1, textTransform: "uppercase", color: "#555" }}>Color:</span>
        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: F, color: "#111" }}>{selected}</span>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {options.map(c => (
          <button key={c.name} onClick={() => onSelect(c.name)} title={c.name}
            style={{ width: 34, height: 34, borderRadius: "50%", background: c.hex, border: selected === c.name ? "3px solid #DC2626" : "2px solid #E5E7EB", cursor: "pointer", boxShadow: selected === c.name ? "0 0 0 2px #fff, 0 0 0 4px #DC2626" : "0 1px 3px rgba(0,0,0,.15)", transition: "all .2s", outline: "none", padding: 0 }}
          />
        ))}
      </div>
    </div>
  );
}

interface Props {
  accessory: Accessory;
  related: Accessory[];
}

export function AccessoryProductClient({ accessory: acc, related }: Props) {
  const [selectedColor, setSelectedColor] = useState(acc.colorOptions?.[0]?.name ?? "");
  const { addToCart } = useStore();
  const router = useRouter();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleAddToCart = () => {
    addToCart({ id: String(acc.id), name: acc.name, price: acc.price, type: "accessory", slug: String(acc.id) });
    toast.success(`${acc.name} added to cart`);
  };

  const handleWhatsApp = () => {
    const colorPart = selectedColor ? ` – Color: ${selectedColor}` : "";
    const m = `Hi! I'm interested in the ${acc.name}${colorPart} ($${acc.price}). Is it available?`;
    window.open(`https://wa.me/96179185184?text=${encodeURIComponent(m)}`, "_blank");
  };

  const catLabel =
    acc.cat === "Protection" ? "Protective Gear"
    : acc.cat === "Gear" ? "Riding Accessories"
    : "Spare Parts";

  return (
    <div style={{ fontFamily: "'Inter',-apple-system,sans-serif" }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 32px" }}>
        <button onClick={() => router.push("/")} style={{ color: "#555", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontFamily: F, background: "none", border: "none", cursor: "pointer" }}>Home</button>
        <span style={{ color: "#ccc", margin: "0 6px", fontSize: 12 }}>/</span>
        <button onClick={() => { router.push("/"); setTimeout(() => document.getElementById("accessories")?.scrollIntoView({ behavior: "smooth" }), 300); }} style={{ color: "#555", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontFamily: F, background: "none", border: "none", cursor: "pointer" }}>Accessories</button>
        <span style={{ color: "#ccc", margin: "0 6px", fontSize: 12 }}>/</span>
        <span style={{ color: "#DC2626", fontSize: 12, fontWeight: 600, fontFamily: F, letterSpacing: 1 }}>{acc.name}</span>
      </div>

      <div className="prod-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 64px" }}>
        <div className="prod-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>

          {/* Image */}
          <div>
            <div style={{ background: "#F9FAFB", borderRadius: 16, border: "1px solid #E5E7EB", height: 380, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 60%,${acc.color}18 0%,transparent 60%)` }} />
              <div style={{ zIndex: 1, transform: "scale(4.5)", transformOrigin: "center" }}>
                <AccSVG type={acc.cat} color={acc.color} itemId={acc.id} />
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <span style={{ color: "#DC2626", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", fontFamily: F }}>{catLabel}</span>
            <h1 style={{ fontSize: 36, fontWeight: 800, fontFamily: F, marginTop: 4, textTransform: "uppercase" }}>{acc.name}</h1>
            <div style={{ fontSize: 32, fontWeight: 800, fontFamily: F, color: "#DC2626", marginTop: 10 }}>${acc.price}</div>
            <p style={{ color: "#555", fontSize: 15, lineHeight: 1.7, marginTop: 18 }}>{acc.full || acc.desc}</p>

            {acc.colorOptions && acc.colorOptions.length > 0 && (
              <ColorPicker options={acc.colorOptions} selected={selectedColor} onSelect={setSelectedColor} />
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <button onClick={handleAddToCart}
                style={{ background: "#DC2626", color: "#fff", border: "none", borderRadius: 10, padding: "14px 36px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase", transition: "all .3s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#B91C1C")}
                onMouseLeave={e => (e.currentTarget.style.background = "#DC2626")}
              >Add to Cart</button>
              <button onClick={handleWhatsApp}
                style={{ background: "transparent", color: "#111", border: "2px solid #E5E7EB", borderRadius: 10, padding: "14px 36px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase", transition: "all .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#DC2626"; (e.currentTarget as HTMLButtonElement).style.color = "#DC2626"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLButtonElement).style.color = "#111"; }}
              >Inquire on WhatsApp</button>
            </div>

            {/* Category badge */}
            <div style={{ marginTop: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: F, letterSpacing: 2, textTransform: "uppercase", color: "#DC2626", marginBottom: 12 }}>Category</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "#E5E7EB", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ background: "#F9FAFB", padding: "12px 14px" }}>
                  <div style={{ fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Type</div>
                  <div style={{ fontSize: 13, color: "#111", fontWeight: 600, fontFamily: F }}>{catLabel}</div>
                </div>
                <div style={{ background: "#F9FAFB", padding: "12px 14px" }}>
                  <div style={{ fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Category</div>
                  <div style={{ fontSize: 13, color: "#111", fontWeight: 600, fontFamily: F }}>{acc.cat}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {related.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, fontFamily: F, textTransform: "uppercase", marginBottom: 16 }}>You May Also Like</h3>
            <div style={{ display: "flex", gap: 16, overflowX: "auto", padding: "8px 0", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
              {related.map(r => (
                <div key={r.id} onClick={() => router.push(`/accessories/${r.id}`)}
                  style={{ minWidth: 220, maxWidth: 220, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "all .3s", scrollSnapAlign: "start", flexShrink: 0 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#DC2626"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(220,38,38,.08)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center", background: "#F9FAFB" }}>
                    <div style={{ transform: "scale(2.5)", transformOrigin: "center" }}>
                      <AccSVG type={r.cat} color={r.color} itemId={r.id} />
                    </div>
                  </div>
                  <div style={{ padding: "10px 14px 14px" }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, fontFamily: F, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, fontFamily: F }}>${r.price}</span>
                      <span style={{ fontSize: 10, color: "#DC2626", fontWeight: 700, fontFamily: F, letterSpacing: 1 }}>VIEW</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
