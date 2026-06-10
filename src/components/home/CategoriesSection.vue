<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { useSectionVisibility } from "@/composables/useSectionVisibility";
import { getAssetUrl } from "@/utils/assets";

const { sectionRef, hasBeenVisible } = useSectionVisibility({ threshold: 0.3 });

const showContent = ref(false);
const isHovering = ref(false);
const activeIndex = ref<number | null>(null);
const mousePosition = ref({ x: 0, y: 0 });
const magicCircleRef = ref<HTMLElement | null>(null);

watch(hasBeenVisible, (visible) => {
  if (visible) {
    setTimeout(() => {
      showContent.value = true;
    }, 200);
  }
});

function handleMouseMove(event: MouseEvent): void {
  if (!magicCircleRef.value) return;
  const rect = magicCircleRef.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  mousePosition.value = {
    x: (event.clientX - centerX) / (rect.width / 2),
    y: (event.clientY - centerY) / (rect.height / 2),
  };
}

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});

interface Category {
  name: string;
  icon: string;
  href: string;
  accent: string;
  iconImage: string;
}

const categories: Category[] = [
  {
    name: "Galgame",
    icon: "G",
    href: "/galgame",
    accent: "245, 197, 66",
    iconImage: getAssetUrl("/images/icons/galgame_icon.webp"),
  },
  {
    name: "二次元天地",
    icon: "二",
    href: "/anime",
    accent: "236, 72, 153",
    iconImage: getAssetUrl("/images/icons/anime_icon.webp"),
  },
  {
    name: "健康知識",
    icon: "健",
    href: "/health",
    accent: "135, 206, 235",
    iconImage: getAssetUrl("/images/icons/health_icon.webp"),
  },
];

const orbPositions = computed(() => {
  const count = categories.length;
  return categories.map((_, index) => ({
    angle: (360 / count) * index - 90,
    delay: index * 80,
  }));
});

function handleMouseEnter(): void {
  isHovering.value = true;
}

function handleMouseLeave(): void {
  isHovering.value = false;
  activeIndex.value = null;
}
</script>

<template>
  <section ref="sectionRef" class="categories-section">
    <!-- Celestial System -->
    <div
      ref="magicCircleRef"
      class="celestial-system"
      :class="{
        'is-energized': isHovering,
        'is-focused': activeIndex !== null,
      }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Central Star (Title) -->
      <div class="system-core">
        <div class="core-glow"></div>
        <Transition name="title-fade">
          <div v-if="showContent" class="center-title">
            <h2 class="section-title">探索領域</h2>
            <p class="section-subtitle">Explore the Realms</p>
          </div>
        </Transition>
      </div>

      <!-- Orbit Tracks -->
      <div class="orbit-track track-1"></div>
      <div class="orbit-track track-2"></div>
      <div class="orbit-track track-3"></div>

      <!-- Rotating Orbs -->
      <div
        v-if="showContent"
        class="planets-track"
        :class="{ 'is-paused': activeIndex !== null }"
      >
        <router-link
          v-for="(category, index) in categories"
          :key="category.href"
          :to="category.href"
          class="planet-orb"
          :class="{ 'is-active': activeIndex === index }"
          :style="{
            '--orbit-angle': `${orbPositions[index]?.angle ?? 0}deg`,
            '--animation-delay': `${orbPositions[index]?.delay ?? 0}ms`,
            '--orb-accent': category.accent,
          }"
          @mouseenter="activeIndex = index"
          @mouseleave="activeIndex = null"
          @focus="activeIndex = index"
          @blur="activeIndex = null"
        >
          <div class="orb-container">
            <div class="orb-halo"></div>
            <div class="orb-content">
              <div class="icon-wrapper">
                <img :src="category.iconImage" :alt="category.name" />
              </div>
              <span class="orb-label">{{ category.name }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.categories-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  overflow: hidden;
  content-visibility: auto;
  contain-intrinsic-size: 100vh;
}

/* Celestial System Container */
.celestial-system {
  position: relative;
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  --system-speed: 60s;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Central Core (Title) */
.system-core {
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
}

.core-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle,
    rgba(245, 197, 66, 0.15) 0%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(20px);
  animation: pulse 4s ease-in-out infinite;
}

.center-title {
  text-align: center;
  position: relative;
  z-index: 2;
}

.section-title {
  font-family: var(--font-display-jp);
  font-size: 32px;
  font-weight: 700;
  color: var(--color-star-white);
  letter-spacing: 0.2em;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  margin-bottom: 8px;
}

.section-subtitle {
  font-family: var(--font-display-en);
  font-size: 12px;
  letter-spacing: 0.3em;
  color: var(--color-moon-silver);
  text-transform: uppercase;
  opacity: 0.7;
}

/* Orbit Tracks (Simple Lines) */
.orbit-track {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  pointer-events: none;
}

.track-1 {
  width: 300px;
  height: 300px;
  border-style: dashed;
  opacity: 0.3;
}
.track-2 {
  width: 450px;
  height: 450px;
  opacity: 0.5;
}
.track-3 {
  width: 580px;
  height: 580px;
  border: 1px solid rgba(255, 255, 255, 0.04);
}

/* Rotating Track */
.planets-track {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: orbit-spin var(--system-speed) linear infinite;
  pointer-events: none;
}

.celestial-system.is-energized .planets-track {
  animation-play-state: paused;
}

@keyframes orbit-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Planet Orb */
.planet-orb {
  --orb-size: 80px;
  --orbit-radius: 225px; /* Distance from center */

  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--orb-size);
  height: var(--orb-size);
  margin-left: calc(var(--orb-size) / -2);
  margin-top: calc(var(--orb-size) / -2);

  /* Position on orbit */
  transform: rotate(var(--orbit-angle)) translateX(var(--orbit-radius))
    rotate(calc(-1 * var(--orbit-angle)));

  /* Initial Entry Animation */
  opacity: 0;
  animation: orb-entry 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: var(--animation-delay);

  text-decoration: none;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Counter-rotate content to keep it upright */
.planet-orb .orb-container {
  animation: counter-rotate var(--system-speed) linear infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.celestial-system.is-energized .planet-orb .orb-container {
  animation-play-state: paused;
}

@keyframes counter-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

/* Icon Wrapper */
.icon-wrapper {
  width: 64px;
  height: 64px;
  /* Glassy Background behind icon */
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  position: relative;
}

.icon-wrapper img {
  width: 110%; /* Pop out slightly */
  height: 110%;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}

/* Orb Halo (Active/Hover Glow) */
.orb-halo {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: 30px; /* Focus around icon */
  background: radial-gradient(
    circle,
    rgba(var(--orb-accent), 0.4) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  border-radius: 50%;
  transform: scale(0.8);
}

/* Interactions */
.planet-orb:hover .icon-wrapper {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(var(--orb-accent), 0.6);
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(var(--orb-accent), 0.3);
}

.planet-orb:hover .icon-wrapper img {
  transform: scale(1.15) translateY(-2px);
}

.planet-orb:hover .orb-halo {
  opacity: 1;
  transform: scale(1.2);
}

.planet-orb:hover .orb-label {
  color: rgba(var(--orb-accent), 1);
  text-shadow: 0 0 10px rgba(var(--orb-accent), 0.5);
  transform: translateY(2px);
}

/* Label */
.orb-label {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

@keyframes orb-entry {
  from {
    opacity: 0;
    transform: rotate(var(--orbit-angle)) translateX(0)
      rotate(calc(-1 * var(--orbit-angle))) scale(0);
  }
  to {
    opacity: 1;
    transform: rotate(var(--orbit-angle)) translateX(var(--orbit-radius))
      rotate(calc(-1 * var(--orbit-angle))) scale(1);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .celestial-system {
    width: 360px;
    height: 360px;
  }
  .track-1 {
    width: 180px;
    height: 180px;
  }
  .track-2 {
    width: 260px;
    height: 260px;
  }
  .track-3 {
    width: 340px;
    height: 340px;
  }

  .planet-orb {
    --orbit-radius: 130px;
  }
  .icon-wrapper {
    width: 48px;
    height: 48px;
  }
  .orb-label {
    font-size: 11px;
  }
  .section-title {
    font-size: 24px;
  }
}
</style>
