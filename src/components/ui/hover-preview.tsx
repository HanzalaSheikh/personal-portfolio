"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"

const previewData = {
  midjourney: {
    image: "https://images.unsplash.com/photo-1695144244472-a4543101ef35?w=560&h=320&fit=crop",
    title: "Midjourney",
    subtitle: "Create stunning AI-generated artwork",
  },
  stable: {
    image: "https://images.unsplash.com/photo-1712002641088-9d76f9080889?w=560&h=320&fit=crop",
    title: "Stable Diffusion",
    subtitle: "Open-source generative AI model",
  },
  leonardo: {
    image: "https://images.unsplash.com/photo-1718241905696-cb34c2c07bed?w=560&h=320&fit=crop",
    title: "Leonardo AI",
    subtitle: "Production-ready creative assets",
  },
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Syne:wght@400;700;800&display=swap');

  .hover-preview-container {
    min-height: 80vh;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 40px;
    font-family: 'Space Grotesk', sans-serif;
    overflow-x: hidden;
    position: relative;
  }

  .hover-preview-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 5;
  }

  .ambient-glow {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%);
    pointer-events: none;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse-glow 8s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
  }

  .content-container {
    max-width: 900px;
    width: 100%;
    position: relative;
    z-index: 10;
  }

  .text-block {
    font-size: clamp(1.5rem, 4vw, 2.8rem);
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  .text-block p {
    margin-bottom: 1em;
  }

  .hover-link {
    color: #fff;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    cursor: pointer;
    position: relative;
    display: inline-block;
    transition: color 0.3s ease;
  }

  .hover-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-accent));
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .hover-link:hover::after {
    width: 100%;
  }

  .preview-card {
    position: fixed;
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform, opacity;
  }

  .preview-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .preview-card-inner {
    background: rgba(15, 23, 42, 0.8);
    border-radius: 20px;
    padding: 10px;
    box-shadow: 
      0 30px 60px -12px rgba(0, 0, 0, 0.9),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 0 40px rgba(168, 85, 247, 0.2);
    overflow: hidden;
    backdrop-filter: blur(20px);
  }

  .preview-card img {
    width: 320px;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
    display: block;
  }

  .preview-card-title {
    padding: 16px 8px 4px;
    font-size: 1rem;
    color: #fff;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .preview-card-subtitle {
    padding: 0 8px 12px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    font-family: 'Space Grotesk', sans-serif;
  }
`

const HoverLink = ({
  previewKey,
  children,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
}: {
  previewKey: string
  children: React.ReactNode
  onHoverStart: (key: string, e: React.MouseEvent) => void
  onHoverMove: (e: React.MouseEvent) => void
  onHoverEnd: () => void
}) => {
  return (
    <span
      className="hover-link"
      onMouseEnter={(e) => onHoverStart(previewKey, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >
      {children}
    </span>
  )
}

const PreviewCard = ({
  data,
  position,
  isVisible,
  cardRef,
}: {
  data: (typeof previewData)[keyof typeof previewData] | null
  position: { x: number; y: number }
  isVisible: boolean
  cardRef: React.RefObject<HTMLDivElement | null>
}) => {
  if (!data) return null

  return (
    <div
      ref={cardRef}
      className={`preview-card ${isVisible ? "visible" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="preview-card-inner">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title || ""}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <div className="preview-card-title">{data.title}</div>
        <div className="preview-card-subtitle">{data.subtitle}</div>
      </div>
    </div>
  )
}

export function HoverPreview() {
  const [activePreview, setActivePreview] = useState<(typeof previewData)[keyof typeof previewData] | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Preload images
  useEffect(() => {
    Object.entries(previewData).forEach(([, data]) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = data.image
    })
  }, [])

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardWidth = 340
    const cardHeight = 280
    const offsetY = 20

    let x = e.clientX - cardWidth / 2
    let y = e.clientY - cardHeight - offsetY

    if (x + cardWidth > window.innerWidth - 20) x = window.innerWidth - cardWidth - 20
    if (x < 20) x = 20
    if (y < 20) y = e.clientY + offsetY

    setPosition({ x, y })
  }, [])

  const handleHoverStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      setActivePreview(previewData[key as keyof typeof previewData])
      setIsVisible(true)
      updatePosition(e)
    },
    [updatePosition],
  )

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isVisible) {
        updatePosition(e)
      }
    },
    [isVisible, updatePosition],
  )

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false)
  }, [])

  return (
    <section className="relative">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="hover-preview-container">
        <div className="ambient-glow" />

        <div className="content-container">
          <div className="text-block">
            <p>
              We craft immersive digital experiences using advanced AI such as{" "}
              <HoverLink
                previewKey="midjourney"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
              >
                Midjourney
              </HoverLink>{" "}
              to visualize the impossible.
            </p>

            <p>
              Our process leverages the versatility of{" "}
              <HoverLink
                previewKey="stable"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
              >
                Stable Diffusion
              </HoverLink>{" "}
              and the precision of{" "}
              <HoverLink
                previewKey="leonardo"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
              >
                Leonardo AI
              </HoverLink>
              , merging artistry with intelligence.
            </p>
          </div>
        </div>

        <PreviewCard data={activePreview} position={position} isVisible={isVisible} cardRef={cardRef} />
      </div>
    </section>
  )
}
