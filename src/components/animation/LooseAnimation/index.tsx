import {
  Rive,
  Layout,
  Fit,
  Alignment,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect } from "react";
import {useSoundService} from "../../../utils/soundService";

export const LooseAnimation = ({
  className,
  expBarNum,
  lvlNum,
}: {
  className?: string;
  expBarNum: number;
  lvlNum: number;
}) => {
  // Завантаження файлу Rive
  const { playSound, pausedMusic } = useSoundService();
  const { rive, RiveComponent } = useRive({
    src: `animation/loose.riv`,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  const expBarInput = useStateMachineInput(
    rive,
    "State Machine 1",
    "NumExp",
    expBarNum
  );

  useEffect(() => {
    if (expBarInput) {
      expBarInput.value = expBarNum;
    }
  }, [expBarNum]);

  useEffect(() => {
    if (rive) {
      pausedMusic()
      playSound('defeat');
      rive.setTextRunValue("ExpBarNum", `1/5`);
      rive.setTextRunValue("LvlNum", `${lvlNum}`);
      rive.setTextRunValue("DefeatText", `You fought valiantly, but the dungeon still holds its secrets...`);
    }
  }, [rive]);



  return <RiveComponent className={className} />;
};
