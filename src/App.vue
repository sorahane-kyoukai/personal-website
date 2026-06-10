<script setup lang="ts">
import TheHeader from "@/components/layout/TheHeader.vue";
</script>

<template>
  <div class="app-container">
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
