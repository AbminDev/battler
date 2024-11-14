import {
  Rive,
  Layout,
  Fit,
  Alignment,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect } from "react";

export const CloudsAnimation = ({
  className,
  count,
  onCloudsReady,
}: {
  className?: string;
  count: number;
  onCloudsReady: () => void;
}) => {
  // Завантаження файлу Rive
  const { rive, RiveComponent } = useRive({
    src: `animation/cloudsbattler1.riv`,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    onLoad: () => {
      onCloudsReady();
    },
  });


  const cloudInput = useStateMachineInput(
    rive,
    "State Machine 1",
    "Clouds",
    count
  );
  useEffect(() => {
    if (cloudInput) {
      cloudInput.value = count;
    }
  }, [cloudInput, count]);



  return <RiveComponent className={className} />;
};
