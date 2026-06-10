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
    :style="{ '--card-index': index, '--stagger-delay': `${index * 80}ms` }"
  >
    <article class="card-inner">
      <!-- Category Badge -->
      <div class="card-badge">
        <span class="badge-icon">{{ cat.icon }}</span>
        <span class="badge-label">{{ cat.label }}</span>
      </div>

      <!-- Featured Star -->
      <div v-if="post.featured" class="featured-star" title="精選文章">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      </div>

      <!-- Content -->
      <div class="card-content">
        <div class="card-meta">
          <time :datetime="post.createdAt" class="card-date">
            {{
              new Date(post.createdAt).toLocaleDateString("zh-TW", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </time>
          <span class="meta-dot">·</span>
          <span class="card-reading-time">{{ post.readingTime }} 分鐘閱讀</span>
        </div>

        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-excerpt">{{ post.excerpt }}</p>

        <!-- Tags -->
        <div class="card-tags">
          <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag"
            >#{{ tag }}</span
          >
          <span v-if="post.tags.length > 3" class="tag tag-more"
            >+{{ post.tags.length - 3 }}</span
          >
        </div>
      </div>

      <!-- Hover Glow -->
      <div class="card-glow"></div>
    </article>
  </router-link>
</template>

<style scoped>
.blog-card {
  display: block;
  text-decoration: none;
  color: inherit;
  opacity: 0;
  animation: card-enter 0.6s var(--ease-out-expo) forwards;
  animation-delay: var(--stagger-delay);
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-inner {
  position: relative;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 28px;
  overflow: hidden;
  transition: all 0.4s var(--ease-out-expo);
}

.card-inner::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 30% 20%,
    rgba(67, 56, 202, 0.12) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
}

.blog-card:hover .card-inner,
.blog-card:focus-visible .card-inner {
  transform: translateY(-4px);
  border-color: rgba(245, 197, 66, 0.25);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(245, 197, 66, 0.15),
    0 0 60px rgba(245, 197, 66, 0.08);
}

.blog-card:active .card-inner {
  transform: translateY(-1px) scale(0.98);
}

.blog-card:hover .card-inner::before,
.blog-card:focus-visible .card-inner::before {
  opacity: 1;
}

/* Category Badge */
.card-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(245, 197, 66, 0.1);
  border: 1px solid rgba(245, 197, 66, 0.2);
  border-radius: 999px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.blog-card:hover .card-badge {
  background: rgba(245, 197, 66, 0.15);
  border-color: rgba(245, 197, 66, 0.35);
  transform: translateY(-1px);
}

.badge-icon {
  font-size: 10px;
  color: var(--color-sun-gold);
}

.badge-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-sun-gold);
  letter-spacing: 0.06em;
}

/* Featured Star */
.featured-star {
  position: absolute;
  top: 20px;
  right: 20px;
  color: var(--color-sun-gold);
  filter: drop-shadow(0 0 6px rgba(245, 197, 66, 0.5));
  animation: float-star 3s ease-in-out infinite;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
}

@keyframes float-star {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-4px) rotate(15deg);
  }
}

.blog-card:hover .featured-star {
  transform: scale(1.2);
  filter: drop-shadow(0 0 12px rgba(245, 197, 66, 0.8));
}

/* Content */
.card-content {
  position: relative;
  z-index: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--color-moon-silver);
  margin-bottom: 14px;
  opacity: 0.75;
}

.meta-dot {
  color: rgba(255, 255, 255, 0.3);
}

.card-reading-time {
  color: rgba(226, 232, 240, 0.6);
}

.card-title {
  font-family: var(--font-display-jp);
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.45;
  color: var(--color-star-white);
  margin-bottom: 12px;
  text-shadow: 0 0 12px rgba(248, 250, 252, 0.15);
  transition:
    color 0.3s ease,
    text-shadow 0.3s ease;
}

.blog-card:hover .card-title {
  text-shadow:
    0 0 20px rgba(248, 250, 252, 0.25),
    0 0 40px rgba(245, 197, 66, 0.15);
}

.card-excerpt {
  font-family: var(--font-body);
  font-size: 0.925rem;
  line-height: 1.7;
  color: rgba(226, 232, 240, 0.7);
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tags */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 12px;
  color: rgba(148, 163, 184, 0.75);
  padding: 3px 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  transition: all 0.3s ease;
}

.blog-card:hover .tag {
  border-color: rgba(255, 255, 255, 0.12);
  color: rgba(203, 213, 225, 0.9);
}

.tag-more {
  background: transparent;
  border-color: transparent;
  color: rgba(148, 163, 184, 0.5);
}

/* Hover Glow */
.card-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(245, 197, 66, 0.6) 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.blog-card:hover .card-glow {
  opacity: 1;
}

/* Responsive */
@media (max-width: 640px) {
  .card-inner {
    padding: 22px;
    border-radius: 12px;
  }

  .card-title {
    font-size: 1.15rem;
  }
}
</style>
