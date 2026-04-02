import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GigVideoData } from "./gigData";

// ─── Scene 1: Hook ───
const SceneHook: React.FC<{ data: GigVideoData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  const fadeOut = interpolate(frame, [95, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const warningTint = interpolate(frame, [0, 30], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${data.bg1} 0%, rgba(40, 10, 10, ${warningTint}) 50%, #0a0a12 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 80,
            fontWeight: 800,
            color: "#FFFFFF",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
            margin: 0,
            letterSpacing: -2,
          }}
        >
          {data.hookTitle}{" "}
          <span style={{ color: data.accent }}>{data.hookHighlight}</span>
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 20 }}>
          {data.painPoints.map((point, i) => {
            const delay = 15 + i * 15;
            const s = spring({ frame: frame - delay, fps, config: { damping: 14, mass: 0.5 } });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(s, [0, 1], [60, 0])}px)`,
                }}
              >
                <span style={{ fontSize: 36, lineHeight: 1 }}>{"\u274C"}</span>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 36,
                    fontWeight: 500,
                    color: "#CCCCCC",
                  }}
                >
                  {point}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: Solution ───
const SceneSolution: React.FC<{ data: GigVideoData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleSpring = spring({ frame: frame - 5, fps, config: { damping: 14, mass: 0.6 } });
  const subSpring = spring({ frame: frame - 15, fps, config: { damping: 14, mass: 0.6 } });
  const glowPulse = interpolate(Math.sin(frame * 0.06), [-1, 1], [10, 30]);
  const fadeOut = interpolate(frame, [120, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${data.bg1} 0%, ${data.bg2} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn * fadeOut,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 50 }}>
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: "#FFFFFF",
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(titleSpring, [0, 1], [-100, 0])}px)`,
            margin: 0,
            letterSpacing: -2,
          }}
        >
          {data.solutionLine1}{" "}
          <span style={{ color: data.accent }}>{data.solutionHighlight}</span>
        </h1>

        <div
          style={{
            opacity: interpolate(subSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 48,
              fontWeight: 700,
              color: data.accent,
              textShadow: `0 0 ${glowPulse}px ${data.accent}88`,
            }}
          >
            {data.solutionSub}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 30 }}>
          {data.flowSteps.map((step, i) => {
            const delay = 40 + i * 25;
            const s = spring({ frame: frame - delay, fps, config: { damping: 14, mass: 0.6 } });
            const arrowDelay = delay + 12;
            const arrowS = spring({ frame: frame - arrowDelay, fps, config: { damping: 14, mass: 0.4 } });
            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    opacity: interpolate(s, [0, 1], [0, 1]),
                    transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`,
                    padding: "20px 36px",
                    border: `2px solid ${data.accent}`,
                    borderRadius: 16,
                    backgroundColor: `${data.accent}14`,
                    boxShadow: `0 0 ${interpolate(Math.sin((frame - delay) * 0.08), [-1, 1], [5, 20])}px ${data.accent}66`,
                  }}
                >
                  <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 30, fontWeight: 700, color: "#FFFFFF", letterSpacing: 1 }}>
                    {step}
                  </span>
                </div>
                {i < data.flowSteps.length - 1 && (
                  <div style={{ display: "flex", alignItems: "center", opacity: interpolate(arrowS, [0, 1], [0, 1]) }}>
                    <div style={{ height: 3, width: interpolate(arrowS, [0, 1], [0, 80]), backgroundColor: data.accent, borderRadius: 2 }} />
                    <div style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: `16px solid ${data.accent}` }} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: How It Works ───
const SceneHowItWorks: React.FC<{ data: GigVideoData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame: frame - 3, fps, config: { damping: 14, mass: 0.6 } });
  const underlineW = interpolate(spring({ frame: frame - 10, fps, config: { damping: 14, mass: 0.5 } }), [0, 1], [0, 300]);
  const fadeOut = interpolate(frame, [210, 240], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${data.bg1} 0%, ${data.bg2} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 1400 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 60,
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <h1 style={{ fontFamily: "system-ui, sans-serif", fontSize: 64, fontWeight: 800, color: "#FFFFFF", margin: 0, letterSpacing: 4 }}>
            HOW IT WORKS
          </h1>
          <div style={{ height: 4, width: underlineW, backgroundColor: data.accent, borderRadius: 2, marginTop: 12 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 35,
              top: 35,
              width: 4,
              height: interpolate(frame, [30, 180], [0, 340], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              backgroundColor: data.accent,
              borderRadius: 2,
              opacity: 0.5,
            }}
          />
          {data.steps.map((step, i) => {
            const delay = 25 + i * 40;
            const s = spring({ frame: frame - delay, fps, config: { damping: 14, mass: 0.5 } });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(s, [0, 1], [120, 0])}px)`,
                  marginBottom: 36,
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    backgroundColor: `${data.accent}26`,
                    border: `2px solid ${data.accent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 32, lineHeight: 1 }}>{step.icon}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 34, fontWeight: 700, color: "#FFFFFF" }}>{step.title}</span>
                  <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, fontWeight: 400, color: "#999999" }}>{step.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: What I Build ───
const SceneWhatIBuild: React.FC<{ data: GigVideoData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame: frame - 3, fps, config: { damping: 14, mass: 0.6 } });
  const fadeOut = interpolate(frame, [150, 180], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${data.bg1} 0%, ${data.bg2} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 50 }}>
        <h1
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 64,
            fontWeight: 800,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: 4,
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          {data.buildTitle} <span style={{ color: data.accent }}>{data.buildHighlight}</span>
        </h1>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 28, maxWidth: 1200 }}>
          {data.items.map((item, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const delay = 20 + row * 20 + col * 8;
            const s = spring({ frame: frame - delay, fps, config: { damping: 14, mass: 0.5 } });
            return (
              <div
                key={i}
                style={{
                  width: 360,
                  padding: "32px 28px",
                  borderRadius: 16,
                  border: `2px solid ${data.accent}66`,
                  backgroundColor: `${data.accent}0F`,
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `scale(${interpolate(s, [0, 1], [0.5, 1])})`,
                }}
              >
                <span style={{ fontSize: 40, lineHeight: 1 }}>{item.icon}</span>
                <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 26, fontWeight: 600, color: "#FFFFFF" }}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5: Results ───
const SceneResults: React.FC<{ data: GigVideoData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame: frame - 3, fps, config: { damping: 14, mass: 0.6 } });
  const fadeOut = interpolate(frame, [120, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glowPulse = interpolate(Math.sin(frame * 0.04), [-1, 1], [0.02, 0.08]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${data.bg1} 0%, ${data.bg2} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${data.accent}${Math.round(glowPulse * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 70, position: "relative" }}>
        <h1
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 64,
            fontWeight: 800,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: 4,
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          REAL <span style={{ color: data.accent }}>RESULTS</span>
        </h1>

        <div style={{ display: "flex", gap: 80, alignItems: "flex-start" }}>
          {data.stats.map((stat, i) => {
            const delay = 15 + i * 15;
            const s = spring({ frame: frame - delay, fps, config: { damping: 14, mass: 0.6 } });
            const counter = interpolate(frame - delay, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: 96,
                    fontWeight: 800,
                    color: data.accent,
                    lineHeight: 1,
                    textShadow: `0 0 20px ${data.accent}4D`,
                  }}
                >
                  {Math.round(stat.value * counter)}
                  {stat.suffix}
                </span>
                <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 24, fontWeight: 500, color: "#888888", textAlign: "center" }}>
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

// ─── Scene 6: Pricing ───
const ScenePricing: React.FC<{ data: GigVideoData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame: frame - 3, fps, config: { damping: 14, mass: 0.6 } });
  const fadeOut = interpolate(frame, [120, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${data.bg1} 0%, ${data.bg2} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 50 }}>
        <h1
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 64,
            fontWeight: 800,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: 4,
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          PACKAGES
        </h1>

        <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
          {data.packages.map((pkg, i) => {
            const delay = 15 + i * 12;
            const s = spring({ frame: frame - delay, fps, config: { damping: 14, mass: 0.6 } });
            const isHL = pkg.highlighted;
            return (
              <div
                key={i}
                style={{
                  width: isHL ? 380 : 340,
                  height: isHL ? 380 : 330,
                  borderRadius: 20,
                  border: `2px solid ${isHL ? data.accent : "rgba(255,255,255,0.15)"}`,
                  backgroundColor: isHL ? `${data.accent}14` : "rgba(255,255,255,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                  padding: 32,
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(s, [0, 1], [100, 0])}px)`,
                  position: "relative",
                  boxShadow: isHL ? `0 0 30px ${data.accent}33` : "none",
                }}
              >
                {isHL && (
                  <div
                    style={{
                      position: "absolute",
                      top: -16,
                      backgroundColor: data.accent,
                      color: "#000",
                      padding: "6px 24px",
                      borderRadius: 20,
                      fontFamily: "system-ui, sans-serif",
                      fontSize: 16,
                      fontWeight: 800,
                      letterSpacing: 2,
                    }}
                  >
                    POPULAR
                  </div>
                )}
                <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 700, color: "#999", letterSpacing: 3 }}>{pkg.tier}</span>
                <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 64, fontWeight: 800, color: isHL ? data.accent : "#FFFFFF", lineHeight: 1 }}>{pkg.price}</span>
                <div style={{ width: "80%", height: 1, backgroundColor: "rgba(255,255,255,0.1)" }} />
                <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 18, fontWeight: 400, color: "#AAAAAA", textAlign: "center", lineHeight: 1.5 }}>{pkg.features}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 7: CTA ───
const SceneCTA: React.FC<{ data: GigVideoData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame: frame - 3, fps, config: { damping: 14, mass: 0.6 } });
  const sub1Spring = spring({ frame: frame - 15, fps, config: { damping: 14, mass: 0.5 } });
  const sub2Spring = spring({ frame: frame - 25, fps, config: { damping: 14, mass: 0.5 } });
  const buttonSpring = spring({ frame: frame - 35, fps, config: { damping: 12, mass: 0.6 } });
  const brandSpring = spring({ frame: frame - 50, fps, config: { damping: 14, mass: 0.6 } });
  const glowPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [15, 35]);
  const fadeOut = interpolate(frame, [130, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${data.bg1} 0%, ${data.bg2} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${data.accent}0F 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, position: "relative" }}>
        <h1
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 76,
            fontWeight: 800,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: -2,
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          Ready to <span style={{ color: data.accent }}>Automate?</span>
        </h1>
        <p
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 32,
            fontWeight: 500,
            color: "#CCCCCC",
            margin: 0,
            opacity: interpolate(sub1Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(sub1Spring, [0, 1], [20, 0])}px)`,
          }}
        >
          Message me your #1 time-wasting task
        </p>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 28, fontWeight: 500, color: "#999999", margin: 0, opacity: interpolate(sub2Spring, [0, 1], [0, 1]) }}>
          First reply in under 1 hour {"\u26A1"}
        </p>
        <div
          style={{
            marginTop: 20,
            padding: "20px 60px",
            backgroundColor: data.accent,
            borderRadius: 50,
            opacity: interpolate(buttonSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(buttonSpring, [0, 1], [0.6, 1])})`,
            boxShadow: `0 0 ${glowPulse}px ${data.accent}80`,
          }}
        >
          <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 32, fontWeight: 800, color: "#000000", letterSpacing: 3 }}>
            ORDER NOW
          </span>
        </div>
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: interpolate(brandSpring, [0, 1], [0, 1]) }}>
          <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 36, fontWeight: 800, color: "#FFFFFF", letterSpacing: 6 }}>SKYNET LABS</span>
          <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, fontWeight: 400, color: "#666666" }}>skynetjoe.com</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main GigVideo Composition ───
export const GigVideo: React.FC<{ gigId: number }> = ({ gigId }) => {
  // Import at render time to avoid circular deps
  const { GIGS } = require("./gigData");
  const data = GIGS.find((g: GigVideoData) => g.id === gigId);
  if (!data) return <AbsoluteFill style={{ background: "#000" }} />;

  return (
    <AbsoluteFill style={{ backgroundColor: data.bg1 }}>
      <Audio src={staticFile("bgm.wav")} volume={0.18} />

      <Sequence from={0} durationInFrames={120}>
        <SceneHook data={data} />
      </Sequence>
      <Sequence from={120} durationInFrames={150}>
        <SceneSolution data={data} />
      </Sequence>
      <Sequence from={270} durationInFrames={240}>
        <SceneHowItWorks data={data} />
      </Sequence>
      <Sequence from={510} durationInFrames={180}>
        <SceneWhatIBuild data={data} />
      </Sequence>
      <Sequence from={690} durationInFrames={150}>
        <SceneResults data={data} />
      </Sequence>
      <Sequence from={840} durationInFrames={150}>
        <ScenePricing data={data} />
      </Sequence>
      <Sequence from={990} durationInFrames={150}>
        <SceneCTA data={data} />
      </Sequence>
    </AbsoluteFill>
  );
};
