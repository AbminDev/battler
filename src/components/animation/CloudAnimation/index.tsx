// CloudAnimation.tsx
import React, { useEffect, useRef, useState } from "react"; 
import { Container, Graphics, Stage } from "@pixi/react";
import * as PIXI from "pixi.js";
import { Cloud } from "./components"; // Переконайтесь, що шлях правильний

export interface BuildingMask {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CloudType {
  id: number;
  texture: PIXI.Texture;
  speed: number;
  x: number;
  y: number;
  scale: number;
  alpha: number;
}

interface CloudAnimationProps {
  buildingMasks: BuildingMask[];
}

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

// Визначаємо кілька текстур хмар для різноманіття
const CLOUD_TEXTURES = [
  PIXI.Texture.from(require("../../../assets/images/cloud.png")),
  // Додайте інші текстури за потребою
];

// Встановлюємо базові відступи для кожного шару
const BASE_Y_OFFSET = {
  back: 0.1, // 10% від висоти екрану
  middle: 0.25, // 25% від висоти екрану
  front: 0.45, // 45% від висоти екрану
};

// Додаємо верхній і нижній відступи
const TOP_MARGIN = 40; // Відступ зверху в пікселях
const BOTTOM_MARGIN = 20; // Відступ знизу в пікселях

export const CloudAnimation: React.FC<CloudAnimationProps> = ({
  buildingMasks,
}) => {
  const size = useWindowSize();

  // Визначаємо висоту Stage
  const stageHeight = size.height;

  const [cloudTextures] = useState(CLOUD_TEXTURES);

  const [frontClouds, setFrontClouds] = useState<CloudType[]>([]);
  const [middleClouds, setMiddleClouds] = useState<CloudType[]>([]);
  const [backClouds, setBackClouds] = useState<CloudType[]>([]);

  useEffect(() => {
    if (cloudTextures.length === 0) return;

    // Зменшуємо швидкість хмар (наприклад, до 0.8 замість 2)
    const SPEED_MULTIPLIER = 0.8;

    // Частота появи хмар (наприклад, кожні 4000 мс)
    const CLOUD_INTERVAL = 4000;

    // Функція для генерації випадкової хмари
    const generateRandomCloud = (
      speed: number,
      scaleRange: { min: number; max: number },
      baseYOffset: number,
      alpha: number,
      gridX: number,
      isInitial: boolean = false // Новий параметр
    ): CloudType => {
      const texture =
        cloudTextures[Math.floor(Math.random() * cloudTextures.length)];
      const gridWidth = size.width / gridX;
      const x = isInitial
        ? gridWidth * Math.floor(Math.random() * gridX) // Хмара на екрані
        : -texture.width + gridWidth * Math.floor(Math.random() * gridX); // Хмара поза екраном

      const yMin = TOP_MARGIN + stageHeight * baseYOffset;
      const yMax = stageHeight - BOTTOM_MARGIN;
      const yRange = yMax - yMin;

      // Використовуємо зміщений розподіл для y, щоб хмари частіше з'являлися зверху
      const yRandom = Math.random() ** 2; // Квадрат випадкового числа для зміщення до верху
      const y = yRandom * yRange + yMin;

      const scale =
        Math.random() * (scaleRange.max - scaleRange.min) + scaleRange.min;
      return {
        id: Date.now() + Math.random(),
        texture,
        speed: speed * SPEED_MULTIPLIER, // Зменшена швидкість
        x,
        y,
        scale,
        alpha,
      };
    };

    // Функція для додавання хмари до певного шару
    const addCloud = (
      setClouds: React.Dispatch<React.SetStateAction<CloudType[]>>,
      speed: number,
      scaleRange: { min: number; max: number },
      baseYOffset: number,
      alpha: number,
      gridX: number
    ) => {
      const newCloud = generateRandomCloud(
        speed,
        scaleRange,
        baseYOffset,
        alpha,
        gridX
        // isInitial залишаємо за замовчуванням false
      );
      setClouds((prev) => [...prev, newCloud]);
    };

    // Збільшення кількості початкових хмар шляхом зменшення знаменника
    // Наприклад, замість 300px на хмару, використовуємо 150px
    const initialBackClouds = Array.from(
      { length: Math.floor(size.width / 150) }, // Збільшено кількість хмар
      () =>
        generateRandomCloud(
          1,
          {
            min: 0.6,
            max: 0.8,
          },
          BASE_Y_OFFSET.back,
          0.5,
          5, // Наприклад, 5 колонок
          true // Хмара на екрані
        )
    );

    const initialMiddleClouds = Array.from(
      { length: Math.floor(size.width / 200) }, // Збільшено кількість хмар
      () =>
        generateRandomCloud(
          1,
          {
            min: 0.7,
            max: 0.9,
          },
          BASE_Y_OFFSET.middle,
          0.6,
          4, // Наприклад, 4 колонки
          true // Хмара на екрані
        )
    );

    const initialFrontClouds = Array.from(
      { length: Math.floor(size.width / 250) }, // Збільшено кількість хмар
      () =>
        generateRandomCloud(
          1,
          {
            min: 0.8,
            max: 1.0,
          },
          BASE_Y_OFFSET.front,
          0.7,
          3, // Наприклад, 3 колонки
          true // Хмара на екрані
        )
    );

    setBackClouds(initialBackClouds);
    setMiddleClouds(initialMiddleClouds);
    setFrontClouds(initialFrontClouds);

    // Однаковий інтервал для додавання хмар у всі шари
    const cloudInterval = setInterval(() => {
      // Додаємо хмару до переднього шару
      addCloud(
        setFrontClouds,
        1,
        {
          min: 0.8,
          max: 1.0,
        },
        BASE_Y_OFFSET.front,
        0.7,
        3
      );

      // Додаємо хмару до середнього шару
      addCloud(
        setMiddleClouds,
        1,
        {
          min: 0.7,
          max: 0.9,
        },
        BASE_Y_OFFSET.middle,
        0.6,
        4
      );

      // Додаємо хмару до заднього шару
      addCloud(
        setBackClouds,
        1,
        {
          min: 0.6,
          max: 0.8,
        },
        BASE_Y_OFFSET.back,
        0.5,
        5
      );
    }, CLOUD_INTERVAL);

    // Очистка інтервалів при розмонтуванні компонента
    return () => {
      clearInterval(cloudInterval);
    };
  }, [cloudTextures, size.height, size.width, stageHeight]);

  const maskRef = useRef<PIXI.Graphics>(null);

  return (
    <Stage
      width={size.width}
      height={stageHeight}
      options={{
        backgroundAlpha: 0, // Прозорий фон
        resizeTo: window, // Автоматичне підлаштування під розмір вікна
        resolution: 1,
      }}
    >
      {/* Маска */}
      <Graphics
        ref={maskRef}
        draw={(g) => {
          g.clear();
          g.beginFill(0xffffff);
          g.drawRect(0, 0, size.width, stageHeight);
          g.endFill();
        }}
        interactive={false}
      />

      {/* Контейнер з хмарами, на який накладається маска */}
      {maskRef.current && (
        <Container mask={maskRef.current}>
          {/* Задній шар хмар */}
          {backClouds.map((cloud) => (
            <Cloud
              key={`back-${cloud.id}`}
              {...cloud}
              setClouds={setBackClouds}
              screenWidth={size.width}
            />
          ))}

          {/* Середній шар хмар */}
          {middleClouds.map((cloud) => (
            <Cloud
              key={`middle-${cloud.id}`}
              {...cloud}
              setClouds={setMiddleClouds}
              screenWidth={size.width}
            />
          ))}

          {/* Передній шар хмар */}
          {frontClouds.map((cloud) => (
            <Cloud
              key={`front-${cloud.id}`}
              {...cloud}
              setClouds={setFrontClouds}
              screenWidth={size.width}
            />
          ))}
        </Container>
      )}
    </Stage>
  );
};
