import {
  Rive,
  Layout,
  Fit,
  Alignment,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect } from "react";

export const UnitAnimation = ({
  fileName,
  className,
  triggerHit,
  triggerAttack,
}: {
  fileName: string;
  className?: string;
  triggerHit?: boolean;
  triggerAttack?: boolean;
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
  
  const attackInput = useStateMachineInput(rive, "State Machine 1", "Attack");

  useEffect(() => {
    if (triggerHit && hitInput) {
      hitInput.fire();
    }
  }, [triggerHit, hitInput]);

  useEffect(() => {
    if (triggerAttack && attackInput) {
      attackInput.fire();
    }
  }, [triggerAttack, attackInput]);

  return <RiveComponent className={className} />;
};
