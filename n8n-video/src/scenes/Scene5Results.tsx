import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const stats = [
  { value: 40, suffix: "+", label: "Hours Saved / Week" },
  { value: 50, suffix: "+", label: "Workflows Delivered" },
  { value: 90, suffix: "%", label: "Cost Reduction vs Manual" },
];

export const Scene5Results: React.FC = () => {
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

  // Background glow pulse
  const glowPulse = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.02, 0.08]
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #050507 0%, #0a2818 100%)",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Subtle glow behind stats */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(29, 191, 115, ${glowPulse}) 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 70,
          position: "relative",
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
          REAL <span style={{ color: "#1DBF73" }}>RESULTS</span>
        </h1>

        <div
          style={{
            display: "flex",
            gap: 80,
            alignItems: "flex-start",
          }}
        >
          {stats.map((stat, index) => {
            const delay = 15 + index * 15;
            const statSpring = spring({
              frame: frame - delay,
              fps,
              config: { damping: 14, mass: 0.6 },
            });
            const opacity = interpolate(statSpring, [0, 1], [0, 1]);
            const y = interpolate(statSpring, [0, 1], [40, 0]);

            // Counter animation — faster
            const counterProgress = interpolate(
              frame - delay,
              [0, 40],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );
            const displayValue = Math.round(stat.value * counterProgress);

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  opacity,
                  transform: `translateY(${y}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 96,
                    fontWeight: 800,
                    color: "#1DBF73",
                    lineHeight: 1,
                    textShadow: "0 0 20px rgba(29, 191, 115, 0.3)",
                  }}
                >
                  {displayValue}
                  {stat.suffix}
                </span>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 24,
                    fontWeight: 500,
                    color: "#888888",
                    textAlign: "center",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
