'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import PhysicsGallery from '@/components/PhysicsGallery';
import PortfolioList from '@/components/PortfolioList';
import { ZoomParallax } from '@/components/ZoomParallax';
import NeuralHeroDemo from '@/components/NeuralHeroDemo';
import Lenis from 'lenis';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const parallaxImages = [
    { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&q=80', alt: 'Architecture' },
    { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&q=80', alt: 'Forest' },
    { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1280&q=80', alt: 'Tech' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&q=80', alt: 'Mountain' },
    { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&q=80', alt: 'Design' },
    { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&q=80', alt: 'Tech Sphere' },
    { src: 'https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?w=1280&q=80', alt: 'Industry' },
  ];

  return (
    <main className="bg-background min-h-screen">
      <Header />

      {/* Hero Section */}
      <NeuralHeroDemo />

      {/* About Section with Zoom Parallax */}
      <section className="py-32 bg-background relative z-20">
        <div className="text-center mb-24 max-w-4xl mx-auto px-4">
          <h2 className="text-xs font-black text-primary tracking-[0.4em] uppercase mb-4 font-title">
            Our Digital Vision
          </h2>
          <h1 className="text-5xl md:text-8xl font-bold font-title uppercase leading-[0.9] text-white">
            We zoom into the details <br /> <span className="text-secondary">that matter most.</span>
          </h1>
          <p className="mt-10 text-muted max-w-xl mx-auto text-lg leading-relaxed font-sans">
            Pioneering the next era of interaction through pixel-perfect precision and high-performance engineering.
          </p>
        </div>
        <ZoomParallax images={parallaxImages} />
      </section>

      {/* Projects List */}
      <PortfolioList />

      {/* Physics Playground (Footer area) */}
      <section className="mt-32">
        <PhysicsGallery />
      </section>

      {/* Final Footer */}
      <footer className="py-20 text-center bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="font-title text-2xl font-bold text-white mb-6 uppercase tracking-wider">Let's Create the Future</h3>
          <p className="text-muted text-sm font-medium tracking-widest uppercase mb-4">
            Based in the Digital Space
          </p>
          <p className="text-white/10 text-[10px] font-black tracking-[0.6em] uppercase">
            © 2026 Creative Intelligent Agency
          </p>
        </div>
      </footer>
    </main>
  );
}
