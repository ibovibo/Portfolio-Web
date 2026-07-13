import { Component, Suspense, useMemo, useRef, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bounds, useGLTF } from '@react-three/drei'
import { Box3, DoubleSide, Vector3, type Group } from 'three'

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path)
  const ref = useRef<Group>(null)

  const disc = useMemo(() => {
    scene.updateMatrixWorld(true)
    const box = new Box3().setFromObject(scene)
    const size = new Vector3()
    const center = new Vector3()
    box.getSize(size)
    box.getCenter(center)

    const measured = (Math.max(size.x, size.y) / 2) * 1.5
    const radius = Number.isFinite(measured) && measured > 0 ? measured : 1
    const z = Number.isFinite(box.min.z) ? box.min.z : 0

    return { radius, x: center.x || 0, y: center.y || 0, z }
  }, [scene])

  useFrame((state) => {
    if (ref.current && !REDUCED_MOTION) {
      const maxAngle = Math.PI / 6 // 30 degrees
      ref.current.rotation.y = maxAngle * Math.sin(state.clock.elapsedTime * 0.7)
    }
  })

  return (
    <group ref={ref}>
      <mesh position={[disc.x, disc.y, disc.z]} renderOrder={-1}>
        <circleGeometry args={[disc.radius, 64]} />
        <meshBasicMaterial color="white" side={DoubleSide} depthTest={false} depthWrite={false} />
      </mesh>
      <primitive object={scene} />
    </group>
  )
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
          <Bounds fit margin={1.3}>
            <Model path={path} />
          </Bounds>
        </Canvas>
      </Suspense>
    </ModelErrorBoundary>
  )
}
