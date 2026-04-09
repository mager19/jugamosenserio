import { Composition } from "remotion";
import { SliderPuzzle } from "./SliderPuzzle";

// 5 seconds × 30fps = 150 frames
// 6 moves × 25 frames/move (18 animate + 7 pause) = 150 frames exactly
export const RemotionRoot = () => {
  return (
    <Composition
      id="SliderPuzzle"
      component={SliderPuzzle}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1080}
    />
  );
};
