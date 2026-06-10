<script setup lang="ts">
import TheHeader from "@/components/layout/TheHeader.vue";
</script>

<template>
  <div class="app-container">
    <a href="#main-content" class="skip-to-content">
      跳至主要內容
    </a>
    <TheHeader />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  min-height: 100vh;
  background-color: var(--color-night-deep);
}

/* Skip to content */
.skip-to-content {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 100;
  padding: 12px 20px;
  background: var(--color-sun-gold);
  color: var(--color-night-void);
  font-weight: 600;
  font-size: 14px;
  border-radius: 0 0 8px 8px;
  text-decoration: none;
  transition: top 0.2s ease;
}

.skip-to-content:focus {
  top: 0;
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
