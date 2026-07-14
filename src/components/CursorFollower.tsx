import { useEffect, useRef, useState } from 'react'

/**
 * CursorFollower
 * ---------------------------------------------------------------------------
 * A small decorative GIF that trails the mouse cursor with smooth, lagging
 * motion instead of snapping to the pointer 1:1.
 *
 * How the trailing motion works (linear interpolation / "lerp"):
 *   Every animation frame, the rendered position moves a fixed fraction
 *   (`EASE`) of the remaining distance towards the real cursor position.
 *   Because it only ever closes part of the gap each frame, the image
 *   naturally glides behind the cursor rather than teleporting to it.
 *   A smaller EASE value means more lag/trailing; a larger one is snappier.
 *
 * Why refs + direct DOM writes instead of React state for the position:
 *   `mousemove` and `requestAnimationFrame` can both fire 60+ times per
 *   second. Storing the coordinates in refs and writing straight to the
 *   image's `style.transform` lets the position update every frame without
 *   forcing a React re-render on each one — React state is only used here
 *   for things that change rarely (whether the effect is supported at all).
 *
 * Why `pointer-events: none`:
 *   The GIF is purely decorative and rendered on top of the page. Without
 *   disabling pointer events it would intercept clicks/hovers meant for
 *   whatever is underneath it (buttons, links, etc).
 *
 * Why it's hidden on touch devices:
 *   There is no persistent mouse cursor on a touchscreen, so a "cursor
 *   follower" has nothing to follow there. We check for a fine pointer with
 *   hover support (i.e. an actual mouse/trackpad) and render nothing
 *   otherwise.
 *
 * How the "always facing the cursor" rotation works:
 *   Every frame we compute the angle from the image's own (rendered) position
 *   straight to the real cursor position with `atan2(dy, dx)`, and rotate
 *   towards it — using the *shortest* angular path (`lerpAngle`) so it never
 *   spins the long way around when the angle crosses the -180/180 wraparound
 *   point. This is recomputed continuously, even once the image has fully
 *   caught up and the cursor stops moving, so the face keeps looking directly
 *   at the cursor rather than freezing at whatever direction it was last
 *   traveling in.
 *
 * Why the gap trails behind the direction of travel, instead of sitting at a
 * fixed side of the cursor:
 *   To look like it's actually chasing the cursor, the image should stay
 *   *behind* wherever the cursor is heading — above it when moving down,
 *   left of it when moving right, and so on — rather than always sitting on
 *   a fixed side regardless of direction. Each frame we take the cursor's
 *   raw frame-to-frame movement, treat that as its current travel direction,
 *   and place the target point at a fixed distance (`GAP_DISTANCE`) in the
 *   *opposite* direction (`travelAngle + 180`). The travel direction itself
 *   is only updated while the cursor is actually moving enough to give a
 *   reliable reading, and eased with `lerpAngle` like the rotation above —
 *   so it holds its last heading (and the image keeps trailing from that
 *   side) instead of jittering once the cursor stops.
 *
 * Why it settles above the cursor when idle:
 *   The trailing-behind-travel offset above only makes sense while the
 *   cursor is actually going somewhere. Once it's been still for `IDLE_MS`,
 *   we switch to a fixed resting offset (`IDLE_OFFSET_X/Y`) directly above
 *   the cursor, so it looks like the image "catches up and lands over it" at
 *   rest instead of hovering off to whichever side it was last trailing
 *   from, or sitting on top of (and hiding) the cursor itself. As soon as
 *   the cursor moves again it falls back out of idle and resumes trailing
 *   behind it.
 */

// Fixed distance (in px) kept behind the cursor, in the direction opposite
// to its travel. The image is centered on its target point via a -50%
// translate, which already pulls it back by half its own rendered size (48px
// for the 96px h-24/w-24 image below) — so this must exceed that just to
// clear the image's edge. 70px leaves a ~22px visible gap.
const GAP_DISTANCE = 70

// Raw cursor movement (px, measured per animation frame) below which we
// don't trust the direction reading enough to update the travel angle —
// avoids the trailing side flickering from tiny mouse jitter at rest.
const MIN_MOVEMENT_FOR_TRAVEL = 2

// How eagerly the trailing side reacts to a change in travel direction.
// Same shape as the position/rotation EASE below, just named separately
// since it's conceptually a different thing (a direction, not a position).
const TRAVEL_EASE = 0.15

// How long (ms) the cursor must sit still before we consider it "idle" and
// let the image drift back to a resting position above it.
const IDLE_MS = 400

// Resting offset (px) from the cursor once idle: straight up (12 o'clock,
// pure Y-axis — X stays 0), well clear of the cursor rather than just barely
// clearing the image's own half-size (48px for the 96px h-24/w-24 image).
const IDLE_OFFSET_X = 0
const IDLE_OFFSET_Y = -90

// The artwork's face sits in the bottom-left corner of the square GIF frame
// (roughly a down-left, ~135deg direction when unrotated). This offset
// corrects for that so a rotation of 0 makes the face point straight at
// whatever angle we compute towards the cursor.
const ROTATION_OFFSET_DEG = 225

/** Eases angle `from` towards `to`, always taking the shorter way around. */
function lerpAngle(from: number, to: number, t: number) {
  const delta = (((to - from) % 360) + 540) % 360 - 180
  return from + delta * t
}

// The GIF that trails the cursor.
const CURSOR_GIF_SRC = '/assets/ejderha.gif'

export default function CursorFollower() {
  const imgRef = useRef<HTMLImageElement>(null)

  // Target position: the cursor's real, current coordinates.
  const pointer = useRef({ x: 0, y: 0 })
  // Rendered position: eased towards `pointer` a little on every frame.
  const current = useRef({ x: 0, y: 0 })
  // Current heading (degrees) the image is rotated to, eased each frame.
  const rotation = useRef(0)

  // Whether this device even has a mouse. Starts `false` so nothing renders
  // during the initial check, then flips to `true` on qualifying devices.
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    const supportsMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setIsSupported(supportsMouse)
    if (!supportsMouse) return

    // Fraction of the remaining distance to close each frame (0-1).
    // Lower = more trailing lag, higher = tighter tracking.
    const EASE = 0.15

    // Direction (degrees) the cursor is currently traveling in, derived from
    // its own raw movement each frame — independent of where the image is.
    let travelAngle = 180
    let prevRawX = 0
    let prevRawY = 0
    // Timestamp of the last real mouse movement, used to detect idling.
    let lastMoveAt = performance.now()

    let hasReceivedFirstMove = false

    const handleMouseMove = (event: MouseEvent) => {
      pointer.current.x = event.clientX
      pointer.current.y = event.clientY
      lastMoveAt = performance.now()

      // Snap the rendered position to the (offset) target on the very first
      // move and fade the image in, so it doesn't flash into view at (0, 0)
      // before the user has moved the mouse yet.
      if (!hasReceivedFirstMove) {
        const behindRad = ((travelAngle + 180) * Math.PI) / 180
        current.current.x = pointer.current.x + Math.cos(behindRad) * GAP_DISTANCE
        current.current.y = pointer.current.y + Math.sin(behindRad) * GAP_DISTANCE
        prevRawX = pointer.current.x
        prevRawY = pointer.current.y
        if (imgRef.current) imgRef.current.style.opacity = '1'
        hasReceivedFirstMove = true
      }
    }

    let rafId: number
    const tick = () => {
      // Update the travel direction from the cursor's own raw movement this
      // frame (only when it's moved enough to trust the reading).
      const rawDx = pointer.current.x - prevRawX
      const rawDy = pointer.current.y - prevRawY
      if (Math.hypot(rawDx, rawDy) > MIN_MOVEMENT_FOR_TRAVEL) {
        const instantAngle = Math.atan2(rawDy, rawDx) * (180 / Math.PI)
        travelAngle = lerpAngle(travelAngle, instantAngle, TRAVEL_EASE)
      }
      prevRawX = pointer.current.x
      prevRawY = pointer.current.y

      // Position: while moving, eases towards a point a fixed distance
      // *behind* the direction of travel; once idle, eases towards a fixed
      // resting spot above the cursor instead (see doc comment above).
      const isIdle = performance.now() - lastMoveAt > IDLE_MS
      let targetX: number
      let targetY: number
      if (isIdle) {
        targetX = pointer.current.x + IDLE_OFFSET_X
        targetY = pointer.current.y + IDLE_OFFSET_Y
      } else {
        const behindRad = ((travelAngle + 180) * Math.PI) / 180
        targetX = pointer.current.x + Math.cos(behindRad) * GAP_DISTANCE
        targetY = pointer.current.y + Math.sin(behindRad) * GAP_DISTANCE
      }
      current.current.x += (targetX - current.current.x) * EASE
      current.current.y += (targetY - current.current.y) * EASE

      // Facing: always points from the image's current position straight at
      // the real cursor (not the offset target), so it keeps gazing at the
      // cursor even at rest, when position movement has settled to zero.
      const gazeDx = pointer.current.x - current.current.x
      const gazeDy = pointer.current.y - current.current.y
      const targetAngle = Math.atan2(gazeDy, gazeDx) * (180 / Math.PI) + ROTATION_OFFSET_DEG
      rotation.current = lerpAngle(rotation.current, targetAngle, EASE)

      if (imgRef.current) {
        // translate(-50%, -50%) centers the image on the tracked point;
        // rotate is applied last so it spins the image around that center.
        imgRef.current.style.transform =
          `translate3d(${current.current.x}px, ${current.current.y}px, 0) ` +
          `translate(-50%, -50%) rotate(${rotation.current}deg)`
      }

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!isSupported) return null

  return (
    <img
      ref={imgRef}
      src={CURSOR_GIF_SRC}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-24 w-24 select-none opacity-0 transition-opacity duration-300"
    />
  )
}
