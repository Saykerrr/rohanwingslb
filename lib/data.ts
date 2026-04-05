// Static data matching prototype exactly

export interface Scooter {
  id: number;
  name: string;
  brand: string;
  cat: string;
  price: number;
  speed: string;
  range: string;
  motor: string;
  weight: string;
  battery: string;
  brakes: string;
  tires: string;
  charge: string;
  maxLoad: string;
  suspension: string;
  waterproof: string;
  badge: string | null;
  color: string;
  desc: string;
  full: string;
}

export interface Accessory {
  id: number;
  name: string;
  cat: string;
  price: number;
  desc: string;
  full: string;
  color: string;
}

export interface Branch {
  name: string;
  phone: string | null;
  wa: string;
  maps: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export const SCOOTERS: Scooter[] = [
  { id:1, name:"Xiaomi Scooter 4 Pro", brand:"Xiaomi", cat:"Performance", price:599, speed:"25 km/h", range:"56 km", motor:"350W", weight:"16.5 kg", battery:"36V 12.4Ah", brakes:"Disc + Regen", tires:'10" Pneumatic', charge:"6 hrs", maxLoad:"120 kg", suspension:"Front + Rear", waterproof:"IP54", badge:"Best Seller", color:"#DC2626", desc:"Xiaomi's flagship commuter with dual suspension and impressive 56 km range.", full:"The Xiaomi Electric Scooter 4 Pro delivers a premium riding experience with its dual suspension system that absorbs bumps and cracks effortlessly. The 350W motor provides smooth acceleration up to 25 km/h, while the generous 12.4Ah battery offers up to 56 km of real-world range. 10-inch pneumatic tires ensure excellent grip in all conditions, and the disc brake plus regenerative braking system delivers confident stopping power. The bright LED display shows speed, battery, and ride mode at a glance." },
  { id:2, name:"Segway Ninebot MAX G2", brand:"Segway", cat:"Performance", price:899, speed:"25 km/h", range:"70 km", motor:"450W", weight:"19.8 kg", battery:"36V 15.3Ah", brakes:"Dual Braking", tires:'10" Self-Sealing', charge:"6 hrs", maxLoad:"120 kg", suspension:"Dual Suspension", waterproof:"IPX5", badge:"Premium", color:"#991B1B", desc:"The ultimate range king with 70 km on a single charge and self-sealing tires.", full:"The Segway Ninebot MAX G2 is built for riders who refuse to worry about range. Its massive 15.3Ah battery delivers up to 70 km on a single charge, making it the longest-range scooter in our lineup. The 450W motor handles hills with ease, while the dual suspension and 10-inch self-sealing tubeless tires create an incredibly smooth ride. Apple Find My integration, a full-color dashboard, and built-in turn signals make this the most feature-rich scooter available." },
  { id:3, name:"Xiaomi Scooter 4", brand:"Xiaomi", cat:"Urban", price:449, speed:"25 km/h", range:"35 km", motor:"300W", weight:"12.5 kg", battery:"36V 7.65Ah", brakes:"Disc + E-Brake", tires:'10" Pneumatic', charge:"5 hrs", maxLoad:"110 kg", suspension:"Front Spring", waterproof:"IP54", badge:null, color:"#EF4444", desc:"Lightweight daily commuter at just 12.5 kg with a comfortable 35 km range.", full:"The Xiaomi Electric Scooter 4 strikes the perfect balance between performance and portability. At just 12.5 kg, it folds in seconds and is easy to carry up stairs or onto public transport. The 300W motor reaches 25 km/h, and the 35 km range handles most daily commutes with room to spare. 10-inch pneumatic tires and front spring suspension smooth out rough city roads, while the disc brake provides reliable stopping power." },
  { id:4, name:"Segway Ninebot F2 Pro", brand:"Segway", cat:"Performance", price:749, speed:"25 km/h", range:"55 km", motor:"400W", weight:"18.5 kg", battery:"36V 12.8Ah", brakes:"Disc + E-Brake", tires:'10" Pneumatic', charge:"6 hrs", maxLoad:"120 kg", suspension:"Dual Spring", waterproof:"IP55", badge:"New", color:"#B91C1C", desc:"Powerful mid-range performer with dual spring suspension and 55 km range.", full:"The Segway Ninebot F2 Pro bridges the gap between entry-level and flagship. Its 400W motor delivers punchy acceleration, while the dual spring suspension smooths out even the worst urban roads. With 55 km of range from the 12.8Ah battery, you can commute all week on just two charges. IP55 water resistance means rain will not stop you, and the 10-inch pneumatic tires grip confidently on wet surfaces." },
  { id:5, name:"NIU KQi3 Pro", brand:"NIU", cat:"Urban", price:549, speed:"32 km/h", range:"50 km", motor:"350W", weight:"17.5 kg", battery:"48V 12.5Ah", brakes:"Drum + Regen", tires:'9.5" Tubeless', charge:"7 hrs", maxLoad:"120 kg", suspension:"Front Spring", waterproof:"IPX4", badge:null, color:"#DC2626", desc:"Fast and refined with a 32 km/h top speed and 50 km range on 48V power.", full:"The NIU KQi3 Pro stands out with its 48V power system that maintains consistent performance even as the battery drains. The 350W motor pushes to a class-leading 32 km/h, while the 12.5Ah battery delivers 50 km of range. The 9.5-inch tubeless tires are puncture-resistant and maintenance-free, and the drum brake plus regenerative braking system provides smooth, controlled stopping. NIU's app lets you customize ride settings and track your rides." },
  { id:6, name:"Segway Ninebot E2 Plus", brand:"Segway", cat:"Compact", price:299, speed:"20 km/h", range:"25 km", motor:"300W", weight:"14.2 kg", battery:"36V 5.1Ah", brakes:"E-Brake", tires:'8.1" Solid', charge:"3.5 hrs", maxLoad:"90 kg", suspension:"None", waterproof:"IP54", badge:"Budget Pick", color:"#F87171", desc:"Affordable and compact. The perfect starter scooter for short city trips.", full:"The Segway Ninebot E2 Plus is the ideal entry point into electric scooters. At just $299, it offers reliable Segway quality with a 300W motor that reaches 20 km/h. The 25 km range covers short commutes and errands easily, and the 3.5-hour charge time means it is always ready to go. Solid 8.1-inch tires eliminate flat tire worries, and the lightweight 14.2 kg frame makes it easy to carry when needed." },
  { id:7, name:"Xiaomi Scooter 4 Ultra", brand:"Xiaomi", cat:"Performance", price:799, speed:"25 km/h", range:"70 km", motor:"500W", weight:"24 kg", battery:"48V 12.8Ah", brakes:"Disc + E-Brake", tires:'10" Tubeless', charge:"7 hrs", maxLoad:"120 kg", suspension:"Dual Suspension", waterproof:"IP55", badge:"Flagship", color:"#7F1D1D", desc:"Xiaomi's most powerful scooter with 500W motor and 70 km range.", full:"The Xiaomi Electric Scooter 4 Ultra is the pinnacle of Xiaomi's scooter engineering. The powerful 500W motor handles steep inclines without slowing down, while the 48V 12.8Ah battery provides an impressive 70 km range. Full dual suspension front and rear absorbs every bump, and 10-inch tubeless tires deliver excellent traction. The large LED dashboard, ambient lighting, and turn signals make this a true premium riding experience." },
  { id:8, name:"NIU KQi2 Pro", brand:"NIU", cat:"Urban", price:399, speed:"25 km/h", range:"40 km", motor:"300W", weight:"14.5 kg", battery:"36V 9.6Ah", brakes:"Disc + Regen", tires:'10" Tubeless', charge:"5 hrs", maxLoad:"100 kg", suspension:"Front Fork", waterproof:"IPX4", badge:null, color:"#B91C1C", desc:"Smooth, lightweight, and reliable. A top pick for everyday urban riding.", full:"The NIU KQi2 Pro has been a favorite among urban commuters since its launch. The 300W motor provides smooth, predictable acceleration up to 25 km/h, while the 40 km range handles daily commutes without worry. 10-inch tubeless tires offer a comfortable ride without the hassle of inner tubes, and the disc brake with regenerative braking delivers reliable stopping power. At 14.5 kg, it is light enough to carry up a flight of stairs." },
];

export const ACCESSORIES: Accessory[] = [
  { id:101, name:"Full-Face Helmet", cat:"Protection", price:89, desc:"DOT-certified with ventilation system and removable liner. Maximum protection for high-speed riding.", full:"Our Full-Face Helmet provides complete head and chin protection with a DOT-certified shell. Features include an adjustable ventilation system with 6 intake vents, removable and washable liner, scratch-resistant visor with UV protection, and quick-release buckle system. Available in matte black and gloss red.", color:"#DC2626" },
  { id:102, name:"Half Helmet", cat:"Protection", price:49, desc:"Lightweight open-face helmet with adjustable strap and reflective accents.", full:"Perfect for urban commuters who prefer an open-face design. ABS outer shell with EPS foam liner provides reliable impact protection while maintaining excellent visibility and airflow. Reflective strips on the back for nighttime visibility.", color:"#EF4444" },
  { id:103, name:"Riding Gloves", cat:"Protection", price:29, desc:"Touchscreen-compatible with reinforced palm padding for grip and comfort.", full:"These riding gloves feature reinforced palm padding with silicone grip patterns, touchscreen-compatible fingertips on thumb and index finger, breathable mesh back panel, and adjustable velcro wrist closure. Ideal for all-season riding.", color:"#B91C1C" },
  { id:104, name:"Knee & Elbow Pads", cat:"Protection", price:39, desc:"4-piece set with breathable mesh and impact-resistant shells.", full:"Professional-grade protection set includes 2 knee pads and 2 elbow pads with hard PE shells, EVA foam padding, and breathable mesh fabric. Adjustable elastic straps ensure a secure fit for riders of all sizes.", color:"#DC2626" },
  { id:105, name:"Phone Mount", cat:"Gear", price:19, desc:"Universal clamp mount with 360-degree rotation and vibration damping.", full:"Fits phones from 4.7 to 6.8 inches with a secure 4-point clamp system. Silicone vibration damping pads protect your device from road vibrations. Ball joint allows 360-degree rotation for portrait or landscape viewing.", color:"#991B1B" },
  { id:106, name:"Scooter Lock", cat:"Gear", price:35, desc:"Heavy-duty U-lock with braided steel cable and dust cover.", full:"16mm hardened steel shackle resists cutting, sawing, and prying attacks. Includes a 4-foot braided steel cable for securing both wheels. PVC coating prevents scratches on your scooter. Comes with 3 laser-cut keys and a mounting bracket.", color:"#7F1D1D" },
  { id:107, name:"LED Light Kit", cat:"Gear", price:25, desc:"Front and rear LED set with multiple flash modes for night visibility.", full:"USB-rechargeable LED light kit with 800-lumen front light and rear tail light. 5 lighting modes including steady, strobe, and pulse. IPX5 waterproof rating. Silicone mounting straps fit any handlebar diameter. 8-hour battery life on medium setting.", color:"#EF4444" },
  { id:108, name:"Carry Bag", cat:"Gear", price:45, desc:"Padded shoulder bag fits scooters up to 20 kg with external pockets.", full:"Heavy-duty 600D Oxford fabric bag with reinforced stitching. Thick foam padding protects your scooter during transport. Adjustable shoulder strap with comfort pad distributes weight evenly. External zippered pocket for charger and accessories.", color:"#DC2626" },
  { id:109, name:"Disc Brake Pads", cat:"Parts", price:12, desc:"OEM-grade replacement pads for reliable stopping power.", full:"Semi-metallic compound provides consistent braking performance in all weather conditions. Pre-bedded for immediate use. Compatible with most standard disc brake calipers. Sold as a pair. Average lifespan of 1,000+ km depending on riding style.", color:"#B91C1C" },
  { id:110, name:'Inner Tube 10"', cat:"Parts", price:9, desc:"Butyl rubber tube for 10-inch pneumatic tires.", full:"High-quality butyl rubber inner tube with excellent air retention. Fits standard 10-inch pneumatic scooter tires. Straight valve stem for easy inflation. Keep a spare in your bag for worry-free rides.", color:"#991B1B" },
  { id:111, name:"Handlebar Grips", cat:"Parts", price:15, desc:"Ergonomic anti-slip grips with shock absorption.", full:"Dual-density rubber construction with a soft outer layer for comfort and firm inner core for control. Honeycomb pattern provides superior grip in wet conditions. Easy installation with standard 22mm inner diameter.", color:"#7F1D1D" },
  { id:112, name:"Charger 48V", cat:"Parts", price:39, desc:"Fast charger compatible with 48V battery systems. LED indicator.", full:"2A output for faster charging times compared to standard 1.5A chargers. Universal input (100-240V) for worldwide compatibility. LED indicator shows charging status: red for charging, green for complete. Built-in overcharge, overheat, and short-circuit protection.", color:"#EF4444" },
];

export const FAQS: FAQ[] = [
  { q:"Do you offer warranty on all scooters?", a:"Yes, all our electric scooters come with a minimum 6-month warranty covering the motor, battery, and controller. Extended warranty plans are also available." },
  { q:"Can I test ride before purchasing?", a:"Absolutely! Visit any of our three branches and our team will set you up with a test ride on any model in stock." },
  { q:"Do you sell replacement parts and accessories?", a:"We carry a full range of parts, accessories, and protective gear. From tires and brake pads to helmets and phone mounts." },
  { q:"Do you offer wholesale pricing?", a:"Yes, we offer competitive wholesale rates for bulk orders. Contact us directly via WhatsApp to discuss volume pricing and delivery." },
  { q:"What payment methods do you accept?", a:"We accept cash (USD and LBP), OMT, Whish, and bank transfers. Installment plans may be available on select models." },
  { q:"Do you provide repair and maintenance services?", a:"Our technicians handle everything from routine tune-ups to motor and battery replacements. Bring your scooter to any branch or reach out on WhatsApp." },
];

export const BRANCHES: Branch[] = [
  { name:"Borj Hammoud", phone:"79 185 184", wa:"96179185184", maps:"https://maps.app.goo.gl/ofXirR7QszdbcaVC8" },
  { name:"Zouk Mosbeh", phone:"81 185 184", wa:"96181185184", maps:"https://maps.app.goo.gl/oC9tSDxCDbzFVucD9" },
  { name:"Amchit", phone:null, wa:"96179185184", maps:"https://maps.app.goo.gl/hEHLhMAJgcHgCiS8A" },
];
