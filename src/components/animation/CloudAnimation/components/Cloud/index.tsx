// src/components/Cloud.tsx
import { Sprite, useTick } from "@pixi/react";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { CloudType } from "../..";


interface CloudProps extends CloudType {
  setClouds: React.Dispatch<React.SetStateAction<CloudType[]>>;
  screenWidth: number;
}

export const Cloud: React.FC<CloudProps> = ({
  id,
  texture,
  speed,
  x,
  y,
  scale,
  setClouds,
  screenWidth,
}) => {
  const spriteRef = useRef<any>(null);

  useEffect(() => {
    if (spriteRef.current) {
      // Плавне появлення хмари
      gsap.to(spriteRef.current, {
        alpha: 1,
        duration: 2, // Тривалість появи
        ease: "power1.inOut",
      });
    }
  }, []);

  useTick(() => {
    if (spriteRef.current) {
      // Рух хмари вправо
      spriteRef.current.x += speed;

      // Якщо хмара виходить за межі екрану, видаляємо її
      if (spriteRef.current.x > screenWidth + texture.width) {
        setClouds((prev) => prev.filter((cloud) => cloud.id !== id));
      }
    }
  });

  return (
    <Sprite
      texture={texture}
      x={x}
      y={y}
      scale={scale}
      ref={spriteRef}
      anchor={0.5} // Центруємо спрайт
      alpha={0} // Початкова прозорість
    />
  );
};

export default Cloud;
