<script setup lang="ts">
import { ref, onMounted } from "vue";
import ScrollIndicator from "@/components/ui/ScrollIndicator.vue";

const sectionRef = ref<HTMLElement | null>(null);
const showTitle = ref(false);
const showSubtitle = ref(false);
const showScrollIndicator = ref(false);

onMounted(() => {
  setTimeout(() => {
    showTitle.value = true;
  }, 300);
  setTimeout(() => {
    showSubtitle.value = true;
  }, 800);
  setTimeout(() => {
    showScrollIndicator.value = true;
  }, 1500);
});
</script>

<template>
  <section ref="sectionRef" class="hero-section">
    <div class="hero-content">
      <!-- Main Title -->
      <Transition name="title-fade">
        <h1 v-if="showTitle" class="hero-title">
          <span class="title-bracket">『</span>
          <span class="title-text gradient-text-celestial">空羽ノ境</span>
          <span class="title-bracket">』</span>
        </h1>
      </Transition>

      <!-- Subtitle -->
      <Transition name="subtitle-fade">
        <p v-if="showSubtitle" class="hero-subtitle">
          The Realm of Empty Feathers
        </p>
      </Transition>
    </div>

    <!-- Scroll Indicator -->
    <Transition name="fade-up">
      <div v-if="showScrollIndicator" class="scroll-indicator-wrapper">
        <ScrollIndicator text="SCROLL" />
      </div>
    </Transition>

    <!-- Decorative Elements -->
    <div class="hero-decoration hero-decoration-left"></div>
    <div class="hero-decoration hero-decoration-right"></div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  overflow: hidden;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  z-index: 10;
}

/* Title Styles */
.hero-title {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: var(--font-display-jp);
  font-size: clamp(36px, 8vw, 72px);
  font-weight: 600;
  letter-spacing: 0.1em;
  line-height: 1.2;
}

.title-bracket {
  color: var(--color-sun-gold);
  opacity: 0.8;
  font-weight: 400;
}

.title-text {
  text-shadow:
    0 0 20px rgba(248, 250, 252, 0.4),
    0 0 40px rgba(245, 197, 66, 0.3),
    0 0 80px rgba(245, 197, 66, 0.2);
}

.hero-subtitle {
  font-family: var(--font-display-en);
  font-size: clamp(14px, 2vw, 18px);
  font-weight: 400;
  font-style: italic;
  color: var(--color-moon-silver);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.8;
}

/* Scroll Indicator */
.scroll-indicator-wrapper {
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
}

/* Decorative Elements */
.hero-decoration {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
  pointer-events: none;
}

.hero-decoration-left {
  bottom: 10%;
  left: -100px;
  background: radial-gradient(
    circle,
    var(--color-sun-gold) 0%,
    transparent 70%
  );
}

.hero-decoration-right {
  top: 20%;
  right: -100px;
  background: radial-gradient(
    circle,
    var(--color-cosmic-purple) 0%,
    transparent 70%
  );
}

/* Transitions */
.title-fade-enter-active {
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.title-fade-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}

.subtitle-fade-enter-active {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.subtitle-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-up-enter-active {
  transition: all 0.6s ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

/* Responsive */
@media (max-width: 640px) {
  .hero-title {
    gap: 8px;
  }

  .hero-subtitle {
    letter-spacing: 0.15em;
  }
}
</style>
