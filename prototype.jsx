import { useState, useEffect, useRef } from "react";

const LOGO_SM = "data:image/png;base64,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";
const LOGO_LG = "data:image/png;base64,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";

const SCOOTERS = [
  { id:1, name:"Xiaomi Scooter 4 Pro", brand:"Xiaomi", cat:"Performance", price:599, speed:"25 km/h", range:"56 km", motor:"350W", weight:"16.5 kg", battery:"36V 12.4Ah", brakes:"Disc + Regen", tires:'10" Pneumatic', charge:"6 hrs", maxLoad:"120 kg", suspension:"Front + Rear", waterproof:"IP54", badge:"Best Seller", color:"#DC2626", desc:"Xiaomi's flagship commuter with dual suspension and impressive 56 km range.", full:"The Xiaomi Electric Scooter 4 Pro delivers a premium riding experience with its dual suspension system that absorbs bumps and cracks effortlessly. The 350W motor provides smooth acceleration up to 25 km/h, while the generous 12.4Ah battery offers up to 56 km of real-world range. 10-inch pneumatic tires ensure excellent grip in all conditions, and the disc brake plus regenerative braking system delivers confident stopping power. The bright LED display shows speed, battery, and ride mode at a glance." },
  { id:2, name:"Segway Ninebot MAX G2", brand:"Segway", cat:"Performance", price:899, speed:"25 km/h", range:"70 km", motor:"450W", weight:"19.8 kg", battery:"36V 15.3Ah", brakes:"Dual Braking", tires:'10" Self-Sealing', charge:"6 hrs", maxLoad:"120 kg", suspension:"Dual Suspension", waterproof:"IPX5", badge:"Premium", color:"#991B1B", desc:"The ultimate range king with 70 km on a single charge and self-sealing tires.", full:"The Segway Ninebot MAX G2 is built for riders who refuse to worry about range. Its massive 15.3Ah battery delivers up to 70 km on a single charge, making it the longest-range scooter in our lineup. The 450W motor handles hills with ease, while the dual suspension and 10-inch self-sealing tubeless tires create an incredibly smooth ride. Apple Find My integration, a full-color dashboard, and built-in turn signals make this the most feature-rich scooter available." },
  { id:3, name:"Xiaomi Scooter 4", brand:"Xiaomi", cat:"Urban", price:449, speed:"25 km/h", range:"35 km", motor:"300W", weight:"12.5 kg", battery:"36V 7.65Ah", brakes:"Disc + E-Brake", tires:'10" Pneumatic', charge:"5 hrs", maxLoad:"110 kg", suspension:"Front Spring", waterproof:"IP54", badge:null, color:"#EF4444", desc:"Lightweight daily commuter at just 12.5 kg with a comfortable 35 km range.", full:"The Xiaomi Electric Scooter 4 strikes the perfect balance between performance and portability. At just 12.5 kg, it folds in seconds and is easy to carry up stairs or onto public transport. The 300W motor reaches 25 km/h, and the 35 km range handles most daily commutes with room to spare. 10-inch pneumatic tires and front spring suspension smooth out rough city roads, while the disc brake provides reliable stopping power." },
  { id:4, name:"Segway Ninebot F2 Pro", brand:"Segway", cat:"Performance", price:749, speed:"25 km/h", range:"55 km", motor:"400W", weight:"18.5 kg", battery:"36V 12.8Ah", brakes:"Disc + E-Brake", tires:'10" Pneumatic', charge:"6 hrs", maxLoad:"120 kg", suspension:"Dual Spring", waterproof:"IP55", badge:"New", color:"#B91C1C", desc:"Powerful mid-range performer with dual spring suspension and 55 km range.", full:"The Segway Ninebot F2 Pro bridges the gap between entry-level and flagship. Its 400W motor delivers punchy acceleration, while the dual spring suspension smooths out even the worst urban roads. With 55 km of range from the 12.8Ah battery, you can commute all week on just two charges. IP55 water resistance means rain will not stop you, and the 10-inch pneumatic tires grip confidently on wet surfaces." },
  { id:5, name:"NIU KQi3 Pro", brand:"NIU", cat:"Urban", price:549, speed:"32 km/h", range:"50 km", motor:"350W", weight:"17.5 kg", battery:"48V 12.5Ah", brakes:"Drum + Regen", tires:'9.5" Tubeless', charge:"7 hrs", maxLoad:"120 kg", suspension:"Front Spring", waterproof:"IPX4", badge:null, color:"#DC2626", desc:"Fast and refined with a 32 km/h top speed and 50 km range on 48V power.", full:"The NIU KQi3 Pro stands out with its 48V power system that maintains consistent performance even as the battery drains. The 350W motor pushes to a class-leading 32 km/h, while the 12.5Ah battery delivers 50 km of range. The 9.5-inch tubeless tires are puncture-resistant and maintenance-free, and the drum brake plus regenerative braking system provides smooth, controlled stopping. NIU's app lets you customize ride settings and track your rides." },
  { id:6, name:"Segway Ninebot E2 Plus", brand:"Segway", cat:"Compact", price:299, speed:"20 km/h", range:"25 km", motor:"300W", weight:"14.2 kg", battery:"36V 5.1Ah", brakes:"E-Brake", tires:'8.1" Solid', charge:"3.5 hrs", maxLoad:"90 kg", suspension:"None", waterproof:"IP54", badge:"Budget Pick", color:"#F87171", desc:"Affordable and compact. The perfect starter scooter for short city trips.", full:"The Segway Ninebot E2 Plus is the ideal entry point into electric scooters. At just $299, it offers reliable Segway quality with a 300W motor that reaches 20 km/h. The 25 km range covers short commutes and errands easily, and the 3.5-hour charge time means it is always ready to go. Solid 8.1-inch tires eliminate flat tire worries, and the lightweight 14.2 kg frame makes it easy to carry when needed." },
  { id:7, name:"Xiaomi Scooter 4 Ultra", brand:"Xiaomi", cat:"Performance", price:799, speed:"25 km/h", range:"70 km", motor:"500W", weight:"24 kg", battery:"48V 12.8Ah", brakes:"Disc + E-Brake", tires:'10" Tubeless', charge:"7 hrs", maxLoad:"120 kg", suspension:"Dual Suspension", waterproof:"IP55", badge:"Flagship", color:"#7F1D1D", desc:"Xiaomi's most powerful scooter with 500W motor and 70 km range.", full:"The Xiaomi Electric Scooter 4 Ultra is the pinnacle of Xiaomi's scooter engineering. The powerful 500W motor handles steep inclines without slowing down, while the 48V 12.8Ah battery provides an impressive 70 km range. Full dual suspension front and rear absorbs every bump, and 10-inch tubeless tires deliver excellent traction. The large LED dashboard, ambient lighting, and turn signals make this a true premium riding experience." },
  { id:8, name:"NIU KQi2 Pro", brand:"NIU", cat:"Urban", price:399, speed:"25 km/h", range:"40 km", motor:"300W", weight:"14.5 kg", battery:"36V 9.6Ah", brakes:"Disc + Regen", tires:'10" Tubeless', charge:"5 hrs", maxLoad:"100 kg", suspension:"Front Fork", waterproof:"IPX4", badge:null, color:"#B91C1C", desc:"Smooth, lightweight, and reliable. A top pick for everyday urban riding.", full:"The NIU KQi2 Pro has been a favorite among urban commuters since its launch. The 300W motor provides smooth, predictable acceleration up to 25 km/h, while the 40 km range handles daily commutes without worry. 10-inch tubeless tires offer a comfortable ride without the hassle of inner tubes, and the disc brake with regenerative braking delivers reliable stopping power. At 14.5 kg, it is light enough to carry up a flight of stairs." },
];

const ACCESSORIES = [
  { id:101, name:"Full-Face Helmet", cat:"Protection", price:89, desc:"DOT-certified with ventilation system and removable liner. Maximum protection for high-speed riding.", full:"Our Full-Face Helmet provides complete head and chin protection with a DOT-certified shell. Features include an adjustable ventilation system with 6 intake vents, removable and washable liner, scratch-resistant visor with UV protection, and quick-release buckle system. Available in matte black and gloss red.", color:"#DC2626" },
  { id:102, name:"Half Helmet", cat:"Protection", price:49, desc:"Lightweight open-face helmet with adjustable strap and reflective accents.", full:"Perfect for urban commuters who prefer an open-face design. ABS outer shell with EPS foam liner provides reliable impact protection while maintaining excellent visibility and airflow. Reflective strips on the back for nighttime visibility.", color:"#EF4444" },
  { id:103, name:"Riding Gloves", cat:"Protection", price:29, desc:"Touchscreen-compatible with reinforced palm padding for grip and comfort.", full:"These riding gloves feature reinforced palm padding with silicone grip patterns, touchscreen-compatible fingertips on thumb and index finger, breathable mesh back panel, and adjustable velcro wrist closure. Ideal for all-season riding.", color:"#B91C1C" },
  { id:104, name:"Knee & Elbow Pads", cat:"Protection", price:39, desc:"4-piece set with breathable mesh and impact-resistant shells.", full:"Professional-grade protection set includes 2 knee pads and 2 elbow pads with hard PE shells, EVA foam padding, and breathable mesh fabric. Adjustable elastic straps ensure a secure fit for riders of all sizes.", color:"#DC2626" },
  { id:105, name:"Phone Mount", cat:"Gear", price:19, desc:"Universal clamp mount with 360-degree rotation and vibration damping.", full:"Fits phones from 4.7 to 6.8 inches with a secure 4-point clamp system. Silicone vibration damping pads protect your device from road vibrations. Ball joint allows 360-degree rotation for portrait or landscape viewing.", color:"#991B1B" },
  { id:106, name:"Scooter Lock", cat:"Gear", price:35, desc:"Heavy-duty U-lock with braided steel cable and dust cover.", full:"16mm hardened steel shackle resists cutting, sawing, and prying attacks. Includes a 4-foot braided steel cable for securing both wheels. PVC coating prevents scratches on your scooter. Comes with 3 laser-cut keys and a mounting bracket.", color:"#7F1D1D" },
  { id:107, name:"LED Light Kit", cat:"Gear", price:25, desc:"Front and rear LED set with multiple flash modes for night visibility.", full:"USB-rechargeable LED light kit with 800-lumen front light and rear tail light. 5 lighting modes including steady, strobe, and pulse. IPX5 waterproof rating. Silicone mounting straps fit any handlebar diameter. 8-hour battery life on medium setting.", color:"#EF4444" },
  { id:108, name:"Carry Bag", cat:"Gear", price:45, desc:"Padded shoulder bag fits scooters up to 20 kg with external pockets.", full:"Heavy-duty 600D Oxford fabric bag with reinforced stitching. Thick foam padding protects your scooter during transport. Adjustable shoulder strap with comfort pad distributes weight evenly. External zippered pocket for charger and accessories.", color:"#DC2626" },
  { id:109, name:"Disc Brake Pads", cat:"Parts", price:12, desc:"OEM-grade replacement pads for reliable stopping power.", full:"Semi-metallic compound provides consistent braking performance in all weather conditions. Pre-bedded for immediate use. Compatible with most standard disc brake calipers. Sold as a pair. Average lifespan of 1,000+ km depending on riding style.", color:"#B91C1C" },
  { id:110, name:"Inner Tube 10\"", cat:"Parts", price:9, desc:"Butyl rubber tube for 10-inch pneumatic tires.", full:"High-quality butyl rubber inner tube with excellent air retention. Fits standard 10-inch pneumatic scooter tires. Straight valve stem for easy inflation. Keep a spare in your bag for worry-free rides.", color:"#991B1B" },
  { id:111, name:"Handlebar Grips", cat:"Parts", price:15, desc:"Ergonomic anti-slip grips with shock absorption.", full:"Dual-density rubber construction with a soft outer layer for comfort and firm inner core for control. Honeycomb pattern provides superior grip in wet conditions. Easy installation with standard 22mm inner diameter.", color:"#7F1D1D" },
  { id:112, name:"Charger 48V", cat:"Parts", price:39, desc:"Fast charger compatible with 48V battery systems. LED indicator.", full:"2A output for faster charging times compared to standard 1.5A chargers. Universal input (100-240V) for worldwide compatibility. LED indicator shows charging status: red for charging, green for complete. Built-in overcharge, overheat, and short-circuit protection.", color:"#EF4444" },
];

const FAQS = [
  { q:"Do you offer warranty on all scooters?", a:"Yes, all our electric scooters come with a minimum 6-month warranty covering the motor, battery, and controller. Extended warranty plans are also available." },
  { q:"Can I test ride before purchasing?", a:"Absolutely! Visit any of our three branches and our team will set you up with a test ride on any model in stock." },
  { q:"Do you sell replacement parts and accessories?", a:"We carry a full range of parts, accessories, and protective gear. From tires and brake pads to helmets and phone mounts." },
  { q:"Do you offer wholesale pricing?", a:"Yes, we offer competitive wholesale rates for bulk orders. Contact us directly via WhatsApp to discuss volume pricing and delivery." },
  { q:"What payment methods do you accept?", a:"We accept cash (USD and LBP), OMT, Whish, and bank transfers. Installment plans may be available on select models." },
  { q:"Do you provide repair and maintenance services?", a:"Our technicians handle everything from routine tune-ups to motor and battery replacements. Bring your scooter to any branch or reach out on WhatsApp." },
];

const BRANCHES = [
  { name:"Borj Hammoud", phone:"79 185 184", wa:"96179185184", maps:"https://maps.app.goo.gl/ofXirR7QszdbcaVC8" },
  { name:"Zouk Mosbeh", phone:"81 185 184", wa:"96181185184", maps:"https://maps.app.goo.gl/oC9tSDxCDbzFVucD9" },
  { name:"Amchit", phone:null, wa:"96179185184", maps:"https://maps.app.goo.gl/hEHLhMAJgcHgCiS8A" },
];

const F = "'Oswald',sans-serif";

const ScooterSVG = ({ variant=0, accent="#DC2626" }) => {
  const V = [
    // Variant 0: Classic kick scooter - upright stance
    ()=>(<g>
      {/* Rear wheel */}<circle cx="100" cy="74" r="12" stroke={accent} strokeWidth="2.5" fill="none"/><circle cx="100" cy="74" r="3.5" fill={accent} opacity=".3"/>
      {/* Front wheel */}<circle cx="32" cy="74" r="12" stroke={accent} strokeWidth="2.5" fill="none"/><circle cx="32" cy="74" r="3.5" fill={accent} opacity=".3"/>
      {/* Deck */}<rect x="28" y="65" width="76" height="5" rx="2.5" fill={accent} opacity=".12" stroke={accent} strokeWidth="2"/>
      {/* Fork + steering column */}<path d="M38 65 L30 74" stroke={accent} strokeWidth="2" strokeLinecap="round"/><path d="M38 65 L34 22" stroke={accent} strokeWidth="3" strokeLinecap="round"/>
      {/* Handlebar */}<path d="M24 22 L44 22" stroke={accent} strokeWidth="3" strokeLinecap="round"/><path d="M24 22 L24 18" stroke={accent} strokeWidth="2" strokeLinecap="round"/><path d="M44 22 L44 18" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      {/* Rear fender */}<path d="M92 63 Q100 56 108 63" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Kickstand hint */}<line x1="70" y1="70" x2="74" y2="80" stroke={accent} strokeWidth="1.5" opacity=".3" strokeLinecap="round"/>
    </g>),
    // Variant 1: Sport scooter - slightly forward-leaning
    ()=>(<g>
      {/* Rear wheel */}<circle cx="102" cy="74" r="13" stroke={accent} strokeWidth="2.5" fill="none"/><circle cx="102" cy="74" r="4" fill={accent} opacity=".3"/>
      {/* Front wheel */}<circle cx="30" cy="74" r="13" stroke={accent} strokeWidth="2.5" fill="none"/><circle cx="30" cy="74" r="4" fill={accent} opacity=".3"/>
      {/* Deck - wider */}<rect x="26" y="64" width="80" height="6" rx="3" fill={accent} opacity=".1" stroke={accent} strokeWidth="2"/>
      {/* Fork */}<path d="M36 64 L28 74" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/><path d="M36 64 L30 18" stroke={accent} strokeWidth="3.5" strokeLinecap="round"/>
      {/* Handlebar - wider T-bar */}<path d="M20 18 L40 18" stroke={accent} strokeWidth="3" strokeLinecap="round"/><path d="M20 18 L20 14" stroke={accent} strokeWidth="2" strokeLinecap="round"/><path d="M40 18 L40 14" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      {/* Rear suspension */}<path d="M94 62 Q102 54 110 62" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Front light */}<circle cx="30" cy="26" r="2" fill={accent} opacity=".5"/>
      {/* Deck texture */}<line x1="50" y1="67" x2="76" y2="67" stroke={accent} strokeWidth="1" opacity=".2"/>
    </g>),
    // Variant 2: Heavy-duty scooter - bigger wheels, beefy
    ()=>(<g>
      {/* Rear wheel */}<circle cx="100" cy="72" r="14" stroke={accent} strokeWidth="3" fill="none"/><circle cx="100" cy="72" r="4.5" fill={accent} opacity=".25"/><circle cx="100" cy="72" r="9" stroke={accent} strokeWidth="1" fill="none" opacity=".15"/>
      {/* Front wheel */}<circle cx="32" cy="72" r="14" stroke={accent} strokeWidth="3" fill="none"/><circle cx="32" cy="72" r="4.5" fill={accent} opacity=".25"/><circle cx="32" cy="72" r="9" stroke={accent} strokeWidth="1" fill="none" opacity=".15"/>
      {/* Deck */}<rect x="28" y="61" width="76" height="7" rx="3.5" fill={accent} opacity=".08" stroke={accent} strokeWidth="2.5"/>
      {/* Fork + column */}<path d="M38 61 L30 72" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/><path d="M38 61 L36 16" stroke={accent} strokeWidth="4" strokeLinecap="round"/>
      {/* Handlebar */}<path d="M26 16 L46 16" stroke={accent} strokeWidth="3.5" strokeLinecap="round"/><path d="M26 16 L26 12" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/><path d="M46 16 L46 12" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Dual rear fender */}<path d="M90 58 Q100 50 110 58" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Front suspension fork lines */}<line x1="35" y1="38" x2="33" y2="48" stroke={accent} strokeWidth="1.5" opacity=".3"/><line x1="38" y1="38" x2="36" y2="48" stroke={accent} strokeWidth="1.5" opacity=".3"/>
    </g>),
  ];
  const C = V[variant%3]; return <svg viewBox="0 0 140 90" style={{width:"100%",height:"100%"}}><C/></svg>;
};

const AccSVG = ({type,color="#DC2626",itemId=0})=>{
  const icons = {
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
  const catIcons = {
    Protection: <><path d="M20 6 C12 6 6 12 6 18 L6 22 L34 22 L34 18 C34 12 28 6 20 6Z" stroke={color} strokeWidth="2" fill="none"/><line x1="6" y1="22" x2="34" y2="22" stroke={color} strokeWidth="2"/><path d="M8 22 L8 26 C8 27 9 28 10 28 L30 28 C31 28 32 27 32 26 L32 22" stroke={color} strokeWidth="2" fill="none"/></>,
    Gear: <><rect x="8" y="8" width="24" height="24" rx="4" stroke={color} strokeWidth="2" fill="none"/><circle cx="20" cy="20" r="5" stroke={color} strokeWidth="1.5" fill="none"/><line x1="20" y1="15" x2="20" y2="20" stroke={color} strokeWidth="1.5"/></>,
    Parts: <><circle cx="20" cy="20" r="12" stroke={color} strokeWidth="2" fill="none"/><circle cx="20" cy="20" r="4" fill={color} opacity=".3"/><line x1="20" y1="8" x2="20" y2="14" stroke={color} strokeWidth="1.5"/><line x1="20" y1="26" x2="20" y2="32" stroke={color} strokeWidth="1.5"/><line x1="8" y1="20" x2="14" y2="20" stroke={color} strokeWidth="1.5"/><line x1="26" y1="20" x2="32" y2="20" stroke={color} strokeWidth="1.5"/></>,
  };
  const icon = (itemId && icons[itemId]) || catIcons[type] || catIcons.Gear;
  return <svg viewBox="0 0 40 40" style={{width:40,height:40,display:"block",margin:"0 auto"}}>{icon}</svg>;
};

const Badge = ({text})=>{
  const bg = text==="New"?"#DC2626":text==="Flagship"?"linear-gradient(135deg,#DC2626,#F59E0B)":text==="Premium"?"linear-gradient(135deg,#7C3AED,#DC2626)":"#DC2626";
  return <div style={{position:"absolute",top:12,right:12,zIndex:2,background:bg,color:"#fff",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20,letterSpacing:1,textTransform:"uppercase",fontFamily:F}}>{text}</div>;
};

const FAQ = ({faq})=>{const[o,setO]=useState(false);return(<div style={{borderBottom:"1px solid #E5E7EB"}}><button onClick={()=>setO(!o)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 0",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}><span style={{fontSize:16,color:"#111",fontWeight:600,fontFamily:F,paddingRight:20}}>{faq.q}</span><span style={{width:28,height:28,minWidth:28,borderRadius:"50%",border:`2px solid ${o?"#DC2626":"#D1D5DB"}`,display:"flex",alignItems:"center",justifyContent:"center",color:o?"#DC2626":"#999",fontSize:18,transition:"all .3s",transform:o?"rotate(45deg)":"none"}}>+</span></button><div style={{maxHeight:o?200:0,overflow:"hidden",transition:"max-height .4s ease"}}><p style={{margin:0,padding:"0 0 18px",fontSize:14,color:"#666",lineHeight:1.7}}>{faq.a}</p></div></div>);};

const Footer = ({scrollTo,F,LOGO_LG})=>(
  <footer style={{background:"#111",color:"#fff",padding:"48px 32px 24px"}}>
    <div className="fg" style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:32,marginBottom:32}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
        <img src={LOGO_LG} alt="RW" style={{height:36,width:"auto"}}/>
        <div><div style={{fontFamily:F,fontWeight:800,fontSize:16}}>Rohan Wings Lebanon</div><p style={{color:"#888",fontSize:13,lineHeight:1.6,marginTop:8}}>Lebanon's premier destination for electric scooters, parts, and service.</p></div>
      </div>
      <div>
        <h4 style={{fontFamily:F,fontWeight:700,fontSize:13,letterSpacing:2,textTransform:"uppercase",marginBottom:14,color:"#DC2626"}}>Quick Links</h4>
        {["Scooters","Accessories","About","FAQ","Contact"].map(s=><div key={s} style={{marginBottom:6}}><span className="nv" onClick={()=>scrollTo(s.toLowerCase())} style={{fontSize:13,color:"#888"}}>{s}</span></div>)}
      </div>
      <div>
        <h4 style={{fontFamily:F,fontWeight:700,fontSize:13,letterSpacing:2,textTransform:"uppercase",marginBottom:14,color:"#DC2626"}}>Connect</h4>
        <a href="https://instagram.com/rohanwings.lb" target="_blank" rel="noopener noreferrer" style={{color:"#888",textDecoration:"none",fontSize:13,display:"block",marginBottom:6}}>Instagram</a>
        <a href="https://wa.me/96179185184" target="_blank" rel="noopener noreferrer" style={{color:"#888",textDecoration:"none",fontSize:13,display:"block"}}>WhatsApp</a>
      </div>
    </div>
    <div style={{maxWidth:1100,margin:"0 auto",borderTop:"1px solid #222",paddingTop:20,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
      <span style={{fontSize:12,color:"#666"}}>2026 Rohan Wings Lebanon. All rights reserved.</span>
      <span style={{fontSize:12,color:"#666"}}>E-Scooters | Parts | Service</span>
    </div>
  </footer>
);



export default function App() {
  const [page,setPage]=useState("home");
  const [sel,setSel]=useState(null);
  const [selType,setSelType]=useState(null);
  const [cart,setCart]=useState([]);
  const [sf,setSf]=useState("All");
  const [brandFilter,setBrandFilter]=useState("All");
  const [af,setAf]=useState("All");
  const [sort,setSort]=useState("default");
  const [activeDD,setActiveDD]=useState(null);
  const [scootVisible,setScootVisible]=useState(8);
  const [accVisible,setAccVisible]=useState(8);
  const [accSort,setAccSort]=useState("default");
  const [scrolled,setScrolled]=useState(false);
  const [showTop,setShowTop]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [branch,setBranch]=useState(null);
  const [toast,setToast]=useState(null);
  const [search,setSearch]=useState("");
  const [searchOpen,setSearchOpen]=useState(false);
  const [searchExpanded,setSearchExpanded]=useState(false);
  const searchRef=useRef(null);
  const [galIdx,setGalIdx]=useState(0);
  const [compareList,setCompareList]=useState([]);
  const [showCompare,setShowCompare]=useState(false);
  const [compareOpen,setCompareOpen]=useState(false);
  const [swapIdx,setSwapIdx]=useState(null);
  const [cmpSearch,setCmpSearch]=useState("");
  
  useEffect(()=>{const h=()=>{setScrolled(window.scrollY>60);setShowTop(window.scrollY>500);};window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);

  // Browser back/forward support
  useEffect(()=>{
    const onPop=(e)=>{
      const s=e.state;
      if(s&&s.page){
        setPage(s.page);
        if(s.product){const item=[...SCOOTERS,...ACCESSORIES].find(i=>i.id===s.product);if(item){setSel(item);setSelType(s.type||"scooter");}}
        else{setSel(null);}
      }else{setPage("home");setSel(null);}
    };
    window.addEventListener("popstate",onPop);
    if(!window.history.state){window.history.replaceState({page:"home"},"");}
    return()=>window.removeEventListener("popstate",onPop);
  },[]);

  const showToast=m=>{setToast(m);setTimeout(()=>setToast(null),2200);};

  // Close search on click outside
  useEffect(()=>{setScootVisible(8);},[sf,brandFilter]);
  useEffect(()=>{setAccVisible(8);},[af]);

  useEffect(()=>{
    if(!searchExpanded) return;
    const h=e=>{setSearchExpanded(false);setSearch("");};
    const t=setTimeout(()=>document.addEventListener("click",h),50);
    return()=>{clearTimeout(t);document.removeEventListener("click",h);};
  },[searchExpanded]);

  // Close menu on click outside
  useEffect(()=>{
    if(!menuOpen) return;
    const h=()=>setMenuOpen(false);
    const t=setTimeout(()=>document.addEventListener("click",h),50);
    return()=>{clearTimeout(t);document.removeEventListener("click",h);};
  },[menuOpen]);
  const cc=cart.reduce((s,c)=>s+c.qty,0);
  const ct=cart.reduce((s,c)=>s+c.item.price*c.qty,0);
  const addCart=item=>{setCart(p=>{const e=p.find(c=>c.item.id===item.id);if(e)return p.map(c=>c.item.id===item.id?{...c,qty:c.qty+1}:c);return[...p,{item,qty:1}];});showToast(`${item.name} added to cart`);};
  const rmCart=id=>setCart(p=>p.filter(c=>c.item.id!==id));
  const updQty=(id,d)=>setCart(p=>{const updated=p.map(c=>c.item.id===id?{...c,qty:c.qty+d}:c);return updated.filter(c=>c.qty>0);});

  const openProd=(p,type)=>{setSel(p);setSelType(type);setPage("product");setGalIdx(0);setCompareOpen(false);window.history.pushState({page:"product",product:p.id,type},"");requestAnimationFrame(()=>{window.scrollTo({top:0,behavior:"instant"});});};
  const goHome=()=>{if(page==="home"){window.scrollTo({top:0,behavior:"smooth"});}else{setPage("home");setSel(null);window.history.pushState({page:"home"},"");requestAnimationFrame(()=>{window.scrollTo({top:0,behavior:"instant"});});}};
  const goCart=()=>{setPage("cart");window.history.pushState({page:"cart"},"");requestAnimationFrame(()=>{window.scrollTo({top:0,behavior:"instant"});});};
  const scrollTo=id=>{if(page!=="home"){setPage("home");setSel(null);}setMenuOpen(false);setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"}),120);};

  const checkout=()=>{
    if(!branch){showToast("Please select a branch");return;}
    const b=BRANCHES.find(x=>x.name===branch);
    let msg=`Hello Rohan Wings! I would like to order from the *${b.name}* branch:\n\n`;
    cart.forEach(c=>{msg+=("- "+c.item.name+" x"+c.qty+" ($"+c.item.price*c.qty+")\n");});
    msg+=("\n*Total: $"+ct+"*\n\nPlease confirm availability. Thank you!");
    window.open(`https://wa.me/${b.wa}?text=${encodeURIComponent(msg)}`,"_blank");
  };

  const startCompare=(current,other)=>{
    setCompareList([current,other]);
    setPage("compare");
    setSwapIdx(null);setCmpSearch("");
    window.history.pushState({page:"compare"},"");
    requestAnimationFrame(()=>{window.scrollTo({top:0,behavior:"instant"});});
  };

  const doSort=(items,s)=>{
    if(s==="price-asc")return[...items].sort((a,b)=>a.price-b.price);
    if(s==="price-desc")return[...items].sort((a,b)=>b.price-a.price);
    if(s==="name")return[...items].sort((a,b)=>a.name.localeCompare(b.name));
    return items;
  };

  let fScoot=sf==="All"?SCOOTERS:SCOOTERS.filter(s=>s.cat===sf);
  if(brandFilter!=="All") fScoot=fScoot.filter(s=>s.brand===brandFilter);
  fScoot=doSort(fScoot,sort);
  const totalScoot=fScoot.length;
  const displayedScoot=fScoot.slice(0,scootVisible);
  let fAcc=af==="All"?ACCESSORIES:ACCESSORIES.filter(a=>a.cat===af);
  fAcc=doSort(fAcc,accSort);
  const totalAcc=fAcc.length;
  const displayedAcc=fAcc.slice(0,accVisible);

  const allItems=[...SCOOTERS,...ACCESSORIES];
  const searchResults=search.length>1?allItems.filter(i=>i.name.toLowerCase().includes(search.toLowerCase())||i.cat.toLowerCase().includes(search.toLowerCase())||i.desc.toLowerCase().includes(search.toLowerCase())):[];

  const sortOptions=[{v:"default",l:"Sort by"},{v:"price-asc",l:"Price: Low to High"},{v:"price-desc",l:"Price: High to Low"},{v:"name",l:"Name: A to Z"}];
  const SortSelect=({value,onChange,sid})=>{
    const isOpen=activeDD===sid;
    const label=sortOptions.find(o=>o.v===value)?.l||"Sort by";
    return(<div style={{position:"relative"}}>
      <button onClick={e=>{e.stopPropagation();setActiveDD(isOpen?null:sid);}} style={{display:"flex",alignItems:"center",gap:6,background:"#fff",border:"1px solid #E5E7EB",borderRadius:8,padding:"8px 14px",cursor:"pointer",transition:"all .2s",borderColor:isOpen?"#DC2626":"#E5E7EB"}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen?"#DC2626":"#999"} strokeWidth="2"><path d="M3 6h18M6 12h12M9 18h6"/></svg>
        <span style={{fontFamily:F,fontSize:12,fontWeight:600,color:value!=="default"?"#111":"#888",letterSpacing:.5}}>{label}</span>
        <span style={{display:"inline-flex",transition:"transform .25s ease",transform:isOpen?"rotate(180deg)":"rotate(0deg)"}}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={isOpen?"#DC2626":"#999"} strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg></span>
      </button>
      {isOpen&&<div style={{position:"absolute",top:"100%",right:0,marginTop:4,background:"#fff",border:"1px solid #E5E7EB",borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,.1)",minWidth:180,zIndex:50,animation:"fadeIn .15s ease",overflow:"hidden"}}>
        {sortOptions.map(o=>(<div key={o.v} onClick={()=>{onChange(o.v);setActiveDD(null);}} style={{padding:"10px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"background .15s",background:value===o.v?"#FEF2F2":"#fff",fontFamily:F,fontSize:12,fontWeight:value===o.v?700:500,color:value===o.v?"#DC2626":"#555"}} onMouseEnter={e=>{if(value!==o.v)e.currentTarget.style.background="#F9FAFB";}} onMouseLeave={e=>{if(value!==o.v)e.currentTarget.style.background="#fff";}}>
          {value===o.v&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
          {o.l}
        </div>))}
      </div>}
    </div>);
  };

  return (
    <div style={{background:"#fff",color:"#111",minHeight:"100vh",fontFamily:"'Inter',-apple-system,sans-serif",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}body{background:#fff}::selection{background:#DC2626;color:#fff}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
        @keyframes toast{0%{transform:translateX(120%)}8%{transform:translateX(0)}92%{transform:translateX(0)}100%{transform:translateX(120%)}}
        .nv{color:#555;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;font-family:'Oswald',sans-serif;transition:color .3s;cursor:pointer;background:none;border:none}.nv:hover{color:#DC2626}
        .fb{background:#fff;border:1px solid #E5E7EB;color:#666;padding:8px 20px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;transition:all .3s;font-family:'Oswald',sans-serif;letter-spacing:1px;text-transform:uppercase}.fb:hover{border-color:#DC2626;color:#DC2626}.fb.ac{background:#DC2626;border-color:#DC2626;color:#fff}
        .cd{background:#fff;border:1px solid #E5E7EB;border-radius:16px;overflow:hidden;transition:all .35s ease;cursor:pointer;position:relative}.cd:hover{border-color:#DC2626;transform:translateY(-4px);box-shadow:0 12px 40px rgba(220,38,38,.1)}
        .rb{background:#DC2626;color:#fff;border:none;border-radius:10px;padding:12px 24px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Oswald',sans-serif;letter-spacing:1px;text-transform:uppercase;transition:all .3s}.rb:hover{background:#B91C1C}
        .ob{background:transparent;color:#111;border:2px solid #E5E7EB;border-radius:10px;padding:12px 24px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Oswald',sans-serif;letter-spacing:1px;text-transform:uppercase;transition:all .3s}.ob:hover{border-color:#DC2626;color:#DC2626}
        .arrow{width:36px;height:36px;border-radius:50%;background:#fff;border:1px solid #E5E7EB;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;position:absolute;top:50%;transform:translateY(-50%);z-index:5;box-shadow:0 2px 8px rgba(0,0,0,.08)}.arrow:hover{border-color:#DC2626;background:#FEF2F2}
        @media(max-width:768px){.ht{font-size:38px!important}.pg{grid-template-columns:1fr!important}.sg{grid-template-columns:1fr 1fr!important}.dl{display:none!important}.mb{display:flex!important}.sp{padding:48px 16px!important}.hp{padding:100px 16px 50px!important}.fg{grid-template-columns:1fr!important}.bg{grid-template-columns:1fr!important}.spg{grid-template-columns:1fr 1fr!important}}
        @media(min-width:769px){.mb{display:none!important}.mm{display:none!important}}
        .hscroll::-webkit-scrollbar{display:none}
      `}</style>

      {toast&&<div style={{position:"fixed",top:80,right:20,zIndex:200,background:"#DC2626",color:"#fff",padding:"12px 22px",borderRadius:10,fontSize:14,fontWeight:600,fontFamily:F,animation:"toast 2.2s ease forwards,slideDown .3s ease",boxShadow:"0 4px 20px rgba(220,38,38,.25)",letterSpacing:1}}>{toast}</div>}

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrolled?"rgba(255,255,255,.97)":"#fff",backdropFilter:"blur(12px)",borderBottom:"1px solid #E5E7EB",transition:"all .3s",padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div onClick={goHome} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
          <img src={LOGO_SM} alt="RW" style={{height:40,width:"auto"}}/>
          <div style={{lineHeight:1.1}}><div style={{fontFamily:F,fontWeight:800,fontSize:16,letterSpacing:1.5,textTransform:"uppercase"}}>Rohan Wings</div><div style={{fontFamily:F,fontWeight:600,fontSize:10,color:"#DC2626",letterSpacing:2,textTransform:"uppercase"}}>Lebanon</div></div>
        </div>

        {/* Search */}
        

        <div className="dl" style={{display:"flex",gap:24,alignItems:"center"}}>
          {["Scooters","Accessories","About","FAQ","Contact"].map(s=><span key={s} className="nv" onClick={()=>scrollTo(s.toLowerCase())}>{s}</span>)}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <button onClick={e=>{e.stopPropagation();setActiveDD(null);setSearchExpanded(!searchExpanded);}} style={{background:"none",border:"none",cursor:"pointer",padding:4}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={searchExpanded?"#DC2626":"#333"} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <button onClick={goCart} style={{position:"relative",background:"none",border:"none",cursor:"pointer",padding:4}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {cc>0&&<div style={{position:"absolute",top:-4,right:-6,width:18,height:18,borderRadius:9,background:"#DC2626",color:"#fff",fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F}}>{cc}</div>}
          </button>

          <div className="mb" onClick={e=>{e.stopPropagation();setActiveDD(null);setMenuOpen(!menuOpen);}} style={{cursor:"pointer",width:24,height:24,position:"relative",display:"none",flexShrink:0,background:"transparent",WebkitTapHighlightColor:"transparent",outline:"none",border:"none",padding:0,margin:0}}>
            <span style={{position:"absolute",left:2,width:20,height:2,backgroundColor:"#333",borderRadius:1,transition:"all .25s ease",top:menuOpen?11:5,transform:menuOpen?"rotate(45deg)":"none",transformOrigin:"center"}}/>
            <span style={{position:"absolute",left:2,top:11,width:20,height:2,backgroundColor:"#333",borderRadius:1,transition:"all .15s ease",opacity:menuOpen?0:1,transform:menuOpen?"scaleX(0)":"scaleX(1)"}}/>
            <span style={{position:"absolute",left:2,width:20,height:2,backgroundColor:"#333",borderRadius:1,transition:"all .25s ease",top:menuOpen?11:17,transform:menuOpen?"rotate(-45deg)":"none",transformOrigin:"center"}}/>
          </div>
        </div>
      </nav>
      {searchExpanded&&<div style={{position:"fixed",top:0,left:0,right:0,zIndex:98,background:"#fff",borderBottom:"1px solid #E5E7EB",padding:"72px 16px 14px 16px",boxShadow:"0 8px 30px rgba(0,0,0,.08)",animation:"slideDown .25s ease"}} onClick={e=>e.stopPropagation()}>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div style={{position:"relative"}}>
            <input ref={searchRef} autoFocus value={search} onChange={e=>{setSearch(e.target.value);setSearchOpen(true);}} onFocus={()=>setSearchOpen(true)} placeholder="Search scooters, accessories, parts..." style={{width:"100%",padding:"14px 40px 14px 44px",borderRadius:12,border:"2px solid #DC2626",fontSize:16,fontFamily:"Inter",outline:"none",background:"#fff"}}/>
            <svg style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",opacity:.4}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <button onClick={()=>{setSearchExpanded(false);setSearch("");}} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:4}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
          {searchOpen&&searchResults.length>0&&<div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,marginTop:8,boxShadow:"0 8px 30px rgba(0,0,0,.1)",maxHeight:300,animation:"scaleIn .2s ease",overflowY:"auto"}}>
            {searchResults.slice(0,6).map(r=>(<div key={r.id} onClick={()=>{setSearch("");setSearchExpanded(false);openProd(r,r.motor?"scooter":"accessory");}} style={{padding:"14px 16px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",display:"flex",alignItems:"center",gap:12,transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background="#FEF2F2"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
              <div style={{width:40,height:28,flexShrink:0}}>{r.motor?<ScooterSVG variant={r.id%3} accent={r.color}/>:<AccSVG type={r.cat} color={r.color}/>}</div>
              <div><div style={{fontWeight:600,fontSize:14,fontFamily:F}}>{r.name}</div><div style={{fontSize:11,color:"#888"}}>{r.cat} | ${r.price}</div></div>
            </div>))}
          </div>}
        </div>
      </div>}
      {menuOpen&&<div className="mm" style={{position:"fixed",top:62,left:0,right:0,zIndex:99,background:"rgba(255,255,255,.98)",backdropFilter:"blur(20px)",padding:"16px 20px 24px",borderBottom:"1px solid #E5E7EB",display:"flex",flexDirection:"column",gap:14,animation:"slideDown .2s ease"}} onClick={e=>e.stopPropagation()}><div style={{position:"relative",marginBottom:8}}>
          <input value={search} onChange={e=>{setSearch(e.target.value);setSearchOpen(true);}} placeholder="Search..." style={{width:"100%",padding:"10px 16px 10px 40px",borderRadius:10,border:"1px solid #E5E7EB",fontSize:16,outline:"none",background:"#F9FAFB"}}/>
          <svg style={{position:"absolute",left:12,top:11,opacity:.4}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          {searchOpen&&searchResults.length>0&&<div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:10,marginTop:4,maxHeight:200,overflowY:"auto"}}>
            {searchResults.slice(0,4).map(r=>(<div key={r.id} onClick={()=>{setSearch("");setMenuOpen(false);openProd(r,r.motor?"scooter":"accessory");}} style={{padding:"10px 14px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:26,flexShrink:0}}>{r.motor?<ScooterSVG variant={r.id%3} accent={r.color}/>:<AccSVG type={r.cat} color={r.color} itemId={r.id}/>}</div>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,fontFamily:F}}>{r.name}</div></div>
              <span style={{fontSize:12,color:"#DC2626",fontWeight:700,fontFamily:F}}>${r.price}</span>
            </div>))}
          </div>}
        </div>
        {["Scooters","Accessories","About","FAQ","Contact"].map(s=><span key={s} className="nv" onClick={()=>scrollTo(s.toLowerCase())} style={{fontSize:15,color:"#333"}}>{s}</span>)}</div>}

      {/* HOME */}
      {page==="home"&&<>
        {/* Hero */}
        <section className="hp" style={{minHeight:"90vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",position:"relative",padding:"140px 40px 80px",overflow:"hidden",background:"linear-gradient(180deg,#FEF2F2 0%,#fff 60%)"}}>
          <div style={{position:"absolute",top:0,right:0,width:"40%",height:"100%",background:"radial-gradient(ellipse at 80% 30%,rgba(220,38,38,.06) 0%,transparent 60%)"}}/> 
          <div style={{position:"relative",zIndex:1,animation:"fadeUp .8s ease both"}}>
            
            <h1 className="ht" style={{fontSize:72,fontWeight:800,lineHeight:.95,marginBottom:20,fontFamily:F,textTransform:"uppercase",color:"#111"}}>
              Ride The <span style={{color:"#DC2626"}}>Future</span>
            </h1>
            <p style={{fontSize:18,color:"#666",maxWidth:480,margin:"0 auto 36px",lineHeight:1.6}}>Premium electric scooters, genuine parts, and expert service. Three branches across Lebanon.</p>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="rb" style={{padding:"14px 36px",fontSize:15,boxShadow:"0 6px 24px rgba(220,38,38,.25)"}} onClick={()=>scrollTo("scooters")}>Explore Scooters</button>
              <button className="ob" style={{padding:"14px 36px",fontSize:15}} onClick={()=>scrollTo("contact")}>Contact Us</button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{borderBottom:"1px solid #F3F4F6"}}>
          <div className="sg" style={{maxWidth:1100,margin:"0 auto",padding:"36px 32px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:32}}>
            {[{n:"7,300+",l:"Instagram Followers"},{n:"3",l:"Branches in Lebanon"},{n:"350+",l:"Posts & Reviews"},{n:"100%",l:"Genuine Parts"}].map((s,i)=>(
              <div key={i} style={{textAlign:"center"}}><div style={{fontSize:32,fontWeight:800,fontFamily:F,color:"#DC2626"}}>{s.n}</div><div style={{fontSize:12,color:"#888",marginTop:4,letterSpacing:1,textTransform:"uppercase",fontFamily:F}}>{s.l}</div></div>
            ))}
          </div>
        </section>

        {/* Scooters */}
        <section id="scooters" className="sp" style={{maxWidth:1200,margin:"0 auto",padding:"80px 32px"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <span style={{color:"#DC2626",fontSize:12,fontWeight:700,letterSpacing:4,textTransform:"uppercase",fontFamily:F}}>Our Collection</span>
            <h2 style={{fontSize:42,fontWeight:800,fontFamily:F,marginTop:6,textTransform:"uppercase"}}>Electric Scooters</h2>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"center",alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
            {["All","Performance","Urban","Compact"].map(c=><button key={c} className={`fb ${sf===c?"ac":""}`} onClick={()=>setSf(c)}>{c}</button>)}
            <div style={{width:1,height:24,background:"#E5E7EB",margin:"0 4px"}} className="si"/>
            {(()=>{const sOpen=activeDD==="scoot";return(<div style={{position:"relative"}}>
              <button onClick={e=>{e.stopPropagation();setActiveDD(sOpen?null:"scoot");}} style={{display:"flex",alignItems:"center",gap:6,background:"#fff",border:"1px solid #E5E7EB",borderRadius:8,padding:"8px 14px",cursor:"pointer",transition:"all .2s",borderColor:sOpen?"#DC2626":"#E5E7EB"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sOpen?"#DC2626":"#999"} strokeWidth="2"><path d="M3 6h18M6 12h12M9 18h6"/></svg>
                <span style={{fontFamily:F,fontSize:12,fontWeight:600,color:sort!=="default"?"#111":"#888",letterSpacing:.5}}>{sort==="default"?"Sort by":sort==="price-asc"?"Price: Low to High":sort==="price-desc"?"Price: High to Low":"Name: A to Z"}</span>
                <span style={{display:"inline-flex",transition:"transform .25s ease",transform:sOpen?"rotate(180deg)":"rotate(0deg)"}}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={sOpen?"#DC2626":"#999"} strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg></span>
              </button>
              {sOpen&&<div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",marginTop:4,background:"#fff",border:"1px solid #E5E7EB",borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,.1)",minWidth:180,zIndex:50,animation:"fadeIn .15s ease",overflow:"hidden"}}>
                {[{v:"default",l:"Sort by"},{v:"price-asc",l:"Price: Low to High"},{v:"price-desc",l:"Price: High to Low"},{v:"name",l:"Name: A to Z"}].map(o=>(<div key={o.v} onClick={()=>{setSort(o.v);setActiveDD(null);}} style={{padding:"10px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"background .15s",background:sort===o.v?"#FEF2F2":"#fff",fontFamily:F,fontSize:12,fontWeight:sort===o.v?700:500,color:sort===o.v?"#DC2626":"#555"}} onMouseEnter={e=>{if(sort!==o.v)e.currentTarget.style.background="#F9FAFB";}} onMouseLeave={e=>{if(sort!==o.v)e.currentTarget.style.background="#fff";}}>
                  {sort===o.v&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
                  {o.l}
                </div>))}
              </div>}
            </div>);})()}
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:24,flexWrap:"wrap",alignItems:"center"}}>
              <div style={{position:"relative"}}>
                <button onClick={e=>{e.stopPropagation();setActiveDD(activeDD==="brand"?null:"brand");}} style={{display:"flex",alignItems:"center",gap:6,background:"#fff",border:"1px solid #E5E7EB",borderRadius:8,padding:"8px 14px",cursor:"pointer",transition:"all .2s",borderColor:activeDD==="brand"?"#DC2626":"#E5E7EB"}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={activeDD==="brand"?"#DC2626":"#999"} strokeWidth="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                  <span style={{fontFamily:F,fontSize:12,fontWeight:600,color:brandFilter!=="All"?"#111":"#888",letterSpacing:.5}}>{brandFilter==="All"?"All Brands":brandFilter}</span>
                  <span style={{display:"inline-flex",transition:"transform .25s ease",transform:activeDD==="brand"?"rotate(180deg)":"rotate(0deg)"}}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={activeDD==="brand"?"#DC2626":"#999"} strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg></span>
                </button>
                {activeDD==="brand"&&<div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",marginTop:4,background:"#fff",border:"1px solid #E5E7EB",borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,.1)",minWidth:160,zIndex:50,animation:"fadeIn .15s ease",overflow:"hidden"}}>
                  {["All",...[...new Set(SCOOTERS.map(s=>s.brand))]].map(b=>(<div key={b} onClick={()=>{setBrandFilter(b);setActiveDD(null);}} style={{padding:"10px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"background .15s",background:brandFilter===b?"#FEF2F2":"#fff",fontFamily:F,fontSize:12,fontWeight:brandFilter===b?700:500,color:brandFilter===b?"#DC2626":"#555"}} onMouseEnter={e=>{if(brandFilter!==b)e.currentTarget.style.background="#F9FAFB";}} onMouseLeave={e=>{if(brandFilter!==b)e.currentTarget.style.background="#fff";}}>
                    {brandFilter===b&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
                    {b==="All"?"All Brands":b}
                  </div>))}
                </div>}
              </div>
              {brandFilter!=="All"&&<button onClick={()=>setBrandFilter("All")} style={{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontFamily:F,fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:4}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Clear
              </button>}
          </div>
          <div className="pg" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
            {displayedScoot.map((s,i)=>(
              <div key={s.id} className="cd" onClick={()=>openProd(s,"scooter")} style={{animation:`fadeUp .4s ease ${i*.05}s both`}}>
                {s.badge&&<Badge text={s.badge}/>}
                <div style={{height:190,display:"flex",alignItems:"center",justifyContent:"center",background:"#F9FAFB",position:"relative"}}>
                  <div style={{position:"absolute",width:"100%",height:"100%",background:`radial-gradient(circle at 50% 80%,${s.color}0A 0%,transparent 60%)`}}/>
                  <div style={{width:150,height:105,zIndex:1}}><ScooterSVG variant={i%3} accent={s.color}/></div>
                </div>
                <div style={{padding:"16px 20px 20px"}}>
                  <span style={{fontSize:11,color:"#DC2626",fontWeight:700,letterSpacing:2,textTransform:"uppercase",fontFamily:F}}>{s.cat}</span>
                  <h3 style={{margin:"4px 0 6px",fontSize:20,fontWeight:700,fontFamily:F}}>{s.name}</h3>
                  <p style={{margin:"0 0 14px",fontSize:13,color:"#888",lineHeight:1.5}}>{s.desc}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:16}}>
                    {[{l:"Speed",v:s.speed},{l:"Range",v:s.range},{l:"Motor",v:s.motor},{l:"Weight",v:s.weight}].map(sp=>(
                      <div key={sp.l} style={{background:"#F9FAFB",borderRadius:8,padding:"6px 10px"}}>
                        <div style={{fontSize:9,color:"#999",textTransform:"uppercase",letterSpacing:1,marginBottom:1}}>{sp.l}</div>
                        <div style={{fontSize:13,color:"#111",fontWeight:600,fontFamily:F}}>{sp.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{fontSize:24,fontWeight:800,fontFamily:F}}>${s.price}</div>
                    <button className="rb" style={{padding:"8px 18px",fontSize:12}} onClick={e=>{e.stopPropagation();addCart(s);}}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {scootVisible<totalScoot&&<div style={{textAlign:"center",marginTop:24}}>
            <button className="ob" style={{padding:"12px 40px",fontSize:13}} onClick={()=>setScootVisible(v=>v+8)}>
              Load More ({totalScoot-scootVisible} remaining)
            </button>
          </div>}
        </section>

        {/* Accessories */}
        <section id="accessories" style={{background:"#F9FAFB",borderTop:"1px solid #F3F4F6",borderBottom:"1px solid #F3F4F6"}}>
          <div className="sp" style={{maxWidth:1200,margin:"0 auto",padding:"80px 32px"}}>
            <div style={{textAlign:"center",marginBottom:40}}>
              <span style={{color:"#DC2626",fontSize:12,fontWeight:700,letterSpacing:4,textTransform:"uppercase",fontFamily:F}}>Gear Up</span>
              <h2 style={{fontSize:42,fontWeight:800,fontFamily:F,marginTop:6,textTransform:"uppercase"}}>Accessories & Parts</h2>
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"center",alignItems:"center",marginBottom:24,flexWrap:"wrap"}}>
              {["All","Protection","Gear","Parts"].map(c=><button key={c} className={`fb ${af===c?"ac":""}`} onClick={()=>setAf(c)}>{c}</button>)}
              <div style={{width:1,height:24,background:"#E5E7EB",margin:"0 4px"}} className="si"/>
              {(()=>{const aOpen=activeDD==="acc";return(<div style={{position:"relative"}}>
              <button onClick={e=>{e.stopPropagation();setActiveDD(aOpen?null:"acc");}} style={{display:"flex",alignItems:"center",gap:6,background:"#fff",border:"1px solid #E5E7EB",borderRadius:8,padding:"8px 14px",cursor:"pointer",transition:"all .2s",borderColor:aOpen?"#DC2626":"#E5E7EB"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={aOpen?"#DC2626":"#999"} strokeWidth="2"><path d="M3 6h18M6 12h12M9 18h6"/></svg>
                <span style={{fontFamily:F,fontSize:12,fontWeight:600,color:accSort!=="default"?"#111":"#888",letterSpacing:.5}}>{accSort==="default"?"Sort by":accSort==="price-asc"?"Price: Low to High":accSort==="price-desc"?"Price: High to Low":"Name: A to Z"}</span>
                <span style={{display:"inline-flex",transition:"transform .25s ease",transform:aOpen?"rotate(180deg)":"rotate(0deg)"}}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={aOpen?"#DC2626":"#999"} strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg></span>
              </button>
              {aOpen&&<div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",marginTop:4,background:"#fff",border:"1px solid #E5E7EB",borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,.1)",minWidth:180,zIndex:50,animation:"fadeIn .15s ease",overflow:"hidden"}}>
                {[{v:"default",l:"Sort by"},{v:"price-asc",l:"Price: Low to High"},{v:"price-desc",l:"Price: High to Low"},{v:"name",l:"Name: A to Z"}].map(o=>(<div key={o.v} onClick={()=>{setAccSort(o.v);setActiveDD(null);}} style={{padding:"10px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"background .15s",background:accSort===o.v?"#FEF2F2":"#fff",fontFamily:F,fontSize:12,fontWeight:accSort===o.v?700:500,color:accSort===o.v?"#DC2626":"#555"}} onMouseEnter={e=>{if(accSort!==o.v)e.currentTarget.style.background="#F9FAFB";}} onMouseLeave={e=>{if(accSort!==o.v)e.currentTarget.style.background="#fff";}}>
                  {accSort===o.v&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
                  {o.l}
                </div>))}
              </div>}
            </div>);})()}
            </div>
            <div className="pg" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:16}}>
              {displayedAcc.map((a,i)=>(
                <div key={a.id} className="cd" onClick={()=>openProd(a,"accessory")} style={{animation:`fadeUp .3s ease ${i*.04}s both`}}>
                  <div style={{padding:20}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
                      <div style={{width:44,height:44,borderRadius:10,background:"#FEF2F2",display:"flex",alignItems:"center",justifyContent:"center"}}><AccSVG type={a.cat} color={a.color} itemId={a.id}/></div>
                      <span style={{fontSize:10,color:"#DC2626",fontWeight:700,letterSpacing:2,textTransform:"uppercase",fontFamily:F}}>{a.cat}</span>
                    </div>
                    <h3 style={{fontSize:17,fontWeight:700,fontFamily:F,marginBottom:4}}>{a.name}</h3>
                    <p style={{fontSize:13,color:"#888",lineHeight:1.5,marginBottom:14}}>{a.desc}</p>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{fontSize:20,fontWeight:800,fontFamily:F}}>${a.price}</span>
                      <button className="rb" style={{padding:"7px 16px",fontSize:11}} onClick={e=>{e.stopPropagation();addCart(a);}}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {accVisible<totalAcc&&<div style={{textAlign:"center",marginTop:24}}>
              <button className="ob" style={{padding:"12px 40px",fontSize:13}} onClick={()=>setAccVisible(v=>v+8)}>
                Load More ({totalAcc-accVisible} remaining)
              </button>
            </div>}
          </div>
        </section>

        {/* About */}
        <section id="about" className="sp" style={{maxWidth:800,margin:"0 auto",padding:"80px 32px",textAlign:"center"}}>
          <span style={{color:"#DC2626",fontSize:12,fontWeight:700,letterSpacing:4,textTransform:"uppercase",fontFamily:F}}>Who We Are</span>
          <h2 style={{fontSize:42,fontWeight:800,fontFamily:F,marginTop:6,textTransform:"uppercase"}}>About Rohan Wings</h2>
          <p style={{color:"#555",fontSize:16,lineHeight:1.8,marginTop:20}}>Rohan Wings is Lebanon's trusted destination for premium electric scooters, genuine replacement parts, and professional service. With three branches across the country, we are committed to making electric mobility accessible, reliable, and exciting.</p>
          <p style={{color:"#888",fontSize:15,lineHeight:1.8,marginTop:14,marginBottom:32}}>Whether you are a daily commuter, a weekend explorer, or a business looking for wholesale options, our team is here to match you with the perfect ride and keep it running at peak performance.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            {["Wholesale & Retail","Genuine Parts","Expert Service","3 Locations"].map((t,i)=>(<div key={i} style={{background:"#FEF2F2",borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:600,fontFamily:F,letterSpacing:1,color:"#DC2626"}}>{t}</div>))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{background:"#F9FAFB",borderTop:"1px solid #F3F4F6",borderBottom:"1px solid #F3F4F6"}}>
          <div className="sp" style={{maxWidth:700,margin:"0 auto",padding:"80px 32px"}}>
            <div style={{textAlign:"center",marginBottom:40}}>
              <span style={{color:"#DC2626",fontSize:12,fontWeight:700,letterSpacing:4,textTransform:"uppercase",fontFamily:F}}>Support</span>
              <h2 style={{fontSize:42,fontWeight:800,fontFamily:F,marginTop:6,textTransform:"uppercase"}}>FAQ</h2>
            </div>
            {FAQS.map((f,i)=><FAQ key={i} faq={f}/>)}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="sp" style={{maxWidth:1100,margin:"0 auto",padding:"80px 32px"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <span style={{color:"#DC2626",fontSize:12,fontWeight:700,letterSpacing:4,textTransform:"uppercase",fontFamily:F}}>Get In Touch</span>
            <h2 style={{fontSize:42,fontWeight:800,fontFamily:F,marginTop:6,textTransform:"uppercase"}}>Our Branches</h2>
          </div>
          <div className="bg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,marginBottom:48}}>
            {BRANCHES.map((b,i)=>(
              <div key={i} style={{background:"#F9FAFB",border:"1px solid #E5E7EB",borderRadius:16,padding:28,textAlign:"center"}}>
                <div style={{width:48,height:48,borderRadius:12,margin:"0 auto 14px",background:"#FEF2F2",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <h3 style={{fontSize:20,fontWeight:700,fontFamily:F,marginBottom:6}}>{b.name}</h3>
                <p style={{color:"#888",fontSize:13,marginBottom:14}}>{b.phone?`+961 ${b.phone}`:"Contact via WhatsApp"}</p>
                <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                  <a href={`https://wa.me/${b.wa}`} target="_blank" rel="noopener noreferrer" style={{background:"#25D366",color:"#fff",textDecoration:"none",borderRadius:8,padding:"9px 16px",fontSize:11,fontWeight:700,fontFamily:F,letterSpacing:1,textTransform:"uppercase",display:"inline-flex",alignItems:"center",justifyContent:"center"}}>WhatsApp</a>
                  <a href={b.maps} target="_blank" rel="noopener noreferrer" className="ob" style={{padding:"9px 16px",fontSize:11,textDecoration:"none"}}>Directions</a>
                </div>
              </div>
            ))}
          </div>
          {/* CTA */}
          <div style={{background:"linear-gradient(135deg,#DC2626,#991B1B)",borderRadius:20,padding:"44px 36px",textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"relative",zIndex:1}}>
              <h3 style={{fontSize:28,fontWeight:800,fontFamily:F,marginBottom:10,textTransform:"uppercase",color:"#fff"}}>Ready to Ride?</h3>
              <p style={{fontSize:15,color:"rgba(255,255,255,.85)",marginBottom:24}}>Visit any branch or message us on WhatsApp to find your perfect scooter.</p>
              <button onClick={()=>window.open("https://wa.me/96179185184","_blank")} style={{background:"#fff",color:"#DC2626",border:"none",borderRadius:12,padding:"14px 36px",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:F,letterSpacing:2,textTransform:"uppercase"}}>Message Us on WhatsApp</button>
            </div>
          </div>
        </section>

        <Footer scrollTo={scrollTo} F={F} LOGO_LG={LOGO_LG}/>
      </>}

      {/* PRODUCT PAGE */}
      {page==="product"&&sel&&(()=>{
        const p=sel;const isScoot=selType==="scooter";
        const specs=isScoot?[{l:"Top Speed",v:p.speed},{l:"Range",v:p.range},{l:"Motor",v:p.motor},{l:"Weight",v:p.weight},{l:"Battery",v:p.battery},{l:"Brakes",v:p.brakes},{l:"Tires",v:p.tires},{l:"Charge Time",v:p.charge},{l:"Max Load",v:p.maxLoad},{l:"Suspension",v:p.suspension},{l:"Waterproof",v:p.waterproof}]:[];
        const items=isScoot?SCOOTERS:ACCESSORIES;
        const related=isScoot?SCOOTERS.filter(s=>s.id!==p.id).slice(0,3):items.filter(s=>s.cat===p.cat&&s.id!==p.id).slice(0,3);
        return (<>
          <div style={{paddingTop:72,animation:"fadeIn .4s ease"}}>
            <div style={{maxWidth:1100,margin:"0 auto",padding:"16px 32px"}}>
              <span className="nv" onClick={goHome} style={{fontSize:12}}>Home</span><span style={{color:"#ccc",margin:"0 6px",fontSize:12}}>/</span>
              <span className="nv" onClick={()=>scrollTo(isScoot?"scooters":"accessories")} style={{fontSize:12}}>{isScoot?"Scooters":"Accessories"}</span><span style={{color:"#ccc",margin:"0 6px",fontSize:12}}>/</span>
              <span style={{color:"#DC2626",fontSize:12,fontWeight:600,fontFamily:F,letterSpacing:1}}>{p.name}</span>
            </div>
            <div className="sp" style={{maxWidth:1100,margin:"0 auto",padding:"16px 32px 64px"}}>
              <div className="pg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"start"}}>
                {/* Gallery */}
                <div>
                  <div style={{background:"#F9FAFB",borderRadius:16,border:"1px solid #E5E7EB",height:380,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",userSelect:"none",WebkitUserSelect:"none",transition:"all .3s ease"}}>
                    <div style={{position:"absolute",inset:0,background:`radial-gradient(circle at 50% 70%,${p.color}0A 0%,transparent 50%)`}}/>
                    {isScoot?<div key={galIdx} style={{width:220,height:160,zIndex:1,animation:"fadeIn .3s ease"}}><ScooterSVG variant={galIdx%3} accent={p.color}/></div>:<div style={{zIndex:1}}><AccSVG type={p.cat} color={p.color}/></div>}
                    {p.badge&&<Badge text={p.badge}/>}
                    {isScoot&&<><div className="arrow" style={{left:12}} onClick={(e)=>{e.preventDefault();e.stopPropagation();setGalIdx(g=>(g+2)%3);}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg></div><div className="arrow" style={{right:12}} onClick={(e)=>{e.preventDefault();e.stopPropagation();setGalIdx(g=>(g+1)%3);}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg></div></>}
                  </div>
                  {isScoot&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:10}}>
                    {[0,1,2].map(v=>(<div key={v} onClick={()=>setGalIdx(v)} style={{background:"#F9FAFB",borderRadius:10,border:galIdx===v?"2px solid #DC2626":"1px solid #E5E7EB",transition:"border .2s ease, box-shadow .2s ease",boxShadow:galIdx===v?"0 2px 8px rgba(220,38,38,.15)":"none",height:80,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"border .2s"}}>
                      <div style={{width:70,height:50}}><ScooterSVG variant={v} accent={galIdx===v?p.color:"#ccc"}/></div>
                    </div>))}
                  </div>}
                </div>
                {/* Info */}
                <div>
                  <span style={{color:"#DC2626",fontSize:12,fontWeight:700,letterSpacing:3,textTransform:"uppercase",fontFamily:F}}>{p.cat}</span>
                  <h1 style={{fontSize:36,fontWeight:800,fontFamily:F,marginTop:4,textTransform:"uppercase"}}>{p.name}</h1>
                  <div style={{fontSize:32,fontWeight:800,fontFamily:F,color:"#DC2626",marginTop:10}}>${p.price}</div>
                  <p style={{color:"#555",fontSize:15,lineHeight:1.7,marginTop:18}}>{p.full||p.desc}</p>
                  <div style={{display:"flex",gap:12,marginTop:28,flexWrap:"wrap"}}>
                    <button className="rb" style={{padding:"14px 36px",fontSize:14}} onClick={()=>addCart(p)}>Add to Cart</button>
                    <button className="ob" style={{padding:"14px 36px",fontSize:14}} onClick={()=>{const m="Hi! I'm interested in the "+p.name+" ($"+p.price+"). Is it available?";window.open(`https://wa.me/96179185184?text=${encodeURIComponent(m)}`,"_blank");}}>Inquire on WhatsApp</button>
                  </div>
                  {isScoot&&<div style={{marginTop:32}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
                      <h3 style={{fontSize:16,fontWeight:700,fontFamily:F,letterSpacing:2,textTransform:"uppercase",color:"#DC2626",margin:0}}>Full Specifications</h3>
                      <div style={{position:"relative"}}>
                        <button onClick={()=>{setCompareOpen(!compareOpen);if(compareOpen)setCmpSearch("");}} style={{display:"flex",alignItems:"center",gap:8,background:compareOpen?"#FEF2F2":"#fff",border:compareOpen?"1px solid #DC2626":"1px solid #E5E7EB",borderRadius:10,padding:"8px 14px",cursor:"pointer",transition:"all .2s"}}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
                          <span style={{fontFamily:F,fontSize:12,fontWeight:600,color:compareOpen?"#DC2626":"#555",letterSpacing:.5}}>Compare</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={compareOpen?"#DC2626":"#999"} strokeWidth="2.5" style={{transition:"transform .2s",transform:compareOpen?"rotate(180deg)":"none"}}><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                        {compareOpen&&(()=>{
                          const cmpFiltered=cmpSearch.length>0?SCOOTERS.filter(s=>s.id!==p.id&&s.name.toLowerCase().includes(cmpSearch.toLowerCase())):SCOOTERS.filter(s=>s.id!==p.id);
                          return(<div style={{position:"absolute",top:"100%",right:0,marginTop:6,background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,boxShadow:"0 8px 30px rgba(0,0,0,.12)",width:"min(300px,calc(100vw - 48px))",maxHeight:360,animation:"scaleIn .2s ease",zIndex:50,overflow:"hidden"}}>
                          <div style={{padding:"10px 12px",borderBottom:"1px solid #F3F4F6",position:"relative"}}>
                            <input value={cmpSearch} onChange={e=>setCmpSearch(e.target.value)} placeholder="Search scooters..." style={{width:"100%",padding:"8px 12px 8px 32px",borderRadius:8,border:"1px solid #E5E7EB",fontSize:13,fontFamily:"Inter",outline:"none"}}/>
                            <svg style={{position:"absolute",left:20,top:"50%",transform:"translateY(-50%)",opacity:.4}} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                          </div>
                          <div style={{maxHeight:280,overflowY:"auto"}}>
                          {cmpFiltered.map(o=>(
                            <div key={o.id} onClick={()=>{setCompareOpen(false);setCmpSearch("");startCompare(p,o);}} style={{padding:"10px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid #F9FAFB",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background="#FEF2F2"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                              <div style={{width:36,height:26,flexShrink:0}}><ScooterSVG variant={o.id%3} accent={o.color}/></div>
                              <div style={{flex:1}}>
                                <div style={{fontFamily:F,fontWeight:700,fontSize:13,color:"#111"}}>{o.name}</div>
                                <div style={{fontSize:11,color:"#888"}}>{o.cat}</div>
                              </div>
                              <span style={{fontFamily:F,fontWeight:800,fontSize:13,color:"#DC2626"}}>${o.price}</span>
                            </div>
                          ))}
                          {cmpFiltered.length===0&&<div style={{padding:16,textAlign:"center",color:"#999",fontSize:13}}>No scooters found</div>}
                          </div>
                        </div>);})()}
                      </div>
                    </div>
                    <div className="spg" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:1,background:"#E5E7EB",borderRadius:12,overflow:"hidden"}}>
                      {specs.map(s=>(<div key={s.l} style={{background:"#F9FAFB",padding:"12px 14px"}}><div style={{fontSize:10,color:"#999",textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{s.l}</div><div style={{fontSize:13,color:"#111",fontWeight:600,fontFamily:F}}>{s.v}</div></div>))}
                    </div>
                  </div>}
                </div>
              </div>
              {related.length>0&&<div style={{marginTop:48,marginBottom:16}}>
                <h3 style={{fontSize:20,fontWeight:800,fontFamily:F,textTransform:"uppercase",marginBottom:16}}>You May Also Like</h3>
                <div className="hscroll" style={{display:"flex",gap:16,overflowX:"auto",padding:"8px 0 8px 0",scrollSnapType:"x mandatory",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none"}}>
                  {related.map(s=>(<div key={s.id} onClick={()=>openProd(s,selType)} style={{minWidth:220,maxWidth:220,background:"#fff",border:"1px solid #E5E7EB",borderRadius:14,overflow:"hidden",cursor:"pointer",transition:"all .3s",scrollSnapAlign:"start",flexShrink:0}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#DC2626";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(220,38,38,.08)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#E5E7EB";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                    <div style={{height:110,display:"flex",alignItems:"center",justifyContent:"center",background:"#F9FAFB"}}>
                      {isScoot?<div style={{width:90,height:65}}><ScooterSVG variant={s.id%3} accent={s.color}/></div>:<AccSVG type={s.cat} color={s.color}/>}
                    </div>
                    <div style={{padding:"10px 14px 14px"}}>
                      <h4 style={{fontSize:14,fontWeight:700,fontFamily:F,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.name}</h4>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                        <span style={{fontSize:16,fontWeight:800,fontFamily:F}}>${s.price}</span>
                        <span style={{fontSize:10,color:"#DC2626",fontWeight:700,fontFamily:F,letterSpacing:1}}>VIEW</span>
                      </div>
                    </div>
                  </div>))}
                </div>
              </div>}
            </div>
          </div>
        <Footer scrollTo={scrollTo} F={F} LOGO_LG={LOGO_LG}/>
        </>);
      })()}

      {/* CART */}
      

      {page==="compare"&&compareList.length===2&&(()=>{
        const [a,b]=compareList;
        const specKeys=[{l:"Price",k:"price",fmt:v=>"$"+v},{l:"Top Speed",k:"speed"},{l:"Range",k:"range"},{l:"Motor",k:"motor"},{l:"Weight",k:"weight"},{l:"Battery",k:"battery"},{l:"Brakes",k:"brakes"},{l:"Tires",k:"tires"},{l:"Charge Time",k:"charge"},{l:"Max Load",k:"maxLoad"},{l:"Suspension",k:"suspension"},{l:"Waterproof",k:"waterproof"}];
        return(<><div style={{paddingTop:72,animation:"fadeIn .4s ease"}}>
          <div className="sp" style={{maxWidth:1000,margin:"0 auto",padding:"32px"}}>
            <button className="nv" onClick={()=>{if(compareList[0])openProd(compareList[0],"scooter");else goHome();}} style={{fontSize:13,marginBottom:24,display:"inline-flex",alignItems:"center",gap:6}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Back to Product
            </button>
            <h1 style={{fontSize:36,fontWeight:800,fontFamily:F,textTransform:"uppercase",marginBottom:24}}>Compare Scooters</h1>
            {/* Scooter headers with swap */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
              {[a,b].map((s,idx)=>(<div key={s.id} style={{background:"#F9FAFB",borderRadius:14,border:"1px solid #E5E7EB",padding:"16px 14px",textAlign:"center",position:"relative"}}>
                <div style={{width:100,height:70,margin:"0 auto"}}><ScooterSVG variant={s.id%3} accent={s.color}/></div>
                <h3 style={{fontFamily:F,fontWeight:800,fontSize:17,marginTop:8}}>{s.name}</h3>
                {s.badge&&<span style={{display:"inline-block",background:"#DC2626",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20,marginTop:4,fontFamily:F,letterSpacing:1}}>{s.badge}</span>}
                <div style={{marginTop:10,display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
                  <button className="rb" style={{padding:"7px 14px",fontSize:10}} onClick={()=>addCart(s)}>Add to Cart</button>
                  <button className="ob" style={{padding:"7px 14px",fontSize:10}} onClick={()=>openProd(s,"scooter")}>Details</button>
                </div>
                <button onClick={()=>setSwapIdx(swapIdx===idx?null:idx)} style={{marginTop:10,background:"none",border:"1px solid #E5E7EB",borderRadius:8,padding:"5px 12px",cursor:"pointer",fontSize:11,fontFamily:F,fontWeight:600,color:"#DC2626",display:"inline-flex",alignItems:"center",gap:4,transition:"all .2s"}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
                  Change
                </button>
              </div>))}
            </div>
            {/* Swap selector */}
            {swapIdx!==null&&(()=>{
              const other=swapIdx===0?b:a;
              const filtered=cmpSearch.length>0?SCOOTERS.filter(s=>s.id!==other.id&&s.name.toLowerCase().includes(cmpSearch.toLowerCase())):SCOOTERS.filter(s=>s.id!==other.id);
              return(<div style={{marginBottom:20,background:"#fff",border:"1px solid #DC2626",borderRadius:14,padding:16,animation:"scaleIn .2s ease"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                  <span style={{fontFamily:F,fontWeight:700,fontSize:13,color:"#DC2626",letterSpacing:1}}>Replace {swapIdx===0?a.name:b.name}</span>
                  <button onClick={()=>{setSwapIdx(null);setCmpSearch("");}} style={{background:"none",border:"none",cursor:"pointer",padding:2}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                </div>
                <div style={{position:"relative",marginBottom:10}}>
                  <input value={cmpSearch} onChange={e=>setCmpSearch(e.target.value)} placeholder="Search scooters..." style={{width:"100%",padding:"10px 14px 10px 36px",borderRadius:10,border:"1px solid #E5E7EB",fontSize:14,fontFamily:"Inter",outline:"none"}}/>
                  <svg style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",opacity:.4}} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <div style={{maxHeight:200,overflowY:"auto"}}>
                  {filtered.map(s=>(
                    <div key={s.id} onClick={()=>{const newList=swapIdx===0?[s,b]:[a,s];setCompareList(newList);setSwapIdx(null);setCmpSearch("");}} style={{padding:"10px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid #F3F4F6",borderRadius:8,transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background="#FEF2F2"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <div style={{width:36,height:26,flexShrink:0}}><ScooterSVG variant={s.id%3} accent={s.color}/></div>
                      <div style={{flex:1}}><div style={{fontFamily:F,fontWeight:700,fontSize:13}}>{s.name}</div><div style={{fontSize:11,color:"#888"}}>{s.cat}</div></div>
                      <span style={{fontFamily:F,fontWeight:800,fontSize:13,color:"#DC2626"}}>${s.price}</span>
                    </div>
                  ))}
                  {filtered.length===0&&<div style={{padding:16,textAlign:"center",color:"#999",fontSize:13}}>No scooters found</div>}
                </div>
              </div>);
            })()}
            {/* Spec comparison */}
            <div style={{border:"1px solid #E5E7EB",borderRadius:14,overflow:"hidden"}}>
              {specKeys.map((sp,i)=>{
                const va=sp.fmt?sp.fmt(a[sp.k]):a[sp.k];
                const vb=sp.fmt?sp.fmt(b[sp.k]):b[sp.k];
                const diff=va!==vb;
                return (
                  <div key={"row"+i} style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderBottom:i<specKeys.length-1?"1px solid #F3F4F6":"none",background:i%2===0?"#fff":"#FAFAFA"}}>
                    <div style={{padding:"12px 14px",borderRight:"1px solid #E5E7EB"}}>
                      <div style={{fontSize:9,color:"#999",textTransform:"uppercase",letterSpacing:1,fontFamily:F,fontWeight:600,marginBottom:3}}>{sp.l}</div>
                      <div style={{fontSize:14,color:diff?"#111":"#555",fontWeight:diff?700:600,fontFamily:F}}>{va}</div>
                    </div>
                    <div style={{padding:"12px 14px"}}>
                      <div style={{fontSize:9,color:"#999",textTransform:"uppercase",letterSpacing:1,fontFamily:F,fontWeight:600,marginBottom:3}}>{sp.l}</div>
                      <div style={{fontSize:14,color:diff?"#111":"#555",fontWeight:diff?700:600,fontFamily:F}}>{vb}</div>
                    </div>
                  </div>
                );})}
            </div>
          </div>
        </div>
        <Footer scrollTo={scrollTo} F={F} LOGO_LG={LOGO_LG}/>
        </>);
      })()}

      {page==="cart"&&(<>
        <div style={{paddingTop:72}}>
          <div className="sp" style={{maxWidth:900,margin:"0 auto",padding:"32px"}}>
            <button className="nv" onClick={goHome} style={{fontSize:13,marginBottom:32,display:"inline-flex",alignItems:"center",gap:6}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Back to Shop
            </button>
            <h1 style={{fontSize:36,fontWeight:800,fontFamily:F,textTransform:"uppercase",marginBottom:32}}>Your Cart<span style={{color:"#999",fontSize:16,fontWeight:500,marginLeft:10,verticalAlign:"middle"}}>({cc})</span></h1>
            {cart.length===0?(
              <div style={{textAlign:"center",padding:"60px 20px"}}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{marginBottom:16}}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                <p style={{color:"#888",fontSize:16,marginBottom:20}}>Your cart is empty</p>
                <button className="rb" onClick={goHome}>Start Shopping</button>
              </div>
            ):(
              <>
                {cart.map(c=>(
                  <div key={c.item.id} style={{padding:"16px 0",borderBottom:"1px solid #F3F4F6"}}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:56,height:56,background:"#F9FAFB",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1px solid #E5E7EB"}}>
                        {c.item.motor?<div style={{width:40,height:28}}><ScooterSVG variant={c.item.id%3} accent={c.item.color}/></div>:<AccSVG type={c.item.cat} color={c.item.color} itemId={c.item.id}/>}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <h4 style={{fontSize:15,fontWeight:700,fontFamily:F,margin:0}}>{c.item.name}</h4>
                        <span style={{fontSize:12,color:"#888"}}>${c.item.price} each</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                        <span style={{fontSize:20,fontWeight:800,fontFamily:F}}>${c.item.price*c.qty}</span>
                        <button onClick={()=>rmCart(c.item.id)} style={{background:"none",border:"none",cursor:"pointer",padding:4,color:"#bbb",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="#DC2626"} onMouseLeave={e=>e.currentTarget.style.color="#bbb"}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginTop:10,marginLeft:68}}>
                      <button onClick={()=>updQty(c.item.id,-1)} style={{width:32,height:32,borderRadius:8,background:"#F3F4F6",border:"1px solid #E5E7EB",color:"#333",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:0,padding:0,transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#DC2626"} onMouseLeave={e=>e.currentTarget.style.borderColor="#E5E7EB"}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
                      <span style={{fontFamily:F,fontWeight:700,fontSize:16,minWidth:24,textAlign:"center"}}>{c.qty}</span>
                      <button onClick={()=>updQty(c.item.id,1)} style={{width:32,height:32,borderRadius:8,background:"#F3F4F6",border:"1px solid #E5E7EB",color:"#333",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:0,padding:0,transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#DC2626"} onMouseLeave={e=>e.currentTarget.style.borderColor="#E5E7EB"}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
                    </div>
                  </div>
                ))}
                {/* Smart Recommendations */}
                {(()=>{
                  const cartIds=cart.map(c=>c.item.id);
                  const hasScooter=cart.some(c=>c.item.motor);
                  const hasCat=(cat)=>cart.some(c=>c.item.cat===cat);

                  // Build recommendation rules: [condition, itemIds, reason]
                  const rules = [
                    [hasScooter, [101,102], "Protect your head"],
                    [hasScooter, [103], "Better grip, safer ride"],
                    [hasScooter, [104], "Essential body protection"],
                    [hasScooter, [106], "Keep it secure"],
                    [hasScooter, [105], "Navigate hands-free"],
                    [hasScooter, [107], "Stay visible at night"],
                    [hasScooter, [108], "Carry it anywhere"],
                    [hasCat("Protection")&&!hasScooter, [103,104], "Complete your safety gear"],
                    [cartIds.includes(101)||cartIds.includes(102), [103,104], "Complete your safety gear"],
                    [cartIds.includes(103), [101,102,104], "Pair with your gloves"],
                    [cartIds.includes(109), [110,111,112], "While you're replacing parts"],
                    [cartIds.includes(110), [109,111], "Common maintenance bundle"],
                    [cartIds.includes(112), [109,110,111], "Keep spares on hand"],
                  ];

                  const seen = new Set();
                  const suggestions = [];
                  for (const [condition, ids, reason] of rules) {
                    if (!condition) continue;
                    for (const id of ids) {
                      if (cartIds.includes(id) || seen.has(id)) continue;
                      const item = ACCESSORIES.find(a=>a.id===id);
                      if (item) { suggestions.push({item, reason}); seen.add(id); }
                    }
                  }

                  if (suggestions.length === 0) return null;
                  const shown = suggestions.slice(0, 4);

                  return (
                    <div style={{marginTop:28,marginBottom:32}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                        <span style={{fontFamily:F,fontWeight:700,fontSize:15,letterSpacing:1}}>Recommended for you</span>
                      </div>
                      <div className="hscroll" style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none",msOverflowStyle:"none"}}>
                        {shown.map(({item:sg,reason})=>(
                          <div key={sg.id} onClick={()=>addCart(sg)} style={{background:"#F9FAFB",border:"1px solid #E5E7EB",borderRadius:12,padding:14,transition:"all .2s",cursor:"pointer",minWidth:180,maxWidth:200,flexShrink:0}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#DC2626";e.currentTarget.style.background="#FEF2F2";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#E5E7EB";e.currentTarget.style.background="#F9FAFB";}}>
                            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                              <div style={{width:36,height:36,borderRadius:8,background:"#fff",border:"1px solid #E5E7EB",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><AccSVG type={sg.cat} color={sg.color} itemId={sg.id}/></div>
                              <div><div style={{fontFamily:F,fontWeight:700,fontSize:13}}>{sg.name}</div><div style={{fontSize:10,color:"#DC2626",fontWeight:600,fontFamily:F}}>{reason}</div></div>
                            </div>
                            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:4}}>
                              <span style={{fontFamily:F,fontWeight:800,fontSize:16}}>${sg.price}</span>
                              <button className="rb" style={{padding:"6px 14px",fontSize:11}} onClick={e=>{e.stopPropagation();addCart(sg);}}>Add</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                <div style={{marginTop:32,background:"#F9FAFB",borderRadius:16,border:"1px solid #E5E7EB",padding:28}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                    <span style={{fontSize:16,fontWeight:600,color:"#888"}}>Total</span>
                    <span style={{fontSize:28,fontWeight:800,fontFamily:F,color:"#DC2626"}}>${ct}</span>
                  </div>
                  <label style={{fontSize:13,fontWeight:700,fontFamily:F,letterSpacing:1,textTransform:"uppercase",color:"#888",display:"block",marginBottom:10}}>Select Branch for Pickup</label>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
                    {BRANCHES.map(b=>(
                      <button key={b.name} onClick={()=>setBranch(b.name)} style={{background:branch===b.name?"#FEF2F2":"#fff",border:`2px solid ${branch===b.name?"#DC2626":"#E5E7EB"}`,color:branch===b.name?"#DC2626":"#888",borderRadius:10,padding:"10px 20px",cursor:"pointer",fontFamily:F,fontWeight:700,fontSize:13,letterSpacing:1,transition:"all .3s"}}>{b.name}</button>
                    ))}
                  </div>
                  <button className="rb" onClick={checkout} style={{width:"100%",padding:"16px",fontSize:15,background:branch?"#25D366":"#ccc",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.716-1.244A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.326-.672-6.064-1.826l-.424-.282-3.106.819.863-3.151-.306-.488A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                    Checkout via WhatsApp
                  </button>
                  <p style={{textAlign:"center",color:"#999",fontSize:11,marginTop:10}}>Your order will be sent as a WhatsApp message to the selected branch.</p>
                </div>
              </>
            )}
          </div>
        </div>
        <Footer scrollTo={scrollTo} F={F} LOGO_LG={LOGO_LG}/>
      </>)}
      {/* Back to top */}
      {showTop&&<button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{position:"fixed",bottom:24,right:24,zIndex:80,width:44,height:44,borderRadius:22,background:"#DC2626",border:"none",cursor:"pointer",boxShadow:"0 4px 16px rgba(220,38,38,.3)",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .3s",animation:"slideUp .3s ease"}}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg>
      </button>}
    </div>
  );
}
