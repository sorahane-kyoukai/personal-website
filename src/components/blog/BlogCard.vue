<script setup lang="ts">
import type { BlogPost } from "@/types/blog";
import { categoryDisplayMap } from "@/data/categories";

interface Props {
  post: BlogPost;
  index: number;
}

const props = defineProps<Props>();

const cat = categoryDisplayMap[props.post.category] ?? { label: "文章", icon: "○" };
</script>

<template>
  <router-link
    :to="`/blog/${post.slug}`"
    class="blog-card"
    :style="{ '--stagger-delay': `${index * 60}ms` }"
  >
    <article class="card-inner">
      <!-- Left accent bar -->
      <div class="card-accent"></div>

      <div class="card-content">
        <!-- Meta row -->
        <div class="card-meta">
          <span class="card-category">{{ cat.icon }} {{ cat.label }}</span>
          <span class="meta-sep">/</span>
          <time :datetime="post.createdAt" class="card-date">
            {{ new Date(post.createdAt).toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" }) }}
          </time>
          <span class="meta-sep">/</span>
          <span class="card-readtime">{{ post.readingTime }} min read</span>
        </div>

        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-excerpt">{{ post.excerpt }}</p>

        <div class="card-tags">
          <span v-for="tag in post.tags.slice(0, 4)" :key="tag" class="tag">{{ tag }}</span>
          <span v-if="post.tags.length > 4" class="tag tag-more">+{{ post.tags.length - 4 }}</span>
        </div>
      </div>
    </article>
  </router-link>
</template>

<style scoped>
.blog-card {
  display: block;
  text-decoration: none;
  color: inherit;
  opacity: 0;
  animation: card-enter 0.4s ease forwards;
  animation-delay: var(--stagger-delay);
}

@keyframes card-enter {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card-inner {
  position: relative;
  display: flex;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;
}

.card-accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: rgba(100, 180, 255, 0.3);
  transition: background 0.2s ease;
}

.blog-card:hover .card-inner {
  border-color: rgba(100, 180, 255, 0.2);
  background: rgba(15, 23, 42, 0.65);
}

.blog-card:hover .card-accent {
  background: rgba(100, 180, 255, 0.55);
}

.card-content {
  flex: 1;
  padding: 22px 24px;
  position: relative;
  z-index: 1;
}

/* Meta */
.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-family: "JetBrains Mono", "Fira Code", "SF Mono", monospace;
  font-size: 11px;
  color: rgba(148, 163, 184, 0.5);
}

.card-category {
  color: rgba(148, 163, 184, 0.7);
  font-weight: 500;
}

.meta-sep {
  color: rgba(255, 255, 255, 0.1);
}

/* Title */
.card-title {
  font-family: var(--font-display-jp);
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.45;
  color: rgba(248, 250, 252, 0.92);
  margin-bottom: 8px;
}

/* Excerpt */
.card-excerpt {
  font-size: 0.9rem;
  line-height: 1.65;
  color: rgba(226, 232, 240, 0.55);
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tags */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-family: "JetBrains Mono", "Fira Code", "SF Mono", monospace;
  font-size: 10px;
  color: rgba(148, 163, 184, 0.45);
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.blog-card:hover .tag {
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(203, 213, 225, 0.65);
}

.tag-more {
  background: transparent;
  border-color: transparent;
}

@media (max-width: 640px) {
  .card-content {
    padding: 18px;
  }
  .card-title {
    font-size: 1.05rem;
  }
}
</style>
