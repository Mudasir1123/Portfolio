import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface NeuralNetworkProps {
  count?: number
  maxDistance?: number
}

function NeuralNetwork({ count = 100, maxDistance = 15 }: NeuralNetworkProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 80
      positions[i + 1] = (Math.random() - 0.5) * 80
      positions[i + 2] = (Math.random() - 0.5) * 80

      velocities[i] = (Math.random() - 0.5) * 0.1
      velocities[i + 1] = (Math.random() - 0.5) * 0.1
      velocities[i + 2] = (Math.random() - 0.5) * 0.1
    }
    return { positions, velocities }
  }, [count])

  // Create empty arrays for lines. Max lines = count * (count - 1) / 2
  const { linePositions, lineColors } = useMemo(() => {
    const maxLines = (count * (count - 1)) / 2
    return {
      linePositions: new Float32Array(maxLines * 6),
      lineColors: new Float32Array(maxLines * 6)
    }
  }, [count])

  // Base colors for the gradients (neon blue to purple)
  const color1 = new THREE.Color('#00f0ff')
  const color2 = new THREE.Color('#8a2be2')

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array
    let lineIndex = 0

    // Update particle positions
    for (let i = 0; i < count * 3; i += 3) {
      positionsArray[i] += velocities[i]
      positionsArray[i + 1] += velocities[i + 1]
      positionsArray[i + 2] += velocities[i + 2]

      // Bounce off boundaries (-40 to 40)
      if (Math.abs(positionsArray[i]) > 40) velocities[i] *= -1
      if (Math.abs(positionsArray[i + 1]) > 40) velocities[i + 1] *= -1
      if (Math.abs(positionsArray[i + 2]) > 40) velocities[i + 2] *= -1
    }

    // Connect close particles with lines
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positionsArray[i * 3] - positionsArray[j * 3]
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1]
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2]
        const distSq = dx * dx + dy * dy + dz * dz

        if (distSq < maxDistance * maxDistance) {
          const alpha = 1.0 - Math.sqrt(distSq) / maxDistance

          // Point A
          linePositions[lineIndex] = positionsArray[i * 3]
          linePositions[lineIndex + 1] = positionsArray[i * 3 + 1]
          linePositions[lineIndex + 2] = positionsArray[i * 3 + 2]
          
          color1.toArray(lineColors, lineIndex)
          lineColors[lineIndex] *= alpha
          lineColors[lineIndex + 1] *= alpha
          lineColors[lineIndex + 2] *= alpha

          // Point B
          linePositions[lineIndex + 3] = positionsArray[j * 3]
          linePositions[lineIndex + 4] = positionsArray[j * 3 + 1]
          linePositions[lineIndex + 5] = positionsArray[j * 3 + 2]

          color2.toArray(lineColors, lineIndex + 3)
          lineColors[lineIndex + 3] *= alpha
          lineColors[lineIndex + 4] *= alpha
          lineColors[lineIndex + 5] *= alpha

          lineIndex += 6
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    linesRef.current.geometry.setDrawRange(0, lineIndex / 3)
    linesRef.current.geometry.attributes.position.needsUpdate = true
    linesRef.current.geometry.attributes.color.needsUpdate = true
    
    // Slight rotation
    pointsRef.current.rotation.y += 0.001
    linesRef.current.rotation.y += 0.001
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.6}
          color="#a855f7"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors={true}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

export function ParticleField() {
  return (
    <Canvas
      className="absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 45], fov: 60 }}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <NeuralNetwork count={120} maxDistance={20} />
    </Canvas>
  )
}
