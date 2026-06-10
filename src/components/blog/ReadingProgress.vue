<script setup lang="ts">
import { computed } from "vue";
import { useScrollProgress } from "@/composables/useScrollProgress";
import { READING_PROGRESS_VISIBILITY_THRESHOLD } from "@/utils/constants";

const { progress: rawProgress, scrollY } = useScrollProgress();

const progressPercent = computed(() => (rawProgress.value ?? 0) * 100);
const isVisible = computed(() => (scrollY.value ?? 0) > READING_PROGRESS_VISIBILITY_THRESHOLD);
</script>

<template>
  <div class="reading-progress" :class="{ 'progress-visible': isVisible }">
    <div class="progress-bar" :style="{ width: `${progressPercent}%` }">
      <div class="progress-glow"></div>
    </div>
    <div class="progress-track"></div>
  </div>
</template>

<style scoped>
.reading-progress {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  z-index: 40;
  height: 3px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.progress-visible {
  opacity: 1;
}

.progress-track {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.04);
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(67, 56, 202, 0.7) 0%,
    rgba(245, 197, 66, 0.8) 50%,
    rgba(245, 197, 66, 0.9) 100%
  );
  border-radius: 0 2px 2px 0;
  transition: width 0.15s linear;
  z-index: 1;
}

.progress-glow {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: 40px;
  height: 12px;
  background: radial-gradient(
    ellipse at center,
    rgba(245, 197, 66, 0.6) 0%,
    transparent 70%
  );
  filter: blur(2px);
}
</style>
