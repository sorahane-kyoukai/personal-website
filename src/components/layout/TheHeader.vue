<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { getAssetUrl } from "@/utils/assets";
import { HEADER_SCROLL_THRESHOLD, HEADER_HIDE_THRESHOLD } from "@/utils/constants";

const route = useRoute();

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Galgame", href: "/galgame" },
  { name: "二次元天地", href: "/anime" },
  { name: "星塵筆記", href: "/blog" },
  { name: "健康知識", href: "/health" },
];

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const lastScrollY = ref(0);
const isHeaderVisible = ref(true);

function handleScroll(): void {
  const currentScrollY = window.scrollY;

  isScrolled.value = currentScrollY > HEADER_SCROLL_THRESHOLD;

  if (currentScrollY > lastScrollY.value && currentScrollY > HEADER_HIDE_THRESHOLD) {
    isHeaderVisible.value = false;
  } else {
    isHeaderVisible.value = true;
  }

  lastScrollY.value = currentScrollY;
}

function toggleMobileMenu(): void {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : "";
}

function closeMobileMenu(): void {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = "";
});
</script>

<template>
  <header
    class="site-header"
    :class="{
      'header-scrolled': isScrolled,
      'header-hidden': !isHeaderVisible,
    }"
  >
    <div class="header-container">
      <!-- Logo -->
      <router-link to="/" class="header-logo" @click="closeMobileMenu">
        <span class="logo-orb">
          <img
            :src="getAssetUrl('/images/logo.webp')"
            alt="空羽ノ境"
            class="logo-image"
          />
        </span>
        <span class="logo-wordmark">
          <span class="logo-text">空羽ノ境</span>
          <span class="logo-tagline">Celestial Chronicle</span>
        </span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav" aria-label="主要導航">
        <router-link
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          class="nav-link link-underline"
          :aria-current="route.path === item.href ? 'page' : undefined"
        >
          {{ item.name }}
        </router-link>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="mobile-menu-btn"
        :aria-expanded="isMobileMenuOpen"
        :aria-label="isMobileMenuOpen ? '關閉選單' : '開啟選單'"
        @click="toggleMobileMenu"
      >
        <span class="hamburger" :class="{ 'is-active': isMobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    <!-- Mobile Navigation Overlay -->
    <Transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-menu-overlay"
        @click.self="closeMobileMenu"
      >
        <nav class="mobile-nav" aria-label="行動裝置導航">
          <router-link
            v-for="(item, index) in navItems"
            :key="item.href"
            :to="item.href"
            class="mobile-nav-link"
            :style="{ '--delay': `${index * 50}ms` }"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </router-link>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: var(--header-height);
  background: linear-gradient(
    180deg,
    rgba(8, 12, 24, 0.92) 0%,
    rgba(12, 18, 32, 0.7) 100%
  );
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 40px rgba(6, 10, 20, 0.35);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.site-header::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 20% 40%,
      rgba(67, 56, 202, 0.2) 0%,
      transparent 55%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(245, 197, 66, 0.18) 0%,
      transparent 60%
    );
  opacity: 0.8;
  pointer-events: none;
}

.site-header::after {
  content: "";
  position: absolute;
  left: 12%;
  right: 12%;
  bottom: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(245, 197, 66, 0.6) 50%,
    transparent 100%
  );
  opacity: 0.8;
}

.header-scrolled {
  background: rgba(8, 12, 24, 0.95);
  border-bottom-color: rgba(255, 255, 255, 0.16);
}

.header-hidden {
  transform: translateY(-100%);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  position: relative;
  z-index: 1;
}

/* Logo */
.header-logo {
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  height: 100%;
  transition:
    transform 0.3s var(--ease-out-back),
    opacity 0.3s ease;
}

.header-logo:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.logo-orb {
  position: relative;
  width: auto;
  height: 100%;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: transparent;
  border: none;
  box-shadow: none;
  transition: transform 0.3s var(--ease-out-back);
  padding: 6px 0;
}

.logo-orb::before {
  content: "";
  position: absolute;
  inset: -12px;
  border-radius: 999px;
  background: radial-gradient(
    circle,
    rgba(245, 197, 66, 0.35) 0%,
    rgba(67, 56, 202, 0.18) 45%,
    transparent 70%
  );
  filter: blur(10px);
  opacity: 0.75;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.logo-orb::after {
  content: "";
  position: absolute;
  inset: 6px;
  border-radius: 999px;
  background: radial-gradient(
    circle,
    rgba(248, 250, 252, 0.35) 0%,
    transparent 65%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.header-logo:hover .logo-orb {
  transform: translateY(-1px) scale(1.02);
}

.header-logo:hover .logo-orb::before {
  opacity: 1;
  transform: scale(1.08);
}

.header-logo:hover .logo-orb::after {
  opacity: 0.6;
}

.logo-image {
  height: 100%;
  width: auto;
  max-height: calc(var(--header-height) - 12px);
  filter: drop-shadow(0 0 16px rgba(245, 197, 66, 0.35))
    drop-shadow(0 0 32px rgba(67, 56, 202, 0.25));
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
}

.header-logo:hover .logo-image {
  transform: scale(1.05);
  filter: drop-shadow(0 0 20px rgba(245, 197, 66, 0.45))
    drop-shadow(0 0 40px rgba(67, 56, 202, 0.35));
}

.logo-wordmark {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.logo-text {
  font-family: var(--font-display-jp);
  font-size: 22px;
  font-weight: 600;
  color: var(--color-star-white);
  letter-spacing: 0.18em;
  text-shadow:
    0 0 18px rgba(248, 250, 252, 0.35),
    0 0 35px rgba(245, 197, 66, 0.25);
}

.logo-tagline {
  font-family: var(--font-display-en);
  font-size: 12px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(226, 232, 240, 0.7);
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-moon-silver);
  text-decoration: none;
  padding: 6px 0;
  letter-spacing: 0.08em;
  transition:
    color 0.3s ease,
    transform 0.3s ease,
    text-shadow 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-star-white);
  text-shadow:
    0 0 12px rgba(248, 250, 252, 0.4),
    0 0 24px rgba(245, 197, 66, 0.3);
}

.nav-link:hover {
  transform: translateY(-1px);
}

.nav-link.router-link-active::after {
  width: 100%;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--color-star-white);
  border-radius: 1px;
  transition: all 0.3s ease;
}

.hamburger.is-active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  inset: var(--header-height) 0 0 0;
  background: rgba(10, 14, 26, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.mobile-nav-link {
  font-family: var(--font-display-jp);
  font-size: 24px;
  font-weight: 500;
  color: var(--color-moon-silver);
  text-decoration: none;
  padding: 12px 28px;
  border-radius: 999px;
  border: 1px solid transparent;
  opacity: 0;
  transform: translateY(20px);
  animation: mobile-link-in 0.4s ease forwards;
  animation-delay: var(--delay);
  transition:
    color 0.3s ease,
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.mobile-nav-link:hover {
  color: var(--color-star-white);
  border-color: rgba(245, 197, 66, 0.4);
  box-shadow: 0 0 18px rgba(245, 197, 66, 0.3);
  transform: translateY(-2px);
}

@keyframes mobile-link-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Menu Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }
}

@media (max-width: 640px) {
  .header-container {
    padding: 0 16px;
  }

  .logo-text {
    font-size: 18px;
    letter-spacing: 0.12em;
  }

  .logo-tagline {
    display: none;
  }
}
</style>
