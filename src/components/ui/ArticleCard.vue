<script setup lang="ts">
import { computed } from "vue";

interface Props {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  variant?:
    | "dialog"
    | "tech"
    | "minimal"
    | "soft"
    | "default";
  thumbnail?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  thumbnail: "",
});

const variantClass = computed(() => `card-${props.variant}`);
</script>

<template>
  <article class="article-card" :class="variantClass">
    <div
      v-if="thumbnail"
      class="card-thumbnail"
    >
      <img :src="thumbnail" :alt="title" loading="lazy" />
      <div class="thumbnail-overlay"></div>
    </div>

    <div class="card-content">
      <div class="card-meta">
        <time :datetime="date" class="card-date">{{ date }}</time>
        <div class="card-tags">
          <span v-for="tag in tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
      </div>

      <h3 class="card-title">
        <a href="#" class="title-link">{{ title }}</a>
      </h3>

      <p class="card-excerpt">{{ excerpt }}</p>

      <div class="card-footer">
        <a href="#" class="read-more">
          Read Article
          <span class="arrow">→</span>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Base Reset */
.article-card {
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
}

/* Base Styles (Default) */
.article-card:not([class*="card-"]) {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Image Handling */
.card-thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.thumbnail-overlay {
  position: absolute;
  inset: 0;
  background: var(
    --theme-bg-gradient,
    linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)
  );
  opacity: 0.6;
}

/* Content Layout */
.card-content {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Typography */
.card-title {
  font-family: var(--theme-font-family, var(--font-display-jp));
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 1.4;
  color: var(--theme-text, #fff);
}

.card-excerpt {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--theme-text);
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.read-more {
  color: var(--theme-accent, #fff);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* --- VARIANTS --- */

/* 1. Galgame (Dialog Box - Light) */

.card-dialog {
  border-radius: 4px;

  background: rgba(255, 255, 255, 0.5);

  backdrop-filter: blur(12px);

  border: 1px solid rgba(255, 255, 255, 0.6);

  border-top: 3px solid var(--theme-primary);

  box-shadow: 0 4px 15px rgba(219, 39, 119, 0.1);
}

.card-dialog .card-content {
  padding: 24px;
}

.card-dialog .card-title {
  color: var(--theme-text); /* Dark Pink */

  font-size: 1.4rem;

  margin-bottom: 16px;

  position: relative;

  display: inline-block;
}

.card-dialog .card-title::after {
  content: "";

  display: block;

  width: 100%;

  height: 1px;

  background: linear-gradient(90deg, var(--theme-primary), transparent);

  margin-top: 4px;
}

.card-dialog:hover {
  transform: translateY(-2px);

  background: rgba(255, 255, 255, 0.7);

  box-shadow: 0 8px 25px rgba(219, 39, 119, 0.2);
}

/* 2. Anime (Tech Interface - Light) */

.card-tech {
  background: rgba(255, 255, 255, 0.6);

  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );

  border-left: 2px solid var(--theme-primary);

  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.1);
}

.card-tech::before {
  content: "";

  position: absolute;

  top: 0;

  right: 0;

  width: 20px;

  height: 20px;

  border-top: 2px solid var(--theme-accent);

  border-right: 2px solid var(--theme-accent);
}

.card-tech .card-title {
  color: var(--theme-text); /* Dark Blue */
}

.card-tech:hover {
  transform: translateX(5px);

  background: rgba(255, 255, 255, 0.8);

  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.2);
}

/* 3. Minimal (Thoughts/Zen) */

.card-minimal {
  background: transparent;

  border: none;

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  border-radius: 0;

  /* Local gradient to ensure text pops against image */

  background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 80%);
}

.card-minimal .card-content {
  padding: 24px 12px;
}

.card-minimal .card-thumbnail {
  aspect-ratio: 21 / 9; /* Wider, cinematic */

  opacity: 0.9; /* More visible */

  filter: grayscale(40%); /* Less gray */

  transition: all 0.5s ease;
}

.card-minimal:hover .card-thumbnail {
  opacity: 1;

  filter: grayscale(0%);
}

.card-minimal .card-title {
  font-size: 1.5rem;

  letter-spacing: 0.1em;

  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8); /* Ensure readability */
}

/* 4. Health (Soft/Organic - Warm) */

.card-soft {
  border-radius: 24px;

  background: rgba(255, 255, 255, 0.6);

  backdrop-filter: blur(12px);

  border: 1px solid rgba(245, 158, 11, 0.3);

  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.1);
}

.card-soft .card-title {
  color: var(--theme-text);
}

.card-soft:hover {
  transform: scale(1.02);

  background: rgba(255, 255, 255, 0.8);

  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.25);
}

</style>
