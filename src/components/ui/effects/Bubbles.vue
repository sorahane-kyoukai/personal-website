<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

defineOptions({
  name: "BubbleParticles",
});

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;
let bubbles: Bubble[] = [];

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  color: string;
}

function resizeCanvas() {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

function createBubbles() {
  const count = Math.min(window.innerWidth * 0.05, 50);
  bubbles = [];
  for (let i = 0; i < count; i++) {
    bubbles.push(createBubble());
  }
}

function createBubble(yOverride?: number): Bubble {
  return {
    x: Math.random() * window.innerWidth,
    y: yOverride ?? Math.random() * window.innerHeight + window.innerHeight,
    radius: Math.random() * 10 + 5,
    speed: Math.random() * 1 + 0.5,
    opacity: Math.random() * 0.3 + 0.1,
    color: Math.random() > 0.5 ? "255, 255, 255" : "186, 230, 253", // White or Light Blue
  };
}

function animate() {
  if (!ctx || !canvas.value) return;
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  bubbles.forEach((b, index) => {
    b.y -= b.speed;
    // Oscillation
    b.x += Math.sin(b.y * 0.02) * 0.2;

    if (b.y < -b.radius) {
      bubbles[index] = createBubble();
    }

    ctx!.beginPath();
    ctx!.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx!.fillStyle = `rgba(${b.color}, ${b.opacity})`;
    ctx!.fill();

    // Shine
    ctx!.beginPath();
    ctx!.arc(
      b.x - b.radius * 0.3,
      b.y - b.radius * 0.3,
      b.radius * 0.2,
      0,
      Math.PI * 2,
    );
    ctx!.fillStyle = `rgba(255, 255, 255, ${b.opacity + 0.2})`;
    ctx!.fill();
  });

  animationFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext("2d");
    resizeCanvas();
    createBubbles();
    animate();
    window.addEventListener("resize", () => {
      resizeCanvas();
      createBubbles();
    });
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<template>
  <canvas ref="canvas" class="bubble-canvas"></canvas>
</template>

<style scoped>
.bubble-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
</style>
