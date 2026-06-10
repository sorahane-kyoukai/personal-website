import { ref, computed } from "vue";
import { defineStore } from "pinia";

/**
 * Scroll-driven background opacity interpolation constants.
 * These control the crossfade timing between the three background layers.
 */
const TWILIGHT_END = 0.33;
const NIGHT_END = 0.66;
const HERO_FADE_SPEED = 3;
const NIGHT_FADE_IN_SPEED = 7.5;
const NIGHT_FADE_IN_START = 0.2;
const NIGHT_FADE_OUT_SPEED = 6;
const NIGHT_FADE_OUT_START = 0.5;
const DAWN_FADE_SPEED = 3;

export const useScrollStore = defineStore("scroll", () => {
  const scrollProgress = ref(0);

  const backgroundOpacities = computed(() => ({
    hero: Math.max(0, 1 - scrollProgress.value * HERO_FADE_SPEED),
    universe:
      scrollProgress.value < TWILIGHT_END
        ? Math.min(
            1,
            (scrollProgress.value - NIGHT_FADE_IN_START) * NIGHT_FADE_IN_SPEED,
          )
        : scrollProgress.value > NIGHT_END
          ? Math.max(
              0,
              1 -
                (scrollProgress.value - NIGHT_FADE_OUT_START) *
                  NIGHT_FADE_OUT_SPEED,
            )
          : 1,
    sunrise: Math.min(
      1,
      Math.max(0, (scrollProgress.value - NIGHT_FADE_OUT_START) * DAWN_FADE_SPEED),
    ),
  }));

  function setScrollProgress(value: number): void {
    scrollProgress.value = Math.max(0, Math.min(1, value));
  }

  return {
    scrollProgress,
    backgroundOpacities,
    setScrollProgress,
  };
});
