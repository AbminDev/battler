import {
  Rive,
  Layout,
  Fit,
  Alignment,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect } from "react";

const calculatePercentage = (current: number, max: number) => {
  if (max === 0) {
    return 0; // Уникаємо ділення на нуль
  }
  return (current / max) * 100;
};

export const ManaBarAnimation = ({
  className,
  currentMana,
  maxMana,
}: {
  className?: string;
  currentMana: number;
  maxMana: number;
}) => {
  const { rive, RiveComponent } = useRive({
    src: `animation/manabar.riv`,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });
  const percentage = calculatePercentage(currentMana, maxMana);


  const NumMana = useStateMachineInput(
    rive,
    "State Machine 1",
    "NumMana",
    percentage
  );

  useEffect(() => {
    if (NumMana) {
      NumMana.value = percentage;
    }
  }, [NumMana, percentage]);

  return <RiveComponent className={className} />;
};
