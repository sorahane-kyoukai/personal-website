<script setup lang="ts"></script>

<template>
  <div class="god-rays-container">
    <div class="ray ray-1"></div>
    <div class="ray ray-2"></div>
    <div class="ray ray-3"></div>
  </div>
</template>

<style scoped>
.god-rays-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
  opacity: 0.6;
  mix-blend-mode: overlay;
}

.ray {
  position: absolute;
  top: -50%;
  left: 50%;
  width: 100px;
  height: 200%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.4) 0%,
    transparent 100%
  );
  transform-origin: top center;
  filter: blur(20px);
}

.ray-1 {
  transform: rotate(25deg) translateX(-100px);
  animation: sway 8s ease-in-out infinite alternate;
  width: 150px;
}

.ray-2 {
  transform: rotate(-15deg);
  animation: sway-reverse 10s ease-in-out infinite alternate;
  width: 200px;
  opacity: 0.7;
}

.ray-3 {
  transform: rotate(40deg) translateX(100px);
  animation: sway 12s ease-in-out infinite alternate-reverse;
  width: 120px;
  opacity: 0.5;
}

@keyframes sway {
  0% {
    transform: rotate(25deg) translateX(-100px);
    opacity: 0.4;
  }
  100% {
    transform: rotate(30deg) translateX(-80px);
    opacity: 0.7;
  }
}

@keyframes sway-reverse {
  0% {
    transform: rotate(-15deg);
    opacity: 0.5;
  }
  100% {
    transform: rotate(-20deg);
    opacity: 0.8;
  }
}
</style>
