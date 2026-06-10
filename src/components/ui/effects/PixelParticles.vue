<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;
let particles: Pixel[] = [];

interface Pixel {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
}

function resizeCanvas() {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

function createParticles() {
  const count = 100;
  particles = [];
  const colors = ["#facc15", "#fde047", "#ffffff", "#fb923c"]; // Gold, Yellow, White, Orange
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2, // Larger pixel size
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)] ?? "#facc15",
    });
  }
}

function animate() {
  if (!ctx || !canvas.value) return;
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = canvas.value!.width;
    if (p.x > canvas.value!.width) p.x = 0;
    if (p.y < 0) p.y = canvas.value!.height;
    if (p.y > canvas.value!.height) p.y = 0;

    ctx!.globalAlpha = p.opacity + Math.sin(Date.now() * 0.002 + p.x) * 0.2;
    ctx!.fillStyle = p.color;

    // Draw Square (Pixel)
    ctx!.fillRect(p.x, p.y, p.size, p.size);
  });
  ctx!.globalAlpha = 1;
  animationFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext("2d");
    resizeCanvas();
    createParticles();
    animate();
    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<template>
  <canvas ref="canvas" class="pixel-canvas"></canvas>
</template>

<style scoped>
.pixel-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  /* Pixelated look */
  image-rendering: pixelated;
  filter: drop-shadow(0 0 2px rgba(250, 204, 21, 0.3));
}
</style>
