<script setup lang="ts">
import { ref, watch } from "vue";
import TypeWriter from "@/components/ui/TypeWriter.vue";
import { useSectionVisibility } from "@/composables/useSectionVisibility";
import { getAssetUrl } from "@/utils/assets";

const { sectionRef, hasBeenVisible } = useSectionVisibility({ threshold: 0.3 });

const showLogo = ref(false);
const showName = ref(false);
const showLinks = ref(false);
const typewriterComplete = ref(false);

watch(hasBeenVisible, (visible) => {
  if (visible) {
    setTimeout(() => {
      showLogo.value = true;
    }, 200);
    setTimeout(() => {
      showName.value = true;
    }, 800);
  }
});

function onTypewriterComplete(): void {
  typewriterComplete.value = true;
  setTimeout(() => {
    showLinks.value = true;
  }, 300);
}

const socialLinks = [
  {
    name: "Threads",
    href: "https://www.threads.com/@sorahane.kyoukai",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.88-.73 2.082-1.13 3.478-1.154l.019.002c1.016-.016 1.876.143 2.578.471-.131-.612-.317-1.14-.554-1.564-.34-.608-.838-1.087-1.479-1.422-.76-.398-1.702-.606-2.8-.618-1.883.032-3.394.676-4.492 1.916-.939 1.06-1.53 2.512-1.757 4.317l-2.061-.292c.285-2.257 1.051-4.12 2.28-5.54 1.432-1.653 3.4-2.528 5.85-2.6l.182-.001c1.478.016 2.822.318 3.996.897 1.02.504 1.848 1.199 2.461 2.067.52.735.893 1.572 1.112 2.49.467.156.91.354 1.32.59 1.192.687 2.095 1.676 2.611 2.86.793 1.818.758 4.622-1.493 6.82-1.857 1.815-4.205 2.584-7.387 2.607zm-1.473-7.156l-.003-.048c-.025-.424.092-.796.338-1.078.292-.333.753-.526 1.3-.545.76-.018 1.473.182 2.091.56-.093.166-.2.32-.32.463-.463.556-1.15.866-2.042.923-.554.029-1.018-.054-1.351-.243l-.013-.032z"/></svg>`,
  },
  {
    name: "GitHub",
    href: "https://short.dennysora.me/github",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  },
];
</script>

<template>
  <section ref="sectionRef" class="cosmic-section">
    <div class="cosmic-content">
      <!-- Personal Logo (Cosmic Giant) -->
      <Transition name="scale-up">
        <div v-if="showLogo" class="cosmic-logo-wrapper">
          <div class="cosmic-logo-glow"></div>
          <img
            :src="getAssetUrl('/images/personal_logo.webp')"
            alt="Cosmic Giant"
            class="cosmic-logo"
          />
        </div>
      </Transition>

      <!-- Name with Typewriter -->
      <Transition name="fade">
        <div v-if="showName" class="name-container">
          <h2 class="cosmic-name">
            <TypeWriter
              text="DennySORA"
              :speed="120"
              :delay="200"
              @complete="onTypewriterComplete"
            />
          </h2>
          <p v-if="typewriterComplete" class="cosmic-tagline">
            Developer • Creator • Dreamer
          </p>
        </div>
      </Transition>

      <!-- Social Links -->
      <Transition name="slide-up">
        <div v-if="showLinks" class="social-links">
          <a
            v-for="(link, index) in socialLinks"
            :key="link.name"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link ripple-container"
            :style="{ '--delay': `${index * 100}ms` }"
          >
            <span class="social-icon" v-html="link.icon"></span>
            <span class="social-name">{{ link.name }}</span>
          </a>
        </div>
      </Transition>
    </div>

    <!-- Moon Glow Effect -->
    <div class="moon-glow"></div>
  </section>
</template>

<style scoped>
.cosmic-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px;
  overflow: hidden;
}

.cosmic-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  z-index: 10;
}

/* Cosmic Logo */
.cosmic-logo-wrapper {
  position: relative;
  width: clamp(220px, 38vw, 340px);
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  transition: transform 0.3s var(--ease-out-back);
}

.cosmic-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: saturate(1.05);
  animation: float 6s ease-in-out infinite;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
}

.cosmic-logo-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(
    circle,
    rgba(245, 197, 66, 0.32) 0%,
    rgba(67, 56, 202, 0.18) 35%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(6px);
  animation: pulse-glow 3s ease-in-out infinite;
  pointer-events: none;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.cosmic-logo-glow::after {
  content: "";
  position: absolute;
  inset: -28px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(245, 197, 66, 0.35),
    rgba(129, 140, 248, 0.2),
    rgba(245, 197, 66, 0.35)
  );
  -webkit-mask: radial-gradient(transparent 58%, #000 62%, transparent 68%);
  mask: radial-gradient(transparent 58%, #000 62%, transparent 68%);
  opacity: 0.3;
  animation: halo-spin 20s linear infinite;
}

@media (hover: hover) {
  .cosmic-logo-wrapper:hover {
    transform: translateY(-6px);
  }

  .cosmic-logo-wrapper:hover .cosmic-logo-glow {
    opacity: 1;
    transform: scale(1.08);
  }

  .cosmic-logo-wrapper:hover .cosmic-logo {
    transform: scale(1.05);
    filter: saturate(1.1);
  }
}

/* Name Styles */
.name-container {
  text-align: center;
}

.cosmic-name {
  font-family: var(--font-display-en);
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 600;
  color: var(--color-star-white);
  letter-spacing: 0.15em;
  text-shadow:
    0 0 20px rgba(248, 250, 252, 0.5),
    0 0 40px rgba(248, 250, 252, 0.3);
}

.cosmic-tagline {
  margin-top: 12px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 300;
  color: var(--color-moon-silver);
  letter-spacing: 0.2em;
  opacity: 0;
  animation: fade-in 0.6s ease forwards 0.3s;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 24px;
  margin-top: 16px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: rgba(30, 58, 95, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  color: var(--color-moon-silver);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.05em;
  backdrop-filter: blur(8px);
  opacity: 0;
  animation: slide-in-up 0.5s ease forwards;
  animation-delay: var(--delay);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.social-link:hover {
  background: rgba(245, 197, 66, 0.15);
  border-color: rgba(245, 197, 66, 0.4);
  color: var(--color-star-white);
  transform: translateY(-4px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(245, 197, 66, 0.2);
}

.social-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.social-link:hover .social-icon {
  transform: scale(1.1);
}

.social-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

/* Moon Glow */
.moon-glow {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(245, 197, 66, 0.15) 0%,
    rgba(245, 197, 66, 0.05) 40%,
    transparent 70%
  );
  pointer-events: none;
  animation: breath 4s ease-in-out infinite;
}

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
  }
}

@keyframes halo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fade-in {
  to {
    opacity: 0.7;
  }
}

@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes breath {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.8;
  }
}

/* Transitions */
.scale-up-enter-active {
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scale-up-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(40px);
}

.fade-enter-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.6s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

/* Responsive */
@media (max-width: 640px) {
  .social-links {
    flex-direction: column;
    gap: 16px;
  }

  .social-link {
    width: 100%;
    justify-content: center;
  }
}
</style>
