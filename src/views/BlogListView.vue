<script setup lang="ts">
import { ref, computed } from "vue";
import { blogPosts } from "@/data/blog-posts";
import BlogCard from "@/components/blog/BlogCard.vue";
import BlogSidebar from "@/components/blog/BlogSidebar.vue";
import type { BlogCategory } from "@/types/blog";

const activeCategory = ref<BlogCategory | "all">("all");

const filteredPosts = computed(() => {
  if (activeCategory.value === "all") return blogPosts;
  return blogPosts.filter((post) => post.category === activeCategory.value);
});

const activeLabel = computed(() => {
  if (activeCategory.value === "all") return "全部文章";
  return blogPosts
    .filter((p) => p.category === activeCategory.value)
    .length > 0
    ? `${blogPosts.filter((p) => p.category === activeCategory.value).length} 篇`
    : "尚無文章";
});
</script>

<template>
  <main id="main-content" class="blog-list-page">
    <!-- Compact Hero -->
    <section class="blog-hero">
      <div class="hero-content">
        <div class="hero-top">
          <h1 class="hero-title">
            <span class="title-icon">◈</span>
            星塵筆記
          </h1>
          <span class="hero-sub">Stardust Notes</span>
        </div>
        <p class="hero-desc">
          技術探索、社群思考、學習筆記。每一篇文章，都是夜空中的一顆星。
        </p>
      </div>
      <div class="hero-line"></div>
    </section>

    <!-- Content Area: Grid + Sidebar -->
    <div class="blog-layout">
      <!-- Main Content -->
      <section class="blog-main">
        <!-- Mobile Filter Strip -->
        <nav
          class="mobile-filters"
          aria-label="文章分類篩選"
          role="radiogroup"
        >
          <button
            class="mobile-filter-chip"
            :class="{ 'chip-active': activeCategory === 'all' }"
            role="radio"
            :aria-checked="activeCategory === 'all'"
            @click="activeCategory = 'all'"
          >
            全部<span class="chip-count">{{ blogPosts.length }}</span>
          </button>
          <button
            v-for="cat in (['tech', 'essay', 'community'] as BlogCategory[])"
            :key="cat"
            class="mobile-filter-chip"
            :class="{ 'chip-active': activeCategory === cat }"
            role="radio"
            :aria-checked="activeCategory === cat"
            @click="activeCategory = cat"
          >
            {{ { tech: '技術', essay: '隨筆', community: '社群' }[cat] }}
            <span class="chip-count">{{
              blogPosts.filter((p) => p.category === cat).length
            }}</span>
          </button>
        </nav>

        <!-- Active indicator -->
        <div class="section-header">
          <span class="section-indicator"></span>
          <span class="section-label">{{ activeLabel }}</span>
        </div>

        <!-- Blog Grid -->
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

      <!-- Desktop Sidebar -->
      <div class="blog-sidebar">
        <BlogSidebar
          :active-category="activeCategory"
          @update:active-category="activeCategory = $event"
        />
      </div>
    </div>

    <!-- Footer -->
    <footer class="blog-footer">
      <a
        href="https://www.facebook.com/groups/915613384421068"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link"
      >
        加入 硬核 AI 交流社
        <span class="footer-arrow">→</span>
      </a>
    </footer>
  </main>
</template>

<style scoped>
.blog-list-page {
  position: relative;
  min-height: 100vh;
  padding-top: var(--header-height);
  background:
    radial-gradient(
      ellipse at 30% 20%,
      rgba(67, 56, 202, 0.08) 0%,
      transparent 60%
    ),
    var(--color-night-void);
}

/* ── Compact Hero ──────────────────────────────────────────────── */

.blog-hero {
  padding: 40px 24px 0;
  max-width: 1280px;
  margin: 0 auto;
}

.hero-content {
  padding-bottom: 20px;
}

.hero-top {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 6px;
}

.hero-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display-jp);
  font-size: clamp(26px, 4vw, 38px);
  font-weight: 600;
  color: var(--color-star-white);
  letter-spacing: 0.12em;
  text-shadow:
    0 0 16px rgba(248, 250, 252, 0.2),
    0 0 32px rgba(245, 197, 66, 0.08);
}

.title-icon {
  font-size: 22px;
  color: var(--color-sun-gold);
  opacity: 0.7;
  filter: drop-shadow(0 0 6px rgba(245, 197, 66, 0.4));
}

.hero-sub {
  font-family: var(--font-display-en);
  font-size: 12px;
  font-style: italic;
  color: rgba(226, 232, 240, 0.4);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  white-space: nowrap;
}

.hero-desc {
  font-size: 0.9rem;
  color: rgba(226, 232, 240, 0.45);
  line-height: 1.6;
  max-width: 480px;
  margin-left: 2px;
}

.hero-line {
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(245, 197, 66, 0.25) 0%,
    rgba(255, 255, 255, 0.04) 60%,
    transparent 100%
  );
}

/* ── Layout ────────────────────────────────────────────────────── */

.blog-layout {
  display: flex;
  gap: 0;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 24px 80px;
  align-items: flex-start;
}

.blog-main {
  flex: 1;
  min-width: 0;
  padding-right: 32px;
}

.blog-sidebar {
  width: 280px;
  flex-shrink: 0;
}

/* ── Mobile Filter Strip ───────────────────────────────────────── */

.mobile-filters {
  display: none;
  gap: 8px;
  padding: 0 0 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.mobile-filters::-webkit-scrollbar {
  display: none;
}

.mobile-filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 999px;
  color: rgba(226, 232, 240, 0.55);
  font-size: 13px;
  white-space: nowrap;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.mobile-filter-chip:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
  color: rgba(226, 232, 240, 0.8);
}

.chip-active {
  background: rgba(245, 197, 66, 0.12);
  border-color: rgba(245, 197, 66, 0.3);
  color: var(--color-sun-gold);
}

.chip-active:hover {
  background: rgba(245, 197, 66, 0.16);
  border-color: rgba(245, 197, 66, 0.4);
  color: var(--color-sun-gold);
}

.chip-count {
  font-size: 11px;
  padding: 1px 6px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
}

.chip-active .chip-count {
  background: rgba(245, 197, 66, 0.15);
}

/* ── Section Header ────────────────────────────────────────────── */

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.section-indicator {
  width: 3px;
  height: 16px;
  border-radius: 2px;
  background: var(--color-sun-gold);
  opacity: 0.5;
}

.section-label {
  font-size: 12px;
  font-weight: 500;
  color: rgba(226, 232, 240, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ── Blog Grid ─────────────────────────────────────────────────── */

.blog-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ── Empty State ───────────────────────────────────────────────── */

.empty-state {
  text-align: center;
  padding: 80px 24px;
}

.empty-icon {
  font-size: 40px;
  color: rgba(255, 255, 255, 0.1);
  margin-bottom: 16px;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.empty-title {
  font-family: var(--font-display-jp);
  font-size: 1.15rem;
  color: rgba(226, 232, 240, 0.4);
  margin-bottom: 6px;
}

.empty-description {
  font-size: 0.9rem;
  color: rgba(148, 163, 184, 0.3);
}

/* ── Footer ────────────────────────────────────────────────────── */

.blog-footer {
  padding: 40px 24px 60px;
  text-align: center;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 22px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  color: rgba(226, 232, 240, 0.45);
  font-size: 13px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-link:hover {
  background: rgba(245, 197, 66, 0.08);
  border-color: rgba(245, 197, 66, 0.2);
  color: var(--color-sun-gold);
}

.footer-link:hover .footer-arrow {
  transform: translateX(3px);
}

.footer-arrow {
  font-size: 14px;
  transition: transform 0.3s ease;
}

/* ── Responsive ────────────────────────────────────────────────── */

@media (max-width: 860px) {
  .blog-layout {
    flex-direction: column;
    padding: 16px 16px 60px;
  }

  .blog-main {
    padding-right: 0;
  }

  .blog-sidebar {
    display: none;
  }

  .mobile-filters {
    display: flex;
  }

  .blog-hero {
    padding: 32px 20px 0;
  }
}

@media (min-width: 861px) {
  .mobile-filters {
    display: none;
  }
}

@media (max-width: 640px) {
  .blog-hero {
    padding: 28px 16px 0;
  }

  .hero-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .hero-title {
    font-size: 24px;
  }
}
</style>
