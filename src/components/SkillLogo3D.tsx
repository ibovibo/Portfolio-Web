import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bounds, useGLTF } from '@react-three/drei'
import {
  Box3,
  Color,
  DoubleSide,
  MathUtils,
  Vector3,
  type Group,
  type MeshBasicMaterial,
} from 'three'

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const DISC_GREEN = new Color('#16a34a')
const SPIN_DURATION = 1.4

function Model({
  path,
  discColor,
  spinTrigger,
}: {
  path: string
  discColor: string
  spinTrigger?: number
}) {
  const { scene } = useGLTF(path)
  const ref = useRef<Group>(null)
  const discMaterialRef = useRef<MeshBasicMaterial>(null)
  const spin = useRef({ active: false, startTime: 0, startY: 0 })
  const elapsed = useRef(0)
  const discBaseColor = useMemo(() => new Color(discColor), [discColor])

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

  const startSpin = () => {
    if (!ref.current || REDUCED_MOTION) return
    spin.current = { active: true, startTime: elapsed.current, startY: ref.current.rotation.y }
  }

  useEffect(() => {
    if (spinTrigger) startSpin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinTrigger])

  useFrame((state, delta) => {
    elapsed.current = state.clock.elapsedTime
    if (!ref.current) return

    const t = spin.current.active
      ? (elapsed.current - spin.current.startTime) / SPIN_DURATION
      : 1
    const spinning = spin.current.active && t < 1

    if (spinning) {
      const clamped = Math.min(t, 1)
      const eased =
        clamped < 0.5 ? 4 * clamped ** 3 : 1 - (-2 * clamped + 2) ** 3 / 2
      ref.current.rotation.y = spin.current.startY + eased * Math.PI * 4
    } else {
      spin.current.active = false
      if (!REDUCED_MOTION) {
        const maxAngle = Math.PI / 6 // 30 degrees
        const target = maxAngle * Math.sin(elapsed.current * 0.7)
        ref.current.rotation.y = MathUtils.lerp(ref.current.rotation.y, target, delta * 3)
      }
    }

    const targetScale = spinning ? 0.5 : 1
    const newScale = MathUtils.lerp(ref.current.scale.x, targetScale, delta * 8)
    ref.current.scale.setScalar(newScale)

    if (discMaterialRef.current) {
      discMaterialRef.current.color.lerp(spinning ? DISC_GREEN : discBaseColor, delta * 8)
    }
  })

  return (
    <group ref={ref} onPointerOver={startSpin}>
      <mesh position={[disc.x, disc.y, disc.z]} renderOrder={-1}>
        <circleGeometry args={[disc.radius, 64]} />
        <meshBasicMaterial
          ref={discMaterialRef}
          color={discColor}
          side={DoubleSide}
          depthTest={false}
          depthWrite={false}
        />
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

export default function SkillLogo3D({
  path,
  label,
  discColor = '#ffffff',
  spinTrigger,
}: {
  path: string
  label: string
  discColor?: string
  spinTrigger?: number
}) {
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
            <Model path={path} discColor={discColor} spinTrigger={spinTrigger} />
          </Bounds>
        </Canvas>
      </Suspense>
    </ModelErrorBoundary>
  )
}
