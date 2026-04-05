"use client";

import { useState, useRef, useEffect } from "react";
import { SCOOTERS, ACCESSORIES, FAQS, BRANCHES, type Scooter, type Accessory } from "@/lib/data";
import { ScooterSVG, AccSVG } from "@/components/ScooterSVG";
import { useStore } from "@/lib/store";
import toast from "react-hot-toast";
import Link from "next/link";

const F = "'Oswald', sans-serif";

// ─── Badge ──────────────────────────────────────────────────────────────────
function Badge({ text }: { text: string }) {
  const bg =
    text === "New" ? "#DC2626"
    : text === "Flagship" ? "linear-gradient(135deg,#DC2626,#F59E0B)"
    : text === "Premium" ? "linear-gradient(135deg,#7C3AED,#DC2626)"
    : "#DC2626";
  return (
    <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2, background: bg, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: 1, textTransform: "uppercase", fontFamily: F }}>
      {text}
    </div>
  );
}

// ─── FAQ Item ────────────────────────────────────────────────────────────────
function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E5E7EB" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ fontSize: 16, color: "#111", fontWeight: 600, fontFamily: F, paddingRight: 20 }}>{faq.q}</span>
        <span style={{ width: 28, height: 28, minWidth: 28, borderRadius: "50%", border: `2px solid ${open ? "#DC2626" : "#D1D5DB"}`, display: "flex", alignItems: "center", justifyContent: "center", color: open ? "#DC2626" : "#999", transition: "all .3s", transform: open ? "rotate(45deg)" : "none", flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </span>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
        <p style={{ margin: 0, padding: "0 0 18px", fontSize: 14, color: "#666", lineHeight: 1.7 }}>{faq.a}</p>
      </div>
    </div>
  );
}

// ─── Sort Dropdown ───────────────────────────────────────────────────────────
const SORT_OPTS = [
  { v: "default", l: "Sort by" },
  { v: "price-asc", l: "Price: Low to High" },
  { v: "price-desc", l: "Price: High to Low" },
  { v: "name", l: "Name: A to Z" },
];

function SortDD({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const label = SORT_OPTS.find(o => o.v === value)?.l || "Sort by";

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(v => !v)}
        style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: `1px solid ${isOpen ? "#DC2626" : "#E5E7EB"}`, borderRadius: 8, padding: "8px 14px", cursor: "pointer", transition: "all .2s" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#DC2626" : "#999"} strokeWidth="2"><path d="M3 6h18M6 12h12M9 18h6"/></svg>
        <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: value !== "default" ? "#111" : "#888", letterSpacing: .5 }}>{label}</span>
        <span style={{ display: "inline-flex", transition: "transform .25s ease", transform: isOpen ? "rotate(180deg)" : "none" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#DC2626" : "#999"} strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </button>
      {isOpen && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: "50%", transform: "translateX(-50%)", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,.1)", minWidth: 180, zIndex: 100, overflow: "hidden" }}>
          {SORT_OPTS.map(o => (
            <div key={o.v} onClick={() => { onChange(o.v); setIsOpen(false); }} style={{ padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, background: value === o.v ? "#FEF2F2" : "#fff", fontFamily: F, fontSize: 12, fontWeight: value === o.v ? 700 : 500, color: value === o.v ? "#DC2626" : "#555" }}
              onMouseEnter={e => { if (value !== o.v) (e.currentTarget as HTMLDivElement).style.background = "#F9FAFB"; }}
              onMouseLeave={e => { if (value !== o.v) (e.currentTarget as HTMLDivElement).style.background = "#fff"; }}
            >
              {value === o.v && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
              {o.l}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Brand Dropdown ──────────────────────────────────────────────────────────
function BrandDD({ value, onChange, brands }: { value: string; onChange: (v: string) => void; brands: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 8 }}>
      <button
        onClick={() => setIsOpen(v => !v)}
        style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: `1px solid ${isOpen ? "#DC2626" : "#E5E7EB"}`, borderRadius: 8, padding: "8px 14px", cursor: "pointer", transition: "all .2s" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#DC2626" : "#999"} strokeWidth="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
        <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: value !== "All" ? "#111" : "#888", letterSpacing: .5 }}>{value === "All" ? "All Brands" : value}</span>
        <span style={{ display: "inline-flex", transition: "transform .25s ease", transform: isOpen ? "rotate(180deg)" : "none" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#DC2626" : "#999"} strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </button>
      {isOpen && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: "50%", transform: "translateX(-50%)", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,.1)", minWidth: 160, zIndex: 100, overflow: "hidden" }}>
          {brands.map(b => (
            <div key={b} onClick={() => { onChange(b); setIsOpen(false); }}
              style={{ padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, background: value === b ? "#FEF2F2" : "#fff", fontFamily: F, fontSize: 12, fontWeight: value === b ? 700 : 500, color: value === b ? "#DC2626" : "#555" }}
              onMouseEnter={e => { if (value !== b) (e.currentTarget as HTMLDivElement).style.background = "#F9FAFB"; }}
              onMouseLeave={e => { if (value !== b) (e.currentTarget as HTMLDivElement).style.background = "#fff"; }}
            >
              {value === b && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
              {b === "All" ? "All Brands" : b}
            </div>
          ))}
        </div>
      )}
      {value !== "All" && (
        <button onClick={() => onChange("All")} style={{ background: "none", border: "none", cursor: "pointer", color: "#DC2626", fontFamily: F, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4, padding: "4px 0" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Clear
        </button>
      )}
    </div>
  );
}

// ─── Main Home ────────────────────────────────────────────────────────────────
export function HomeClient() {
  const [sf, setSf] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");
  const [af, setAf] = useState("All");
  const [sort, setSort] = useState("default");
  const [accSort, setAccSort] = useState("default");
  const [scootVisible, setScootVisible] = useState(8);
  const [accVisible, setAccVisible] = useState(8);
  const [showTop, setShowTop] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToCart: storeAddToCart } = useStore();

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Force video play on mount and when page becomes visible again (mobile fix)
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const tryPlay = () => { vid.play().catch(() => {}); };
    tryPlay();
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") tryPlay();
    });
    window.addEventListener("focus", tryPlay);
    return () => {
      window.removeEventListener("focus", tryPlay);
    };
  }, []);

  const addCart = (item: Scooter | Accessory) => {
    storeAddToCart({
      id: String(item.id),
      name: item.name,
      price: item.price,
      type: "motor" in item ? "scooter" : "accessory",
      slug: item.name.toLowerCase().replace(/\s+/g, "-"),
    });
    toast.success(`${item.name} added to cart`);
  };

  const doSort = (items: (Scooter | Accessory)[], s: string) => {
    const arr = [...items];
    if (s === "price-asc") arr.sort((a, b) => a.price - b.price);
    else if (s === "price-desc") arr.sort((a, b) => b.price - a.price);
    else if (s === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  };

  const brands = ["All", ...Array.from(new Set(SCOOTERS.map(s => s.brand)))];

  let fScoot = SCOOTERS.filter(s =>
    (sf === "All" || s.cat === sf) &&
    (brandFilter === "All" || s.brand === brandFilter)
  );
  fScoot = doSort(fScoot, sort) as Scooter[];

  let fAcc = ACCESSORIES.filter(a => af === "All" || a.cat === af);
  fAcc = doSort(fAcc, accSort) as Accessory[];

  return (
    <div style={{ background: "#fff", color: "#111", fontFamily: "'Inter',-apple-system,sans-serif", overflowX: "hidden" }}>

      {/* Hero */}
      <section id="home" className="hp" style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", position: "relative", padding: "140px 40px 80px", overflow: "hidden" }}>
        {/* Video background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        >
          <source src="/homepagevideo.mp4" type="video/mp4" />
        </video>
        {/* Overlay so text stays readable */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(255,255,255,.45) 0%,rgba(255,255,255,.75) 60%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="ht" style={{ fontSize: "clamp(38px,7vw,72px)", fontWeight: 800, lineHeight: .95, marginBottom: 20, fontFamily: F, textTransform: "uppercase", color: "#111" }}>
            Ride The <span style={{ color: "#DC2626" }}>Future</span>
          </h1>
          <p style={{ fontSize: "clamp(15px,4vw,18px)", color: "#666", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.6 }}>
            Premium electric scooters, genuine parts, and expert service. Three branches across Lebanon.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => document.getElementById("scooters")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "#DC2626", color: "#fff", border: "none", borderRadius: 10, padding: "14px 36px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase", boxShadow: "0 6px 24px rgba(220,38,38,.25)", transition: "all .3s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#B91C1C")}
              onMouseLeave={e => (e.currentTarget.style.background = "#DC2626")}
            >
              Explore Scooters
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "rgba(255,255,255,.85)", color: "#111", border: "2px solid #fff", borderRadius: 10, padding: "14px 36px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase", transition: "all .3s", backdropFilter: "blur(4px)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#DC2626"; (e.currentTarget as HTMLButtonElement).style.color = "#DC2626"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#fff"; (e.currentTarget as HTMLButtonElement).style.color = "#111"; }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderBottom: "1px solid #F3F4F6" }}>
        <div className="sg" style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 32px" }}>
          {[
            { n: "7,300+", l: "Instagram Followers" },
            { n: "3", l: "Branches in Lebanon" },
            { n: "350+", l: "Posts & Reviews" },
            { n: "100%", l: "Genuine Parts" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: F, color: "#DC2626" }}>{s.n}</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 4, letterSpacing: 1, textTransform: "uppercase", fontFamily: F }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Scooters */}
      <section id="scooters" className="sp" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ color: "#DC2626", fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", fontFamily: F }}>Our Collection</span>
          <h2 className="section-h2" style={{ fontSize: 42, fontWeight: 800, fontFamily: F, marginTop: 6, textTransform: "uppercase" }}>Electric Scooters</h2>
        </div>

        {/* Category + Sort filters */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          {["All", "Performance", "Urban", "Compact"].map(c => (
            <button key={c} onClick={() => setSf(c)}
              style={{ background: sf === c ? "#DC2626" : "#fff", color: sf === c ? "#fff" : "#666", border: `1px solid ${sf === c ? "#DC2626" : "#E5E7EB"}`, borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .3s", fontFamily: F, letterSpacing: 1, textTransform: "uppercase" }}
            >{c}</button>
          ))}
          <div style={{ width: 1, height: 24, background: "#E5E7EB", margin: "0 4px" }}/>
          <SortDD value={sort} onChange={setSort} />
        </div>

        {/* Brand filter */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
          <BrandDD value={brandFilter} onChange={setBrandFilter} brands={brands} />
        </div>

        {/* Scooter grid */}
        <div className="pg" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
          {fScoot.slice(0, scootVisible).map((s, i) => (
            <Link key={s.id} href={`/scooters/${s.id}`} style={{ textDecoration: "none" }}>
              <div
                className="cd"
                style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, overflow: "hidden", cursor: "pointer", position: "relative", transition: "all .35s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#DC2626"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(220,38,38,.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                {s.badge && <Badge text={s.badge} />}
                <div style={{ height: 190, display: "flex", alignItems: "center", justifyContent: "center", background: "#F9FAFB", position: "relative" }}>
                  <div style={{ position: "absolute", width: "100%", height: "100%", background: `radial-gradient(circle at 50% 80%,${s.color}0A 0%,transparent 60%)` }}/>
                  <div style={{ width: 150, height: 105, zIndex: 1 }}>
                    <ScooterSVG variant={i % 3} accent={s.color} />
                  </div>
                </div>
                <div style={{ padding: "16px 20px 20px" }}>
                  <span style={{ fontSize: 11, color: "#DC2626", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", fontFamily: F }}>{s.cat}</span>
                  <h3 style={{ margin: "4px 0 6px", fontSize: 20, fontWeight: 700, fontFamily: F, color: "#111" }}>{s.name}</h3>
                  <p style={{ margin: "0 0 14px", fontSize: 13, color: "#888", lineHeight: 1.5 }}>{s.desc}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 16 }}>
                    {[{ l: "Speed", v: s.speed }, { l: "Range", v: s.range }, { l: "Motor", v: s.motor }, { l: "Weight", v: s.weight }].map(sp => (
                      <div key={sp.l} style={{ background: "#F9FAFB", borderRadius: 8, padding: "6px 10px" }}>
                        <div style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 1 }}>{sp.l}</div>
                        <div style={{ fontSize: 13, color: "#111", fontWeight: 600, fontFamily: F }}>{sp.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 24, fontWeight: 800, fontFamily: F }}>${s.price}</div>
                    <button
                      style={{ background: "#DC2626", color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase", transition: "all .3s" }}
                      onClick={e => { e.preventDefault(); e.stopPropagation(); addCart(s); }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#B91C1C")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#DC2626")}
                    >Add to Cart</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {scootVisible < fScoot.length && (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button
              onClick={() => setScootVisible(v => v + 8)}
              style={{ background: "transparent", color: "#111", border: "2px solid #E5E7EB", borderRadius: 10, padding: "12px 40px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase", transition: "all .3s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#DC2626"; (e.currentTarget as HTMLButtonElement).style.color = "#DC2626"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLButtonElement).style.color = "#111"; }}
            >
              Load More ({fScoot.length - scootVisible} remaining)
            </button>
          </div>
        )}
      </section>

      {/* Accessories */}
      <section id="accessories" style={{ background: "#F9FAFB", borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
        <div className="sp" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ color: "#DC2626", fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", fontFamily: F }}>Gear Up</span>
            <h2 className="section-h2" style={{ fontSize: 42, fontWeight: 800, fontFamily: F, marginTop: 6, textTransform: "uppercase" }}>Accessories & Parts</h2>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
            {["All", "Protection", "Gear", "Parts"].map(c => (
              <button key={c} onClick={() => setAf(c)}
                style={{ background: af === c ? "#DC2626" : "#fff", color: af === c ? "#fff" : "#666", border: `1px solid ${af === c ? "#DC2626" : "#E5E7EB"}`, borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .3s", fontFamily: F, letterSpacing: 1, textTransform: "uppercase" }}
              >{c}</button>
            ))}
            <div style={{ width: 1, height: 24, background: "#E5E7EB", margin: "0 4px" }}/>
            <SortDD value={accSort} onChange={setAccSort} />
          </div>
          <div className="pg" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 16 }}>
            {fAcc.slice(0, accVisible).map((a, i) => (
              <Link key={a.id} href={`/accessories/${a.id}`} style={{ textDecoration: "none" }}>
                <div
                  style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "all .35s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#DC2626"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(220,38,38,.1)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <AccSVG type={a.cat} color={a.color} itemId={a.id} />
                      </div>
                      <span style={{ fontSize: 10, color: "#DC2626", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", fontFamily: F }}>{a.cat}</span>
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, fontFamily: F, marginBottom: 4, color: "#111" }}>{a.name}</h3>
                    <p style={{ fontSize: 13, color: "#888", lineHeight: 1.5, marginBottom: 14 }}>{a.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 20, fontWeight: 800, fontFamily: F }}>${a.price}</span>
                      <button
                        style={{ background: "#DC2626", color: "#fff", border: "none", borderRadius: 10, padding: "7px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase", transition: "all .3s" }}
                        onClick={e => { e.preventDefault(); e.stopPropagation(); addCart(a); }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#B91C1C")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#DC2626")}
                      >Add to Cart</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {accVisible < fAcc.length && (
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button
                onClick={() => setAccVisible(v => v + 8)}
                style={{ background: "transparent", color: "#111", border: "2px solid #E5E7EB", borderRadius: 10, padding: "12px 40px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase", transition: "all .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#DC2626"; (e.currentTarget as HTMLButtonElement).style.color = "#DC2626"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLButtonElement).style.color = "#111"; }}
              >
                Load More ({fAcc.length - accVisible} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="sp" style={{ maxWidth: 800, margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
        <span style={{ color: "#DC2626", fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", fontFamily: F }}>Who We Are</span>
        <h2 className="section-h2" style={{ fontSize: 42, fontWeight: 800, fontFamily: F, marginTop: 6, textTransform: "uppercase" }}>About Rohan Wings</h2>
        <p style={{ color: "#555", fontSize: 16, lineHeight: 1.8, marginTop: 20 }}>Rohan Wings is Lebanon's trusted destination for premium electric scooters, genuine replacement parts, and professional service. With three branches across the country, we are committed to making electric mobility accessible, reliable, and exciting.</p>
        <p style={{ color: "#888", fontSize: 15, lineHeight: 1.8, marginTop: 14, marginBottom: 32 }}>Whether you are a daily commuter, a weekend explorer, or a business looking for wholesale options, our team is here to match you with the perfect ride and keep it running at peak performance.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {["Wholesale & Retail", "Genuine Parts", "Expert Service", "3 Locations"].map((t, i) => (
            <div key={i} style={{ background: "#FEF2F2", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 600, fontFamily: F, letterSpacing: 1, color: "#DC2626" }}>{t}</div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: "#F9FAFB", borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
        <div className="sp" style={{ maxWidth: 700, margin: "0 auto", padding: "80px 32px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ color: "#DC2626", fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", fontFamily: F }}>Support</span>
            <h2 className="section-h2" style={{ fontSize: 42, fontWeight: 800, fontFamily: F, marginTop: 6, textTransform: "uppercase" }}>FAQ</h2>
          </div>
          {FAQS.map((f, i) => <FAQItem key={i} faq={f} />)}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="sp" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ color: "#DC2626", fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", fontFamily: F }}>Get In Touch</span>
          <h2 className="section-h2" style={{ fontSize: 42, fontWeight: 800, fontFamily: F, marginTop: 6, textTransform: "uppercase" }}>Our Branches</h2>
        </div>
        <div className="bg" style={{ marginBottom: 48 }}>
          {BRANCHES.map((b, i) => (
            <div key={i} style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, margin: "0 auto 14px", background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, fontFamily: F, marginBottom: 6 }}>{b.name}</h3>
              <p style={{ color: "#888", fontSize: 13, marginBottom: 14 }}>{b.phone ? `+961 ${b.phone}` : "Contact via WhatsApp"}</p>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <a href={`https://wa.me/${b.wa}`} target="_blank" rel="noopener noreferrer"
                  style={{ background: "#25D366", color: "#fff", textDecoration: "none", borderRadius: 8, padding: "9px 16px", fontSize: 11, fontWeight: 700, fontFamily: F, letterSpacing: 1, textTransform: "uppercase", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  WhatsApp
                </a>
                <a href={b.maps} target="_blank" rel="noopener noreferrer"
                  style={{ background: "transparent", color: "#111", border: "2px solid #E5E7EB", textDecoration: "none", borderRadius: 8, padding: "9px 16px", fontSize: 11, fontWeight: 700, fontFamily: F, letterSpacing: 1, textTransform: "uppercase", transition: "all .3s", display: "inline-flex", alignItems: "center" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#DC2626"; (e.currentTarget as HTMLAnchorElement).style.color = "#DC2626"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLAnchorElement).style.color = "#111"; }}
                >
                  Directions
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="cta-banner" style={{ background: "linear-gradient(135deg,#DC2626,#991B1B)", borderRadius: 20, padding: "44px 36px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{ fontSize: 28, fontWeight: 800, fontFamily: F, marginBottom: 10, textTransform: "uppercase", color: "#fff" }}>Ready to Ride?</h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.85)", marginBottom: 24 }}>Visit any branch or message us on WhatsApp to find your perfect scooter.</p>
            <button
              onClick={() => window.open("https://wa.me/96179185184", "_blank")}
              style={{ background: "#fff", color: "#DC2626", border: "none", borderRadius: 12, padding: "14px 36px", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: F, letterSpacing: 2, textTransform: "uppercase" }}
            >Message Us on WhatsApp</button>
          </div>
        </div>
      </section>


      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", bottom: 24, right: 24, zIndex: 80, width: 44, height: 44, borderRadius: 22, background: "#DC2626", border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(220,38,38,.3)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#B91C1C")}
          onMouseLeave={e => (e.currentTarget.style.background = "#DC2626")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg>
        </button>
      )}
    </div>
  );
}
