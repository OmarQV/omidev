import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Node {
  id: number
  x: number
  y: number
  z: number
  size: number
}

interface Connection {
  from: Node
  to: Node
}

interface BlockchainBackgroundProps {
  fixed?: boolean
}

export default function BlockchainBackground({ fixed = false }: BlockchainBackgroundProps) {
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [10, -10]), {
    stiffness: 100,
    damping: 30
  })
  const rotateY = useSpring(useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-10, 10]), {
    stiffness: 100,
    damping: 30
  })

  useEffect(() => {
    // Generate random nodes with depth - more for full page
    const nodeCount = fixed ? 40 : 25
    const generatedNodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 100, // depth for 3D effect
      size: Math.random() * 4 + 2
    }))

    // Generate connections between nearby nodes
    const generatedConnections: Connection[] = []
    generatedNodes.forEach((node, i) => {
      generatedNodes.slice(i + 1).forEach(otherNode => {
        const distance = Math.sqrt(
          Math.pow(node.x - otherNode.x, 2) + 
          Math.pow(node.y - otherNode.y, 2) +
          Math.pow(node.z - otherNode.z, 2)
        )
        if (distance < 30 && Math.random() > 0.5) {
          generatedConnections.push({ from: node, to: otherNode })
        }
      })
    })

    setNodes(generatedNodes)
    setConnections(generatedConnections)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div 
      className={`${fixed ? 'fixed' : 'absolute'} inset-0 overflow-hidden pointer-events-none`} 
      style={{ perspective: '1200px', zIndex: fixed ? 0 : 'auto' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Animated Connections with depth and data flow */}
          {connections.map((conn, i) => {
            const avgZ = (conn.from.z + conn.to.z) / 2
            const scale = 0.5 + (avgZ / 100) * 0.5
            const opacity = 0.3 + (avgZ / 100) * 0.4
            
            return (
              <g key={`connection-${i}`}>
                {/* Connection line */}
                <motion.line
                  x1={`${conn.from.x}%`}
                  y1={`${conn.from.y}%`}
                  x2={`${conn.to.x}%`}
                  y2={`${conn.to.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth={1 * scale}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [opacity * 0.5, opacity, opacity * 0.5],
                  }}
                  transition={{
                    pathLength: { duration: 2, delay: i * 0.1 },
                    opacity: { duration: 3, repeat: Infinity, delay: i * 0.2 }
                  }}
                  style={{ transform: `translateZ(${avgZ}px)` }}
                />
                
                {/* Data packet traveling along the line */}
                <motion.circle
                  r={2 * scale}
                  fill={avgZ > 50 ? "#a855f7" : "#3b82f6"}
                  filter="url(#glow)"
                  animate={{
                    cx: [`${conn.from.x}%`, `${conn.to.x}%`, `${conn.from.x}%`],
                    cy: [`${conn.from.y}%`, `${conn.to.y}%`, `${conn.from.y}%`],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 4 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear"
                  }}
                  style={{ transform: `translateZ(${avgZ}px)` }}
                />
              </g>
            )
          })}

          {/* Nodes with depth-based sizing */}
          {nodes.map((node) => {
            const scale = 0.5 + (node.z / 100) * 0.8
            const adjustedSize = node.size * scale
            
            return (
              <motion.g 
                key={`node-${node.id}`}
                style={{ transform: `translateZ(${node.z}px)` }}
              >
                {/* Glow effect */}
                <motion.circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={adjustedSize * 2.5}
                  fill={node.z > 50 ? "#a855f7" : "#3b82f6"}
                  filter="url(#glow)"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    duration: 2 + node.z / 50,
                    repeat: Infinity,
                    delay: node.id * 0.1
                  }}
                />
                {/* Main node */}
                <motion.circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={adjustedSize}
                  fill={node.z > 50 ? "#a855f7" : "#3b82f6"}
                  filter="url(#glow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    scale: { duration: 0.5, delay: node.id * 0.05 },
                    opacity: { duration: 2, repeat: Infinity, delay: node.id * 0.1 }
                  }}
                />
              </motion.g>
            )
          })}
        </svg>

        {/* 3D Blockchain Cubes with realistic perspective */}
        <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
          {[...Array(8)].map((_, i) => {
            const depth = 100 + i * 150
            const size = 35 + (depth / 30) // Reducido de 60 + (depth / 20)
            return (
              <motion.div
                key={`cube-${i}`}
                className="absolute"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${5 + (i % 3) * 30}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: `translateZ(${depth}px)`,
                  transformStyle: 'preserve-3d'
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, 25, 0],
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                  rotateZ: [0, 180]
                }}
                transition={{
                  duration: 15 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8
                }}
              >
                {/* 3D Cube with CSS 3D transforms */}
                <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Front face */}
                  <motion.div
                    className="absolute inset-0 border-2 rounded-lg"
                    style={{
                      borderColor: depth > 400 ? '#a855f7' : '#3b82f6',
                      backgroundColor: depth > 400 ? 'rgba(168, 85, 247, 0.05)' : 'rgba(59, 130, 246, 0.05)',
                      transform: `translateZ(${size/2}px)`,
                      boxShadow: `0 0 20px ${depth > 400 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  />
                  {/* Back face */}
                  <motion.div
                    className="absolute inset-0 border-2 rounded-lg"
                    style={{
                      borderColor: depth > 400 ? '#a855f7' : '#3b82f6',
                      backgroundColor: depth > 400 ? 'rgba(168, 85, 247, 0.05)' : 'rgba(59, 130, 246, 0.05)',
                      transform: `translateZ(-${size/2}px) rotateY(180deg)`,
                      boxShadow: `0 0 20px ${depth > 400 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  />
                  {/* Top face */}
                  <motion.div
                    className="absolute inset-0 border-2 rounded-lg"
                    style={{
                      borderColor: depth > 400 ? '#a855f7' : '#3b82f6',
                      backgroundColor: depth > 400 ? 'rgba(168, 85, 247, 0.05)' : 'rgba(59, 130, 246, 0.05)',
                      transform: `translateY(-${size/2}px) rotateX(90deg)`,
                      boxShadow: `0 0 20px ${depth > 400 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  />
                  {/* Bottom face */}
                  <motion.div
                    className="absolute inset-0 border-2 rounded-lg"
                    style={{
                      borderColor: depth > 400 ? '#a855f7' : '#3b82f6',
                      backgroundColor: depth > 400 ? 'rgba(168, 85, 247, 0.05)' : 'rgba(59, 130, 246, 0.05)',
                      transform: `translateY(${size/2}px) rotateX(-90deg)`,
                      boxShadow: `0 0 20px ${depth > 400 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  />
                  {/* Left face */}
                  <motion.div
                    className="absolute inset-0 border-2 rounded-lg"
                    style={{
                      borderColor: depth > 400 ? '#a855f7' : '#3b82f6',
                      backgroundColor: depth > 400 ? 'rgba(168, 85, 247, 0.05)' : 'rgba(59, 130, 246, 0.05)',
                      transform: `translateX(-${size/2}px) rotateY(-90deg)`,
                      boxShadow: `0 0 20px ${depth > 400 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  />
                  {/* Right face */}
                  <motion.div
                    className="absolute inset-0 border-2 rounded-lg"
                    style={{
                      borderColor: depth > 400 ? '#a855f7' : '#3b82f6',
                      backgroundColor: depth > 400 ? 'rgba(168, 85, 247, 0.05)' : 'rgba(59, 130, 246, 0.05)',
                      transform: `translateX(${size/2}px) rotateY(90deg)`,
                      boxShadow: `0 0 20px ${depth > 400 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Data Flow Particles with 3D depth */}
        {[...Array(20)].map((_, i) => {
          const depth = Math.random() * 200
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + depth / 100}px`,
                height: `${2 + depth / 100}px`,
                backgroundColor: depth > 100 ? '#a855f7' : '#3b82f6',
                transform: `translateZ(${depth}px)`,
                boxShadow: `0 0 ${10 + depth / 20}px ${depth > 100 ? '#a855f7' : '#3b82f6'}`
              }}
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear"
              }}
            />
          )
        })}

        {/* Grid Pattern Overlay with 3D depth */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #3b82f6 1px, transparent 1px),
              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'translateZ(-100px)'
          }}
        />
      </motion.div>
    </div>
  )
}
