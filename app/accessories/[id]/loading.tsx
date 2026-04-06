export default function Loading() {
  return (
    <div>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px" }} className="prod-wrap">
        <div style={{ height: 16, background: "#F3F4F6", borderRadius: 6, width: 140, marginBottom: 32, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="acc-detail-grid">
          <div style={{ height: 300, background: "#F3F4F6", borderRadius: 16, animation: "pulse 1.5s ease-in-out infinite" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ height: 14, background: "#F3F4F6", borderRadius: 6, width: 80, animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ height: 36, background: "#F3F4F6", borderRadius: 8, width: "75%", animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ height: 28, background: "#F3F4F6", borderRadius: 6, width: 100, animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ height: 60, background: "#F3F4F6", borderRadius: 8, animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ height: 48, background: "#F3F4F6", borderRadius: 10, animation: "pulse 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
