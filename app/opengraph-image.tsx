import { ImageResponse } from "next/og";

// Default social share card, in the site's dark studio style. Pages with their
// own imagery (case studies, articles) override it through buildMetadata().
export const alt = "The Creative Factory — creative agency and production studio in Sri Lanka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#cbfe1c";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#ffffff",
          background: `radial-gradient(circle at 85% 55%, rgba(203, 254, 28, 0.22), transparent 55%), #0b0e13`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>
            <span>THE</span>
            <span style={{ color: ACCENT }}>CREATIVE</span>
            <span>FACTORY</span>
          </div>
          <div style={{ marginTop: 10, fontSize: 18, letterSpacing: 12, color: "#ababab" }}>ESTD 2019</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
          <div style={{ display: "flex" }}>
            WE SEE THE&nbsp;<span style={{ color: ACCENT }}>UNSEEN</span>
          </div>
          <div style={{ display: "flex" }}>
            WE TELL THE&nbsp;<span style={{ color: ACCENT }}>UNTOLD</span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#ababab", letterSpacing: 2 }}>
          CREATIVE AGENCY &amp; PRODUCTION STUDIO · SRI LANKA
        </div>
      </div>
    ),
    size,
  );
}
