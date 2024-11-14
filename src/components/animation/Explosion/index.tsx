// App.tsx
import React, { useEffect, useRef, useState } from "react";
import { Container, Sprite, Stage } from "@pixi/react";
// Explosion.tsx
import { Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import { useWindowSize } from "../CloudAnimation";

interface ExplosionData {
  x: number;
  y: number;
}
export const Explosions: React.FC = () => {
    const size = useWindowSize();
    const [explosions, setExplosions] = useState<ExplosionData[]>([]);
  
    // Функція для створення рівномірних позицій по сітці
    const generateGridPositions = (rows: number, cols: number): ExplosionData[] => {
      const positions: ExplosionData[] = [];
      const padding = 100; // Відступи від країв екрану
      const availableWidth = size.width - 2 * padding /2;
      const availableHeight = size.height - 2 * padding /2;
  
      for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
          // Для 5 вибухів можна використати 2 рядки та 3 стовпці
          if (positions.length < 1) {
            const x = padding + (availableWidth / (cols + 1)) * col;
            const y = padding + (availableHeight / (rows + 1)) * row;
            positions.push({ x, y });
          }
        }
      }
  
      return positions;
    };
  
    useEffect(() => {
      // Створюємо 5 вибухів рівномірно по сітці (2 рядки і 3 стовпці)
      const gridPositions = generateGridPositions(2, 3);
      setExplosions(gridPositions);
    }, [size.width, size.height]);
  
    // Опціонально: Додавання нових вибухів через інтервал
    useEffect(() => {
      const interval = setInterval(() => {
        const gridPositions = generateGridPositions(2, 3);
        setExplosions(gridPositions);
      }, 10000); // Новий вибух кожні 10 секунд
  
      return () => clearInterval(interval);
    }, [size.width, size.height]);
  
    const handleExplosionComplete = (index: number) => {
      setExplosions((prev) => prev.filter((_, i) => i !== index));
    };
  
    return (
      <Stage
        width={size.width}
        height={size.height}
        options={{
            backgroundAlpha: 0, // Прозорий фон
            resizeTo: window, // Автоматичне підлаштування під розмір вікна
            resolution: 1, // Встановлюємо резолюцію 1
        }}
      >
        <Container
          interactive={false} // Вимикаємо інтерактивність
          width={size.width}
          height={size.height}
        >
          {explosions.map((explosion, index) => (
            <Explosion
              key={index}
              x={explosion.x}
              y={explosion.y}
              onComplete={() => handleExplosionComplete(index)}
            />
          ))}
        </Container>
      </Stage>
    );
  };
// export const Explosions: React.FC = () => {
//   const size = useWindowSize();
//   const [explosions, setExplosions] = useState<ExplosionData[]>([]);

//   // Функція для створення рівномірних позицій по сітці
//   const generateGridPositions = (
//     rows: number,
//     cols: number
//   ): ExplosionData[] => {
//     const positions: ExplosionData[] = [];
//     const padding = 50; // Відступи від країв екрану
//     const availableWidth = size.width - 2 * padding;
//     const availableHeight = size.height - 2 * padding;

//     for (let row = 1; row <= rows; row++) {
//       for (let col = 1; col <= cols; col++) {
//         // Для 5 вибухів можна використати 2 рядки та 3 стовпці
//         if (positions.length < 5) {
//           const x = padding + (availableWidth / (cols + 1)) * col;
//           const y = padding + (availableHeight / (rows + 1)) * row;
//           positions.push({ x, y });
//         }
//       }
//     }

//     return positions;
//   };

//   useEffect(() => {
//     // Створюємо 5 вибухів рівномірно по сітці (наприклад, 2 рядки і 3 стовпці)
//     const gridPositions = generateGridPositions(2, 3);
//     setExplosions(gridPositions);
//   }, [size.width, size.height]);

//   const handleExplosionComplete = (index: number) => {
//     setExplosions((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <Stage
//       width={size.width}
//       height={size.height}
//       options={{
//         backgroundAlpha: 0, // Прозорий фон
//         resizeTo: window, // Автоматичне підлаштування під розмір вікна
//         resolution: 1, // Встановлюємо резолюцію 1
//       }}
//     >
//       <Container
//         interactive={false} // Вимикаємо інтерактивність, оскільки вибухи генеруються автоматично
//         width={size.width}
//         height={size.height}
//       >
//         {explosions.map((explosion, index) => (
//           <Explosion
//             key={index}
//             x={explosion.x}
//             y={explosion.y}
//             onComplete={() => handleExplosionComplete(index)}
//           />
//         ))}
//       </Container>
//     </Stage>
//   );
// };

interface ExplosionProps {
  x: number;
  y: number;
  onComplete: () => void;
}

interface Particle {
  velocity: { x: number; y: number };
  life: number;
  alpha: number;
  x: number;
  y: number;
}

interface ExplosionProps {
  x: number;
  y: number;
  onComplete: () => void;
}

interface Particle {
  texture: PIXI.Texture;
  velocity: { x: number; y: number };
  life: number;
  alpha: number;
  scale: number;
}

export const Explosion: React.FC<ExplosionProps> = ({ x, y, onComplete }) => {
  const particlesRef = useRef<Particle[]>([]);
  const containerRef = useRef<PIXI.Container | null>(null);

  useEffect(() => {
    // Завантаження текстур
    const explosionTextures = [
    //   PIXI.Texture.from(require('../../../assets/images/explosion.png')), // Замініть на ваші текстури
      PIXI.Texture.from(require('../../../assets/images/pngegg (2).png')), // Замініть на ваші текстури
    //   PIXI.Texture.from(require('../../../assets/images/pngegg (1).png')), // Замініть на ваші текстури
      // Додайте більше текстур за потребою
    ];

    const particles: Particle[] = [];
    const numParticles = 5; // Зменшимо кількість для кращої продуктивності

    for (let i = 0; i < numParticles; i++) {
      const texture =
        explosionTextures[Math.floor(Math.random() * explosionTextures.length)];
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      };
      const life = Math.random() * 60 + 60; // Кількість кадрів
      const scale = Math.random() * 0.5 + 0.5; // Різні розміри
      particles.push({
        texture,
        velocity,
        life,
        alpha: 1,
        scale,
        x: 0,
        y: 0,
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const ticker = PIXI.Ticker.shared;
    const update = () => {
      let allDead = true;

      particlesRef.current.forEach((particle) => {
        if (particle.life > 0) {
          particle.x += particle.velocity.x;
          particle.y += particle.velocity.y;
          particle.life -= 1;
          particle.alpha = particle.life / 120; // Зменшуємо прозорість
          particle.scale *= 0.98; // Зменшуємо масштаб для розсіювання

          if (particle.life > 0) allDead = false;
        }
      });

      if (containerRef.current) {
        containerRef.current.children.forEach((child, index) => {
          const sprite = child as PIXI.Sprite;
          const particle = particlesRef.current[index];
          if (sprite && particle.life > 0) {
            sprite.x = particle.x;
            sprite.y = particle.y;
            sprite.alpha = particle.alpha;
            sprite.scale.set(particle.scale);
          }
        });
      }

      if (allDead) {
        ticker.remove(update);
        onComplete();
      }
    };

    ticker.add(update);

    return () => {
      ticker.remove(update);
    };
  }, [onComplete]);

  return (
    <Container ref={containerRef} x={x} y={y}>
      {particlesRef.current.map((particle, index) => (
        <Sprite
          key={index}
          texture={particle.texture}
          anchor={0.5}
          x={particle.x}
          y={particle.y}
          alpha={particle.alpha}
          scale={particle.scale}
        />
      ))}
    </Container>
  );
};
