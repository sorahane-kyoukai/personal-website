<script setup lang="ts">
import type { ContentBlock, ContentBlockType } from "@/types/blog";
import { ref } from "vue";
import { COPY_FEEDBACK_DURATION_MS } from "@/utils/constants";

interface Props {
  blocks: ContentBlock[];
}

defineProps<Props>();

const copiedBlock = ref<number | null>(null);

/** Maps callout variant to its display metadata. */
const CALLOUT_META: Record<
  string,
  { icon: string; label: string }
> = {
  warning: { icon: "⚠", label: "注意" },
  tip: { icon: "✦", label: "提示" },
  quote: { icon: "❝", label: "引言" },
  info: { icon: "ℹ", label: "資訊" },
};

/** Resolve callout variant metadata with safe fallback. */
const calloutMeta = (variant?: string) =>
  (CALLOUT_META[variant ?? "info"])!;

/**
 * Block type → CSS class mapping for the outermost element.
 * New block types can be added here without touching the template structure.
 */
const BLOCK_CLASS: Record<ContentBlockType, string> = {
  heading: "content-heading",
  subheading: "content-subheading",
  paragraph: "content-paragraph",
  quote: "content-quote",
  code: "content-code-block",
  image: "content-image",
  list: "content-list",
  callout: "content-callout",
  divider: "content-divider",
};

function copyCode(text: string, index: number): void {
  navigator.clipboard.writeText(text).then(() => {
    copiedBlock.value = index;
    setTimeout(() => {
      copiedBlock.value = null;
    }, COPY_FEEDBACK_DURATION_MS);
  });
}
</script>

<template>
  <div class="post-content">
    <template v-for="(block, index) in blocks" :key="index">
      <!-- Heading -->
      <h2 v-if="block.type === 'heading'" :class="BLOCK_CLASS.heading">
        {{ block.text }}
      </h2>

      <!-- Subheading -->
      <h3 v-else-if="block.type === 'subheading'" :class="BLOCK_CLASS.subheading">
        {{ block.text }}
      </h3>

      <!-- Paragraph -->
      <p v-else-if="block.type === 'paragraph'" :class="BLOCK_CLASS.paragraph">
        {{ block.text }}
      </p>

      <!-- Quote -->
      <blockquote v-else-if="block.type === 'quote'" :class="BLOCK_CLASS.quote">
        <div class="quote-line"></div>
        <p>{{ block.text }}</p>
      </blockquote>

      <!-- Code Block -->
      <div v-else-if="block.type === 'code'" :class="BLOCK_CLASS.code">
        <div class="code-header">
          <span v-if="block.language" class="code-lang">{{
            block.language
          }}</span>
          <button
            class="code-copy-btn"
            :class="{ copied: copiedBlock === index }"
            @click="copyCode(block.text ?? '', index)"
            :aria-label="copiedBlock === index ? '已複製' : '複製程式碼'"
          >
            <span v-if="copiedBlock === index" class="copy-icon">✓</span>
            <span v-else class="copy-icon">⎘</span>
            {{ copiedBlock === index ? "已複製" : "複製" }}
          </button>
        </div>
        <pre><code>{{ block.text }}</code></pre>
      </div>

      <!-- Image -->
      <figure v-else-if="block.type === 'image'" :class="BLOCK_CLASS.image">
        <img
          :src="block.src"
          :alt="block.alt ?? ''"
          loading="lazy"
          width="720"
          height="auto"
        />
        <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
      </figure>

      <!-- List -->
      <ul v-else-if="block.type === 'list'" :class="BLOCK_CLASS.list">
        <li v-for="(item, i) in block.items" :key="i">
          <span class="list-marker">·</span>
          <span>{{ item }}</span>
        </li>
      </ul>

      <!-- Callout -->
      <aside
        v-else-if="block.type === 'callout'"
        :class="[BLOCK_CLASS.callout, `callout-${block.variant ?? 'info'}`]"
      >
        <div class="callout-header">
          <span class="callout-icon">{{ calloutMeta(block.variant).icon }}</span>
          <span class="callout-label">{{ calloutMeta(block.variant).label }}</span>
        </div>
        <p class="callout-text">{{ block.text ?? '' }}</p>
      </aside>

      <!-- Divider -->
      <hr v-else-if="block.type === 'divider'" :class="BLOCK_CLASS.divider" />
    </template>
  </div>
</template>

<style scoped>
.post-content {
  font-family: var(--font-body);
  color: var(--color-moon-silver);
  line-height: 1.9;
}

/* ── Typography Scale ──────────────────────────────────────────── */

.content-heading {
  font-family: var(--font-display-jp);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-star-white);
  margin: 48px 0 20px;
  letter-spacing: 0.04em;
  position: relative;
}

.content-heading::after {
  content: "";
  display: block;
  width: 36px;
  height: 1px;
  background: linear-gradient(90deg, rgba(226, 232, 240, 0.25), transparent);
  margin-top: 8px;
  border-radius: 1px;
}

.content-heading:first-child {
  margin-top: 0;
}

.content-subheading {
  font-family: var(--font-display-jp);
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(248, 250, 252, 0.9);
  margin: 36px 0 16px;
  letter-spacing: 0.03em;
}

.content-paragraph {
  font-size: 1.025rem;
  margin-bottom: 20px;
  color: rgba(226, 232, 240, 0.8);
  letter-spacing: 0.02em;
}

/* ── Quote ─────────────────────────────────────────────────────── */

.content-quote {
  display: flex;
  gap: 18px;
  margin: 36px 0;
  padding: 24px 28px;
  background: rgba(245, 197, 66, 0.04);
  border: 1px solid rgba(245, 197, 66, 0.1);
  border-radius: 12px;
}

.quote-line {
  min-width: 3px;
  width: 3px;
  background: linear-gradient(
    180deg,
    rgba(245, 197, 66, 0.8),
    rgba(67, 56, 202, 0.3)
  );
  border-radius: 2px;
}

.content-quote p {
  font-family: var(--font-display-jp);
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(248, 250, 252, 0.85);
  line-height: 1.7;
  margin: 0;
}

/* ── Code Block ────────────────────────────────────────────────── */

.content-code-block {
  margin: 28px 0;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.code-lang {
  font-size: 12px;
  color: rgba(148, 163, 184, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.code-copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(226, 232, 240, 0.7);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.code-copy-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--color-star-white);
}

.code-copy-btn.copied {
  background: rgba(34, 197, 94, 0.15);
  border-color: rgba(34, 197, 94, 0.3);
  color: #4ade80;
}

.copy-icon {
  font-size: 13px;
}

.content-code-block pre {
  padding: 20px;
  margin: 0;
  overflow-x: auto;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(226, 232, 240, 0.85);
}

/* ── Image ──────────────────────────────────────────────────────── */

.content-image {
  margin: 36px 0;
}

.content-image img {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.content-image figcaption {
  text-align: center;
  font-family: "JetBrains Mono", "Fira Code", "SF Mono", monospace;
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.4);
  margin-top: 8px;
}

/* ── List ──────────────────────────────────────────────────────── */

.content-list {
  list-style: none;
  padding: 0;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.content-list li {
  display: flex;
  gap: 12px;
  font-size: 1rem;
  color: rgba(226, 232, 240, 0.8);
  line-height: 1.7;
}

.list-marker {
  color: var(--color-sun-gold);
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
}

/* ── Callout ───────────────────────────────────────────────────── */

.content-callout {
  margin: 32px 0;
  padding: 20px 24px;
  border-radius: 12px;
  border: 1px solid;
}

.callout-info {
  background: rgba(56, 189, 248, 0.06);
  border-color: rgba(56, 189, 248, 0.15);
}

.callout-warning {
  background: rgba(245, 158, 11, 0.06);
  border-color: rgba(245, 158, 11, 0.15);
}

.callout-tip {
  background: rgba(34, 197, 94, 0.06);
  border-color: rgba(34, 197, 94, 0.15);
}

.callout-quote {
  background: rgba(139, 92, 246, 0.06);
  border-color: rgba(139, 92, 246, 0.15);
}

.callout-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.callout-icon {
  font-size: 15px;
}

.callout-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.callout-info .callout-label { color: rgba(56, 189, 248, 0.8); }
.callout-warning .callout-label { color: rgba(245, 158, 11, 0.8); }
.callout-tip .callout-label { color: rgba(34, 197, 94, 0.8); }
.callout-quote .callout-label { color: rgba(139, 92, 246, 0.8); }

.callout-text {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(226, 232, 240, 0.75);
  line-height: 1.7;
}

/* ── Divider ───────────────────────────────────────────────────── */

.content-divider {
  border: none;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 100%
  );
  margin: 40px 0;
}

/* ── Responsive ────────────────────────────────────────────────── */

@media (max-width: 640px) {
  .content-heading {
    font-size: 1.35rem;
    margin: 36px 0 16px;
  }

  .content-paragraph {
    font-size: 0.975rem;
  }

  .content-quote {
    padding: 18px 20px;
    gap: 14px;
  }

  .content-callout {
    padding: 16px 18px;
  }
}
</style>
