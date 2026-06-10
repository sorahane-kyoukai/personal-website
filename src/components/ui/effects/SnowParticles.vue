<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;
let snowflakes: Snow[] = [];

interface Snow {
  x: number;
  y: number;
  radius: number;
  speed: number;
  sway: number;
  swaySpeed: number;
  opacity: number;
}

function resizeCanvas() {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

function createSnowflakes() {
  const count = Math.min(window.innerWidth * 0.1, 150);
  snowflakes = [];
  for (let i = 0; i < count; i++) {
    snowflakes.push(createSnowflake());
  }
}

function createSnowflake(yOverride?: number): Snow {
  return {
    x: Math.random() * window.innerWidth,
    y: yOverride ?? Math.random() * window.innerHeight,
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 1 + 0.5,
    sway: Math.random() * Math.PI * 2,
    swaySpeed: Math.random() * 0.02 + 0.01,
    opacity: Math.random() * 0.5 + 0.3,
  };
}

function animate() {
  if (!ctx || !canvas.value) return;
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.fillStyle = "#ffffff";

  snowflakes.forEach((s, index) => {
    s.y += s.speed;
    s.sway += s.swaySpeed;
    s.x += Math.sin(s.sway) * 0.5;

    if (s.y > canvas.value!.height) {
      snowflakes[index] = createSnowflake(-5);
    }

    ctx!.globalAlpha = s.opacity;
    ctx!.beginPath();
    ctx!.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx!.fill();
  });

  ctx!.globalAlpha = 1;
  animationFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext("2d");
    resizeCanvas();
    createSnowflakes();
    animate();
    window.addEventListener("resize", () => {
      resizeCanvas();
      createSnowflakes();
    });
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<template>
  <canvas ref="canvas" class="snow-canvas"></canvas>
</template>

<style scoped>
.snow-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
</style>
