<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import ReadingProgress from "@/components/blog/ReadingProgress.vue";
import BlogPostContent from "@/components/blog/BlogPostContent.vue";
import { categoryLabelMap, categoryDisplayMap } from "@/data/categories";

const route = useRoute();
const router = useRouter();

const slug = computed(() => route.params.slug as string);
const post = computed(() => getPostBySlug(slug.value));
const relatedPosts = computed(() =>
  post.value ? getRelatedPosts(post.value.slug, 3) : [],
);

const catDisplay = computed(() =>
  post.value ? categoryDisplayMap[post.value.category] : null,
);

// ── Share / Copy ──────────────────────────────────────────────────

const copyState = ref<"idle" | "copied">("idle");

function copyCurrentUrl(): void {
  navigator.clipboard.writeText(window.location.href).then(() => {
    copyState.value = "copied";
    setTimeout(() => {
      copyState.value = "idle";
    }, 2000);
  });
}

// ── Back to Top ───────────────────────────────────────────────────

const showBackToTop = ref(false);

function onArticleScroll(): void {
  showBackToTop.value = window.scrollY > 500;
}

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  window.addEventListener("scroll", onArticleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onArticleScroll);
});

// ── Redirect if post not found ────────────────────────────────────

if (!post.value) {
  router.replace("/blog");
}
</script>

<template>
  <main v-if="post" id="main-content" class="blog-post-page">
    <!-- Reading Progress — sits at top:0, above header -->
    <ReadingProgress />

    <article class="post-article">
      <!-- Hero Header -->
      <header class="post-header">
        <div class="header-inner">
          <!-- Back -->
          <router-link to="/blog" class="back-link">
            <span class="back-arrow">←</span>
            <span>返回星塵書庫</span>
          </router-link>

          <!-- Category + Date row -->
          <div class="header-meta-row">
            <div v-if="catDisplay" class="post-category">
              <span class="cat-icon">{{ catDisplay.icon }}</span>
              <span>{{ categoryLabelMap[post.category] ?? post.category }}</span>
            </div>
            <span class="meta-sep">—</span>
            <time :datetime="post.createdAt" class="post-date">
              {{
                new Date(post.createdAt).toLocaleDateString("zh-TW", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </time>
            <span class="meta-sep">·</span>
            <span class="post-readtime">{{ post.readingTime }} 分鐘閱讀</span>
          </div>

          <!-- Title -->
          <h1 class="post-title">{{ post.title }}</h1>

          <!-- Excerpt / Lead -->
          <p class="post-lead">{{ post.excerpt }}</p>

          <!-- Tags + Author -->
          <div class="header-footer">
            <div class="post-tags">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="post-tag"
              >#{{ tag }}</span>
            </div>
            <span class="post-author">{{ post.authorName }}</span>
          </div>
        </div>
      </header>

      <!-- Decorative Rule -->
      <div class="section-rule">
        <span class="rule-orb"></span>
      </div>

      <!-- Content Body -->
      <div class="post-body">
        <BlogPostContent :blocks="post.content" />
      </div>

      <!-- Share Section -->
      <div class="post-share">
        <button
          class="share-btn"
          :class="{ 'share-copied': copyState === 'copied' }"
          @click="copyCurrentUrl"
        >
          <span class="share-icon">
            <template v-if="copyState === 'idle'">🔗</template>
            <template v-else>✓</template>
          </span>
          <span>{{ copyState === 'idle' ? '複製連結' : '已複製' }}</span>
        </button>
      </div>

      <!-- Related Posts -->
      <section v-if="relatedPosts.length > 0" class="post-related">
        <h2 class="related-heading">相關文章</h2>
        <div class="related-grid">
          <router-link
            v-for="related in relatedPosts"
            :key="related.slug"
            :to="`/blog/${related.slug}`"
            class="related-card"
          >
            <div class="related-cat">
              <span class="related-cat-dot"></span>
              {{ categoryLabelMap[related.category] ?? related.category }}
            </div>
            <h3 class="related-title">{{ related.title }}</h3>
            <p class="related-excerpt">{{ related.excerpt }}</p>
            <div class="related-meta">
              <time :datetime="related.createdAt">{{
                new Date(related.createdAt).toLocaleDateString("zh-TW", {
                  month: "short",
                  day: "numeric",
                })
              }}</time>
              <span>·</span>
              <span>{{ related.readingTime }} 分鐘</span>
            </div>
          </router-link>
        </div>
      </section>
    </article>

    <!-- Back to Top -->
    <Transition name="fade-up">
      <button
        v-if="showBackToTop"
        class="back-to-top"
        @click="scrollToTop"
        aria-label="回到頁面頂端"
      >
        <span class="top-arrow">↑</span>
      </button>
    </Transition>
  </main>
</template>

<style scoped>
.blog-post-page {
  position: relative;
  min-height: 100vh;
  padding-top: var(--header-height);
  background:
    radial-gradient(
      ellipse at 30% 10%,
      rgba(67, 56, 202, 0.06) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 70% 90%,
      rgba(245, 197, 66, 0.03) 0%,
      transparent 50%
    ),
    var(--color-night-void);
}

/* ── Article ───────────────────────────────────────────────────── */

.post-article {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

/* ── Header ────────────────────────────────────────────────────── */

.post-header {
  padding: 56px 0 32px;
}

.header-inner {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Back link */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  margin-bottom: 28px;
  color: rgba(226, 232, 240, 0.4);
  font-size: 13px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--color-star-white);
}

.back-link:hover .back-arrow {
  transform: translateX(-3px);
}

.back-arrow {
  transition: transform 0.2s ease;
}

/* Category + Meta row */
.header-meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.post-category {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-sun-gold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.cat-icon {
  font-size: 11px;
}

.meta-sep {
  color: rgba(255, 255, 255, 0.12);
  font-size: 14px;
  user-select: none;
}

.post-date {
  font-size: 13px;
  color: rgba(226, 232, 240, 0.5);
}

.post-readtime {
  font-size: 13px;
  color: rgba(226, 232, 240, 0.4);
}

/* Title */
.post-title {
  font-family: var(--font-display-jp);
  font-size: clamp(26px, 4.5vw, 42px);
  font-weight: 700;
  line-height: 1.4;
  color: var(--color-star-white);
  letter-spacing: 0.04em;
  text-shadow:
    0 0 20px rgba(248, 250, 252, 0.15),
    0 0 40px rgba(245, 197, 66, 0.06);
  margin-bottom: 16px;
}

/* Lead / Excerpt */
.post-lead {
  font-family: var(--font-display-jp);
  font-size: 1.05rem;
  color: rgba(226, 232, 240, 0.55);
  line-height: 1.8;
  margin-bottom: 24px;
}

/* Footer: Tags + Author */
.header-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.post-tag {
  font-size: 12px;
  padding: 3px 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  color: rgba(148, 163, 184, 0.6);
  cursor: default;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.post-tag:hover {
  background: rgba(67, 56, 202, 0.12);
  border-color: rgba(67, 56, 202, 0.25);
  color: rgba(203, 213, 225, 0.9);
}

.post-author {
  font-family: var(--font-display-en);
  font-size: 13px;
  font-style: italic;
  color: rgba(226, 232, 240, 0.35);
}

/* ── Section Rule ──────────────────────────────────────────────── */

.section-rule {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0;
  margin-bottom: 40px;
  position: relative;
}

.section-rule::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.06) 30%,
    rgba(245, 197, 66, 0.12) 50%,
    rgba(255, 255, 255, 0.06) 70%,
    transparent 100%
  );
}

.rule-orb {
  position: relative;
  z-index: 1;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-sun-gold);
  box-shadow:
    0 0 8px rgba(245, 197, 66, 0.4),
    0 0 16px rgba(245, 197, 66, 0.2);
}

/* ── Body ──────────────────────────────────────────────────────── */

.post-body {
  padding-bottom: 48px;
}

/* ── Share ─────────────────────────────────────────────────────── */

.post-share {
  display: flex;
  justify-content: center;
  padding: 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  margin-bottom: 48px;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  color: rgba(226, 232, 240, 0.6);
  font-size: 14px;
  cursor: pointer;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.25s ease;
}

.share-btn:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(245, 197, 66, 0.3);
  color: var(--color-star-white);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(245, 197, 66, 0.08);
}

.share-btn:active {
  transform: translateY(0) scale(0.97);
}

.share-copied {
  background: rgba(52, 211, 153, 0.1);
  border-color: rgba(52, 211, 153, 0.3);
  color: #34d399;
}

.share-copied:hover {
  background: rgba(52, 211, 153, 0.13);
  border-color: rgba(52, 211, 153, 0.4);
  color: #34d399;
  box-shadow: 0 4px 20px rgba(52, 211, 153, 0.1);
}

.share-icon {
  font-size: 14px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.share-copied .share-icon {
  transform: scale(1.2);
}

/* ── Related Posts ─────────────────────────────────────────────── */

.post-related {
  padding-top: 8px;
}

.related-heading {
  font-family: var(--font-display-jp);
  font-size: 1.15rem;
  font-weight: 600;
  color: rgba(226, 232, 240, 0.5);
  margin-bottom: 20px;
  letter-spacing: 0.06em;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.related-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease;
}

.related-card:hover {
  background: rgba(15, 23, 42, 0.65);
  border-color: rgba(245, 197, 66, 0.15);
  transform: translateY(-3px);
  box-shadow:
    0 8px 28px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(245, 197, 66, 0.06);
}

.related-cat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 500;
  color: var(--color-sun-gold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.related-cat-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-sun-gold);
  box-shadow: 0 0 6px rgba(245, 197, 66, 0.4);
}

.related-title {
  font-family: var(--font-display-jp);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-star-white);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-excerpt {
  font-size: 0.8rem;
  color: rgba(226, 232, 240, 0.45);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: rgba(148, 163, 184, 0.35);
}

/* ── Back to Top ───────────────────────────────────────────────── */

.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  color: var(--color-moon-silver);
  font-size: 18px;
  cursor: pointer;
  z-index: 40;
  transition:
    opacity 0.3s ease,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
}

.back-to-top:hover {
  border-color: rgba(245, 197, 66, 0.35);
  color: var(--color-sun-gold);
  transform: translateY(-3px) scale(1.05);
  box-shadow:
    0 4px 20px rgba(245, 197, 66, 0.15),
    0 0 0 1px rgba(245, 197, 66, 0.05);
}

.back-to-top:active {
  transform: translateY(-1px) scale(0.98);
}

/* Transition */
.fade-up-enter-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-up-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

/* ── Responsive ────────────────────────────────────────────────── */

@media (max-width: 640px) {
  .post-article {
    padding: 0 16px 60px;
  }

  .post-header {
    padding: 36px 0 24px;
  }

  .post-title {
    font-size: 24px;
  }

  .post-lead {
    font-size: 0.95rem;
  }

  .header-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }

  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 38px;
    height: 38px;
  }
}
</style>
