"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { SCOOTERS, ACCESSORIES } from "@/lib/data";
import { ScooterSVG, AccSVG } from "@/components/ScooterSVG";
import Link from "next/link";
import Image from "next/image";

const F = "'Oswald', sans-serif";
export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const { cartCount, setCartOpen } = useStore();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (searchExpanded) setTimeout(() => searchRef.current?.focus(), 100);
    else { setSearch(""); setSearchOpen(false); }
  }, [searchExpanded]);

  useEffect(() => {
    const h = () => { setSearchExpanded(false); setMenuOpen(false); };
    const t = setTimeout(() => document.addEventListener("click", h), 50);
    return () => { clearTimeout(t); document.removeEventListener("click", h); };
  }, [searchExpanded, menuOpen]);

  const cc = cartCount();
  const isHome = pathname === "/";

  const scrollTo = (id: string) => {
    if (!isHome) {
      router.push("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const allItems = [...SCOOTERS, ...ACCESSORIES];
  const searchResults = search.length > 0
    ? allItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.cat.toLowerCase().includes(search.toLowerCase()))
    : [];

  const navItems = [
    { label: "Scooters", action: () => scrollTo("scooters") },
    { label: "Accessories", action: () => scrollTo("accessories") },
    { label: "About", action: () => scrollTo("about") },
    { label: "FAQ", action: () => scrollTo("faq") },
    { label: "Contact", action: () => scrollTo("contact") },
  ];

  return (
    <>
      {/* NAV */}
      <nav className="main-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(255,255,255,.97)" : "#fff", backdropFilter: "blur(12px)", borderBottom: "1px solid #E5E7EB", transition: "all .3s", padding: "6px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div onClick={() => { router.push("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <Image src="/logo.png" alt="Rohan Wings" width={64} height={64} className="nav-logo" style={{ borderRadius: 4, display: "block" }} priority />
          <div style={{ lineHeight: 1.1, whiteSpace: "nowrap" }}>
            <div style={{ fontFamily: F, fontWeight: 800, fontSize: 16, letterSpacing: 1.5, textTransform: "uppercase" }}>Rohan Wings</div>
            <div style={{ fontFamily: F, fontWeight: 600, fontSize: 10, color: "#DC2626", letterSpacing: 2, textTransform: "uppercase" }}>Lebanon</div>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ gap: 24, alignItems: "center" }}>
          {navItems.map(item => (
            <button key={item.label} onClick={item.action}
              style={{ color: "#555", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontFamily: F, background: "none", border: "none", cursor: "pointer", transition: "color .3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#DC2626")}
              onMouseLeave={e => (e.currentTarget.style.color = "#555")}
            >{item.label}</button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Search */}
          <button onClick={e => { e.stopPropagation(); setMenuOpen(false); setSearchExpanded(!searchExpanded); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={searchExpanded ? "#DC2626" : "#333"} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          {/* Cart */}
          <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {cc > 0 && <div style={{ position: "absolute", top: -4, right: -6, width: 18, height: 18, borderRadius: 9, background: "#DC2626", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F }}>{cc}</div>}
          </button>
          {/* Mobile hamburger */}
          <button
            onClick={e => { e.stopPropagation(); setSearchExpanded(false); setMenuOpen(!menuOpen); }}
            className="flex md:hidden"
            style={{ cursor: "pointer", width: 24, height: 24, position: "relative", background: "transparent", border: "none", padding: 0, flexShrink: 0 }}
          >
            <span style={{ position: "absolute", left: 2, width: 20, height: 2, backgroundColor: "#333", borderRadius: 1, transition: "all .25s ease", top: menuOpen ? 11 : 5, transform: menuOpen ? "rotate(45deg)" : "none", transformOrigin: "center" }}/>
            <span style={{ position: "absolute", left: 2, top: 11, width: 20, height: 2, backgroundColor: "#333", borderRadius: 1, transition: "all .15s ease", opacity: menuOpen ? 0 : 1 }}/>
            <span style={{ position: "absolute", left: 2, width: 20, height: 2, backgroundColor: "#333", borderRadius: 1, transition: "all .25s ease", top: menuOpen ? 11 : 17, transform: menuOpen ? "rotate(-45deg)" : "none", transformOrigin: "center" }}/>
          </button>
        </div>
      </nav>

      {/* Search bar */}
      {searchExpanded && (
        <div className="search-panel" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 98, background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "92px 16px 16px", boxShadow: "0 8px 30px rgba(0,0,0,.08)", animation: "slideDown .25s ease" }} onClick={e => e.stopPropagation()}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ position: "relative" }}>
              <input ref={searchRef} autoFocus value={search}
                onChange={e => { setSearch(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search scooters, accessories, parts..."
                style={{ width: "100%", padding: "14px 40px 14px 44px", borderRadius: 12, border: "2px solid #DC2626", fontSize: 16, fontFamily: "Inter", outline: "none", background: "#fff" }}
              />
              <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", opacity: .4 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <button onClick={() => setSearchExpanded(false)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            {searchOpen && searchResults.length > 0 && (
              <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, marginTop: 8, boxShadow: "0 8px 30px rgba(0,0,0,.1)", maxHeight: 300, overflowY: "auto" }}>
                {searchResults.slice(0, 6).map(r => {
                  const isScooter = "motor" in r;
                  return (
                    <div key={r.id}
                      onClick={() => { setSearch(""); setSearchExpanded(false); router.push(`/${isScooter ? "scooters" : "accessories"}/${r.id}`); }}
                      style={{ padding: "14px 16px", cursor: "pointer", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", gap: 12, transition: "background .2s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#FEF2F2")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                    >
                      <div style={{ width: 40, height: 28, flexShrink: 0 }}>
                        {isScooter ? <ScooterSVG variant={r.id % 3} accent={(r as typeof SCOOTERS[0]).color} /> : <AccSVG type={r.cat} color={(r as typeof ACCESSORIES[0]).color} itemId={r.id} />}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, fontFamily: F }}>{r.name}</div>
                        <div style={{ fontSize: 11, color: "#888" }}>{r.cat} | ${r.price}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu-top" style={{ position: "fixed", left: 0, right: 0, zIndex: 99, background: "rgba(255,255,255,.98)", backdropFilter: "blur(20px)", padding: "16px 20px 24px", borderBottom: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: 14, animation: "slideDown .2s ease" }} onClick={e => e.stopPropagation()}>
          {/* Inline search in mobile menu */}
          <div style={{ position: "relative", marginBottom: 4 }}>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search scooters, accessories..."
              style={{ width: "100%", padding: "10px 16px 10px 40px", borderRadius: 10, border: "1px solid #E5E7EB", fontSize: 16, outline: "none", background: "#F9FAFB", fontFamily: "'Inter',sans-serif" }}
            />
            <svg style={{ position: "absolute", left: 12, top: 11, opacity: .4 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            {searchOpen && searchResults.length > 0 && (
              <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, marginTop: 4, maxHeight: 200, overflowY: "auto", boxShadow: "0 8px 24px rgba(0,0,0,.1)" }}>
                {searchResults.slice(0, 4).map(r => {
                  const isScooter = "motor" in r;
                  return (
                    <div key={r.id}
                      onClick={() => { setSearch(""); setMenuOpen(false); setSearchOpen(false); router.push(`/${isScooter ? "scooters" : "accessories"}/${r.id}`); }}
                      style={{ padding: "10px 14px", cursor: "pointer", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div style={{ width: 36, height: 26, flexShrink: 0 }}>
                        {isScooter ? <ScooterSVG variant={r.id % 3} accent={(r as typeof SCOOTERS[0]).color} /> : <AccSVG type={r.cat} color={(r as typeof ACCESSORIES[0]).color} itemId={r.id} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, fontFamily: F }}>{r.name}</div>
                      </div>
                      <span style={{ fontSize: 12, color: "#DC2626", fontWeight: 700, fontFamily: F }}>${r.price}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {navItems.map(item => (
            <button key={item.label} onClick={item.action}
              style={{ color: "#333", fontSize: 15, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontFamily: F, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
            >{item.label}</button>
          ))}
        </div>
      )}

      {/* Spacer for fixed nav */}
      <div className="nav-spacer" style={{ height: 76 }} />
    </>
  );
}
