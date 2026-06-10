<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;
let particles: CharParticle[] = [];

const characters = "文筆墨書寫思靈創創造storyinkwordABCあいうえお";

interface CharParticle {
  x: number;
  y: number;
  char: string;
  size: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  fadeSpeed: number;
  life: number;
}

function resizeCanvas() {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

function createParticle(yOverride?: number): CharParticle {
  return {
    x: Math.random() * window.innerWidth,
    y: yOverride ?? Math.random() * window.innerHeight,
    char: characters[Math.floor(Math.random() * characters.length)] ?? "文",
    size: Math.random() * 12 + 10,
    speedY: -(Math.random() * 0.3 + 0.1), // Rising slowly
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.01,
    opacity: 0,
    fadeSpeed: Math.random() * 0.005 + 0.002,
    life: 0,
  };
}

function animate() {
  if (!ctx || !canvas.value) return;
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  particles.forEach((p, index) => {
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;
    p.life += p.fadeSpeed;

    // Sinusoidal opacity for smooth fade in/out
    p.opacity = Math.sin(p.life) * 0.4;

    if (p.life > Math.PI || p.y < -20) {
      particles[index] = createParticle(canvas.value!.height + 20);
    }

    ctx!.save();
    ctx!.translate(p.x, p.y);
    ctx!.rotate(p.rotation);
    ctx!.globalAlpha = Math.max(0, p.opacity);
    ctx!.fillStyle = "#fde68a"; // Warm Amber
    ctx!.font = `${p.size}px "Shippori Mincho", serif`;
    ctx!.fillText(p.char, 0, 0);
    ctx!.restore();
  });

  animationFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext("2d");
    resizeCanvas();
    particles = Array.from({ length: 40 }, () => createParticle());
    animate();
    window.addEventListener("resize", resizeCanvas);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<template>
  <canvas ref="canvas" class="literary-canvas"></canvas>
</template>

<style scoped>
.literary-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  filter: blur(0.5px);
}
</style>
