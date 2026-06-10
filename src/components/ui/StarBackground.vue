<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Props {
  starCount?: number;
  minSize?: number;
  maxSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  starCount: 100,
  minSize: 1,
  maxSize: 3,
});

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const stars = ref<Star[]>([]);

function generateStars(): void {
  const newStars: Star[] = [];
  for (let i = 0; i < props.starCount; i++) {
    newStars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: props.minSize + Math.random() * (props.maxSize - props.minSize),
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.7,
    });
  }
  stars.value = newStars;
}

onMounted(() => {
  generateStars();
});
</script>

<template>
  <div class="star-field" aria-hidden="true">
    <div
      v-for="star in stars"
      :key="star.id"
      class="star"
      :style="{
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: `${star.size}px`,
        height: `${star.size}px`,
        '--twinkle-duration': `${star.duration}s`,
        '--twinkle-delay': `${star.delay}s`,
        opacity: star.opacity,
      }"
    ></div>
  </div>
</template>

<style scoped>
.star-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.star {
  position: absolute;
  background: var(--color-star-white);
  border-radius: 50%;
  animation: twinkle var(--twinkle-duration, 2s) ease-in-out infinite;
  animation-delay: var(--twinkle-delay, 0s);
  box-shadow: 0 0 4px rgba(248, 250, 252, 0.5);
}

@keyframes twinkle {
  0%,
  100% {
    opacity: var(--star-opacity, 1);
    transform: scale(1);
  }
  50% {
    opacity: calc(var(--star-opacity, 1) * 0.4);
    transform: scale(0.8);
  }
}
</style>
