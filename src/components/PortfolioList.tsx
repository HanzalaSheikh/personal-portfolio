'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  images: string[];
}

const PROJECTS: Project[] = [
  { id: '1', title: 'DIGITAL INNOVATION', images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80'] },
  { id: '2', title: 'BRAND EVOLUTION', images: ['https://images.unsplash.com/photo-1634942537034-22165fb0afac?w=800&q=80', 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80'] },
  { id: '3', title: 'USER EXPERIENCE', images: ['https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?w=800&q=80', 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80'] },
  { id: '4', title: 'FUTURE TECH', images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80'] },
];

export default function PortfolioList() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      className="py-32 px-12 bg-[#020617] relative select-none"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto border-t border-white/5">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => setActiveProject(project)}
            onMouseLeave={() => setActiveProject(null)}
            className="group py-16 border-b border-white/5 relative flex items-center cursor-pointer transition-all duration-500"
          >
            <span className="text-4xl font-title text-primary/40 mr-12 transition-all group-hover:text-primary group-hover:translate-x-2">→</span>
            <h2
              className={cn(
                "text-[clamp(40px,8vw,100px)] font-bold font-title leading-[0.85] tracking-tighter uppercase transition-all duration-700",
                activeProject && activeProject.id !== project.id ? "text-white/10 blur-[2px]" : "text-white group-hover:text-primary"
              )}
            >
              {project.title}
            </h2>

            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-secondary font-title font-medium tracking-[0.2em] text-xs uppercase">View Case Study</span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Images Preview */}
      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                x: springX,
                y: springY,
                translateX: '-130%',
                translateY: '-60%',
                width: '380px',
                height: '240px',
                zIndex: 60,
                pointerEvents: 'none',
              }}
              initial={{ scale: 0.8, opacity: 0, rotate: -15, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, rotate: -6, filter: 'blur(0px)' }}
              exit={{ scale: 0.8, opacity: 0, rotate: -10, filter: 'blur(20px)' }}
            >
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-primary/20 backdrop-blur-sm">
                <Image src={activeProject.images[0]} alt="" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </motion.div>

            <motion.div
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                x: springX,
                y: springY,
                translateX: '30%',
                translateY: '-30%',
                width: '260px',
                height: '360px',
                zIndex: 59,
                pointerEvents: 'none',
              }}
              initial={{ scale: 0.8, opacity: 0, rotate: 15, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, rotate: 4, filter: 'blur(0px)' }}
              exit={{ scale: 0.8, opacity: 0, rotate: 10, filter: 'blur(20px)' }}
            >
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-secondary/20 backdrop-blur-sm">
                <Image src={activeProject.images[1]} alt="" fill className="object-cover" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
