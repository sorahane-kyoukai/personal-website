<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Props {
  maxParticles?: number;
  density?: number;
  enableMeteors?: boolean;
  enableNebula?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  maxParticles: 100,
  density: 12000,
  enableMeteors: true,
  enableNebula: true,
});

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

type ParticleType = "star" | "meteor" | "nebula";
type ParticleLayer = "far" | "mid" | "near";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  twinkle: number;
  parallax: number;
  streak: boolean;
  color: RgbColor;
  type: ParticleType;
  layer: ParticleLayer;
  life?: number;
  maxLife?: number;
  angle?: number;
}

const canvasRef = ref<HTMLCanvasElement | null>(null);

const defaultColor: RgbColor = { r: 248, g: 250, b: 252 };

// Enhanced cosmic color palette - Fantasy Vibrant
const starPalette: RgbColor[] = [
  defaultColor,
  { r: 226, g: 232, b: 240 }, // Moon silver
  { r: 167, g: 139, b: 250 }, // Soft purple
  { r: 250, g: 204, b: 21 }, // Gold
  { r: 56, g: 189, b: 248 }, // Sky blue
  { r: 232, g: 121, b: 249 }, // Pink/Magenta
  { r: 45, g: 212, b: 191 }, // Teal
];

const defaultNebulaColor: RgbColor = { r: 67, g: 56, b: 202 };

const nebulaPalette: RgbColor[] = [
  defaultNebulaColor, // Deep purple
  { r: 236, g: 72, b: 153 }, // Nebula pink
  { r: 74, g: 124, b: 140 }, // Teal cloud
  { r: 139, g: 92, b: 246 }, // Violet
  { r: 6, g: 182, b: 212 }, // Cyan
];

let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let width = 0;
let height = 0;
let dpr = 1;
let rafId: number | null = null;
let reduceMotion = false;
let motionQuery: MediaQueryList | null = null;
let isPageVisible = true;

const pointer = {
  x: 0.5,
  y: 0.5,
  targetX: 0.5,
  targetY: 0.5,
};

function getLayer(): ParticleLayer {
  const rand = Math.random();
  if (rand < 0.4) return "far";
  if (rand < 0.8) return "mid";
  return "near";
}

interface LayerConfig {
  radiusRange: [number, number];
  speedRange: [number, number];
  parallax: [number, number];
  opacity: [number, number];
}

const layerConfigs: Record<ParticleLayer, LayerConfig> = {
  far: {
    radiusRange: [0.5, 1.0],
    speedRange: [0.02, 0.06],
    parallax: [0.1, 0.3],
    opacity: [0.3, 0.6],
  },
  mid: {
    radiusRange: [1.0, 2.0],
    speedRange: [0.05, 0.12],
    parallax: [0.3, 0.6],
    opacity: [0.5, 0.8],
  },
  near: {
    radiusRange: [2.0, 3.5],
    speedRange: [0.1, 0.25],
    parallax: [0.6, 0.9],
    opacity: [0.7, 1.0],
  },
};

function buildStar(): Particle {
  const layer = getLayer();
  const config = layerConfigs[layer];
  const radius =
    config.radiusRange[0] +
    Math.random() * (config.radiusRange[1] - config.radiusRange[0]);
  const speed =
    config.speedRange[0] +
    Math.random() * (config.speedRange[1] - config.speedRange[0]);
  const drift = Math.random() * Math.PI * 2;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius,
    vx: Math.cos(drift) * speed,
    vy: Math.sin(drift) * speed,
    opacity:
      config.opacity[0] +
      Math.random() * (config.opacity[1] - config.opacity[0]),
    twinkle: Math.random() * Math.PI * 2,
    parallax:
      config.parallax[0] +
      Math.random() * (config.parallax[1] - config.parallax[0]),
    streak: layer === "near" && Math.random() < 0.25,
    color:
      starPalette[Math.floor(Math.random() * starPalette.length)] ??
      defaultColor,
    type: "star",
    layer,
  };
}

function buildMeteor(): Particle {
  const angle = Math.PI * 0.2 + Math.random() * Math.PI * 0.15;
  const speed = 4 + Math.random() * 4; // Faster
  const startFromTop = Math.random() < 0.7;

  return {
    x: startFromTop ? Math.random() * width * 1.2 : -50,
    y: startFromTop ? -50 : Math.random() * height * 0.3,
    radius: 2.0 + Math.random() * 2.0, // Larger
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    opacity: 0.9 + Math.random() * 0.1,
    twinkle: 0,
    parallax: 1,
    streak: true,
    color: starPalette[Math.floor(Math.random() * 3)] ?? defaultColor, // Usually white/silver/blue
    type: "meteor",
    layer: "near",
    life: 0,
    maxLife: 100 + Math.random() * 80, // Longer trails
    angle,
  };
}

function buildNebula(): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 60 + Math.random() * 120, // Larger nebula
    vx: (Math.random() - 0.5) * 0.03,
    vy: (Math.random() - 0.5) * 0.03,
    opacity: 0.05 + Math.random() * 0.08,
    twinkle: Math.random() * Math.PI * 2,
    parallax: 0.05 + Math.random() * 0.1,
    streak: false,
    color:
      nebulaPalette[Math.floor(Math.random() * nebulaPalette.length)] ??
      defaultNebulaColor,
    type: "nebula",
    layer: "far",
  };
}

let meteors: Particle[] = [];
let nebulas: Particle[] = [];
let meteorSpawnTimer = 0;

function seedParticles(): void {
  const area = Math.max(width * height, 1);
  const count = Math.min(props.maxParticles, Math.floor(area / props.density));
  particles = Array.from({ length: Math.max(count, 50) }, () => buildStar());

  // Seed nebula particles for background atmosphere (reduced count for performance)
  if (props.enableNebula) {
    const nebulaCount = Math.min(4, Math.floor(area / 200000));
    nebulas = Array.from({ length: Math.max(nebulaCount, 2) }, () =>
      buildNebula(),
    );
  }

  meteors = [];
  meteorSpawnTimer = 0;
}

function resizeCanvas(): void {
  if (!canvasRef.value) return;
  width = window.innerWidth;
  height = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvasRef.value.width = width * dpr;
  canvasRef.value.height = height * dpr;
  canvasRef.value.style.width = `${width}px`;
  canvasRef.value.style.height = `${height}px`;
  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  seedParticles();
  if (reduceMotion) {
    renderFrame(0);
  }
}

function updatePointer(event: MouseEvent): void {
  if (!width || !height) return;
  pointer.targetX = event.clientX / width;
  pointer.targetY = event.clientY / height;
}

function updateTouch(event: TouchEvent): void {
  if (!width || !height) return;
  const touch = event.touches[0];
  if (!touch) return;
  pointer.targetX = touch.clientX / width;
  pointer.targetY = touch.clientY / height;
}

function renderFrame(time: number): void {
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  pointer.x += (pointer.targetX - pointer.x) * 0.05;
  pointer.y += (pointer.targetY - pointer.y) * 0.05;

  // Render nebula particles first (background layer)
  if (props.enableNebula && !reduceMotion) {
    ctx.globalCompositeOperation = "screen";
    for (const nebula of nebulas) {
      nebula.x += nebula.vx;
      nebula.y += nebula.vy;

      // Wrap around edges
      if (nebula.x < -nebula.radius) nebula.x = width + nebula.radius;
      if (nebula.x > width + nebula.radius) nebula.x = -nebula.radius;
      if (nebula.y < -nebula.radius) nebula.y = height + nebula.radius;
      if (nebula.y > height + nebula.radius) nebula.y = -nebula.radius;

      const parallaxX = (pointer.x - 0.5) * nebula.parallax * 30;
      const parallaxY = (pointer.y - 0.5) * nebula.parallax * 20;
      const pulse = 0.7 + Math.sin(time * 0.0003 + nebula.twinkle) * 0.3;
      const alpha = nebula.opacity * pulse;

      const drawX = nebula.x + parallaxX;
      const drawY = nebula.y + parallaxY;

      const gradient = ctx.createRadialGradient(
        drawX,
        drawY,
        0,
        drawX,
        drawY,
        nebula.radius,
      );
      gradient.addColorStop(
        0,
        `rgba(${nebula.color.r}, ${nebula.color.g}, ${nebula.color.b}, ${alpha * 0.8})`,
      );
      gradient.addColorStop(
        0.4,
        `rgba(${nebula.color.r}, ${nebula.color.g}, ${nebula.color.b}, ${alpha * 0.3})`,
      );
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(drawX, drawY, nebula.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Render stars with layered depth (no shadowBlur for performance)
  ctx.globalCompositeOperation = "lighter";
  ctx.shadowBlur = 0;

  for (const particle of particles) {
    if (!reduceMotion) {
      particle.x += particle.vx;
      particle.y += particle.vy;
    }

    const margin = 40;
    if (particle.x < -margin) particle.x = width + margin;
    if (particle.x > width + margin) particle.x = -margin;
    if (particle.y < -margin) particle.y = height + margin;
    if (particle.y > height + margin) particle.y = -margin;

    const parallaxX = (pointer.x - 0.5) * particle.parallax * 60;
    const parallaxY = (pointer.y - 0.5) * particle.parallax * 40;
    const twinkleSpeed =
      particle.layer === "far"
        ? 0.0008
        : particle.layer === "mid"
          ? 0.001
          : 0.0015;
    const twinkle =
      0.6 + Math.sin(time * twinkleSpeed + particle.twinkle) * 0.4;
    const alpha = particle.opacity * twinkle;

    const drawX = particle.x + parallaxX;
    const drawY = particle.y + parallaxY;

    ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha})`;
    ctx.beginPath();
    ctx.arc(drawX, drawY, particle.radius, 0, Math.PI * 2);
    ctx.fill();

    if (particle.streak && !reduceMotion) {
      ctx.strokeStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha * 0.6})`;
      ctx.lineWidth = Math.max(0.5, particle.radius * 0.6);
      ctx.beginPath();
      ctx.moveTo(drawX, drawY);
      ctx.lineTo(drawX - particle.vx * 80, drawY - particle.vy * 80);
      ctx.stroke();
    }
  }

  // Spawn and render meteors
  if (props.enableMeteors && !reduceMotion) {
    meteorSpawnTimer++;
    // Random meteor spawn - More frequent (1-3 seconds)
    if (meteorSpawnTimer > 60 + Math.random() * 120) {
      if (meteors.length < 5) {
        meteors.push(buildMeteor());
      }
      meteorSpawnTimer = 0;
    }

    for (let i = meteors.length - 1; i >= 0; i--) {
      const meteor = meteors[i];
      if (!meteor) continue;

      meteor.x += meteor.vx;
      meteor.y += meteor.vy;
      meteor.life = (meteor.life ?? 0) + 1;

      const lifeRatio = (meteor.life ?? 0) / (meteor.maxLife ?? 100);
      const fadeIn = Math.min(1, (meteor.life ?? 0) / 10);
      const fadeOut = lifeRatio > 0.8 ? 1 - (lifeRatio - 0.8) / 0.2 : 1;
      const alpha = meteor.opacity * fadeIn * fadeOut;

      // Remove dead meteors
      if (lifeRatio >= 1 || meteor.x > width + 200 || meteor.y > height + 200) {
        meteors.splice(i, 1);
        continue;
      }

      // Draw meteor trail (simple line instead of gradient for performance)
      const trailLength = 120 * fadeOut;
      ctx.strokeStyle = `rgba(${meteor.color.r}, ${meteor.color.g}, ${meteor.color.b}, ${alpha * 0.7})`;
      ctx.lineWidth = meteor.radius;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(meteor.x, meteor.y);
      ctx.lineTo(
        meteor.x - (meteor.vx * trailLength) / Math.abs(meteor.vx || 1),
        meteor.y - (meteor.vy * trailLength) / Math.abs(meteor.vy || 1),
      );
      ctx.stroke();

      // Draw meteor head
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(meteor.x, meteor.y, meteor.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function animate(time: number): void {
  renderFrame(time);
  rafId = requestAnimationFrame(animate);
}

function stopAnimation(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function handleMotionChange(event: MediaQueryListEvent): void {
  reduceMotion = event.matches;
  stopAnimation();
  if (reduceMotion) {
    renderFrame(0);
    return;
  }
  if (isPageVisible) {
    rafId = requestAnimationFrame(animate);
  }
}

function handleVisibilityChange(): void {
  isPageVisible = !document.hidden;
  if (isPageVisible && !reduceMotion && rafId === null) {
    rafId = requestAnimationFrame(animate);
  } else if (!isPageVisible) {
    stopAnimation();
  }
}

onMounted(() => {
  if (!canvasRef.value) return;
  ctx = canvasRef.value.getContext("2d");
  if (!ctx) return;

  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduceMotion = motionQuery.matches;
  if (motionQuery.addEventListener) {
    motionQuery.addEventListener("change", handleMotionChange);
  } else {
    motionQuery.addListener(handleMotionChange);
  }

  // Track page visibility to pause animation when hidden
  isPageVisible = !document.hidden;
  document.addEventListener("visibilitychange", handleVisibilityChange);

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });
  window.addEventListener("mousemove", updatePointer, { passive: true });
  window.addEventListener("touchmove", updateTouch, { passive: true });

  if (!reduceMotion && isPageVisible) {
    rafId = requestAnimationFrame(animate);
  }
});

onUnmounted(() => {
  stopAnimation();
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  window.removeEventListener("resize", resizeCanvas);
  window.removeEventListener("mousemove", updatePointer);
  window.removeEventListener("touchmove", updateTouch);
  if (motionQuery) {
    if (motionQuery.removeEventListener) {
      motionQuery.removeEventListener("change", handleMotionChange);
    } else {
      motionQuery.removeListener(handleMotionChange);
    }
  }
  motionQuery = null;
});
</script>

<template>
  <canvas ref="canvasRef" class="cosmic-canvas" aria-hidden="true"></canvas>
</template>

<style scoped>
.cosmic-canvas {
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.9; /* More visible */
  mix-blend-mode: screen;
}

@media (max-width: 768px) {
  .cosmic-canvas {
    opacity: 0.7;
  }
}
</style>
