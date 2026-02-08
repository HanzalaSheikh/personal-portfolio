'use client';

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface ImageItem {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images: ImageItem[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales: MotionValue<number>[] = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  const getChildStyles = (index: number) => {
    switch (index) {
      case 1:
        return { top: '-30vh', left: '5vw', height: '30vh', width: '35vw' };
      case 2:
        return { top: '-10vh', left: '-25vw', height: '45vh', width: '20vw' };
      case 3:
        return { left: '27.5vw', height: '25vh', width: '25vw' };
      case 4:
        return { top: '27.5vh', left: '5vw', height: '25vh', width: '20vw' };
      case 5:
        return { top: '27.5vh', left: '-22.5vw', height: '25vh', width: '30vw' };
      case 6:
        return { top: '22.5vh', left: '25vw', height: '15vh', width: '15vw' };
      default:
        return { height: '25vh', width: '25vw' };
    }
  };

  return (
    <div ref={container} className="relative h-[300vh] bg-[#020617]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];
          const childSpecificStyles = getChildStyles(index);

          return (
            <motion.div
              key={index}
              style={{
                scale,
                position: 'absolute',
                top: 0,
                display: 'flex',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: index === 0 ? 10 : 1,
              }}
            >
              <div
                className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-lighter shadow-black/50"
                style={{
                  ...childSpecificStyles,
                }}
              >
                <img
                  src={src || '/placeholder.svg'}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
