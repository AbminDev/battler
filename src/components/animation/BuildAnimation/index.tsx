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

export const BuildAnimation = ({
  className,
  triggerHit,
}: {
  className?: string;
  triggerHit: boolean;
}) => {
  const { rive, RiveComponent } = useRive({
    src: "animation/build.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });


  const hitInput = useStateMachineInput(rive, "State Machine 1", "BuildEnd");

  useEffect(() => {
    if (rive) {
      if (triggerHit) {

        hitInput?.fire();
        rive.play();
      }
    }
  }, [rive, triggerHit]);

  return <RiveComponent className={className} />;
};
