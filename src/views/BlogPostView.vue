<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import ReadingProgress from "@/components/blog/ReadingProgress.vue";
import BlogPostContent from "@/components/blog/BlogPostContent.vue";
import { categoryLabelMap } from "@/data/categories";

const route = useRoute();
const router = useRouter();

const slug = computed(() => route.params.slug as string);
const post = computed(() => getPostBySlug(slug.value));
const relatedPosts = computed(() =>
  post.value ? getRelatedPosts(post.value.slug, 3) : [],
);

function copyCurrentUrl(): void {
  navigator.clipboard.writeText(window.location.href).catch(() => {
    // Silently fail if clipboard API is unavailable
  });
}

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

if (!post.value) {
  router.replace("/blog");
}
</script>

<template>
  <main v-if="post" id="main-content" class="blog-post-page">
    <ReadingProgress />

    <article class="post-article">
      <!-- Hero Header -->
      <header class="post-header">
        <div class="header-bg">
          <div class="header-gradient"></div>
        </div>

        <div class="header-content">
          <!-- Back Link -->
          <router-link to="/blog" class="back-link">
            <span class="back-arrow">←</span>
            <span class="back-text">返回星塵書庫</span>
          </router-link>

          <!-- Category -->
          <div class="post-category">
            <span class="category-dot"></span>
            <span>{{ categoryLabelMap[post.category] ?? post.category }}</span>
          </div>

          <!-- Title -->
          <h1 class="post-title">{{ post.title }}</h1>

          <!-- Meta -->
          <div class="post-meta">
            <div class="meta-main">
              <time :datetime="post.createdAt" class="meta-date">
                {{
                  new Date(post.createdAt).toLocaleDateString("zh-TW", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </time>
              <span class="meta-divider">·</span>
              <span class="meta-reading">{{ post.readingTime }} 分鐘閱讀</span>
              <span class="meta-divider">·</span>
              <span class="meta-author">{{ post.authorName }}</span>
            </div>
          </div>

          <!-- Tags -->
          <div class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="post-tag">{{
              tag
            }}</span>
          </div>

          <!-- Excerpt -->
          <p class="post-excerpt">{{ post.excerpt }}</p>
        </div>
      </header>

      <!-- Content Body -->
      <div class="post-body">
        <div class="post-body-inner">
          <BlogPostContent :blocks="post.content" />
        </div>
      </div>

      <!-- Share Section -->
      <div class="post-share">
        <div class="share-divider">
          <span class="share-line"></span>
          <span class="share-star">✦</span>
          <span class="share-line"></span>
        </div>
        <p class="share-text">如果這篇文章對你有幫助，歡迎分享</p>
        <div class="share-buttons">
          <button class="share-btn" @click="copyCurrentUrl">
            <span class="share-icon">🔗</span>
            <span>複製連結</span>
          </button>
        </div>
      </div>

      <!-- Related Posts -->
      <div v-if="relatedPosts.length > 0" class="post-related">
        <h2 class="related-title">相關文章</h2>
        <div class="related-grid">
          <router-link
            v-for="related in relatedPosts"
            :key="related.slug"
            :to="`/blog/${related.slug}`"
            class="related-card"
          >
            <div class="related-category">
              <span class="related-dot"></span>
              {{ categoryLabelMap[related.category] ?? related.category }}
            </div>
            <h3 class="related-post-title">{{ related.title }}</h3>
            <p class="related-excerpt">{{ related.excerpt }}</p>
          </router-link>
        </div>
      </div>
    </article>

    <!-- Back to Top -->
    <button class="back-to-top" @click="scrollToTop" aria-label="回到頁面頂端">
      <span class="top-arrow">↑</span>
    </button>
  </main>
</template>

<style scoped>
.blog-post-page {
  position: relative;
  min-height: 100vh;
  padding-top: var(--header-height);
  background: var(--color-night-void);
}

/* Header */
.post-header {
  position: relative;
  padding: 80px 24px 60px;
  overflow: hidden;
}

.header-bg {
  position: absolute;
  inset: 0;
}

.header-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(67, 56, 202, 0.18) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 50%,
      rgba(245, 197, 66, 0.06) 0%,
      transparent 40%
    ),
    linear-gradient(
      180deg,
      rgba(10, 14, 26, 0) 0%,
      var(--color-night-void) 100%
    );
}

.header-content {
  position: relative;
  z-index: 1;
  max-width: 780px;
  margin: 0 auto;
}

/* Back Link */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  color: rgba(226, 232, 240, 0.55);
  font-size: 14px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.back-link:hover {
  color: var(--color-star-white);
}

.back-link:hover .back-arrow {
  transform: translateX(-4px);
}

.back-arrow {
  font-size: 16px;
  transition: transform 0.3s ease;
}

/* Category */
.post-category {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-sun-gold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.category-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-sun-gold);
  box-shadow: 0 0 8px rgba(245, 197, 66, 0.5);
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 8px rgba(245, 197, 66, 0.5);
  }
  50% {
    box-shadow: 0 0 16px rgba(245, 197, 66, 0.8);
  }
}

/* Title */
.post-title {
  font-family: var(--font-display-jp);
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 600;
  line-height: 1.35;
  color: var(--color-star-white);
  text-shadow: 0 0 20px rgba(248, 250, 252, 0.2);
  margin-bottom: 24px;
  letter-spacing: 0.06em;
}

/* Meta */
.post-meta {
  margin-bottom: 20px;
}

.meta-main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: rgba(226, 232, 240, 0.55);
}

.meta-divider {
  color: rgba(255, 255, 255, 0.15);
}

/* Tags */
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.post-tag {
  font-size: 12px;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  color: rgba(148, 163, 184, 0.65);
  transition: all 0.3s ease;
}

.post-tag:hover {
  border-color: rgba(245, 197, 66, 0.3);
  color: var(--color-sun-gold);
  background: rgba(245, 197, 66, 0.06);
}

/* Excerpt */
.post-excerpt {
  font-size: 1.1rem;
  color: rgba(226, 232, 240, 0.6);
  line-height: 1.8;
  font-style: italic;
}

/* Body */
.post-body {
  padding: 0 24px 80px;
}

.post-body-inner {
  max-width: 780px;
  margin: 0 auto;
}

/* Share */
.post-share {
  max-width: 780px;
  margin: 0 auto;
  padding: 40px 24px 60px;
  text-align: center;
}

.share-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.share-line {
  width: 48px;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.share-star {
  color: var(--color-sun-gold);
  font-size: 12px;
}

.share-text {
  font-size: 0.95rem;
  color: rgba(226, 232, 240, 0.45);
  margin-bottom: 20px;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  color: rgba(226, 232, 240, 0.7);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(245, 197, 66, 0.3);
  color: var(--color-star-white);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(245, 197, 66, 0.1);
}

.share-btn:active {
  transform: translateY(0) scale(0.97);
}

.share-icon {
  font-size: 14px;
}

/* Related Posts */
.post-related {
  max-width: 780px;
  margin: 0 auto;
  padding: 60px 24px 80px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.related-title {
  font-family: var(--font-display-jp);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-star-white);
  margin-bottom: 28px;
  text-shadow: 0 0 12px rgba(248, 250, 252, 0.1);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.related-card {
  display: block;
  padding: 22px;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s var(--ease-out-expo);
}

.related-card:hover {
  border-color: rgba(245, 197, 66, 0.2);
  background: rgba(15, 23, 42, 0.7);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.related-category {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--color-sun-gold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 10px;
}

.related-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-sun-gold);
}

.related-post-title {
  font-family: var(--font-display-jp);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-star-white);
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-excerpt {
  font-size: 0.85rem;
  color: rgba(226, 232, 240, 0.5);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Back to Top */
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: var(--color-moon-silver);
  font-size: 18px;
  cursor: pointer;
  z-index: 30;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s var(--ease-out-expo);
  pointer-events: none;
}

.back-to-top:hover {
  border-color: rgba(245, 197, 66, 0.3);
  color: var(--color-sun-gold);
  box-shadow: 0 0 20px rgba(245, 197, 66, 0.15);
  transform: translateY(-2px);
}

/* Show back to top when scrolled */
@media (min-width: 641px) {
  .back-to-top {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
}

/* Responsive */
@media (max-width: 640px) {
  .post-header {
    padding: 40px 20px 40px;
  }

  .post-body {
    padding: 0 20px 60px;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }

  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
  }
}
</style>
