'use client'

/**
 * src/components/webgl/InteractiveDots.tsx
 * React Bits-style interactive dot field — monochrome, full-viewport,
 * fixed behind all content. Dots brighten and swell near the cursor
 * and breathe with a slow ambient shimmer.
 *
 * Renders on a 2D canvas (no three.js): ~2.5k dots/frame, GPU-composited,
 * paused when the tab is hidden. prefers-reduced-motion → static field.
 */
import { useEffect, useRef } from 'react'

const SPACING = 28 // px between dots
const INFLUENCE = 150 // cursor influence radius (px)
const BASE_ALPHA = 0.07
const BASE_RADIUS = 1

export function InteractiveDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -9999, y: -9999 }
    let raf = 0
    let running = false
    let w = 0
    let h = 0
    let t = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduced) drawStatic()
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = `rgba(255,255,255,${BASE_ALPHA + 0.03})`
      for (let x = SPACING / 2; x < w; x += SPACING) {
        for (let y = SPACING / 2; y < h; y += SPACING) {
          ctx.beginPath()
          ctx.arc(x, y, BASE_RADIUS, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const draw = () => {
      t += 0.012
      ctx.clearRect(0, 0, w, h)

      for (let x = SPACING / 2; x < w; x += SPACING) {
        for (let y = SPACING / 2; y < h; y += SPACING) {
          // Cursor proximity boost with smooth quadratic falloff
          const dx = x - mouse.x
          const dy = y - mouse.y
          const dist = Math.hypot(dx, dy)
          const boost = dist < INFLUENCE ? (1 - dist / INFLUENCE) ** 2 : 0

          // Slow ambient shimmer wave
          const shimmer = Math.sin(t + x * 0.018 + y * 0.014) * 0.025

          const alpha = BASE_ALPHA + shimmer + boost * 0.55
          if (alpha <= 0.01) continue

          // White at rest → lilac (#a855f7) near the cursor
          const r = Math.round(255 - (255 - 168) * boost)
          const g = Math.round(255 - (255 - 85) * boost)
          const b = Math.round(255 - (255 - 247) * boost)
          ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(alpha, 0.75)})`
          ctx.beginPath()
          ctx.arc(x, y, BASE_RADIUS + boost * 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (!running && !reduced) {
        running = true
        raf = requestAnimationFrame(draw)
      }
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    resize()
    start()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
