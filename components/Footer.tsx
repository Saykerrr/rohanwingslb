"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const F = "'Oswald', sans-serif";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollTo = (id: string) => {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <footer style={{ background: "#111", color: "#fff", padding: "48px 32px 24px" }}>
      <div className="footer-grid" style={{ maxWidth: 1100, margin: "0 auto", marginBottom: 32 }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <Image
            src="/logo.png"
            alt="Rohan Wings"
            width={80}
            height={80}
            style={{ borderRadius: 6, flexShrink: 0 }}
          />
          <div>
            <div style={{ fontFamily: F, fontWeight: 800, fontSize: 16, color: "#fff" }}>Rohan Wings Lebanon</div>
            <p style={{ color: "#888", fontSize: 13, lineHeight: 1.6, marginTop: 8, marginBottom: 0 }}>
              Lebanon&apos;s premier destination for electric scooters, parts, and service.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontFamily: F, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, color: "#DC2626" }}>Quick Links</h4>
          {["Scooters", "Accessories", "About", "FAQ", "Contact"].map(s => (
            <div key={s} style={{ marginBottom: 6 }}>
              <button
                onClick={() => scrollTo(s.toLowerCase())}
                style={{ fontSize: 13, color: "#888", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: F, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#888")}
              >
                {s}
              </button>
            </div>
          ))}
        </div>

        {/* Connect */}
        <div>
          <h4 style={{ fontFamily: F, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, color: "#DC2626" }}>Connect</h4>
          <a
            href="https://instagram.com/rohanwings.lb"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#888", textDecoration: "none", fontSize: 13, display: "block", marginBottom: 6, transition: "color .2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#888")}
          >
            Instagram
          </a>
          <a
            href="https://wa.me/96179185184"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#888", textDecoration: "none", fontSize: 13, display: "block", transition: "color .2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#888")}
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", borderTop: "1px solid #222", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 12, color: "#666" }}>© 2026 Rohan Wings Lebanon. All rights reserved.</span>
        <span style={{ fontSize: 12, color: "#666" }}>E-Scooters | Parts | Service</span>
      </div>
    </footer>
  );
}
