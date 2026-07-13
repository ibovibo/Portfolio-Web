import { Component, Suspense, useRef, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bounds, useGLTF } from '@react-three/drei'
import type { Group } from 'three'

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path)
  const ref = useRef<Group>(null)

  useFrame((_, delta) => {
    if (ref.current && !REDUCED_MOTION) {
      ref.current.rotation.y += delta * 0.4
    }
  })

  return <primitive ref={ref} object={scene} />
}

class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

export default function SkillLogo3D({ path, label }: { path: string; label: string }) {
  const fallback = (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent">
      {label.charAt(0)}
    </div>
  )

  return (
    <ModelErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={1.4} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />
          <Bounds fit clip margin={1.3}>
            <Model path={path} />
          </Bounds>
        </Canvas>
      </Suspense>
    </ModelErrorBoundary>
  )
}
