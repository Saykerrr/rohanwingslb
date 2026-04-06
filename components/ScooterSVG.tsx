import { memo } from "react";

export const ScooterSVG = memo(function ScooterSVG({ variant = 0, accent = "#DC2626" }: { variant?: number; accent?: string }) {
  const v = variant % 3;

  const variants = [
    // Variant 0: Classic kick scooter
    <g key={0}>
      <circle cx="100" cy="74" r="12" stroke={accent} strokeWidth="2.5" fill="none"/>
      <circle cx="100" cy="74" r="3.5" fill={accent} opacity=".3"/>
      <circle cx="32" cy="74" r="12" stroke={accent} strokeWidth="2.5" fill="none"/>
      <circle cx="32" cy="74" r="3.5" fill={accent} opacity=".3"/>
      <rect x="28" y="65" width="76" height="5" rx="2.5" fill={accent} opacity=".12" stroke={accent} strokeWidth="2"/>
      <path d="M38 65 L30 74" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M38 65 L34 22" stroke={accent} strokeWidth="3" strokeLinecap="round"/>
      <path d="M24 22 L44 22" stroke={accent} strokeWidth="3" strokeLinecap="round"/>
      <path d="M24 22 L24 18" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M44 22 L44 18" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M92 63 Q100 56 108 63" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="70" y1="70" x2="74" y2="80" stroke={accent} strokeWidth="1.5" opacity=".3" strokeLinecap="round"/>
    </g>,
    // Variant 1: Sport scooter
    <g key={1}>
      <circle cx="102" cy="74" r="13" stroke={accent} strokeWidth="2.5" fill="none"/>
      <circle cx="102" cy="74" r="4" fill={accent} opacity=".3"/>
      <circle cx="30" cy="74" r="13" stroke={accent} strokeWidth="2.5" fill="none"/>
      <circle cx="30" cy="74" r="4" fill={accent} opacity=".3"/>
      <rect x="26" y="64" width="80" height="6" rx="3" fill={accent} opacity=".1" stroke={accent} strokeWidth="2"/>
      <path d="M36 64 L28 74" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M36 64 L30 18" stroke={accent} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M20 18 L40 18" stroke={accent} strokeWidth="3" strokeLinecap="round"/>
      <path d="M20 18 L20 14" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M40 18 L40 14" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M94 62 Q102 54 110 62" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="30" cy="26" r="2" fill={accent} opacity=".5"/>
      <line x1="50" y1="67" x2="76" y2="67" stroke={accent} strokeWidth="1" opacity=".2"/>
    </g>,
    // Variant 2: Heavy-duty scooter
    <g key={2}>
      <circle cx="100" cy="72" r="14" stroke={accent} strokeWidth="3" fill="none"/>
      <circle cx="100" cy="72" r="4.5" fill={accent} opacity=".25"/>
      <circle cx="100" cy="72" r="9" stroke={accent} strokeWidth="1" fill="none" opacity=".15"/>
      <circle cx="32" cy="72" r="14" stroke={accent} strokeWidth="3" fill="none"/>
      <circle cx="32" cy="72" r="4.5" fill={accent} opacity=".25"/>
      <circle cx="32" cy="72" r="9" stroke={accent} strokeWidth="1" fill="none" opacity=".15"/>
      <rect x="28" y="61" width="76" height="7" rx="3.5" fill={accent} opacity=".08" stroke={accent} strokeWidth="2.5"/>
      <path d="M38 61 L30 72" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M38 61 L36 16" stroke={accent} strokeWidth="4" strokeLinecap="round"/>
      <path d="M26 16 L46 16" stroke={accent} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M26 16 L26 12" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M46 16 L46 12" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M90 58 Q100 50 110 58" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <line x1="35" y1="38" x2="33" y2="48" stroke={accent} strokeWidth="1.5" opacity=".3"/>
      <line x1="38" y1="38" x2="36" y2="48" stroke={accent} strokeWidth="1.5" opacity=".3"/>
    </g>,
  ];

  return (
    <svg viewBox="0 0 140 90" style={{ width: "100%", height: "100%" }}>
      {variants[v]}
    </svg>
  );
});

export const AccSVG = memo(function AccSVG({ type, color = "#DC2626", itemId = 0 }: { type: string; color?: string; itemId?: number }) {
  const icons: Record<number, React.ReactNode> = {
    101: <><path d="M20 6 C12 6 6 12 6 18 L6 22 L34 22 L34 18 C34 12 28 6 20 6Z" stroke={color} strokeWidth="2" fill="none"/><path d="M8 22 L8 26 C8 27 9 28 10 28 L30 28 C31 28 32 27 32 26 L32 22" stroke={color} strokeWidth="2" fill="none"/><line x1="6" y1="22" x2="34" y2="22" stroke={color} strokeWidth="2"/></>,
    102: <><path d="M20 8 C13 8 8 13 8 18 L8 20 L32 20 L32 18 C32 13 27 8 20 8Z" stroke={color} strokeWidth="2" fill="none"/><line x1="8" y1="20" x2="32" y2="20" stroke={color} strokeWidth="2"/><path d="M12 20 L10 26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M28 20 L30 26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></>,
    103: <><path d="M10 14 L10 28 C10 30 12 32 15 32 L25 32 C28 32 30 30 30 28 L30 14 C30 10 26 8 20 8 C14 8 10 10 10 14Z" stroke={color} strokeWidth="2" fill="none"/><line x1="14" y1="18" x2="26" y2="18" stroke={color} strokeWidth="1.5" opacity=".5"/><line x1="14" y1="23" x2="26" y2="23" stroke={color} strokeWidth="1.5" opacity=".5"/></>,
    104: <><ellipse cx="20" cy="20" rx="10" ry="12" stroke={color} strokeWidth="2" fill="none"/><ellipse cx="20" cy="20" rx="5" ry="7" stroke={color} strokeWidth="1.5" fill={color} opacity=".15"/><line x1="20" y1="8" x2="20" y2="12" stroke={color} strokeWidth="1.5"/><line x1="20" y1="28" x2="20" y2="32" stroke={color} strokeWidth="1.5"/></>,
    105: <><rect x="12" y="8" width="16" height="24" rx="2" stroke={color} strokeWidth="2" fill="none"/><circle cx="20" cy="28" r="1.5" fill={color}/><line x1="16" y1="12" x2="24" y2="12" stroke={color} strokeWidth="1" opacity=".4"/><path d="M8 18 L12 16 L12 24 L8 22Z" stroke={color} strokeWidth="1.5" fill="none"/></>,
    106: <><path d="M14 18 L14 12 C14 8.7 16.7 6 20 6 C23.3 6 26 8.7 26 12 L26 18" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/><rect x="10" y="18" width="20" height="14" rx="3" stroke={color} strokeWidth="2" fill="none"/><circle cx="20" cy="25" r="2.5" fill={color} opacity=".4"/></>,
    107: <><circle cx="20" cy="18" r="8" stroke={color} strokeWidth="2" fill="none"/><circle cx="20" cy="18" r="3" fill={color} opacity=".3"/><line x1="20" y1="26" x2="20" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="30" x2="24" y2="30" stroke={color} strokeWidth="1.5"/><path d="M12 12 L8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M28 12 L32 8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></>,
    108: <><path d="M10 10 L30 10 L28 32 L12 32Z" stroke={color} strokeWidth="2" fill="none"/><path d="M10 10 C10 10 14 6 20 6 C26 6 30 10 30 10" stroke={color} strokeWidth="2" fill="none"/><line x1="16" y1="16" x2="24" y2="16" stroke={color} strokeWidth="1.5" opacity=".5"/></>,
    109: <><circle cx="20" cy="20" r="12" stroke={color} strokeWidth="2" fill="none"/><circle cx="20" cy="20" r="6" stroke={color} strokeWidth="1.5" fill="none"/><circle cx="20" cy="20" r="2" fill={color} opacity=".4"/></>,
    110: <><ellipse cx="20" cy="20" rx="12" ry="12" stroke={color} strokeWidth="2" fill="none"/><ellipse cx="20" cy="20" rx="8" ry="8" stroke={color} strokeWidth="1" fill="none" opacity=".4"/><line x1="20" y1="8" x2="20" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    111: <><rect x="8" y="12" width="24" height="16" rx="8" stroke={color} strokeWidth="2" fill="none"/><line x1="8" y1="20" x2="14" y2="20" stroke={color} strokeWidth="1.5" opacity=".4"/><line x1="26" y1="20" x2="32" y2="20" stroke={color} strokeWidth="1.5" opacity=".4"/><path d="M14 16 L14 24" stroke={color} strokeWidth="1.5" opacity=".3"/><path d="M26 16 L26 24" stroke={color} strokeWidth="1.5" opacity=".3"/></>,
    112: <><rect x="10" y="12" width="20" height="18" rx="2" stroke={color} strokeWidth="2" fill="none"/><line x1="18" y1="8" x2="22" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="20" y1="8" x2="20" y2="12" stroke={color} strokeWidth="2"/><circle cx="20" cy="22" r="3" stroke={color} strokeWidth="1.5" fill="none"/><path d="M20 25 L20 27" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></>,
  };

  const catIcons: Record<string, React.ReactNode> = {
    Protection: <><path d="M20 6 C12 6 6 12 6 18 L6 22 L34 22 L34 18 C34 12 28 6 20 6Z" stroke={color} strokeWidth="2" fill="none"/><line x1="6" y1="22" x2="34" y2="22" stroke={color} strokeWidth="2"/><path d="M8 22 L8 26 C8 27 9 28 10 28 L30 28 C31 28 32 27 32 26 L32 22" stroke={color} strokeWidth="2" fill="none"/></>,
    Gear: <><rect x="8" y="8" width="24" height="24" rx="4" stroke={color} strokeWidth="2" fill="none"/><circle cx="20" cy="20" r="5" stroke={color} strokeWidth="1.5" fill="none"/><line x1="20" y1="15" x2="20" y2="20" stroke={color} strokeWidth="1.5"/></>,
    Parts: <><circle cx="20" cy="20" r="12" stroke={color} strokeWidth="2" fill="none"/><circle cx="20" cy="20" r="4" fill={color} opacity=".3"/><line x1="20" y1="8" x2="20" y2="14" stroke={color} strokeWidth="1.5"/><line x1="20" y1="26" x2="20" y2="32" stroke={color} strokeWidth="1.5"/><line x1="8" y1="20" x2="14" y2="20" stroke={color} strokeWidth="1.5"/><line x1="26" y1="20" x2="32" y2="20" stroke={color} strokeWidth="1.5"/></>,
  };

  const icon = (itemId && icons[itemId]) || catIcons[type] || catIcons.Gear;

  return (
    <svg viewBox="0 0 40 40" style={{ width: 40, height: 40, display: "block", margin: "0 auto" }}>
      {icon}
    </svg>
  );
});
