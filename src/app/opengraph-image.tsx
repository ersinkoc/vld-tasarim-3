import { ImageResponse } from "next/og";

export const alt = "VLD — Ultra-Fast TypeScript Validation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05060a",
          color: "#e7eaf2",
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* accents */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "#a6ff1a",
            opacity: 0.16,
            filter: "blur(90px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -140,
            width: 480,
            height: 480,
            borderRadius: 999,
            background: "#3ce4ff",
            opacity: 0.14,
            filter: "blur(90px)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              background: "#e7eaf2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#05060a",
            }}
          >
            v
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: -0.5,
            }}
          >
            vld
            <span style={{ color: "#8991a5", fontWeight: 400 }}>.oxog.dev</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Validation at the speed of light.
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              color: "#8991a5",
              display: "flex",
            }}
          >
            Zero dependencies &middot; drop-in Zod parity &middot; 32 locales
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {["0 dependencies", "259/259 zod exports", "2633 tests", "MIT"].map(
            (t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 999,
                  padding: "10px 20px",
                  fontSize: 21,
                  color: "#c3c9d8",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "#a6ff1a",
                    display: "flex",
                  }}
                />
                {t}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}