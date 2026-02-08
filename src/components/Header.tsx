"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Briefcase, FileText, Menu, X } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { cn } from "@/lib/utils"
import Link from "next/link"

const navItems = [
  { name: 'Home', url: '#', icon: Home },
  { name: 'About', url: '#', icon: User },
  { name: 'Projects', url: '#', icon: Briefcase },
  { name: 'Resume', url: '#', icon: FileText }
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop NavBar - Tubelight version */}
      <div className="hidden md:block">
        <NavBar items={navItems} />
      </div>

      {/* Mobile Burger & Menu */}
      <div className="md:hidden">
        {/* Burger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-6 right-6 z-[60] p-4 rounded-full bg-lighter/50 border border-primary/30 backdrop-blur-xl text-primary shadow-2xl hover:bg-primary/10 transition-all active:scale-95"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-2xl flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full max-w-sm bg-lighter/20 border border-primary/20 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
              >
                {/* Glow Backgrounds mapped to brand palette */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]" />

                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-8 right-8 p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col gap-8 relative z-10 pt-4">
                  <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 font-title">Experience</div>
                  {navItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.url}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-center gap-6 text-3xl font-bold font-title text-heading-color hover:text-primary transition-all uppercase tracking-tight"
                        >
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all">
                            <Icon size={28} className="text-secondary group-hover:text-primary transition-colors" />
                          </div>
                          {item.name}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 text-center">
                  <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase font-bold">© 2026 Creative Portfolio</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
