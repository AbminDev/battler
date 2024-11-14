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

export const HitAnimation = ({
  triggerHit,
  hitType,
  hitAmount,
  className,
}: {
  triggerHit?: boolean;
  hitType: number;
  hitAmount: number;
  className?: string;
}) => {
  const { rive, RiveComponent } = useRive({
    src: "animation/Hit.riv",
    stateMachines: "State Machine 1",
    autoplay: false,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });


  const hitInput = useStateMachineInput(
    rive,
    "State Machine 1",
    "Number 1",
    hitType
  );

  useEffect(() => {
    if (rive) {

      rive.setTextRunValue("HitNum", `-${hitAmount}`);
    }
  }, [rive]);

  useEffect(() => {
    if (rive && triggerHit) {
      rive.play();
    }
  }, [rive, triggerHit]);

  return <RiveComponent className={className} />;
};
