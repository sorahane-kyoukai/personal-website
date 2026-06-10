<script setup lang="ts"></script>

<template>
  <div class="aurora-container">
    <div class="aurora-beam"></div>
    <div class="aurora-beam beam-2"></div>
  </div>
</template>

<style scoped>
.aurora-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0.6;
  filter: blur(60px);
  mix-blend-mode: screen;
}

.aurora-beam {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 20%,
    rgba(74, 124, 140, 0.4) 40%,
    rgba(251, 146, 60, 0.3) 60%,
    transparent 80%
  );
  animation: drift 20s infinite linear;
  transform-origin: center;
}

.beam-2 {
  animation-direction: reverse;
  animation-duration: 25s;
  background: linear-gradient(
    -45deg,
    transparent 20%,
    rgba(16, 185, 129, 0.3) 40%,
    rgba(74, 124, 140, 0.4) 60%,
    transparent 80%
  );
}

@keyframes drift {
  from {
    transform: rotate(0deg) scale(1);
  }
  to {
    transform: rotate(360deg) scale(1.2);
  }
}
</style>
