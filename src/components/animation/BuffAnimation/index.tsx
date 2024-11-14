import {
  Rive,
  Layout,
  Fit,
  Alignment,
  useRive,
} from "@rive-app/react-canvas";
import { useEffect } from "react";

export const BuffAnimation = ({ className }: { className?: string }) => {
  // Завантаження файлу Rive
  const { rive, RiveComponent } = useRive({
    src: `animation/statusvfx.riv`,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });



  return <RiveComponent className={className} />;
};
