import {
  Rive,
  Layout,
  Fit,
  Alignment,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect, useState } from "react";

function lerp(a: number, b: number, alpha: number, threshold: number = 0.5) {
  if (Math.abs(b - a) < threshold) {
    return b;
  }
  return a + alpha * (b - a);
}

const calculatePercentage = (current: number, max: number) => {
  if (max === 0) {
    return 0; // Уникаємо ділення на нуль
  }
  return (current / max) * 100;
};

export const HpBarAnimation = ({
  className,
  currentHp,
  maxHp,
}: {
  className?: string;
  currentHp: number;
  maxHp: number;
}) => {
  if (currentHp < 0) currentHp = 0;

  const { rive, RiveComponent } = useRive({
    src: `animation/hpbar.riv`,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  const percentage = calculatePercentage(currentHp, maxHp);

  const NumHealth = useStateMachineInput(
    rive,
    "State Machine 1",
    "NumHealth",
    percentage
  );

  const YellowBar = useStateMachineInput(
    rive,
    "State Machine 1",
    "YellowBar",
    percentage
  );

  const [currentYellowBar, setCurrentYellowBar] = useState(percentage);

  useEffect(() => {
    if (NumHealth && YellowBar) {
      NumHealth.value = percentage;

      let start: number | null = null;
      const duration = 200; // Тривалість анімації в мілісекундах

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;

        // Обчислення альфа-значення на основі часу, що пройшов
        const alpha = Math.min(elapsed / duration, 1);

        // Лінійна інтерполяція значення YellowBar
        const newYellowValue = lerp(currentYellowBar, percentage, alpha);

        // Оновлення стану
        setCurrentYellowBar(newYellowValue);

        // Встановлення значення YellowBar
        YellowBar.value = newYellowValue;

        // Продовження анімації, якщо вона не завершена
        if (elapsed < duration) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [percentage, NumHealth, YellowBar, currentYellowBar]);


  useEffect(() => {
    if (rive) {

      rive.setTextRunValue("Hp", `${currentHp}/${maxHp}`);

    }
  }, [rive, currentHp, maxHp]);

  return <RiveComponent className={className} />;
};
