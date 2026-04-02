import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const steps = [
  {
    icon: "\uD83D\uDCE5",
    title: "Trigger fires",
    desc: "New email, form submission, webhook, schedule",
  },
  {
    icon: "\uD83E\uDD16",
    title: "AI processes",
    desc: "GPT-4 classifies, extracts, generates content",
  },
  {
    icon: "\u26A1",
    title: "Actions execute",
    desc: "Update CRM, send email, post to Slack, create invoice",
  },
  {
    icon: "\uD83D\uDD04",
    title: "Repeat forever",
    desc: "24/7, zero errors, zero coffee breaks",
  },
];

export const Scene3HowItWorks: React.FC = () => {
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

  // Underline
  const underlineWidth = interpolate(
    spring({ frame: frame - 10, fps, config: { damping: 14, mass: 0.5 } }),
    [0, 1],
    [0, 300]
  );

  // Fade out
  const fadeOut = interpolate(frame, [210, 240], [1, 0], {
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
          width: 1400,
        }}
      >
        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 60,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
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
            }}
          >
            HOW IT WORKS
          </h1>
          <div
            style={{
              height: 4,
              width: underlineWidth,
              backgroundColor: "#1DBF73",
              borderRadius: 2,
              marginTop: 12,
            }}
          />
        </div>

        {/* Steps */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            position: "relative",
          }}
        >
          {/* Green connecting line */}
          <div
            style={{
              position: "absolute",
              left: 35,
              top: 35,
              width: 4,
              height: interpolate(frame, [30, 180], [0, 340], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              backgroundColor: "#1DBF73",
              borderRadius: 2,
              opacity: 0.5,
            }}
          />

          {steps.map((step, index) => {
            const delay = 25 + index * 40;
            const stepSpring = spring({
              frame: frame - delay,
              fps,
              config: { damping: 14, mass: 0.5 },
            });
            const opacity = interpolate(stepSpring, [0, 1], [0, 1]);
            const x = interpolate(stepSpring, [0, 1], [120, 0]);

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  opacity,
                  transform: `translateX(${x}px)`,
                  marginBottom: 36,
                }}
              >
                {/* Number circle */}
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    backgroundColor: "rgba(29, 191, 115, 0.15)",
                    border: "2px solid #1DBF73",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 32, lineHeight: 1 }}>
                    {step.icon}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontSize: 34,
                      fontWeight: 700,
                      color: "#FFFFFF",
                    }}
                  >
                    {step.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontSize: 24,
                      fontWeight: 400,
                      color: "#999999",
                    }}
                  >
                    {step.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
