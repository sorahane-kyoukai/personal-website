<script setup lang="ts">
import { ref, computed } from "vue";
import { blogPosts } from "@/data/blog-posts";
import BlogCard from "@/components/blog/BlogCard.vue";
import type { BlogCategory } from "@/types/blog";

const activeCategory = ref<BlogCategory | "all">("all");

const filteredPosts = computed(() => {
  if (activeCategory.value === "all") return blogPosts;
  return blogPosts.filter((post) => post.category === activeCategory.value);
});

const categories: { key: BlogCategory | "all"; label: string; icon: string }[] =
  [
    { key: "all", label: "全部文章", icon: "◈" },
    { key: "tech", label: "技術分享", icon: "◆" },
    { key: "essay", label: "隨筆筆記", icon: "◇" },
    { key: "community", label: "社群經營", icon: "◎" },
  ];
</script>

<template>
  <main id="main-content" class="blog-list-page">
    <!-- Hero Section -->
    <section class="blog-hero">
      <div class="hero-bg">
        <div class="hero-gradient"></div>
        <div class="hero-stars"></div>
      </div>
      <div class="hero-content">
        <div class="hero-icon">
          <span class="icon-symbol">◈</span>
        </div>
        <h1 class="hero-title">
          <span class="title-main">星塵書庫</span>
          <span class="title-sub">Stardust Archive</span>
        </h1>
        <p class="hero-description">
          技術探索、社群思考、學習筆記。<br />
          每一篇文章，都是夜空中的一顆星。
        </p>
        <div class="hero-divider">
          <span class="divider-line"></span>
          <span class="divider-star">✦</span>
          <span class="divider-line"></span>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="blog-filters">
      <nav class="filter-nav" aria-label="文章分類篩選" role="radiogroup">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="filter-btn"
          :class="{ 'filter-active': activeCategory === cat.key }"
          role="radio"
          :aria-checked="activeCategory === cat.key"
          @click="activeCategory = cat.key"
        >
          <span class="filter-icon">{{ cat.icon }}</span>
          <span class="filter-label">{{ cat.label }}</span>
          <span v-if="cat.key === 'all'" class="filter-count">{{
            blogPosts.length
          }}</span>
          <span v-else class="filter-count">{{
            blogPosts.filter((p) => p.category === cat.key).length
          }}</span>
        </button>
      </nav>
    </section>

    <!-- Blog Grid -->
    <section class="blog-grid-section">
      <div class="blog-grid">
        <BlogCard
          v-for="(post, index) in filteredPosts"
          :key="post.slug"
          :post="post"
          :index="index"
        />
      </div>

      <!-- Empty State -->
      <div v-if="filteredPosts.length === 0" class="empty-state">
        <div class="empty-icon">◌</div>
        <h3 class="empty-title">此分類尚無文章</h3>
        <p class="empty-description">更多內容正在撰寫中，敬請期待。</p>
      </div>
    </section>

    <!-- Footer CTA -->
    <section class="blog-footer">
      <div class="footer-inner">
        <p class="footer-text">更多技術分享與深度討論，歡迎加入</p>
        <a
          href="https://www.facebook.com/groups/915613384421068"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-cta"
        >
          硬核 AI 交流社
          <span class="cta-arrow">→</span>
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.blog-list-page {
  position: relative;
  min-height: 100vh;
  padding-top: var(--header-height);
  background: var(--color-night-void);
}

/* Hero */
.blog-hero {
  position: relative;
  padding: 100px 24px 80px;
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 50% 30%,
      rgba(67, 56, 202, 0.2) 0%,
      transparent 60%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(245, 197, 66, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 20% 60%,
      rgba(56, 189, 248, 0.06) 0%,
      transparent 40%
    );
}

.hero-stars {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      1px 1px at 10% 20%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 50%
    ),
    radial-gradient(
      1px 1px at 25% 40%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 50%
    ),
    radial-gradient(
      1px 1px at 40% 15%,
      rgba(255, 255, 255, 0.5) 50%,
      transparent 50%
    ),
    radial-gradient(
      1px 1px at 55% 35%,
      rgba(255, 255, 255, 0.35) 50%,
      transparent 50%
    ),
    radial-gradient(
      1px 1px at 70% 25%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 50%
    ),
    radial-gradient(
      1px 1px at 85% 45%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 50%
    ),
    radial-gradient(
      1px 1px at 15% 55%,
      rgba(255, 255, 255, 0.25) 50%,
      transparent 50%
    ),
    radial-gradient(
      1px 1px at 60% 50%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 50%
    ),
    radial-gradient(
      1px 1px at 90% 30%,
      rgba(255, 255, 255, 0.35) 50%,
      transparent 50%
    ),
    radial-gradient(
      1px 1px at 35% 65%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 50%
    ),
    radial-gradient(
      1px 1px at 75% 55%,
      rgba(255, 255, 255, 0.25) 50%,
      transparent 50%
    ),
    radial-gradient(
      1px 1px at 50% 60%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 50%
    );
  animation: stars-shift 20s linear infinite;
}

@keyframes stars-shift {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-icon {
  margin-bottom: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(245, 197, 66, 0.2);
  backdrop-filter: blur(8px);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.icon-symbol {
  font-size: 28px;
  color: var(--color-sun-gold);
  filter: drop-shadow(0 0 8px rgba(245, 197, 66, 0.4));
}

.hero-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
}

.title-main {
  font-family: var(--font-display-jp);
  font-size: clamp(36px, 6vw, 52px);
  font-weight: 600;
  color: var(--color-star-white);
  letter-spacing: 0.15em;
  text-shadow:
    0 0 20px rgba(248, 250, 252, 0.3),
    0 0 40px rgba(245, 197, 66, 0.15);
}

.title-sub {
  font-family: var(--font-display-en);
  font-size: 14px;
  font-style: italic;
  color: rgba(226, 232, 240, 0.5);
  letter-spacing: 0.35em;
  text-transform: uppercase;
}

.hero-description {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: rgba(226, 232, 240, 0.65);
  line-height: 1.8;
  max-width: 440px;
  margin: 0 auto;
}

.hero-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}

.divider-line {
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15));
}

.divider-star {
  color: var(--color-sun-gold);
  font-size: 12px;
  filter: drop-shadow(0 0 4px rgba(245, 197, 66, 0.5));
}

/* Filters */
.blog-filters {
  position: sticky;
  top: var(--header-height);
  z-index: 30;
  padding: 16px 24px;
  background: rgba(10, 14, 26, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.filter-nav {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  color: rgba(226, 232, 240, 0.6);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(226, 232, 240, 0.9);
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-1px);
}

.filter-btn:focus-visible {
  outline: 2px solid var(--color-sun-gold);
  outline-offset: 2px;
}

.filter-active {
  background: rgba(245, 197, 66, 0.18);
  border-color: rgba(245, 197, 66, 0.45);
  color: var(--color-amber-glow);
  box-shadow: 0 0 16px rgba(245, 197, 66, 0.12);
}

.filter-active:hover {
  background: rgba(245, 197, 66, 0.22);
  border-color: rgba(245, 197, 66, 0.55);
  color: var(--color-amber-glow);
}

.filter-icon {
  font-size: 12px;
}

.filter-label {
  font-weight: 500;
  letter-spacing: 0.04em;
}

.filter-count {
  font-size: 11px;
  padding: 1px 7px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  color: rgba(148, 163, 184, 0.6);
}

.filter-active .filter-count {
  background: rgba(217, 119, 6, 0.18);
  color: var(--color-amber-glow);
}

/* Blog Grid */
.blog-grid-section {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

.blog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 100px 24px;
}

.empty-icon {
  font-size: 48px;
  color: rgba(255, 255, 255, 0.15);
  margin-bottom: 20px;
  animation: float 4s ease-in-out infinite;
}

.empty-title {
  font-family: var(--font-display-jp);
  font-size: 1.25rem;
  color: rgba(226, 232, 240, 0.5);
  margin-bottom: 8px;
}

.empty-description {
  font-size: 0.95rem;
  color: rgba(148, 163, 184, 0.4);
}

/* Footer CTA */
.blog-footer {
  padding: 60px 24px 80px;
  text-align: center;
}

.footer-inner {
  max-width: 500px;
  margin: 0 auto;
  padding: 36px;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
}

.footer-text {
  font-size: 0.95rem;
  color: rgba(226, 232, 240, 0.5);
  margin-bottom: 16px;
}

.footer-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: rgba(245, 197, 66, 0.1);
  border: 1px solid rgba(245, 197, 66, 0.25);
  border-radius: 999px;
  color: var(--color-sun-gold);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-cta:hover {
  background: rgba(245, 197, 66, 0.18);
  border-color: rgba(245, 197, 66, 0.45);
  box-shadow: 0 0 24px rgba(245, 197, 66, 0.15);
  transform: translateY(-2px);
}

.cta-arrow {
  transition: transform 0.3s ease;
}

.footer-cta:hover .cta-arrow {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 640px) {
  .blog-hero {
    padding: 60px 20px 50px;
  }

  .hero-icon {
    width: 56px;
    height: 56px;
  }

  .icon-symbol {
    font-size: 22px;
  }

  .blog-grid-section {
    padding: 32px 16px 60px;
  }

  .filter-nav {
    gap: 6px;
  }

  .filter-btn {
    padding: 6px 14px;
    font-size: 13px;
  }
}
</style>
