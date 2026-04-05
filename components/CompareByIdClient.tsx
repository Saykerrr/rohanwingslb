"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SCOOTERS } from "@/lib/data";
import { ScooterSVG } from "@/components/ScooterSVG";
import { useStore } from "@/lib/store";
import toast from "react-hot-toast";

const F = "'Oswald', sans-serif";

const SPEC_KEYS: { l: string; k: keyof typeof SCOOTERS[0]; fmt?: (v: unknown) => string }[] = [
  { l: "Price", k: "price", fmt: v => "$" + v },
  { l: "Top Speed", k: "speed" },
  { l: "Range", k: "range" },
  { l: "Motor", k: "motor" },
  { l: "Weight", k: "weight" },
  { l: "Battery", k: "battery" },
  { l: "Brakes", k: "brakes" },
  { l: "Tires", k: "tires" },
  { l: "Charge Time", k: "charge" },
  { l: "Max Load", k: "maxLoad" },
  { l: "Suspension", k: "suspension" },
  { l: "Waterproof", k: "waterproof" },
];

export function CompareByIdClient() {
  const params = useSearchParams();
  const router = useRouter();
  const { addToCart } = useStore();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const aId = Number(params.get("a"));
  const bId = Number(params.get("b"));

  const initialA = SCOOTERS.find(s => s.id === aId) || null;
  const initialB = SCOOTERS.find(s => s.id === bId) || null;

  const [scooterA, setScooterA] = useState(initialA);
  const [scooterB, setScooterB] = useState(initialB);
  const [swapIdx, setSwapIdx] = useState<0 | 1 | null>(null);
  const [cmpSearch, setCmpSearch] = useState("");

  const addCart = (s: typeof SCOOTERS[0]) => {
    addToCart({ id: String(s.id), name: s.name, price: s.price, type: "scooter", slug: String(s.id) });
    toast.success(`${s.name} added to cart`);
  };

  if (!scooterA || !scooterB) {
    return (
      <div style={{ maxWidth: 600, margin: "80px auto", textAlign: "center", padding: 32 }}>
        <h2 style={{ fontFamily: F, fontSize: 28, fontWeight: 800, marginBottom: 16 }}>No scooters selected</h2>
        <p style={{ color: "#888", marginBottom: 24 }}>Please select two scooters to compare from a product page.</p>
        <button
          onClick={() => router.push("/")}
          style={{ background: "#DC2626", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase" }}
        >
          Browse Scooters
        </button>
      </div>
    );
  }

  const a = scooterA;
  const b = scooterB;

  const otherForSwap = swapIdx === 0 ? b : a;
  const filtered = cmpSearch.length > 0
    ? SCOOTERS.filter(s => s.id !== otherForSwap.id && s.name.toLowerCase().includes(cmpSearch.toLowerCase()))
    : SCOOTERS.filter(s => s.id !== otherForSwap.id);

  return (
    <div>
      <div className="prod-wrap" style={{ maxWidth: 1000, margin: "0 auto", padding: "32px" }}>
        <button
          onClick={() => router.push(`/scooters/${a.id}`)}
          style={{ color: "#555", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontFamily: F, background: "none", border: "none", cursor: "pointer", marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Product
        </button>

        <h1 style={{ fontSize: 36, fontWeight: 800, fontFamily: F, textTransform: "uppercase", marginBottom: 24 }}>Compare Scooters</h1>

        {/* Scooter Headers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {([a, b] as const).map((s, idx) => (
            <div key={s.id} style={{ background: "#F9FAFB", borderRadius: 14, border: "1px solid #E5E7EB", padding: "16px 14px", textAlign: "center", position: "relative" }}>
              <div style={{ width: 100, height: 70, margin: "0 auto" }}>
                <ScooterSVG variant={s.id % 3} accent={s.color} />
              </div>
              <h3 style={{ fontFamily: F, fontWeight: 800, fontSize: 17, marginTop: 8 }}>{s.name}</h3>
              {s.badge && (
                <span style={{ display: "inline-block", background: "#DC2626", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 20, marginTop: 4, fontFamily: F, letterSpacing: 1 }}>
                  {s.badge}
                </span>
              )}
              <div style={{ marginTop: 10, display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  onClick={() => addCart(s)}
                  style={{ background: "#DC2626", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase" }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => router.push(`/scooters/${s.id}`)}
                  style={{ background: "none", color: "#DC2626", border: "1px solid #DC2626", borderRadius: 8, padding: "7px 14px", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase" }}
                >
                  Details
                </button>
              </div>
              <button
                onClick={() => setSwapIdx(swapIdx === idx ? null : idx as 0 | 1)}
                style={{ marginTop: 10, background: "none", border: "1px solid #E5E7EB", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 11, fontFamily: F, fontWeight: 600, color: "#DC2626", display: "inline-flex", alignItems: "center", gap: 4, transition: "all .2s" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                  <path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/>
                </svg>
                Change
              </button>
            </div>
          ))}
        </div>

        {/* Swap Selector */}
        {swapIdx !== null && (
          <div style={{ marginBottom: 20, background: "#fff", border: "1px solid #DC2626", borderRadius: 14, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: "#DC2626", letterSpacing: 1 }}>
                Replace {swapIdx === 0 ? a.name : b.name}
              </span>
              <button
                onClick={() => { setSwapIdx(null); setCmpSearch(""); }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div style={{ position: "relative", marginBottom: 10 }}>
              <input
                value={cmpSearch}
                onChange={e => setCmpSearch(e.target.value)}
                placeholder="Search scooters..."
                style={{ width: "100%", padding: "10px 14px 10px 36px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 14, fontFamily: "Inter", outline: "none", boxSizing: "border-box" }}
              />
              <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", opacity: .4 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
              {filtered.map(s => (
                <div
                  key={s.id}
                  onClick={() => {
                    if (swapIdx === 0) setScooterA(s);
                    else setScooterB(s);
                    setSwapIdx(null);
                    setCmpSearch("");
                    const newA = swapIdx === 0 ? s : a;
                    const newB = swapIdx === 1 ? s : b;
                    router.replace(`/compare?a=${newA.id}&b=${newB.id}`, { scroll: false });
                  }}
                  style={{ padding: "10px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #F3F4F6", borderRadius: 8, transition: "background .15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#FEF2F2")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <div style={{ width: 36, height: 26, flexShrink: 0 }}><ScooterSVG variant={s.id % 3} accent={s.color} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: F, fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: "#888" }}>{s.cat}</div>
                  </div>
                  <span style={{ fontFamily: F, fontWeight: 800, fontSize: 13, color: "#DC2626" }}>${s.price}</span>
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{ padding: 16, textAlign: "center", color: "#999", fontSize: 13 }}>No scooters found</div>
              )}
            </div>
          </div>
        )}

        {/* Spec Comparison Table */}
        <div style={{ border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden" }}>
          {SPEC_KEYS.map((sp, i) => {
            const va = sp.fmt ? sp.fmt(a[sp.k]) : String(a[sp.k]);
            const vb = sp.fmt ? sp.fmt(b[sp.k]) : String(b[sp.k]);
            const diff = va !== vb;
            return (
              <div
                key={sp.k}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  borderBottom: i < SPEC_KEYS.length - 1 ? "1px solid #F3F4F6" : "none",
                  background: i % 2 === 0 ? "#fff" : "#FAFAFA",
                }}
              >
                <div style={{ padding: "12px 14px", borderRight: "1px solid #E5E7EB" }}>
                  <div style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: 1, fontFamily: F, fontWeight: 600, marginBottom: 3 }}>{sp.l}</div>
                  <div style={{ fontSize: 14, color: diff ? "#111" : "#555", fontWeight: diff ? 700 : 600, fontFamily: F }}>{va}</div>
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <div style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: 1, fontFamily: F, fontWeight: 600, marginBottom: 3 }}>{sp.l}</div>
                  <div style={{ fontSize: 14, color: diff ? "#111" : "#555", fontWeight: diff ? 700 : 600, fontFamily: F }}>{vb}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
