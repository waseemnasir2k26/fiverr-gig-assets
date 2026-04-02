import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const FlowBox: React.FC<{
  label: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ label, delay, frame, fps }) => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const scale = interpolate(s, [0, 1], [0.7, 1]);

  const glowIntensity = interpolate(
    Math.sin((frame - delay) * 0.08),
    [-1, 1],
    [5, 20]
  );

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        padding: "20px 36px",
        border: "2px solid #1DBF73",
        borderRadius: 16,
        backgroundColor: "rgba(29, 191, 115, 0.08)",
        boxShadow: `0 0 ${glowIntensity}px rgba(29, 191, 115, 0.4)`,
      }}
    >
      <span
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 30,
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
};

const FlowArrow: React.FC<{
  delay: number;
  frame: number;
  fps: number;
}> = ({ delay, frame, fps }) => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.4 },
  });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const width = interpolate(s, [0, 1], [0, 80]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          height: 3,
          width,
          backgroundColor: "#1DBF73",
          borderRadius: 2,
        }}
      />
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: "10px solid transparent",
          borderBottom: "10px solid transparent",
          borderLeft: "16px solid #1DBF73",
        }}
      />
    </div>
  );
};

export const Scene2Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title animation
  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const titleX = interpolate(titleSpring, [0, 1], [-100, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Subtitle
  const subSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);
  const subY = interpolate(subSpring, [0, 1], [30, 0]);

  const glowPulse = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [10, 30]
  );

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
        opacity: fadeIn * fadeOut,
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
            fontSize: 72,
            fontWeight: 800,
            color: "#FFFFFF",
            opacity: titleOpacity,
            transform: `translateX(${titleX}px)`,
            margin: 0,
            letterSpacing: -2,
          }}
        >
          What If It Ran On{" "}
          <span style={{ color: "#1DBF73" }}>Autopilot?</span>
        </h1>

        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 48,
              fontWeight: 700,
              color: "#1DBF73",
              textShadow: `0 0 ${glowPulse}px rgba(29, 191, 115, 0.6)`,
            }}
          >
            N8N + AI Automation
          </span>
        </div>

        {/* Flow diagram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 30,
          }}
        >
          <FlowBox label="TRIGGER" delay={40} frame={frame} fps={fps} />
          <FlowArrow delay={55} frame={frame} fps={fps} />
          <FlowBox label="AI PROCESS" delay={65} frame={frame} fps={fps} />
          <FlowArrow delay={80} frame={frame} fps={fps} />
          <FlowBox label="ACTION" delay={90} frame={frame} fps={fps} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
