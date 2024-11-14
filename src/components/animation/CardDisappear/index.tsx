import {
  Rive,
  Layout,
  Fit,
  Alignment,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";

export const CardDisappear = ({
  className,
  cardDisappearReady,
}: {
  className?: string;
  cardDisappearReady?: () => void;
}) => {
  const { rive, RiveComponent } = useRive({
    src: `/animation/carddisappear.riv`,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    onLoad: () => {
      if (cardDisappearReady) cardDisappearReady();
    },
  });



  return <RiveComponent className={className} />;
};
