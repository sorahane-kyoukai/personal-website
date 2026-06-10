<script setup lang="ts">
import { computed } from "vue";
import { blogPosts } from "@/data/blog-posts";
import { categoryDisplayMap, categoryLabelMap } from "@/data/categories";
import type { BlogCategory } from "@/types/blog";

interface Props {
  activeCategory: BlogCategory | "all";
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:activeCategory": [value: BlogCategory | "all"];
}>();

const categories = computed(() => {
  const items: Array<{
    key: BlogCategory | "all";
    label: string;
    count: number;
    isActive: boolean;
  }> = [
    {
      key: "all",
      label: "所有文章",
      count: blogPosts.length,
      isActive: props.activeCategory === "all",
    },
  ];

  for (const [key] of Object.entries(categoryDisplayMap)) {
    const catKey = key as BlogCategory;
    items.push({
      key: catKey,
      label: categoryLabelMap[catKey],
      count: blogPosts.filter((p) => p.category === catKey).length,
      isActive: props.activeCategory === catKey,
    });
  }

  return items;
});

/** Collect all unique tags from all posts, sorted alphabetically. */
const allTags = computed(() => {
  const tagSet = new Set<string>();
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, "zh-Hant"));
});

function selectCategory(key: BlogCategory | "all"): void {
  emit("update:activeCategory", key);
}
</script>

<template>
  <aside class="sidebar" aria-label="文章分類與標籤">
    <!-- Categories -->
    <div class="sidebar-section">
      <h3 class="sidebar-heading">
        <span class="heading-icon">◆</span>
        <span>分類</span>
      </h3>
      <nav class="category-list" role="radiogroup" aria-label="文章分類">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="category-item"
          :class="{ 'category-active': cat.isActive }"
          role="radio"
          :aria-checked="cat.isActive"
          @click="selectCategory(cat.key)"
        >
          <span class="category-active-bar" aria-hidden="true"></span>
          <span class="category-label">{{ cat.label }}</span>
          <span class="category-count" :class="{ 'count-active': cat.isActive }">
            {{ cat.count }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Divider -->
    <div class="sidebar-divider"></div>

    <!-- Tags Cloud -->
    <div class="sidebar-section">
      <h3 class="sidebar-heading">
        <span class="heading-icon">#</span>
        <span>標籤</span>
      </h3>
      <div class="tag-cloud">
        <span
          v-for="tag in allTags"
          :key="tag"
          class="tag-chip"
        >{{ tag }}</span>
      </div>
    </div>

    <!-- Stats -->
    <div class="sidebar-section">
      <h3 class="sidebar-heading">
        <span class="heading-icon">◈</span>
        <span>統計</span>
      </h3>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-value">{{ blogPosts.length }}</span>
          <span class="stat-label">篇文章</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ allTags.length }}</span>
          <span class="stat-label">個標籤</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 24px 20px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  position: sticky;
  top: calc(var(--header-height) + 24px);
}

/* ── Sections ──────────────────────────────────────────────────── */

.sidebar-section {
  padding: 16px 0;
}

.sidebar-section:first-child {
  padding-top: 0;
}

.sidebar-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  color: rgba(226, 232, 240, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 14px;
  padding: 0 4px;
}

.heading-icon {
  font-size: 10px;
  color: var(--color-sun-gold);
  opacity: 0.6;
}

/* ── Category List ─────────────────────────────────────────────── */

.category-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.category-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: rgba(226, 232, 240, 0.6);
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    padding-left 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.category-item:hover {
  background: rgba(255, 255, 255, 0.04);
  color: rgba(226, 232, 240, 0.85);
  padding-left: 16px;
}

.category-item:focus-visible {
  outline: 2px solid var(--color-sun-gold);
  outline-offset: -2px;
  border-radius: 8px;
}

/* Active bar — slides in from left */
.category-active-bar {
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 6px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: linear-gradient(
    180deg,
    var(--color-sun-gold),
    var(--color-cosmic-purple-light)
  );
  transform: scaleY(0);
  opacity: 0;
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.3s ease;
}

.category-active .category-active-bar {
  transform: scaleY(1);
  opacity: 1;
}

.category-active {
  background: rgba(245, 197, 66, 0.06);
  color: var(--color-star-white);
  font-weight: 500;
  padding-left: 16px;
}

.category-active:hover {
  background: rgba(245, 197, 66, 0.09);
  color: var(--color-star-white);
}

.category-label {
  flex: 1;
  letter-spacing: 0.03em;
}

.category-count {
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 999px;
  color: rgba(148, 163, 184, 0.55);
  min-width: 24px;
  text-align: center;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.count-active {
  background: rgba(245, 197, 66, 0.15);
  color: var(--color-sun-gold);
  transform: scale(1.1);
}

/* ── Divider ──────────────────────────────────────────────────── */

.sidebar-divider {
  height: 1px;
  margin: 0 4px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.06) 50%,
    transparent 100%
  );
}

/* ── Tag Cloud ─────────────────────────────────────────────────── */

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 4px;
}

.tag-chip {
  font-size: 11px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  color: rgba(148, 163, 184, 0.55);
  cursor: default;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.tag-chip:hover {
  background: rgba(67, 56, 202, 0.12);
  border-color: rgba(67, 56, 202, 0.25);
  color: rgba(203, 213, 225, 0.85);
  transform: translateY(-1px);
}

/* ── Stats ─────────────────────────────────────────────────────── */

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 0 4px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
}

.stat-value {
  font-family: var(--font-display-en);
  font-size: 22px;
  font-weight: 600;
  color: var(--color-star-white);
  text-shadow: 0 0 12px rgba(248, 250, 252, 0.15);
}

.stat-label {
  font-size: 11px;
  color: rgba(148, 163, 184, 0.5);
  letter-spacing: 0.06em;
}
</style>
