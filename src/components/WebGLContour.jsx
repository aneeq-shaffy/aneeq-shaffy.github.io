import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// A real WebGL port of the analytic four-sine contour field: four
// incommensurate sine waves summed into a smooth scalar field, sliced into
// bands and rolled by two crossed sine displacements. Same shader a
// production hero backdrop would run, just driving a plain accent/background
// palette instead of a device-tier-gated helmet reveal.
const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform vec3 uBackground;
  uniform vec3 uLine;
  uniform vec3 uAccent;
  uniform vec2 uMouse;

  float field(vec2 p, float t) {
    float f = sin(p.x * 1.00 + t * 0.60) * 0.50;
    f += sin(p.y * 0.85 - t * 0.45) * 0.45;
    f += sin((p.x + p.y) * 0.65 + t * 0.35) * 0.35;
    f += sin((p.x - p.y) * 0.95 - t * 0.55) * 0.25;
    return f * 0.5 + 0.5;
  }

  void main() {
    vec2 ndc = (vUv - 0.5) * 2.0;
    vec2 p = vec2(ndc.x * uAspect, ndc.y) * 3.8;
    float t = uTime * 1.66;

    vec2 q = p;
    q.x += sin(p.y * 0.8 + t * 0.7) * 0.37;
    q.y += cos(p.x * 0.7 - t * 0.6) * 0.37;

    float scaled = field(q, t) * 2.5;
    float w = max(fwidth(scaled) * 1.4, 1e-4);
    float line = 1.0 - smoothstep(0.0, w, abs(fract(scaled) - 0.5));

    float d = length(ndc - uMouse);
    float glow = smoothstep(0.95, 0.0, d) * 0.22;

    vec3 color = mix(uBackground, uLine, line * 0.85);
    color = mix(color, uAccent, glow * line);
    gl_FragColor = vec4(color, 1.0);
  }
`

export default function WebGLContour({ className = '' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()

    const uniforms = {
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uBackground: { value: new THREE.Color('#0b0d0f') },
      uLine: { value: new THREE.Color('#1c2027') },
      uAccent: { value: new THREE.Color('#c8ff3d') },
      uMouse: { value: new THREE.Vector2(10, 10) },
    }

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let raf = null
    const start = performance.now()
    let visible = true

    const resize = () => {
      const rect = mount.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      renderer.setSize(rect.width, rect.height, false)
      uniforms.uAspect.value = rect.width / rect.height
    }

    const onMove = (e) => {
      const rect = mount.getBoundingClientRect()
      uniforms.uMouse.value.set(
        ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        -((e.clientY - rect.top) / rect.height - 0.5) * 2,
      )
    }

    const draw = (now) => {
      uniforms.uTime.value = (now - start) / 1000
      renderer.render(scene, camera)
      if (!reduced && visible) raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !raf && !reduced) raf = requestAnimationFrame(draw)
      },
      { threshold: 0 },
    )
    io.observe(mount)

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(draw)
    if (reduced) draw(performance.now())

    return () => {
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} aria-hidden className={`absolute inset-0 ${className}`} />
}
