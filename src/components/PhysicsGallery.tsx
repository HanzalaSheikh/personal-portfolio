'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface PhysicsItem {
  id: string;
  type: 'image' | 'text';
  content: string;
  width: number;
  height: number;
  gradient?: string;
  textColor?: string;
}

const ITEMS: PhysicsItem[] = [
  { id: '1', type: 'text', content: "BUILD", width: 200, height: 100, gradient: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)', textColor: '#fff' },
  { id: '2', type: 'image', content: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80', width: 240, height: 160 },
  { id: '3', type: 'text', content: "MILLION", width: 280, height: 120, gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)', textColor: '#fff' },
  { id: '4', type: 'text', content: "DOLLAR", width: 260, height: 110, gradient: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)', textColor: '#fff' },
  { id: '5', type: 'text', content: "PRODUCT", width: 290, height: 110, gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', textColor: '#fff' },
  { id: '6', type: 'image', content: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', width: 220, height: 300 },
  { id: '7', type: 'text', content: "SCALE", width: 200, height: 100, gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', textColor: '#fff' },
  { id: '8', type: 'text', content: "IMPACT", width: 240, height: 110, gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', textColor: '#fff' },
  { id: '9', type: 'text', content: "GROWTH", width: 250, height: 110, gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)', textColor: '#fff' },
  { id: '10', type: 'image', content: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80', width: 300, height: 200 },
  { id: '11', type: 'text', content: "SAAS", width: 180, height: 100, gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', textColor: '#fff' },
  { id: '12', type: 'text', content: "VISION", width: 220, height: 100, gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', textColor: '#fff' },
];

export default function PhysicsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [bodies, setBodies] = useState<Record<string, { x: number; y: number; angle: number }>>({});
  const bodiesMapRef = useRef<Record<string, Matter.Body>>({});
  const boundariesRef = useRef<{ ground: Matter.Body; left: Matter.Body; right: Matter.Body; top: Matter.Body } | null>(null);

  useEffect(() => {
    if (!containerRef.current || !isInView) return;

    const { Engine, Bodies, Composite, MouseConstraint, Mouse, Runner } = Matter;

    const engine = Engine.create();
    const world = engine.world;
    world.gravity.y = 1.3;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const wallThickness = 500;
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width + wallThickness * 2, wallThickness, { isStatic: true, restitution: 0.5 });
    const wallLeft = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height + wallThickness * 2, { isStatic: true, restitution: 0.5 });
    const wallRight = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height + wallThickness * 2, { isStatic: true, restitution: 0.5 });
    const ceiling = Bodies.rectangle(width / 2, -3000, width + wallThickness * 2, wallThickness, { isStatic: true, restitution: 0.5 });

    boundariesRef.current = { ground, left: wallLeft, right: wallRight, top: ceiling };
    Composite.add(world, [ground, wallLeft, wallRight, ceiling]);

    const matterBodies: Record<string, Matter.Body> = {};
    ITEMS.forEach((item, index) => {
      const xPos = width / 2 + (Math.random() - 0.5) * 150;
      const yPos = -200 - (index * 200);

      const body = Bodies.rectangle(
        xPos,
        yPos,
        item.width,
        item.height,
        {
          chamfer: { radius: 24 },
          restitution: 0.75,
          friction: 0.05,
          frictionAir: 0.012,
          density: 0.0012
        }
      );
      matterBodies[item.id] = body;
      Composite.add(world, body);
    });
    bodiesMapRef.current = matterBodies;

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(world, mouseConstraint);

    const runner = Runner.create();
    Runner.run(runner, engine);

    let animationId: number;
    const update = () => {
      const newBodies: Record<string, { x: number; y: number; angle: number }> = {};
      Object.entries(matterBodies).forEach(([id, body]) => {
        newBodies[id] = { x: body.position.x, y: body.position.y, angle: body.angle };
      });
      setBodies(newBodies);
      animationId = requestAnimationFrame(update);
    };
    update();

    const handleResize = () => {
      if (!containerRef.current || !boundariesRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      const { ground, left, right, top } = boundariesRef.current;
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
      Matter.Body.setPosition(left, { x: -wallThickness / 2, y: newHeight / 2 });
      Matter.Body.setPosition(right, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
      Matter.Body.setPosition(top, { x: newWidth / 2, y: -3000 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, [isInView]);

  const handleHover = (id: string) => {
    const body = bodiesMapRef.current[id];
    if (body) Matter.Body.applyForce(body, body.position, { x: (Math.random() - 0.5) * 0.1, y: -0.22 });
  };

  return (
    <div ref={containerRef} className="w-full h-[85vh] relative overflow-hidden bg-background border-t border-white/5">
      {ITEMS.map((item) => {
        const bodyState = bodies[item.id];
        if (!bodyState) return null;

        return (
          <motion.div
            key={item.id}
            onMouseEnter={() => handleHover(item.id)}
            style={{
              position: 'absolute',
              width: item.width,
              height: item.height,
              left: 0,
              top: 0,
              x: bodyState.x - item.width / 2,
              y: bodyState.y - item.height / 2,
              rotate: (bodyState.angle * 180) / Math.PI,
              cursor: 'grab',
              zIndex: 10,
              pointerEvents: 'auto'
            }}
          >
            {item.type === 'text' && (
              <div
                className="w-full h-full flex items-center justify-center p-4 rounded-[2rem] shadow-2xl font-black font-title uppercase select-none border border-white/10 text-center tracking-tighter"
                style={{
                  background: item.gradient,
                  color: item.textColor,
                  fontSize: item.width * 0.18
                }}
              >
                {item.content}
              </div>
            )}
            {item.type === 'image' && (
              <div className="w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-lighter relative">
                <Image src={item.content} alt="" fill className="object-cover" draggable={false} />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
