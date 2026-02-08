'use client';

import React from "react";
import NeuralBackground from "@/components/ui/flow-field-background";
import { WavePath } from "@/components/ui/wave-path";
import { motion } from "framer-motion";
import Image from "next/image";

export default function NeuralHeroDemo() {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-background">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <NeuralBackground
                    color="#A855F7"
                    trailOpacity={0.15}
                    speed={0.8}
                    particleCount={500}
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">

                {/* Top Identity Header */}
                <div className="absolute top-[15vh] flex flex-col items-center w-full px-6 pointer-events-auto">
                    <div className="flex items-center gap-6 md:gap-12 text-white/90">
                        <span className="text-6xl md:text-8xl font-extralight text-primary/30 select-none">(</span>
                        <div className="flex flex-col items-center text-center">
                            <p className="text-[10px] uppercase tracking-[0.6em] text-primary font-black mb-3">Identity</p>
                            <p className="text-xl md:text-3xl font-medium font-sans leading-tight text-white max-w-xl">
                                I'm <span className="text-primary">Hanzala</span>, a fullstack Saas product developer
                            </p>
                        </div>
                        <span className="text-6xl md:text-8xl font-extralight text-primary/30 select-none">)</span>
                    </div>
                </div>

                {/* Main Hero Branding */}
                <div className="flex items-center justify-center gap-4 md:gap-12 w-full px-4 mt-[10vh]">
                    <h1 className="text-5xl md:text-[10vw] font-bold font-title uppercase tracking-tighter text-white z-20">
                        Creative
                    </h1>

                    {/* Central Image - Static Version */}
                    <div className="relative w-[180px] h-[120px] md:w-[450px] md:h-[320px] overflow-hidden rounded-[32px] z-10 flex-shrink-0 shadow-[0_0_50px_rgba(168,85,247,0.2)] border border-white/10 pointer-events-auto">
                        <Image
                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"
                            alt="Modern Developer Setup"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                    </div>

                    <h1 className="text-5xl md:text-[10vw] font-bold font-title uppercase tracking-tighter text-white z-20">
                        dev
                    </h1>
                </div>

                {/* WavePath - Artistic Divider */}
                <div className="absolute bottom-[10vh] flex flex-col items-center w-full pointer-events-auto">
                    <WavePath className="text-primary/20 hover:text-primary transition-all duration-500 opacity-60" />
                </div>
            </div>

            {/* Bottom Shade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        </div>
    );
}
