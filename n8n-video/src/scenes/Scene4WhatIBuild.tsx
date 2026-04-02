import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const items = [
  { label: "Lead Capture \u2192 CRM", icon: "\uD83C\uDFAF" },
  { label: "Email Follow-ups", icon: "\uD83D\uDCE7" },
  { label: "Invoice Processing", icon: "\uD83D\uDCCB" },
  { label: "Social Media Posting", icon: "\uD83D\uDCF1" },
  { label: "Data Sync", icon: "\uD83D\uDD04" },
  { label: "AI Content Pipeline", icon: "\uD83E\uDD16" },
];

export const Scene4WhatIBuild: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleSpring = spring({
    frame: frame - 3,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);

  // Fade out
  const fadeOut = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #050507 0%, #0a2818 100%)",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
        }}
      >
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 64,
            fontWeight: 800,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: 4,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          WHAT I <span style={{ color: "#1DBF73" }}>AUTOMATE</span>
        </h1>

        {/* Grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 28,
            maxWidth: 1200,
          }}
        >
          {items.map((item, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const delay = 20 + row * 20 + col * 8;

            const cardSpring = spring({
              frame: frame - delay,
              fps,
              config: { damping: 14, mass: 0.5 },
            });
            const scale = interpolate(cardSpring, [0, 1], [0.5, 1]);
            const opacity = interpolate(cardSpring, [0, 1], [0, 1]);

            return (
              <div
                key={index}
                style={{
                  width: 360,
                  padding: "32px 28px",
                  borderRadius: 16,
                  border: "2px solid rgba(29, 191, 115, 0.4)",
                  backgroundColor: "rgba(29, 191, 115, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  opacity,
                  transform: `scale(${scale})`,
                }}
              >
                <span style={{ fontSize: 40, lineHeight: 1 }}>{item.icon}</span>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 26,
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
