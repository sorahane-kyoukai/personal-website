<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;

// Matrix config
const charSize = 20;
let columns: number[] = [];
const chars = "0123456789ABCDEF<>/\\*+=";

function resizeCanvas() {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;

  const cols = Math.floor(canvas.value.width / charSize);
  columns = Array.from({ length: cols }, () => 0);
}

function animate() {
  if (!ctx || !canvas.value) return;

  // Fade out effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

  ctx.fillStyle = "#10b981"; // Emerald green
  ctx.font = `${charSize}px monospace`;

  for (let i = 0; i < columns.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)] ?? "0";
    const x = i * charSize;
    const colY = columns[i] ?? 0;
    const y = colY * charSize;

    // Highlight random characters
    if (Math.random() > 0.98) {
      ctx.fillStyle = "#ffffff";
    } else {
      ctx.fillStyle = "#10b981";
    }

    ctx.fillText(text, x, y);

    // Reset drop or move down
    if (y > canvas.value.height && Math.random() > 0.975) {
      columns[i] = 0;
    }

    if (columns[i] !== undefined) {
      columns[i] = columns[i]! + 1;
    }
  }

  animationFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext("2d");
    resizeCanvas();
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
  <canvas ref="canvas" class="matrix-canvas"></canvas>
</template>

<style scoped>
.matrix-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.3;
}
</style>
