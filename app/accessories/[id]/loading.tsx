export default function Loading() {
  return (
    <div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 32px" }}>
        <div style={{ height: 16, background: "#F3F4F6", borderRadius: 6, width: 300, animation: "pulse 1.5s ease-in-out infinite" }} />
      </div>
      <div className="prod-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 64px" }}>
        <div className="prod-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div style={{ height: 380, background: "#F3F4F6", borderRadius: 16, animation: "pulse 1.5s ease-in-out infinite" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ height: 14, background: "#F3F4F6", borderRadius: 6, width: 80, animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ height: 40, background: "#F3F4F6", borderRadius: 8, width: "80%", animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ height: 36, background: "#F3F4F6", borderRadius: 8, width: 120, animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ height: 80, background: "#F3F4F6", borderRadius: 8, animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ height: 48, background: "#F3F4F6", borderRadius: 10, flex: 1, animation: "pulse 1.5s ease-in-out infinite" }} />
              <div style={{ height: 48, background: "#F3F4F6", borderRadius: 10, flex: 1, animation: "pulse 1.5s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
