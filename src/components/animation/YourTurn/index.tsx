import {
  Rive,
  Layout,
  Fit,
  Alignment,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect } from "react";

export const YourTurn = ({
  className,
  startTurn,
}: {
  className?: string;
  startTurn: boolean;
}) => {
  const { rive, RiveComponent } = useRive({
    src: `animation/yourturn.riv`,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

    useEffect(() => {
      if (rive && startTurn) {
        rive.reset();
        rive.play();
      }
    }, [rive, startTurn]);

  return <RiveComponent className={className} />;
};
