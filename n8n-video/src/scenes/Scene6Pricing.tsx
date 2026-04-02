import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const packages = [
  {
    tier: "STARTER",
    price: "$97",
    features: "1 Workflow, 5 Nodes, 2 Revisions",
    highlighted: false,
  },
  {
    tier: "BUSINESS",
    price: "$247",
    features: "AI Integration, 15 Nodes, Full Docs",
    highlighted: true,
  },
  {
    tier: "ENTERPRISE",
    price: "$497",
    features: "3 Workflows, Unlimited, 30-Day Support",
    highlighted: false,
  },
];

export const Scene6Pricing: React.FC = () => {
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
  const fadeOut = interpolate(frame, [120, 150], [1, 0], {
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
          PACKAGES
        </h1>

        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "flex-end",
          }}
        >
          {packages.map((pkg, index) => {
            const delay = 15 + index * 12;
            const cardSpring = spring({
              frame: frame - delay,
              fps,
              config: { damping: 14, mass: 0.6 },
            });
            const y = interpolate(cardSpring, [0, 1], [100, 0]);
            const opacity = interpolate(cardSpring, [0, 1], [0, 1]);

            const isHighlighted = pkg.highlighted;
            const cardHeight = isHighlighted ? 380 : 330;
            const cardWidth = isHighlighted ? 380 : 340;

            return (
              <div
                key={index}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  borderRadius: 20,
                  border: `2px solid ${isHighlighted ? "#1DBF73" : "rgba(255,255,255,0.15)"}`,
                  backgroundColor: isHighlighted
                    ? "rgba(29, 191, 115, 0.08)"
                    : "rgba(255,255,255,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                  padding: 32,
                  opacity,
                  transform: `translateY(${y}px)`,
                  position: "relative",
                  boxShadow: isHighlighted
                    ? "0 0 30px rgba(29, 191, 115, 0.2)"
                    : "none",
                }}
              >
                {isHighlighted && (
                  <div
                    style={{
                      position: "absolute",
                      top: -16,
                      backgroundColor: "#1DBF73",
                      color: "#000",
                      padding: "6px 24px",
                      borderRadius: 20,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontSize: 16,
                      fontWeight: 800,
                      letterSpacing: 2,
                    }}
                  >
                    POPULAR
                  </div>
                )}

                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#999",
                    letterSpacing: 3,
                  }}
                >
                  {pkg.tier}
                </span>

                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 64,
                    fontWeight: 800,
                    color: isHighlighted ? "#1DBF73" : "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  {pkg.price}
                </span>

                <div
                  style={{
                    width: "80%",
                    height: 1,
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                />

                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 18,
                    fontWeight: 400,
                    color: "#AAAAAA",
                    textAlign: "center",
                    lineHeight: 1.5,
                  }}
                >
                  {pkg.features}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
