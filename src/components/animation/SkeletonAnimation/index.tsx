import {
  Rive,
  Layout,
  Fit,
  Alignment,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect } from "react";

export const SkeletonAnimation = () => {
  // Завантаження файлу Rive
  const { rive, RiveComponent } = useRive({
    src: "animation/Skeleton.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });



  const hitInput = useStateMachineInput(rive, "State Machine 1", "Hit");


  return (
    <RiveComponent
      style={{ width: "100%", height: "100%" }}
      onClick={() => hitInput?.fire()}
    />
  );
};
