import {
  Layout,
  Fit,
  Alignment,
  useRive,
} from "@rive-app/react-canvas";

export const Startbattle = ({
  className,
}: {
  className?: string;
}) => {
  // Завантаження файлу Rive
  const { rive, RiveComponent } = useRive({
    src: `animation/startbattledungeon.riv`,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });



  return <RiveComponent className={className} />;
};
