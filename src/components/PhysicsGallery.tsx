'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, useSpring } from 'framer-motion';
import Image from 'next/image';

interface PhysicsItem {
  id: string;
  type: 'image' | 'text' | 'shape';
  content: string;
  width: number;
  height: number;
  color?: string;
  rotation?: number;
  x?: number;
  y?: number;
}

const ITEMS: PhysicsItem[] = [
  { id: '1', type: 'text', content: "LET'S", width: 220, height: 100, color: '#000', x: 200, y: 100 },
  { id: '2', type: 'image', content: '/images/mascot.png', width: 200, height: 200, x: 400, y: 150 },
  { id: '3', type: 'text', content: "THINGS", width: 280, height: 100, color: '#FFEB3B', x: 300, y: 300 },
  { id: '4', type: 'image', content: '/images/bottle.png', width: 180, height: 250, x: 600, y: 100 },
  { id: '5', type: 'text', content: "SHAKE", width: 120, height: 300, color: '#FFEB3B', x: 750, y: 200 },
  { id: '6', type: 'image', content: '/images/app.png', width: 220, height: 350, x: 100, y: 400 },
  { id: '7', type: 'text', content: "UP", width: 180, height: 120, color: '#000', x: 850, y: 450 },
  { id: '8', type: 'text', content: "Wildish & Co. is an independent creative agency...", width: 300, height: 150, color: '#000', x: 500, y: 500, type: 'shape' },
];

export default function PhysicsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bodies, setBodies] = useState<Record<string, { x: number; y: number; angle: number }>>({});
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesMapRef = useRef<Record<string, Matter.Body>>({});

  useEffect(() => {
    if (!containerRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, MouseConstraint, Mouse, World } = Matter;

    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;
    world.gravity.y = 0.5; // Stronger gravity for "falling" feel

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Boundaries
    const ground = Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true });
    const wallLeft = Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true });
    const wallRight = Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, -100, width, 100, { isStatic: true });

    Composite.add(world, [ground, wallLeft, wallRight, ceiling]);

    // Mouse Collider Body
    const mouseBody = Bodies.circle(0, 0, 40, {
      isStatic: true,
      render: { visible: false },
    });
    Composite.add(world, mouseBody);

    // Items
    const matterBodies: Record<string, Matter.Body> = {};
    ITEMS.forEach((item) => {
      const body = Bodies.rectangle(
        item.x || Math.random() * width,
        item.y || -100,
        item.width,
        item.height,
        {
          chamfer: { radius: 10 },
          restitution: 0.5,
          friction: 0.1,
          angle: (Math.random() - 0.5) * 0.5,
        }
      );
      matterBodies[item.id] = body;
      Composite.add(world, body);
    });
    bodiesMapRef.current = matterBodies;

    // Mouse Interaction
    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(world, mouseConstraint);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // Sync loop
    let animationId: number;
    const update = () => {
      // Update mouse body position
      if (mouse.position.x) {
        Matter.Body.setPosition(mouseBody, {
          x: mouse.position.x,
          y: mouse.position.y
        });
      }

      const newBodies: Record<string, { x: number; y: number; angle: number }> = {};
      Object.entries(matterBodies).forEach(([id, body]) => {
        newBodies[id] = {
          x: body.position.x,
          y: body.position.y,
          angle: body.angle,
        };
      });
      setBodies(newBodies);
      animationId = requestAnimationFrame(update);
    };
    update();

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      // Update boundaries
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 });
      Matter.Body.setPosition(wallRight, { x: newWidth + 50, y: newHeight / 2 });
      // Note: ceiling and wallLeft are usually 0 or negative so they usually stay correct relative to top-left
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, []);

  const handleHover = (id: string) => {
    const body = bodiesMapRef.current[id];
    if (body) {
      Matter.Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.05,
        y: -0.1, // Small jump on hover
      });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: 'calc(100vh - 80px)',
        position: 'relative',
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      {ITEMS.map((item) => {
        const bodyState = bodies[item.id];
        if (!bodyState) return null;

        return (
          <motion.div
            key={item.id}
            onMouseEnter={() => handleHover(item.id)}
            whileHover={{ scale: 1.05 }}
            style={{
              position: 'absolute',
              width: item.width,
              height: item.height,
              left: 0,
              top: 0,
              x: bodyState.x - item.width / 2,
              y: bodyState.y - item.height / 2,
              rotate: (bodyState.angle * 180) / Math.PI,
              pointerEvents: 'auto',
              cursor: 'grab',
              zIndex: 10,
            }}
          >
            {item.type === 'text' && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: item.color,
                  color: item.color === '#000' ? '#fff' : '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: item.width * 0.2,
                  fontWeight: '900',
                  borderRadius: '12px',
                  userSelect: 'none',
                  padding: '10px',
                  textAlign: 'center',
                }}
              >
                {item.content}
              </div>
            )}
            {item.type === 'image' && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '2px solid #000',
                  background: '#f0f0f0',
                }}
              >
                <Image
                  src={item.content}
                  alt="Portfolio"
                  fill
                  style={{ objectFit: 'cover' }}
                  draggable={false}
                />
              </div>
            )}
            {item.type === 'shape' && (
               <div
               style={{
                 width: '100%',
                 height: '100%',
                 background: '#000',
                 color: '#fff',
                 padding: '24px',
                 borderRadius: '12px',
                 fontSize: '16px',
                 lineHeight: '1.4',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
               }}
             >
               <span style={{ color: '#FFEB3B', fontWeight: 'bold' }}>Wildish & Co.</span> {item.content.substring(13)}
             </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
