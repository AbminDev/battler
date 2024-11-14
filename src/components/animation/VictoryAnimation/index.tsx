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

export const VictoryAnimation = ({
  className,
  coinNum,
  expBarNum,
  lvlNum,
}: {
  className?: string;
  coinNum: number;
  expBarNum: number;
  lvlNum: number;
}) => {
  const { playSound, pausedMusic } = useSoundService();
  // Завантаження файлу Rive
  const { rive, RiveComponent } = useRive({
    src: `animation/victory.riv`,
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
      pausedMusic();
      playSound('victory');
      rive.setTextRunValue("CoinNum", `+${coinNum}`);
      rive.setTextRunValue("ExpBarNum", `1/5`);
      rive.setTextRunValue("LvlNum", `${lvlNum}`);
    }
  }, [rive]);



  return <RiveComponent className={className} />;
};
