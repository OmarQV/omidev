import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function Particles({ count = 5000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random()) * 25
      const theta = THREE.MathUtils.randFloatSpread(360)
      const phi = THREE.MathUtils.randFloatSpread(360)
      
      let x = distance * Math.sin(theta) * Math.cos(phi)
      let y = distance * Math.sin(theta) * Math.sin(phi)
      let z = distance * Math.cos(theta)
      
      positions.set([x, y, z], i * 3)
    }
    
    return positions
  }, [count])

  useFrame((state) => {
    const { clock } = state
    
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.05
      ref.current.rotation.y = clock.getElapsedTime() * 0.075
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={particlesPosition}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#a855f7"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>
    </group>
  )
}
