"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Line, OrbitControls, Environment, useDepthBuffer } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

// Particle system component
function ParticleSystem({ count = 500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 7;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00E676"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Floating spheres component
function FloatingSpheres({ count = 5 }: { count?: number }) {
  const spheres = useRef<THREE.Mesh[]>([]);

  const positions = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 10,
      size: 0.3 + Math.random() * 0.7,
      color: new THREE.Color(`hsl(${Math.random() * 60 + 120}, 80%, 50%)`),
      speed: 0.1 + Math.random() * 0.3,
      direction: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize(),
    }));
  }, [count]);

  useFrame((state) => {
    spheres.current.forEach((sphere, index) => {
      if (sphere) {
        const pos = positions[index];
        const time = state.clock.elapsedTime * pos.speed;

        // Circular motion
        sphere.position.x = pos.x + Math.sin(time) * 2;
        sphere.position.y = pos.y + Math.cos(time * 0.7) * 2;
        sphere.position.z = pos.z + Math.sin(time * 0.5) * 2;

        // Gentle glow pulse
        const glowIntensity = 0.5 + Math.sin(time * 2) * 0.3;
        (sphere.material as THREE.MeshBasicMaterial).emissiveIntensity = glowIntensity;
      }
    });
  });

  return (
    <>
      {positions.map((pos, index) => (
        <mesh
          key={index}
          ref={(el) => (spheres.current[index] = el!)}
          position={[pos.x, pos.y, pos.z]}
        >
          <sphereGeometry args={[pos.size, 32, 32]} />
          <meshBasicMaterial
            color={pos.color}
            emissive={pos.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </>
  );
}

// Animated lines component
function AnimatedLines({ count = 20 }: { count?: number }) {
  const lines = useRef<THREE.Line[]>([]);

  const linePositions = useMemo(() => {
    return Array.from({ length: count }, () => ({
      start: new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ),
      end: new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ),
      speed: 0.2 + Math.random() * 0.5,
    }));
  }, [count]);

  useFrame((state) => {
    lines.current.forEach((line, index) => {
      if (line) {
        const pos = linePositions[index];
        const time = state.clock.elapsedTime * pos.speed;

        // Animate line positions
        const offsetX = Math.sin(time) * 3;
        const offsetY = Math.cos(time * 0.7) * 3;
        const offsetZ = Math.sin(time * 0.5) * 3;

        const geometry = line.geometry as THREE.BufferGeometry;
        const positions = geometry.attributes.position.array as Float32Array;

        positions[0] = pos.start.x + offsetX;
        positions[1] = pos.start.y + offsetY;
        positions[2] = pos.start.z + offsetZ;
        positions[3] = pos.end.x + offsetX;
        positions[4] = pos.end.y + offsetY;
        positions[5] = pos.end.z + offsetZ;

        geometry.attributes.position.needsUpdate = true;
      }
    });
  });

  return (
    <>
      {linePositions.map((pos, index) => (
        <Line
          key={index}
          ref={(el) => (lines.current[index] = el!)}
          points={[pos.start, pos.end]}
          color="#00E676"
          lineWidth={0.5}
          transparent
          opacity={0.3}
        />
      ))}
    </>
  );
}

// Floating grid component
function FloatingGrid() {
  const gridSize = 20;
  const cellSize = 0.5;

  const gridGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];

    for (let i = -gridSize; i <= gridSize; i += cellSize) {
      vertices.push(i, 0, -gridSize, i, 0, gridSize);
      vertices.push(-gridSize, 0, i, gridSize, 0, i);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    gridGeometry.attributes.position.needsUpdate = true;

    const positions = gridGeometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 6) {
      const wave = Math.sin(positions[i] * 0.1 + time * 0.5) * 0.5;
      positions[i + 1] = wave;
      positions[i + 4] = wave;
    }
  });

  return (
    <lineSegments geometry={gridGeometry}>
      <lineBasicMaterial color="#00E676" transparent opacity={0.1} />
    </lineSegments>
  );
}

// Mouse interactive particles
function MouseParticles({ mouse }: { mouse: THREE.Vector2 }) {
  const particles = useRef<THREE.Points>(null);
  const particlePositions = useRef<Float32Array | null>(null);

  useEffect(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.1;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    particlePositions.current = positions;
  }, []);

  useFrame(() => {
    if (particles.current && particlePositions.current && mouse) {
      const positions = particlePositions.current;
      const time = Date.now() * 0.001;

      for (let i = 0; i < positions.length / 3; i++) {
        const i3 = i * 3;
        // Follow mouse with delay based on index
        const delay = i * 0.01;
        const followX = gsap.interpolate(
          positions[i3],
          (mouse.x * 10) + (Math.sin(time + delay) * 2),
          0.1
        );
        const followY = gsap.interpolate(
          positions[i3 + 1],
          (mouse.y * 10) + (Math.cos(time + delay) * 2),
          0.1
        );
        const followZ = Math.sin(time + delay) * 0.5;

        positions[i3] = followX;
        positions[i3 + 1] = followY;
        positions[i3 + 2] = followZ;
      }

      particles.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!particlePositions.current) return null;

  return (
    <Points ref={particles} positions={particlePositions.current} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00E676"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Main background component
function Scene({ mouse }: { mouse: THREE.Vector2 }) {
  const { camera, gl } = useThree();

  useEffect(() => {
    // Configure camera
    camera.position.set(0, 0, 8);
    camera.fov = 60;
    camera.updateProjectionMatrix();

    // Configure renderer
    gl.setClearColor("#050505");
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(window.innerWidth, window.innerHeight);
  }, [camera, gl]);

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.5} color="#00E676" />

      {/* Directional light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.3}
        color="#00E676"
        castShadow
      />

      {/* Point lights */}
      <pointLight position={[3, 3, 3]} intensity={0.5} color="#00E676" />
      <pointLight position={[-3, -3, -3]} intensity={0.5} color="#4ECDC4" />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#FFFFFF" />

      {/* Fog */}
      <fog attach="fog" args={["#050505", 0.01, 15]} />

      {/* Background gradient */}
      <mesh position={[0, 0, -10]}>
        <sphereGeometry args={[20, 64, 64]} />
        <shaderMaterial
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec3 vNormal;
            void main() {
              float t = 0.5 * (vNormal.y + 1.0);
              vec3 color = mix(color1, color2, t);
              gl_FragColor = vec4(color, 0.3);
            }
          `}
          uniforms={{
            color1: { value: new THREE.Color("#000000") },
            color2: { value: new THREE.Color("#00E676") },
          }}
          side={THREE.BackSide}
          transparent
        />
      </mesh>

      {/* Particle system */}
      <ParticleSystem count={500} />

      {/* Floating spheres */}
      <FloatingSpheres count={5} />

      {/* Animated lines */}
      <AnimatedLines count={20} />

      {/* Floating grid */}
      <FloatingGrid />

      {/* Mouse particles */}
      <MouseParticles mouse={mouse} />

      {/* Bloom effect */}
      <Environment preset="city" />
    </>
  );
}

// Main background component with Canvas
interface BackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Background3D({ className = "", style = {} }: BackgroundProps) {
  const mouse = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[-1] ${className}`}
      style={{ ...style }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 1000 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene mouse={mouse.current} />
      </Canvas>
    </div>
  );
}

// Lightweight particle background for mobile
export function ParticleBackgroundLite() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particles: Array<{ x: number; y: number; size: number; speed: number; direction: number }> = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        direction: Math.random() * Math.PI * 2,
      });
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      gradient.addColorStop(0, "rgba(0, 230, 118, 0.05)");
      gradient.addColorStop(1, "rgba(5, 5, 5, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p) => {
        p.x += Math.cos(p.direction) * p.speed;
        p.y += Math.sin(p.direction) * p.speed;

        // Change direction randomly
        if (Math.random() < 0.01) {
          p.direction += (Math.random() - 0.5) * 0.5;
        }

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 230, 118, ${Math.random() * 0.3 + 0.2})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] w-full h-full"
      style={{ background: "#050505" }}
      aria-hidden="true"
    />
  );
}

// Export components
export { ParticleSystem, FloatingSpheres, AnimatedLines, FloatingGrid, MouseParticles };
