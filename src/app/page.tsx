'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import PhysicsGallery from '@/components/PhysicsGallery';
import PortfolioList from '@/components/PortfolioList';
import { ZoomParallax } from '@/components/ZoomParallax';
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
    { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&q=80', alt: 'City' },
    { src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1280&q=80', alt: 'Abstract' },
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&q=80', alt: 'Mountain' },
    { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&q=80', alt: 'Design' },
    { src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&q=80', alt: 'Ocean' },
    { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&q=80', alt: 'Forest' },
  ];

  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      <Header />
      <PhysicsGallery />
      
      {/* About Section with Zoom Parallax */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '2px', color: '#666', textTransform: 'uppercase' }}>
            About Our Vision
          </h2>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, marginTop: '20px' }}>
            We zoom into the details <br /> that matter most.
          </h1>
        </div>
        <ZoomParallax images={parallaxImages} />
      </section>

      <PortfolioList />
      <footer style={{
        padding: '40px',
        textAlign: 'center',
        background: '#f9f9f9',
        borderTop: '1px solid #eee'
      }}>
        <p style={{ fontSize: '14px', color: '#666' }}>
          © 2026 Creative Monster Agency. Inspired by Wildish & Co.
        </p>
      </footer>
    </main>
  );
}
