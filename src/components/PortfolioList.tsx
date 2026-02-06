'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  images: string[];
}

const PROJECTS: Project[] = [
  { id: '1', title: 'FROM DISCOVERY', images: ['/images/project1.png', '/images/bottle.png'] },
  { id: '2', title: 'TO STRATEGY', images: ['/images/project2.png', '/images/mascot.png'] },
  { id: '3', title: 'DESIGN + CONCEPTS', images: ['/images/app.png', '/images/project1.png'] },
  { id: '4', title: 'LAUNCH + IMPACT', images: ['/images/bottle.png', '/images/project2.png'] },
];

export default function PortfolioList() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the images
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      style={{ 
        padding: '100px 48px', 
        background: '#fff', 
        position: 'relative',
      }}
      onMouseMove={handleMouseMove}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => setActiveProject(project)}
            onMouseLeave={() => setActiveProject(null)}
            style={{
              padding: '60px 0',
              borderBottom: '1px solid #eee',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease'
            }}
          >
            <span style={{ fontSize: '32px', fontWeight: 'bold', marginRight: '40px' }}>→</span>
            <h2 style={{ 
              fontSize: 'clamp(50px, 10vw, 120px)', 
              fontWeight: 900, 
              lineHeight: 0.8,
              letterSpacing: '-4px',
              margin: 0,
              textTransform: 'uppercase',
              color: activeProject && activeProject.id !== project.id ? '#ddd' : '#000',
              transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
            }}>
              {project.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Floating Images */}
      {PROJECTS.map((project) => (
        <React.Fragment key={`images-${project.id}`}>
          {activeProject?.id === project.id && (
            <>
              {/* First Image - Left Side */}
              <motion.div
                style={{
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  x: springX,
                  y: springY,
                  translateX: '-140%', 
                  translateY: '-60%',
                  width: '320px',
                  height: '220px',
                  zIndex: 50,
                  pointerEvents: 'none',
                }}
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: -5 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <Image src={project.images[0]} alt="" fill style={{ objectFit: 'cover' }} />
                </div>
              </motion.div>

              {/* Second Image - Right Side - Smaller and Taller */}
              <motion.div
                style={{
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  x: springX,
                  y: springY,
                  translateX: '40%', 
                  translateY: '-40%',
                  width: '240px',
                  height: '320px',
                  zIndex: 49,
                  pointerEvents: 'none',
                }}
                initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
                animate={{ scale: 1, opacity: 1, rotate: 3 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <Image src={project.images[1]} alt="" fill style={{ objectFit: 'cover' }} />
                </div>
              </motion.div>
            </>
          )}
        </React.Fragment>
      ))}
    </section>
  );
}
