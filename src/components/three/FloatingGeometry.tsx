import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const { clock } = state
    
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} scale={3}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#60a5fa"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.9}
        emissive="#3b82f6"
        emissiveIntensity={1.2}
      />
    </mesh>
  )
}
