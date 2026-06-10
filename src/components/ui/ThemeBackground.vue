<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";
import StarBackground from "./StarBackground.vue";

const props = defineProps<{
  effect: string;
}>();

// Lazy load heavy background components
const components = {
  sakura: defineAsyncComponent(() => import("./effects/SakuraParticles.vue")),
  matrix: defineAsyncComponent(() => import("./effects/MatrixRain.vue")),
  "speed-lines": defineAsyncComponent(() => import("./effects/SpeedLines.vue")),
  ripple: defineAsyncComponent(() => import("./effects/RippleEffect.vue")),
  ink: defineAsyncComponent(() => import("./effects/InkSpread.vue")),
  aurora: defineAsyncComponent(() => import("./effects/AuroraBorealis.vue")),
  visualizer: defineAsyncComponent(
    () => import("./effects/AudioVisualizer.vue"),
  ),
  "god-rays": defineAsyncComponent(() => import("./effects/GodRays.vue")),
  feathers: defineAsyncComponent(
    () => import("./effects/FeatherParticles.vue"),
  ),
  bubbles: defineAsyncComponent(() => import("./effects/Bubbles.vue")),
  dust: defineAsyncComponent(() => import("./effects/DustParticles.vue")),
  snow: defineAsyncComponent(() => import("./effects/SnowParticles.vue")),
  pixel: defineAsyncComponent(() => import("./effects/PixelParticles.vue")),
  literary: defineAsyncComponent(
    () => import("./effects/LiteraryParticles.vue"),
  ),
};

const currentEffectComponent = computed(() => {
  return components[props.effect as keyof typeof components] || null;
});
</script>

<template>
  <div class="theme-background">
    <!-- Base Layer: Stars are always present but maybe fainter -->
    <StarBackground :star-count="props.effect === 'stars' ? 100 : 40" />

    <!-- Specific Effects with out-in mode to prevent overlap/residue -->
    <Transition name="effect-fade" mode="out-in">
      <component :is="currentEffectComponent" :key="props.effect" />
    </Transition>
  </div>
</template>

<style scoped>
.theme-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.effect-fade-enter-active,
.effect-fade-leave-active {
  transition: opacity 0.5s ease;
}

.effect-fade-enter-from,
.effect-fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.theme-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
