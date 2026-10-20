import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card: paper, ink, one accent rule. Uses system fonts so builds need no network. */
export function ogCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f0e8",
          color: "#151513",
          padding: "64px 72px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#77746b", fontFamily: "monospace" }}>
          <span>{eyebrow}</span>
          <span>Ibrahim Al-Eisa</span>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 40 ? 68 : 92, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 24, color: "#4d4b45", fontFamily: "sans-serif" }}>
          <div style={{ width: 56, height: 4, background: "#a83c14" }} />
          <span>{footer}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
