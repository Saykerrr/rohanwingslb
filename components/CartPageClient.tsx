"use client";

import { useState, useRef, useEffect } from "react";
import { useStore } from "@/lib/store";
import { ACCESSORIES, BRANCHES } from "@/lib/data";
import { ScooterSVG, AccSVG } from "@/components/ScooterSVG";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const F = "'Oswald', sans-serif";

// Color popup for recommendation cards
function ColorPopup({ item, onAdd, onClose }: {
  item: typeof ACCESSORIES[0];
  onAdd: (color: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState(item.colorOptions?.[0]?.name ?? "");

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} style={{ position: "absolute", bottom: "calc(100% + 8px)", right: 0, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 14, boxShadow: "0 8px 24px rgba(0,0,0,.12)", zIndex: 20, minWidth: 160 }}>
      <div style={{ fontSize: 11, fontWeight: 700, fontFamily: F, letterSpacing: 1, textTransform: "uppercase", color: "#555", marginBottom: 8 }}>
        Color: <span style={{ color: "#111" }}>{sel}</span>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {item.colorOptions!.map(c => (
          <button key={c.name} title={c.name} onClick={() => setSel(c.name)}
            style={{ width: 28, height: 28, borderRadius: "50%", background: c.hex, border: sel === c.name ? "3px solid #DC2626" : "2px solid #E5E7EB", cursor: "pointer", boxShadow: sel === c.name ? "0 0 0 2px #fff, 0 0 0 3px #DC2626" : "none", outline: "none", padding: 0, transition: "all .15s" }}
          />
        ))}
      </div>
      <button onClick={() => onAdd(sel)}
        style={{ width: "100%", background: "#DC2626", color: "#fff", border: "none", borderRadius: 8, padding: "8px 0", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1 }}
      >Add to Cart</button>
      {/* small arrow */}
      <div style={{ position: "absolute", bottom: -6, right: 20, width: 12, height: 12, background: "#fff", border: "1px solid #E5E7EB", transform: "rotate(45deg)", borderTop: "none", borderLeft: "none" }} />
    </div>
  );
}

export function CartPageClient() {
  const { cart, removeFromCart, updateQuantity, cartTotal, addToCart } = useStore();
  const [branch, setBranch] = useState<string | null>(null);
  const [openPopup, setOpenPopup] = useState<number | null>(null);
  const router = useRouter();

  const cc = cart.reduce((s, c) => s + c.quantity, 0);
  const ct = cartTotal();

  const checkout = () => {
    if (!branch) return;
    const b = BRANCHES.find(x => x.name === branch);
    if (!b) return;
    const lines = cart.map(c => `• ${c.name}${c.color ? ` (${c.color})` : ""} x${c.quantity} — $${(c.price * c.quantity)}`).join("\n");
    const msg = `Hi! I'd like to order from the ${branch} branch:\n\n${lines}\n\nTotal: $${ct}`;
    window.open(`https://wa.me/${b.wa}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleAddRec = (item: typeof ACCESSORIES[0], color: string) => {
    addToCart({ id: String(item.id), name: item.name, price: item.price, type: "accessory", slug: String(item.id), color: color || undefined });
    toast.success(`${item.name}${color ? ` (${color})` : ""} added to cart`);
    setOpenPopup(null);
  };

  // Smart recommendations — comprehensive rules covering every product
  const cartIds = cart.map(c => Number(c.id));
  const hasScooter = cart.some(c => c.type === "scooter");
  const hasCat = (cat: string) => cart.some(c => {
    const acc = ACCESSORIES.find(a => String(a.id) === c.id);
    return acc?.cat === cat;
  });
  const hasId = (id: number) => cartIds.includes(id);

  const rules: [boolean, number[], string][] = [
    // Scooter → safety + gear
    [hasScooter,                                   [101, 102],       "Protect your head"],
    [hasScooter,                                   [103],            "Better grip, safer ride"],
    [hasScooter,                                   [104],            "Essential body protection"],
    [hasScooter,                                   [106],            "Keep it secure"],
    [hasScooter,                                   [105],            "Navigate hands-free"],
    [hasScooter,                                   [107],            "Stay visible at night"],
    [hasScooter,                                   [108],            "Carry it anywhere"],
    // Protection items → cross-sell others
    [hasId(101) || hasId(102),                     [103, 104],       "Complete your safety gear"],
    [hasId(103),                                   [101, 104],       "Complete your safety gear"],
    [hasId(104),                                   [101, 103],       "Complete your safety gear"],
    // Gear → related gear
    [hasId(105),                                   [107, 108, 106],  "Upgrade your ride setup"],
    [hasId(106),                                   [108, 107, 105],  "Complete your security kit"],
    [hasId(107),                                   [105, 106],       "Pair with your LED kit"],
    [hasId(108),                                   [106, 107, 105],  "Pair with your carry bag"],
    // Parts → related parts
    [hasId(109),                                   [110, 111, 112],  "While you're replacing parts"],
    [hasId(110),                                   [109, 111],       "Common maintenance bundle"],
    [hasId(111),                                   [109, 110, 112],  "Common maintenance bundle"],
    [hasId(112),                                   [109, 110, 111],  "Complete your toolkit"],
    // Any accessory (no scooter) → suggest safety + gear
    [hasCat("Protection") && !hasScooter,          [103, 104],       "Complete your safety gear"],
    [hasCat("Gear") && !hasScooter && !hasCat("Protection"), [101, 103, 104], "Stay protected"],
    [hasCat("Parts") && !hasScooter,               [106, 107, 105],  "Popular riding accessories"],
    // Fallback: non-empty cart with no other triggers → popular picks
    [cart.length > 0,                              [101, 106, 107, 105], "Popular picks"],
  ];

  const seen = new Set<number>();
  const suggestions: Array<{ item: typeof ACCESSORIES[0]; reason: string }> = [];
  for (const [condition, ids, reason] of rules) {
    if (!condition) continue;
    for (const id of ids) {
      if (cartIds.includes(id) || seen.has(id)) continue;
      const item = ACCESSORIES.find(a => a.id === id);
      if (item) { suggestions.push({ item, reason }); seen.add(id); }
    }
    if (suggestions.length >= 4) break;
  }
  const shown = suggestions.slice(0, 4);

  return (
    <div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px" }}>
        <button
          onClick={() => router.push("/")}
          style={{ color: "#555", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontFamily: F, background: "none", border: "none", cursor: "pointer", marginBottom: 32, display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Shop
        </button>

        <h1 style={{ fontSize: 36, fontWeight: 800, fontFamily: F, textTransform: "uppercase", marginBottom: 32 }}>
          Your Cart
          <span style={{ color: "#999", fontSize: 16, fontWeight: 500, marginLeft: 10, verticalAlign: "middle" }}>({cc})</span>
        </h1>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ marginBottom: 16, display: "block", margin: "0 auto 16px" }}>
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <p style={{ color: "#888", fontSize: 16, marginBottom: 20 }}>Your cart is empty</p>
            <button
              onClick={() => router.push("/")}
              style={{ background: "#DC2626", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1, textTransform: "uppercase" }}
            >Start Shopping</button>
          </div>
        ) : (
          <>
            {cart.map(c => {
              const isScooter = c.type === "scooter";
              const numId = Number(c.id);
              return (
                <div key={`${c.id}_${c.color}`} style={{ padding: "16px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 56, height: 56, background: "#F9FAFB", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid #E5E7EB" }}>
                      {isScooter
                        ? <div style={{ width: 40, height: 28 }}><ScooterSVG variant={numId % 3} accent="#DC2626" /></div>
                        : <AccSVG type={ACCESSORIES.find(a => a.id === numId)?.cat || "Gear"} color={ACCESSORIES.find(a => a.id === numId)?.color || "#DC2626"} itemId={numId} />
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: 15, fontWeight: 700, fontFamily: F, margin: 0 }}>{c.name}</h4>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                        {c.color && <span style={{ fontSize: 11, color: "#DC2626", fontWeight: 600, fontFamily: F }}>{c.color}</span>}
                        <span style={{ fontSize: 12, color: "#888" }}>${c.price} each</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 20, fontWeight: 800, fontFamily: F }}>${c.price * c.quantity}</span>
                      <button onClick={() => removeFromCart(c.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#bbb", transition: "color .2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#DC2626")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#bbb")}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, marginLeft: 68 }}>
                    <button onClick={() => updateQuantity(c.id, c.quantity - 1)}
                      style={{ width: 32, height: 32, borderRadius: 8, background: "#F3F4F6", border: "1px solid #E5E7EB", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s" }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = "#DC2626")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E7EB")}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                    <span style={{ fontFamily: F, fontWeight: 700, fontSize: 16, minWidth: 24, textAlign: "center" }}>{c.quantity}</span>
                    <button onClick={() => updateQuantity(c.id, c.quantity + 1)}
                      style={{ width: 32, height: 32, borderRadius: 8, background: "#F3F4F6", border: "1px solid #E5E7EB", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s" }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = "#DC2626")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E7EB")}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Smart Recommendations */}
            {shown.length > 0 && (
              <div style={{ marginTop: 28, marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                  <span style={{ fontFamily: F, fontWeight: 700, fontSize: 15, letterSpacing: 1 }}>Recommended for you</span>
                </div>
                <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
                  {shown.map(({ item: sg, reason }) => (
                    <div key={sg.id}
                      style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 12, padding: 14, minWidth: 180, maxWidth: 200, flexShrink: 0, position: "relative" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, cursor: "pointer" }}
                        onClick={() => router.push(`/accessories/${sg.id}`)}
                      >
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: "#fff", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <AccSVG type={sg.cat} color={sg.color} itemId={sg.id} />
                        </div>
                        <div>
                          <div style={{ fontFamily: F, fontWeight: 700, fontSize: 13 }}>{sg.name}</div>
                          <div style={{ fontSize: 10, color: "#DC2626", fontWeight: 600, fontFamily: F }}>{reason}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                        <span style={{ fontFamily: F, fontWeight: 800, fontSize: 16 }}>${sg.price}</span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            if (sg.colorOptions && sg.colorOptions.length > 0) {
                              setOpenPopup(openPopup === sg.id ? null : sg.id);
                            } else {
                              handleAddRec(sg, "");
                            }
                          }}
                          style={{ background: "#DC2626", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: F, letterSpacing: 1 }}
                        >Add</button>
                      </div>
                      {openPopup === sg.id && sg.colorOptions && (
                        <ColorPopup item={sg} onAdd={(color) => handleAddRec(sg, color)} onClose={() => setOpenPopup(null)} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Checkout */}
            <div style={{ marginTop: 32, background: "#F9FAFB", borderRadius: 16, border: "1px solid #E5E7EB", padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: "#888" }}>Total</span>
                <span style={{ fontSize: 28, fontWeight: 800, fontFamily: F, color: "#DC2626" }}>${ct}</span>
              </div>
              <label style={{ fontSize: 13, fontWeight: 700, fontFamily: F, letterSpacing: 1, textTransform: "uppercase", color: "#888", display: "block", marginBottom: 10 }}>Select Branch for Pickup</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                {BRANCHES.map(b => (
                  <button key={b.name} onClick={() => setBranch(b.name)}
                    style={{ background: branch === b.name ? "#FEF2F2" : "#fff", border: `2px solid ${branch === b.name ? "#DC2626" : "#E5E7EB"}`, color: branch === b.name ? "#DC2626" : "#888", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontFamily: F, fontWeight: 700, fontSize: 13, letterSpacing: 1, transition: "all .3s" }}
                  >{b.name}</button>
                ))}
              </div>
              <button onClick={checkout}
                style={{ width: "100%", padding: "16px", fontSize: 15, background: branch ? "#25D366" : "#ccc", color: "#fff", border: "none", borderRadius: 10, fontFamily: F, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", cursor: branch ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.716-1.244A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.326-.672-6.064-1.826l-.424-.282-3.106.819.863-3.151-.306-.488A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Checkout via WhatsApp
              </button>
              <p style={{ textAlign: "center", color: "#999", fontSize: 11, marginTop: 10 }}>Your order will be sent as a WhatsApp message to the selected branch.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
