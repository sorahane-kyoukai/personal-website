<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;
let lines: SpeedLine[] = [];

interface SpeedLine {
  x: number;
  y: number;
  z: number;
  speed: number;
  length: number;
}

function resizeCanvas() {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

function createLines() {
  const count = 100;
  lines = [];
  for (let i = 0; i < count; i++) {
    lines.push(resetLine());
  }
}

function resetLine(): SpeedLine {
  return {
    x: (Math.random() - 0.5) * window.innerWidth * 2,
    y: (Math.random() - 0.5) * window.innerHeight * 2,
    z: Math.random() * 2000 + 500, // Depth
    speed: Math.random() * 10 + 5,
    length: Math.random() * 100 + 50,
  };
}

function animate() {
  if (!ctx || !canvas.value) return;

  const w = canvas.value.width;
  const h = canvas.value.height;
  const cx = w / 2;
  const cy = h / 2;

  ctx.fillStyle = "rgba(10, 14, 26, 0.3)"; // Trail effect
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "#87ceeb"; // Sky blue
  ctx.lineCap = "round";

  lines.forEach((line) => {
    line.z -= line.speed * 20;
    if (line.z <= 0) {
      Object.assign(line, resetLine());
      line.z = 2000;
    }

    const k = 500 / line.z;
    const x = cx + line.x * k;
    const y = cy + line.y * k;

    // Previous position for drawing tail
    const oldK = 500 / (line.z + line.length);
    const oldX = cx + line.x * oldK;
    const oldY = cy + line.y * oldK;

    const alpha = (2000 - line.z) / 2000;
    ctx!.globalAlpha = alpha;
    ctx!.lineWidth = k * 2;

    ctx!.beginPath();
    ctx!.moveTo(oldX, oldY);
    ctx!.lineTo(x, y);
    ctx!.stroke();
  });

  ctx.globalAlpha = 1;
  animationFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext("2d");
    resizeCanvas();
    createLines();
    animate();
    window.addEventListener("resize", resizeCanvas);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener("resize", resizeCanvas);
});
</script>

<template>
  <canvas ref="canvas" class="speed-lines-canvas"></canvas>
</template>

<style scoped>
.speed-lines-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.6;
  mix-blend-mode: screen;
}
</style>
