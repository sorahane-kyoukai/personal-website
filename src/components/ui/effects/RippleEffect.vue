<script setup lang="ts"></script>

<template>
  <div class="ripple-container">
    <div class="ripple r1"></div>
    <div class="ripple r2"></div>
    <div class="ripple r3"></div>
  </div>
</template>

<style scoped>
.ripple-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(226, 232, 240, 0.3);
  opacity: 0;
  animation: ripple-spread 8s linear infinite;
}

.r1 {
  animation-delay: 0s;
}
.r2 {
  animation-delay: 2.5s;
}
.r3 {
  animation-delay: 5s;
}

@keyframes ripple-spread {
  0% {
    width: 0;
    height: 0;
    opacity: 0.5;
    border-width: 2px;
  }
  100% {
    width: 150vmax;
    height: 150vmax;
    opacity: 0;
    border-width: 0;
  }
}
</style>
