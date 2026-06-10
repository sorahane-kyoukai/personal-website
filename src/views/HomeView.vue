<script setup lang="ts">
import { watch } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useScrollProgress } from "@/composables/useScrollProgress";
import CosmicParticles from "@/components/ui/CosmicParticles.vue";
import HeroSection from "@/components/home/HeroSection.vue";
import CosmicGiantSection from "@/components/home/CosmicGiantSection.vue";
import CategoriesSection from "@/components/home/CategoriesSection.vue";
import { getAssetUrl } from "@/utils/assets";

const scrollStore = useScrollStore();
const { progress } = useScrollProgress();

// Update store only when progress changes (not every frame)
watch(
  progress,
  (newProgress) => {
    scrollStore.setScrollProgress(newProgress ?? 0);
  },
  { immediate: true },
);
</script>

<template>
  <main class="home-page">
    <!-- Background Layers -->
    <div class="background-container">
      <!-- Hero Background (Twilight) -->
      <div
        class="bg-layer bg-hero"
        :style="{ opacity: scrollStore.backgroundOpacities.hero }"
      >
        <img
          :src="getAssetUrl('/images/hero_bg.webp')"
          alt=""
          class="bg-image"
          loading="eager"
        />
      </div>

      <!-- Universe Background (Night) -->
      <div
        class="bg-layer bg-universe"
        :style="{ opacity: scrollStore.backgroundOpacities.universe }"
      >
        <img
          :src="getAssetUrl('/images/universe_bg.webp')"
          alt=""
          class="bg-image"
          loading="lazy"
        />
      </div>

      <!-- Sunrise Background (Dawn) -->
      <div
        class="bg-layer bg-sunrise"
        :style="{ opacity: scrollStore.backgroundOpacities.sunrise }"
      >
        <img
          :src="getAssetUrl('/images/sunrise_bg.webp')"
          alt=""
          class="bg-image"
          loading="lazy"
        />
      </div>

      <!-- Gradient Overlay -->
      <div class="gradient-overlay"></div>
    </div>

    <!-- Enhanced Space Effect (Meteors, Stars, Nebula) -->
    <!-- Moved outside background-container to ensure visibility -->
    <CosmicParticles />

    <!-- Content Sections -->
    <div class="content-container">
      <HeroSection />
      <CosmicGiantSection />
      <CategoriesSection />
    </div>
  </main>
</template>

<style scoped>
.home-page {
  position: relative;
  min-height: 100vh;
}

/* Background Container */
.background-container {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.bg-layer {
  position: absolute;
  inset: 0;
  transition: opacity 0.5s ease;
  will-change: opacity;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.star-overlay {
  position: absolute;
  inset: 0;
  transition: opacity 0.8s ease;
  pointer-events: none;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 14, 26, 0.3) 0%,
    rgba(10, 14, 26, 0.1) 50%,
    rgba(10, 14, 26, 0.4) 100%
  );
  pointer-events: none;
}

/* Content Container */
.content-container {
  position: relative;
  z-index: 10;
}
</style>
