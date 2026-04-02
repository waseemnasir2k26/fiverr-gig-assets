import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Solution } from "./scenes/Scene2Solution";
import { Scene3HowItWorks } from "./scenes/Scene3HowItWorks";
import { Scene4WhatIBuild } from "./scenes/Scene4WhatIBuild";
import { Scene5Results } from "./scenes/Scene5Results";
import { Scene6Pricing } from "./scenes/Scene6Pricing";
import { Scene7CTA } from "./scenes/Scene7CTA";

export const MainComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#050507" }}>
      {/* Background music — low volume ambient */}
      <Audio src={staticFile("bgm.wav")} volume={0.18} />

      {/* Scene 1: Hook (0-4s, frames 0-120) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: The Solution (4-9s, frames 120-270) */}
      <Sequence from={120} durationInFrames={150}>
        <Scene2Solution />
      </Sequence>

      {/* Scene 3: How It Works (9-17s, frames 270-510) */}
      <Sequence from={270} durationInFrames={240}>
        <Scene3HowItWorks />
      </Sequence>

      {/* Scene 4: What I Build (17-23s, frames 510-690) */}
      <Sequence from={510} durationInFrames={180}>
        <Scene4WhatIBuild />
      </Sequence>

      {/* Scene 5: Results/Proof (23-28s, frames 690-840) */}
      <Sequence from={690} durationInFrames={150}>
        <Scene5Results />
      </Sequence>

      {/* Scene 6: Pricing (28-33s, frames 840-990) */}
      <Sequence from={840} durationInFrames={150}>
        <Scene6Pricing />
      </Sequence>

      {/* Scene 7: CTA (33-38s, frames 990-1140) */}
      <Sequence from={990} durationInFrames={150}>
        <Scene7CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
