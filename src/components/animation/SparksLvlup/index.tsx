import { Layout, Fit, Alignment, useRive } from "@rive-app/react-canvas";

export const SparksLvlup = ({ className }: { className?: string }) => {
  // Завантаження файлу Rive
  const { rive, RiveComponent } = useRive({
    src: `animation/sparksLvlup.riv`,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });



  return <RiveComponent className={className} />;
};
