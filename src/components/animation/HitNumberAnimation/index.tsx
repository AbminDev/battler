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

export const HitNumberAnimation = ({
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
    src: "animation/playerhit.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
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

      rive.setTextRunValue("PlayerHitNum", `-${hitAmount}`);
    }
  }, [rive]);

  useEffect(() => {
    if (rive && triggerHit) {
      rive.play();
    }
  }, [rive, triggerHit]);

  return <RiveComponent className={className} />;
};
