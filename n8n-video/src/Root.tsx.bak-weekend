import React from "react";
import { Composition } from "remotion";
import { GigVideo } from "./GigVideo";

const GIG_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Root: React.FC = () => {
  return (
    <>
      {GIG_IDS.map((id) => (
        <Composition
          key={id}
          id={`Gig${id}`}
          component={GigVideo}
          durationInFrames={1140}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ gigId: id }}
        />
      ))}
    </>
  );
};
