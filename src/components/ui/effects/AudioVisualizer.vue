<script setup lang="ts"></script>

<template>
  <div class="visualizer-container">
    <div class="bars">
      <div
        v-for="i in 24"
        :key="i"
        class="bar"
        :style="{ '--delay': `${i * 0.1}s` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.visualizer-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%; /* Shorter */
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0.4; /* Much more subtle */
  mask-image: linear-gradient(to top, black, transparent);
}

.bars {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 0 15%;
  justify-content: space-around;
}

.bar {
  width: 1.5%; /* Thinner bars */
  background: linear-gradient(
    to top,
    var(--theme-primary, #4f46e5),
    transparent
  );
  height: 5%;
  animation: bounce 2s ease-in-out infinite alternate; /* Slower */
  animation-delay: var(--delay);
  border-radius: 4px 4px 0 0;
}

@keyframes bounce {
  0% {
    height: 10%;
    opacity: 0.3;
  }
  50% {
    height: 35%;
    opacity: 0.6;
  }
  100% {
    height: 60%;
    opacity: 0.8;
  }
}
</style>
