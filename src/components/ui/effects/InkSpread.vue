<script setup lang="ts"></script>

<template>
  <div class="ink-container">
    <div class="ink-blob"></div>
    <div class="ink-blob blob-2"></div>
  </div>
</template>

<style scoped>
.ink-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  filter: url(#goo); /* Optional: requires SVG filter in index.html or here, simplifying for CSS only first */
  opacity: 0.15;
}

.ink-blob {
  position: absolute;
  width: 50vmax;
  height: 50vmax;
  background: radial-gradient(circle, #000 0%, transparent 70%);
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  animation: morph 15s ease-in-out infinite;
  top: -10%;
  left: -10%;
}

.blob-2 {
  top: auto;
  bottom: -20%;
  right: -20%;
  left: auto;
  width: 60vmax;
  height: 60vmax;
  animation-direction: reverse;
  animation-duration: 20s;
  background: radial-gradient(circle, #0f172a 0%, transparent 70%);
}

@keyframes morph {
  0%,
  100% {
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    transform: rotate(0deg);
  }
  34% {
    border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%;
  }
  67% {
    border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
  }
  50% {
    transform: rotate(180deg);
  }
}
</style>
