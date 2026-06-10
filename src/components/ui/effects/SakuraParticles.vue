<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;
let particles: Petal[] = [];

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  opacity: number;
}

function resizeCanvas() {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

function createParticles() {
  const count = Math.min(window.innerWidth * 0.15, 150); // More delicate, so more particles needed
  particles = [];

  for (let i = 0; i < count; i++) {
    particles.push(createPetal());
  }
}

function createPetal(yOverride?: number): Petal {
  const colors = [
    "255, 192, 203", // Pink
    "255, 182, 193", // LightPink
    "255, 105, 180", // HotPink
    "255, 240, 245", // LavenderBlush
  ];
  const color =
    colors[Math.floor(Math.random() * colors.length)] ?? "255, 192, 203";

  return {
    x: Math.random() * window.innerWidth,
    y: yOverride ?? Math.random() * window.innerHeight,
    size: Math.random() * 4 + 3, // Smaller size (3px - 7px)
    speedX: Math.random() * 1 - 0.5,
    speedY: Math.random() * 1.0 + 0.5, // Slower fall
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() * 2 - 1) * 0.5,
    flip: Math.random() * Math.PI,
    flipSpeed: Math.random() * 0.03 + 0.01,
    color,
    opacity: Math.random() * 0.5 + 0.5,
  };
}

function animate() {
  if (!ctx || !canvas.value) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  particles.forEach((p, index) => {
    p.y += p.speedY;
    p.x += p.speedX + Math.sin(p.y * 0.005) * 0.5;
    p.rotation += p.rotationSpeed;
    p.flip += p.flipSpeed;

    // Reset if out of view
    if (p.y > canvas.value!.height + 20) {
      particles[index] = createPetal(-20);
    }
    if (p.x > canvas.value!.width + 20) {
      p.x = -20;
    } else if (p.x < -20) {
      p.x = canvas.value!.width + 20;
    }

    ctx!.save();
    ctx!.translate(p.x, p.y);

    // 3D Flip effect using scaling
    const flipScale = Math.abs(Math.cos(p.flip));
    ctx!.scale(flipScale, 1);
    ctx!.rotate((p.rotation * Math.PI) / 180);

    ctx!.fillStyle = `rgba(${p.color}, ${p.opacity})`;

    // Realistic Sakura Shape
    ctx!.beginPath();
    // Start at bottom tip (stem side)
    ctx!.moveTo(0, p.size);
    // Left curve to top-left notch
    ctx!.bezierCurveTo(
      -p.size * 0.8,
      p.size * 0.5,
      -p.size * 1.2,
      -p.size * 0.5,
      -p.size * 0.3,
      -p.size,
    );
    // Center notch
    ctx!.lineTo(0, -p.size * 0.7);
    // Right notch to right curve
    ctx!.lineTo(p.size * 0.3, -p.size);
    // Right curve back to bottom
    ctx!.bezierCurveTo(
      p.size * 1.2,
      -p.size * 0.5,
      p.size * 0.8,
      p.size * 0.5,
      0,
      p.size,
    );

    ctx!.fill();
    ctx!.restore();
  });

  animationFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext("2d");
    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener("resize", handleResize);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener("resize", handleResize);
});

function handleResize() {
  resizeCanvas();
  createParticles();
}
</script>

<template>
  <canvas ref="canvas" class="sakura-canvas"></canvas>
</template>

<style scoped>
.sakura-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
</style>
