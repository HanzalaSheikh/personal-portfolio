'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import PhysicsGallery from '@/components/PhysicsGallery';
import PortfolioList from '@/components/PortfolioList';
import { ZoomParallax } from '@/components/ZoomParallax';
import NeuralHeroDemo from '@/components/NeuralHeroDemo';
import { HoverPreview } from '@/components/ui/hover-preview';
import { ExpandOnHover } from '@/components/ui/expand-cards';
import { ContactCard } from '@/components/ui/contact-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
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
    { title: "Ethereal Glow", src: "https://assets.codepen.io/7558/orange-portrait-001.jpg", alt: 'Ethereal Glow' },
    { title: "Rose Mirage", src: "https://assets.codepen.io/7558/orange-portrait-002.jpg", alt: 'Rose Mirage' },
    { title: "Velvet Mystique", src: "https://assets.codepen.io/7558/orange-portrait-003.jpg", alt: 'Velvet Mystique' },
    { title: "Golden Hour", src: "https://assets.codepen.io/7558/orange-portrait-004.jpg", alt: 'Golden Hour' },
    { title: "Midnight Dreams", src: "https://assets.codepen.io/7558/orange-portrait-005.jpg", alt: 'Midnight Dreams' },
    { title: "Silver Light", src: "https://assets.codepen.io/7558/orange-portrait-006.jpg", alt: 'Silver Light' },
  ];

  return (
    <main className="bg-background min-h-screen">
      <Header />

      {/* Hero Section */}
      <NeuralHeroDemo />

      {/* Interactive About Section */}
      <HoverPreview />

      {/* Expandable Cards Section */}
      <ExpandOnHover />

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

      {/* Portfolio projects are now integrated within ZoomParallax */}

      <section className="mt-32">
        <PhysicsGallery />
      </section>

      {/* Contact Section */}
      <section className="py-32 px-4 bg-background relative z-20">
        <div className="mx-auto max-w-5xl">
          <ContactCard
            title="Get in touch"
            description="If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day."
            contactInfo={[
              {
                icon: MailIcon,
                label: 'Email',
                value: 'contact@21st.dev',
              },
              {
                icon: PhoneIcon,
                label: 'Phone',
                value: '+92 312 1234567',
              },
              {
                icon: MapPinIcon,
                label: 'Address',
                value: 'Faisalabad, Pakistan',
                className: 'col-span-2',
              }
            ]}
          >
            <form action="" className="w-full space-y-4">
              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Name</Label>
                <Input type="text" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Email</Label>
                <Input type="email" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Phone</Label>
                <Input type="phone" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Message</Label>
                <Textarea className="bg-white/5 border-white/10 text-white min-h-[120px]" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl" type="button">
                Submit
              </Button>
            </form>
          </ContactCard>
        </div>
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
