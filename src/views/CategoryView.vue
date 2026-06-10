<script setup lang="ts">
import { computed } from "vue";
import ThemeBackground from "@/components/ui/ThemeBackground.vue";
import { useCategoryTheme } from "@/composables/useCategoryTheme";

const { currentTheme } = useCategoryTheme();

const themeStyles = computed(() => ({
  "--theme-primary": currentTheme.value.colors.primary,
  "--theme-accent": currentTheme.value.colors.accent,
  "--theme-text": currentTheme.value.colors.text,
  "--theme-bg-overlay": currentTheme.value.colors.bgOverlay,
  "--theme-font-family": currentTheme.value.fontFamily || "inherit",
  "--theme-text-shadow": currentTheme.value.textShadow || "none",
}));

const bgImage = computed(() => currentTheme.value.backgroundImage || "");
</script>

<template>
  <main
    class="category-page"
    :class="[`layout-${currentTheme.layoutMode}`]"
    :style="themeStyles"
  >
    <!-- Background -->
    <div class="category-bg">
      <img v-if="bgImage" :src="bgImage" alt="" class="bg-image" />
      <!-- Fallback color if no image -->
      <div v-else class="bg-solid"></div>

      <div class="bg-overlay"></div>
      <ThemeBackground :effect="currentTheme.bgEffect" />
    </div>

    <!-- Content -->
    <div class="category-content">
      <div class="category-header">
        <div class="category-icon">
          <img :src="currentTheme.icon" alt="" />
        </div>
        <div class="header-text">
          <h1 class="category-title">{{ currentTheme.title }}</h1>
          <p class="category-subtitle">{{ currentTheme.subtitle }}</p>
        </div>
        <p class="category-description">{{ currentTheme.description }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.category-page {
  position: relative;
  min-height: 100vh;
  padding-top: calc(var(--header-height) + 16px);
  color: var(--theme-text);
  font-family: var(--theme-font-family);
}

/* Background */
.category-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.8s ease; /* Smoother transition */
}

.bg-solid {
  width: 100%;
  height: 100%;
  background-color: #0f172a; /* Fallback dark */
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: var(--theme-bg-overlay);
  transition: background 0.8s ease;
}

/* Content Layout Generic */
.category-content {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;
}

.category-header {
  margin-bottom: 60px;
  transition: all 0.5s ease;
}

.category-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--theme-primary);
  border-radius: 50%;
  margin-bottom: 24px;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.category-icon img {
  width: 95%;
  height: 95%;
  object-fit: contain;
  filter: drop-shadow(0 0 5px rgba(var(--theme-primary), 0.5));
}

.category-title {
  font-family: var(--theme-font-family);
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 600;
  color: var(--theme-text);
  margin-bottom: 8px;
  text-shadow: var(--theme-text-shadow);
  transition: text-shadow 0.3s ease;
}

.category-subtitle {
  font-family: var(--font-display-en);
  font-size: 16px;
  font-style: italic;
  color: var(--theme-primary);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0.9;
  text-shadow: var(--theme-text-shadow);
}

.category-description {
  font-size: 15px;
  color: var(--theme-text);
  opacity: 0.9;
  max-width: 500px;
  line-height: 1.8;
  text-shadow: var(--theme-text-shadow);
}

/* --- Layout Modes --- */

/* Center (Default/Anime/Music) */
.layout-center .category-header {
  text-align: center;
}
.layout-center .category-description {
  margin: 0 auto;
}

/* Left (Galgame) */
.layout-left .category-header {
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;
  border-left: 4px solid var(--theme-primary);
}
.layout-left .category-icon {
  width: 60px;
  height: 60px;
  font-size: 24px;
  margin-bottom: 16px;
}
.layout-left .category-title {
  font-size: clamp(40px, 7vw, 64px); /* Larger title */
}

/* Zen (Thoughts) */
.layout-zen .category-header {
  text-align: center;
  margin-bottom: 100px;
}
.layout-zen .category-icon {
  background: transparent;
  border: none;
  font-size: 40px;
  color: var(--theme-text);
}
.layout-zen .category-title {
  font-weight: 400;
  letter-spacing: 0.2em;
  text-shadow: none; /* Clean look */
}
.layout-zen .bg-image {
  filter: grayscale(100%) contrast(1.2); /* Black and white feel */
  opacity: 0.2;
}
</style>
