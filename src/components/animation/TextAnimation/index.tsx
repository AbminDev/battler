import {
  Rive,
  Layout,
  Fit,
  Alignment,
  useRive,
  useStateMachineInput,
  FileAsset,
  decodeImage,
  ImageAsset,
} from "@rive-app/react-canvas";
import { useEffect } from "react";

export const TextAnimation = () => {
  const { rive, RiveComponent } = useRive({
    src: "animation/testttt (6).riv",
    stateMachines: "State Machine 1",
    autoplay: false,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    if (rive) {
 
      rive.setTextRunValue("button", "New івівів!!");

    }
  }, [rive]);

  return <RiveComponent style={{ width: `100%`, height: `100%` }} />;
};
