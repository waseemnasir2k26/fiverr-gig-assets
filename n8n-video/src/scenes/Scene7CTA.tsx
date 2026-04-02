import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations — tighter delays
  const titleSpring = spring({
    frame: frame - 3,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);

  const sub1Spring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, mass: 0.5 },
  });
  const sub1Opacity = interpolate(sub1Spring, [0, 1], [0, 1]);
  const sub1Y = interpolate(sub1Spring, [0, 1], [20, 0]);

  const sub2Spring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, mass: 0.5 },
  });
  const sub2Opacity = interpolate(sub2Spring, [0, 1], [0, 1]);

  const buttonSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, mass: 0.6 },
  });
  const buttonScale = interpolate(buttonSpring, [0, 1], [0.6, 1]);
  const buttonOpacity = interpolate(buttonSpring, [0, 1], [0, 1]);

  const brandSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const brandOpacity = interpolate(brandSpring, [0, 1], [0, 1]);

  // Pulsing glow
  const glowPulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [15, 35]
  );

  // Fade to black at very end
  const fadeOut = interpolate(frame, [130, 150], [1, 0], {
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
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(29, 191, 115, 0.06) 0%, transparent 70%)",
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
          gap: 28,
          position: "relative",
        }}
      >
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 76,
            fontWeight: 800,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: -2,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Ready to <span style={{ color: "#1DBF73" }}>Automate?</span>
        </h1>

        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 32,
            fontWeight: 500,
            color: "#CCCCCC",
            margin: 0,
            opacity: sub1Opacity,
            transform: `translateY(${sub1Y}px)`,
          }}
        >
          Message me your #1 time-wasting task
        </p>

        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 28,
            fontWeight: 500,
            color: "#999999",
            margin: 0,
            opacity: sub2Opacity,
          }}
        >
          First reply in under 1 hour {"\u26A1"}
        </p>

        {/* Button */}
        <div
          style={{
            marginTop: 20,
            padding: "20px 60px",
            backgroundColor: "#1DBF73",
            borderRadius: 50,
            opacity: buttonOpacity,
            transform: `scale(${buttonScale})`,
            boxShadow: `0 0 ${glowPulse}px rgba(29, 191, 115, 0.5)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 32,
              fontWeight: 800,
              color: "#000000",
              letterSpacing: 3,
            }}
          >
            ORDER NOW
          </span>
        </div>

        {/* Branding */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: brandOpacity,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 36,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: 6,
            }}
          >
            SKYNET LABS
          </span>
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 20,
              fontWeight: 400,
              color: "#666666",
            }}
          >
            skynetjoe.com
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
