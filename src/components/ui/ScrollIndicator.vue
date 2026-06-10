<script setup lang="ts">
interface Props {
  text?: string;
}

withDefaults(defineProps<Props>(), {
  text: "向下滾動",
});
</script>

<template>
  <div class="scroll-indicator">
    <span class="scroll-text">{{ text }}</span>
    <div class="scroll-arrow">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
    <div class="scroll-line"></div>
  </div>
</template>

<style scoped>
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--color-moon-silver);
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.scroll-indicator:hover {
  opacity: 1;
}

.scroll-text {
  font-family: var(--font-body);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.scroll-arrow {
  animation: scroll-hint 2s ease-in-out infinite;
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(
    180deg,
    var(--color-moon-silver) 0%,
    transparent 100%
  );
  animation: scroll-hint 2s ease-in-out infinite;
  animation-delay: 0.2s;
}

@keyframes scroll-hint {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(8px);
    opacity: 0.5;
  }
}
</style>
