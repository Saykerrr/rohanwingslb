"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ScooterSVG, AccSVG } from "@/components/ScooterSVG";
import { useStore } from "@/lib/store";
import { SCOOTERS, type Scooter, type Accessory } from "@/lib/data";
import toast from "react-hot-toast";

const F = "'Oswald', sans-serif";

interface Props {
  scooter: Scooter;
  related: Scooter[];
  accessories: Accessory[];
}

export function ScooterProductClient({ scooter: p, related, accessories }: Props) {
  const [galIdx, setGalIdx] = useState(0);
  const [compareOpen, setCompareOpen] = useState(false);
  const [cmpSearch, setCmpSearch] = useState("");
  const { addToCart } = useStore();
  const router = useRouter();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const specs = [
    { l: "Top Speed", v: p.speed }, { l: "Range", v: p.range }, { l: "Motor", v: p.motor },
    { l: "Weight", v: p.weight }, { l: "Battery", v: p.battery }, { l: "Brakes", v: p.brakes },
    { l: "Tires", v: p.tires }, { l: "Charge Time", v: p.charge }, { l: "Max Load", v: p.maxLoad },
    { l: "Suspension", v: p.suspension }, { l: "Waterproof", v: p.waterproof },
  ];

  const cmpFiltered = cmpSearch.length > 0
    ? SCOOTERS.filter(s => s.id !== p.id && s.name.toLowerCase().includes(cmpSearch.toLowerCase()))
    : SCOOTERS.filter(s => s.id !== p.id);

  const handleAddToCart = () => {
    addToCart({ id: String(p.id), name: p.name, price: p.price, type: "scooter", slug: String(p.id) });
    toast.success(`${p.name} added to cart`);
  };

  const handleWhatsApp = () => {
    const m = `Hi! I'm interested in the ${p.name} ($${p.price}). Is it available?`;
    window.open(`https://wa.me/96179185184?text=${encodeURIComponent(m)}`, "_blank");
  };

  return (
    <div style={{ fontFamily: "'Inter',-apple-system,sans-serif" }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 32px" }}>
        <button onClick={() => router.push("/")} style={{ color: "#555", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontFamily: F, background: "none", border: "none", cursor: "pointer" }}>Home</button>
        <span style={{ color: "#ccc", margin: "0 6px", fontSize: 12 }}>/</span>
        <button onClick={() => { router.push("/"); setTimeout(() => document.getElementById("scooters")?.scrollIntoView({ behavior: "smooth" }), 300); }} style={{ color: "#555", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontFamily: F, background: "none", border: "none", cursor: "pointer" }}>Scooters</button>
        <span style={{ color: "#ccc", margin: "0 6px", fontSize: 12 }}>/</span>
        <span style={{ color: "#DC2626", fontSize: 12, fontWeight: 600, fontFamily: F, letterSpacing: 1 }}>{p.name}</span>
      </div>

      <div className="prod-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 32px 64px" }}>
        <div className="prod-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          {/* Gallery */}
          <div>
            <div style={{ background: "#F9FAFB", borderRadius: 16, border: "1px solid #E5E7EB", height: 380, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 70%,${p.color}0A 0%,transparent 50%)` }}/>
              <div key={galIdx} style={{ width: 220, height: 160, zIndex: 1 }}>
                <ScooterSVG variant={galIdx % 3} accent={p.color} />
              </div>
              {p.badge && (
                <div style={{ position: "absolute", top: 12, right: 12, background: p.badge === "Flagship" ? "linear-gradient(135deg,#DC2626,#F59E0B)" : p.badge === "Premium" ? "linear-gradient(135deg,#7C3AED,#DC2626)" : "#DC2626", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: 1, textTransform: "uppercase", fontFamily: F }}>
                  {p.badge}
                </div>
              )}
              {/* Arrows */}
              <button onClick={() => setGalIdx(g => (g + 2) % 3)} style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", boxShadow: "0 2px 8px rgba(0,0,0,.08)", transition: "all .2s" }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#DC2626"; (e.currentTarget as HTMLButtonElement).style.background = "#FEF2F2"; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLButtonElement).style.background = "#fff"; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button onClick={() => setGalIdx(g => (g + 1) % 3)} style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", boxShadow: "0 2px 8px rgba(0,0,0,.08)", transition: "all .2s" }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#DC2626"; (e.currentTarget as HTMLButtonElement).style.background = "#FEF2F2"; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLButtonElement).style.background = "#fff"; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            {/* Thumbnails */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 10 }}>
              {[0, 1, 2].map(v => (
                <div key={v} onClick={() => setGalIdx(v)} style={{ background: "#F9FAFB", borderRadius: 10, border: galIdx === v ? "2px solid #DC2626" : "1px solid #E5E7EB", height: 80, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border .2s", boxShadow: galIdx === v ? "0 2px 8px rgba(220,38,38,.15)" : "none" }}>
                  <div style={{ width: 70, height: 50 }}>
                    <ScooterSVG variant={v} accent={galIdx === v ? p.color : "#ccc"} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <span style={{ color: "#DC2626", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", fontFamily: F }}>{p.cat}</span>
            <h1 style={{ fontSize: 36, fontWeight: 800, fontFamily: F, marginTop: 4, textTransform: "uppercase" }}>{p.name}</h1>
            <div style={{ fontSize: 32, fontWeight: 800, fontFamily: F, color: "#DC2626", marginTop: 10 }}>${p.price}</div>
            <p style={{ color: "#555", fontSize: 15, lineHeight: 1.7, marginTop: 18 }}>{p.full || p.desc}</p>

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

            {/* Specs + Compare */}
            <div style={{ marginTop: 32 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: F, letterSpacing: 2, textTransform: "uppercase", color: "#DC2626", margin: 0 }}>Full Specifications</h3>
                {/* Compare dropdown */}
                <div style={{ position: "relative" }}>
                  <button onClick={() => { setCompareOpen(!compareOpen); if (compareOpen) setCmpSearch(""); }}
                    style={{ display: "flex", alignItems: "center", gap: 8, background: compareOpen ? "#FEF2F2" : "#fff", border: compareOpen ? "1px solid #DC2626" : "1px solid #E5E7EB", borderRadius: 10, padding: "8px 14px", cursor: "pointer", transition: "all .2s" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
                    <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: compareOpen ? "#DC2626" : "#555", letterSpacing: .5 }}>Compare</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={compareOpen ? "#DC2626" : "#999"} strokeWidth="2.5" style={{ transition: "transform .2s", transform: compareOpen ? "rotate(180deg)" : "none" }}><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  {compareOpen && (
                    <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 6, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,.12)", width: "min(300px,calc(100vw - 48px))", maxHeight: 360, zIndex: 50, overflow: "hidden" }}>
                      <div style={{ padding: "10px 12px", borderBottom: "1px solid #F3F4F6", position: "relative" }}>
                        <input value={cmpSearch} onChange={e => setCmpSearch(e.target.value)} placeholder="Search scooters..."
                          style={{ width: "100%", padding: "8px 12px 8px 32px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 13, fontFamily: "Inter", outline: "none" }}
                        />
                        <svg style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", opacity: .4 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                      </div>
                      <div style={{ maxHeight: 280, overflowY: "auto" }}>
                        {cmpFiltered.map(o => (
                          <div key={o.id}
                            onClick={() => { setCompareOpen(false); setCmpSearch(""); router.push(`/compare?a=${p.id}&b=${o.id}`); }}
                            style={{ padding: "10px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #F9FAFB", transition: "background .15s" }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#FEF2F2")}
                            onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                          >
                            <div style={{ width: 36, height: 26, flexShrink: 0 }}><ScooterSVG variant={o.id % 3} accent={o.color} /></div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: "#111" }}>{o.name}</div>
                              <div style={{ fontSize: 11, color: "#888" }}>{o.cat}</div>
                            </div>
                            <span style={{ fontFamily: F, fontWeight: 800, fontSize: 13, color: "#DC2626" }}>${o.price}</span>
                          </div>
                        ))}
                        {cmpFiltered.length === 0 && <div style={{ padding: 16, textAlign: "center", color: "#999", fontSize: 13 }}>No scooters found</div>}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Specs grid */}
              <div className="specs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "#E5E7EB", borderRadius: 12, overflow: "hidden" }}>
                {specs.map(s => (
                  <div key={s.l} style={{ background: "#F9FAFB", padding: "12px 14px" }}>
                    <div style={{ fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{s.l}</div>
                    <div style={{ fontSize: 13, color: "#111", fontWeight: 600, fontFamily: F }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, fontFamily: F, textTransform: "uppercase", marginBottom: 16 }}>You May Also Like</h3>
            <div style={{ display: "flex", gap: 16, overflowX: "auto", padding: "8px 0", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
              {related.map(s => (
                <div key={s.id} onClick={() => router.push(`/scooters/${s.id}`)}
                  style={{ minWidth: 220, maxWidth: 220, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "all .3s", scrollSnapAlign: "start", flexShrink: 0 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#DC2626"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(220,38,38,.08)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center", background: "#F9FAFB" }}>
                    <div style={{ width: 90, height: 65 }}><ScooterSVG variant={s.id % 3} accent={s.color} /></div>
                  </div>
                  <div style={{ padding: "10px 14px 14px" }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, fontFamily: F, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, fontFamily: F }}>${s.price}</span>
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
