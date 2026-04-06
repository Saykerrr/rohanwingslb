export default function Loading() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px" }} className="prod-wrap">
      <div style={{ height: 40, background: "#F3F4F6", borderRadius: 8, width: 260, marginBottom: 24, animation: "pulse 1.5s ease-in-out infinite" }} />
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: 1 }}>
        {[...Array(15)].map((_, i) => (
          <div key={i} style={{ height: 48, background: i % 3 === 0 ? "#F9FAFB" : "#F3F4F6", margin: 1, borderRadius: 4, animation: "pulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.05}s` }} />
        ))}
      </div>
    </div>
  );
}
