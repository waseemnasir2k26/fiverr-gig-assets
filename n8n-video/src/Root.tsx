import React from "react";
import { Composition } from "remotion";
import { GigVideo } from "./GigVideo";

const GIG_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
  30, 31, 32,
];

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
