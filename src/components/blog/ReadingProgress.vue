<script setup lang="ts">
import { computed } from "vue";
import { useScrollProgress } from "@/composables/useScrollProgress";

const { progress: rawProgress } = useScrollProgress();

const progressPercent = computed(() => (rawProgress.value ?? 0) * 100);
</script>

<template>
  <div class="reading-progress" role="progressbar" :aria-valuenow="progressPercent" aria-valuemin="0" aria-valuemax="100" :aria-label="`閱讀進度 ${Math.round(progressPercent)}%`">
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: `${progressPercent}%` }">
        <div class="progress-glow"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 51;
  height: 2px;
  pointer-events: none;
}

.progress-track {
  position: relative;
  width: 100%;
  height: 100%;
  background: transparent;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(100, 180, 255, 0.7);
  transition: width 0.12s linear;
  border-radius: 0 1px 1px 0;
}

.progress-glow {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: 60px;
  height: 8px;
  background: radial-gradient(
    ellipse at center,
    rgba(245, 197, 66, 0.5) 0%,
    transparent 70%
  );
  filter: blur(2px);
}
</style>
