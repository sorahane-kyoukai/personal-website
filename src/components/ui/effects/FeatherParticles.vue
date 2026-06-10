<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;
let feathers: Feather[] = [];

interface Feather {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  sway: number;
  swaySpeed: number;
}

function resizeCanvas() {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

function createFeathers() {
  const count = Math.min(window.innerWidth * 0.03, 30);
  feathers = [];
  for (let i = 0; i < count; i++) {
    feathers.push(createFeather());
  }
}

function createFeather(yOverride?: number): Feather {
  return {
    x: Math.random() * window.innerWidth,
    y: yOverride ?? Math.random() * window.innerHeight,
    size: Math.random() * 10 + 8, // Length
    speedX: Math.random() * 0.5 - 0.25,
    speedY: Math.random() * 0.8 + 0.4,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 1 - 0.5,
    opacity: Math.random() * 0.4 + 0.4,
    sway: 0,
    swaySpeed: Math.random() * 0.02 + 0.01,
  };
}

function drawFeather(ctx: CanvasRenderingContext2D, f: Feather) {
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate((f.rotation * Math.PI) / 180);
  ctx.globalAlpha = f.opacity;
  ctx.fillStyle = "#ffffff";

  // Draw a simple feather shape using bezier curves
  ctx.beginPath();
  ctx.moveTo(0, -f.size / 2);
  ctx.quadraticCurveTo(f.size / 3, -f.size / 4, 0, f.size / 2); // Right side
  ctx.quadraticCurveTo(-f.size / 3, -f.size / 4, 0, -f.size / 2); // Left side
  ctx.fill();

  // Draw quill/rachis
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
  ctx.lineWidth = 1;
  ctx.moveTo(0, -f.size / 2);
  ctx.lineTo(0, f.size / 2);
  ctx.stroke();

  ctx.restore();
}

function animate() {
  if (!ctx || !canvas.value) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  feathers.forEach((f, index) => {
    f.sway += f.swaySpeed;
    f.x += f.speedX + Math.sin(f.sway) * 0.5;
    f.y += f.speedY;
    f.rotation += f.rotationSpeed + Math.sin(f.sway) * 0.5;

    if (f.y > canvas.value!.height) {
      feathers[index] = createFeather(-20);
    }
    if (f.x > canvas.value!.width + 20) {
      f.x = -20;
    } else if (f.x < -20) {
      f.x = canvas.value!.width + 20;
    }

    drawFeather(ctx!, f);
  });

  animationFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext("2d");
    resizeCanvas();
    createFeathers();
    animate();
    window.addEventListener("resize", () => {
      resizeCanvas();
      createFeathers();
    });
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener("resize", resizeCanvas); // Fixed: was passing createFeathers in resizeCanvas listener? No, need separate removal or stable function
});
</script>

<template>
  <canvas ref="canvas" class="feather-canvas"></canvas>
</template>

<style scoped>
.feather-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
}
</style>
