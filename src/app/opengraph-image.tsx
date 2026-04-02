import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Second Opinion AI — Clarity when you need it most";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fafafa",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Brand dot */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "4px solid #2c3e34",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#2c3e34",
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: "#1a1a1a",
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Second Opinion AI
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: "#666666",
            fontWeight: 300,
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Structured clinical reasoning when medical opinions conflict.
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            width: 80,
            height: 2,
            backgroundColor: "#2c3e34",
            opacity: 0.4,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
