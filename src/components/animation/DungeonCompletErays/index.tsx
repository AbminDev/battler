import {
  Rive,
  Layout,
  Fit,
  Alignment,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect } from "react";

export const DungeonCompletErays = ({ className }: { className?: string }) => {
  // Завантаження файлу Rive
  const { rive, RiveComponent } = useRive({
    src: `animation/dungeoncompleterays.riv`,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  return <RiveComponent className={className} />;
};
