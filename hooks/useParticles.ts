"use client";

import { useEffect, type RefObject } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import { prefersReducedMotion } from "@/lib/utils";

export interface ParticleOptions {
  /** Class applied to the generated <canvas>. */
  canvasClassName?: string;
  count?: number;
  /** Particle hue as "#rrggbb"; each particle gets a random brightness of it. */
  color?: string;
  /** Minimum particle size; legacy home/copyright used 0.1, About used 0.15. */
  minSize?: number;
  /**
   * The About page computed point-size attenuation from the displaced
   * position; the home page used the original position. Kept per page so both
   * look exactly as before.
   */
  sizeFromDisplaced?: boolean;
}

// Shaders are the legacy ones verbatim, with the two page variants folded into
// a single define.
const vertexShader = /* glsl */ `
  attribute vec3 color;
  attribute float size;
  attribute vec3 initialPosition;
  varying vec3 vColor;
  uniform float time;
  uniform vec2 mousePos;

  void main() {
    vColor = color;
    vec3 pos = position;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vec3 worldPos = (modelMatrix * vec4(pos, 1.0)).xyz;

    float mouseStrength = 10.0;
    float distToMouse = length(worldPos.xy - mousePos * 50.0);
    float influence = mouseStrength / (1.0 + 0.1 * distToMouse);

    if (distToMouse < 20.0) {
      vec2 direction = normalize(worldPos.xy - mousePos * 50.0);
      pos.x += direction.x * influence * (sin(time) * 0.5 + 0.5);
      pos.y += direction.y * influence * (cos(time) * 0.5 + 0.5);
    }

    float returnForce = 0.02;
    pos += (initialPosition - pos) * returnForce;

    pos.x += sin(time * 0.5 + pos.y * 0.1) * 0.2;
    pos.y += cos(time * 0.5 + pos.x * 0.1) * 0.2;

    #ifdef SIZE_FROM_DISPLACED
      mvPosition = modelViewMatrix * vec4(pos, 1.0);
    #endif

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);

    if (distToMouse < 20.0) {
      gl_PointSize *= 1.0 + (1.0 - distToMouse / 20.0) * 2.0;
    }
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;

  void main() {
    float r = distance(gl_PointCoord, vec2(0.5, 0.5));
    if (r > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.4, 0.5, r);
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// Parsed by hand (not THREE.Color) so the values stay raw sRGB, exactly like the
// legacy hard-coded 0.2 / 0.5 / 1.0 blue.
function hexToRgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function createGeometry(count: number, minSize: number, [r, g, b]: [number, number, number]): BufferGeometry {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

    const intensity = Math.random();
    colors[i * 3] = r * intensity;
    colors[i * 3 + 1] = g * intensity;
    colors[i * 3 + 2] = b * intensity;

    sizes[i] = Math.random() * 0.5 + minSize;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.setAttribute("size", new BufferAttribute(sizes, 1));
  geometry.setAttribute("initialPosition", new BufferAttribute(positions.slice(), 3));
  return geometry;
}

/**
 * Interactive Three.js particle field. The hook creates its own <canvas> inside
 * `containerRef` so each mount gets a fresh WebGL context (a React-owned canvas
 * would be handed the already-lost context on a StrictMode remount).
 *
 * The legacy scene also added ambient/directional lights, a Raycaster and
 * loaded OrbitControls/GLTFLoader; none of those affect a ShaderMaterial point
 * cloud (and OrbitControls was a 404), so they are omitted.
 */
export function useParticles(
  containerRef: RefObject<HTMLElement | null>,
  { canvasClassName, count = 2000, color = "#3380ff", minSize = 0.1, sizeFromDisplaced = false }: ParticleOptions = {},
): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    if (canvasClassName) canvas.className = canvasClassName;
    canvas.setAttribute("aria-hidden", "true");

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      // No WebGL (old device / disabled GPU): the page still works without particles.
      return;
    }
    container.appendChild(canvas);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const geometry = createGeometry(count, minSize, hexToRgb(color));
    const mousePos = new Vector2(0, 0);
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      defines: sizeFromDisplaced ? { SIZE_FROM_DISPLACED: "" } : {},
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        time: { value: 0 },
        mousePos: { value: mousePos },
      },
    });
    const particles = new Points(geometry, material);
    scene.add(particles);

    const reducedMotion = prefersReducedMotion();
    const start = performance.now();
    let frame = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const setTarget = (x: number, y: number) => {
      targetMouseX = (x / window.innerWidth) * 2 - 1;
      targetMouseY = -(y / window.innerHeight) * 2 + 1;
    };
    const onMouseMove = (e: MouseEvent) => setTarget(e.clientX, e.clientY);
    // Passive: the legacy home page called preventDefault() here, which
    // blocked page scrolling on touch devices.
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) setTarget(e.touches[0].clientX, e.touches[0].clientY);
    };

    const render = () => renderer.render(scene, camera);

    const animate = () => {
      frame = requestAnimationFrame(animate);

      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      material.uniforms.time.value = (performance.now() - start) / 1000;
      mousePos.set(mouseX, mouseY);

      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      render();
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (reducedMotion) render();
    };

    window.addEventListener("resize", onResize);
    if (reducedMotion) {
      // Static field: no drift, rotation or mouse repulsion.
      render();
    } else {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      animate();
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      scene.remove(particles);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, [containerRef, canvasClassName, count, color, minSize, sizeFromDisplaced]);
}
