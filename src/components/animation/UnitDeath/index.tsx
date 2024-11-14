import {
  Rive,
  Layout,
  Fit,
  Alignment,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect } from "react";

export const UnitDeath = ({
  fileName,
  className,
  triggerHit,
}: {
  fileName: string;
  className?: string;
  triggerHit?: boolean;
}) => {
  // Завантаження файлу Rive
  const { rive, RiveComponent } = useRive({
    src: `animation/${fileName}`,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });


  const hitInput = useStateMachineInput(rive, "State Machine 1", "OnHit");

  useEffect(() => {
    if (triggerHit && hitInput) {
      hitInput.fire();
    }
  }, [triggerHit, hitInput]);

  return <RiveComponent className={className} />;
};
