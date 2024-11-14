import {
    Rive,
    Layout,
    Fit,
    Alignment,
    useRive,
    useStateMachineInput,
    FileAsset,
    decodeImage,
    ImageAsset,
  } from "@rive-app/react-canvas";
  import { useEffect } from "react";
  
  export const PlayerGetHit = ({
    className,

  }: {
    className?: string;

  }) => {
    const { rive, RiveComponent } = useRive({
      src: "animation/playerhitvfx.riv",
      stateMachines: "State Machine 1",
      autoplay: true,
      layout: new Layout({
        fit: Fit.Contain,
        alignment: Alignment.Center,
      }),
    });

  

  
    return <RiveComponent className={className} />;
  };
  