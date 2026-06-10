<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name: string;
  icon?: string;
  href: string;
  delay?: number;
  orbitPosition?: number;
}

const props = withDefaults(defineProps<Props>(), {
  icon: "",
  delay: 0,
  orbitPosition: 0,
});

const orbStyle = computed(() => ({
  "--orbit-angle": `${props.orbitPosition}deg`,
  "--animation-delay": `${props.delay}ms`,
}));

const iconLetter = computed(() => {
  return props.icon || props.name.charAt(0);
});
</script>

<template>
  <router-link :to="href" class="category-orb" :style="orbStyle">
    <div class="orb-inner">
      <div class="orb-glow"></div>
      <div class="orb-content">
        <span class="orb-icon">{{ iconLetter }}</span>
        <span class="orb-name">{{ name }}</span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.category-orb {
  --orb-size: 90px;
  position: absolute;
  width: var(--orb-size);
  height: var(--orb-size);
  transform: rotate(var(--orbit-angle)) translateX(var(--orbit-radius, 180px))
    rotate(calc(-1 * var(--orbit-angle)));
  opacity: 0;
  animation: orb-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: var(--animation-delay);
  text-decoration: none;
}

.orb-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(30, 58, 95, 0.8) 0%,
    rgba(49, 46, 129, 0.6) 100%
  );
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  overflow: hidden;
}

.orb-glow {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(245, 197, 66, 0.3) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.category-orb:hover .orb-glow {
  opacity: 1;
}

.category-orb:hover .orb-inner {
  transform: scale(1.15);
  border-color: rgba(245, 197, 66, 0.5);
  box-shadow:
    0 0 30px rgba(245, 197, 66, 0.3),
    0 0 60px rgba(245, 197, 66, 0.2);
}

.orb-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  z-index: 1;
}

.orb-icon {
  font-family: var(--font-display-jp);
  font-size: 24px;
  font-weight: 600;
  color: var(--color-sun-gold);
  transition: transform 0.3s ease;
}

.category-orb:hover .orb-icon {
  transform: scale(1.1);
}

.orb-name {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  color: var(--color-moon-silver);
  text-align: center;
  max-width: 70px;
  line-height: 1.2;
  transition: color 0.3s ease;
}

.category-orb:hover .orb-name {
  color: var(--color-star-white);
}

@keyframes orb-appear {
  from {
    opacity: 0;
    transform: rotate(var(--orbit-angle)) translateX(0)
      rotate(calc(-1 * var(--orbit-angle))) scale(0.5);
  }
  to {
    opacity: 1;
    transform: rotate(var(--orbit-angle)) translateX(var(--orbit-radius, 180px))
      rotate(calc(-1 * var(--orbit-angle))) scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .category-orb {
    --orb-size: 70px;
    --orbit-radius: 120px;
  }

  .orb-icon {
    font-size: 20px;
  }

  .orb-name {
    font-size: 10px;
    max-width: 60px;
  }
}
</style>
