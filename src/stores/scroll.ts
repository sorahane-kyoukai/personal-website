import { ref, computed } from "vue";
import { defineStore } from "pinia";

export type TimeOfDay = "twilight" | "night" | "dawn";

export const useScrollStore = defineStore("scroll", () => {
  const scrollProgress = ref(0);
  const activeSection = ref(0);

  const timeOfDay = computed<TimeOfDay>(() => {
    if (scrollProgress.value < 0.33) return "twilight";
    if (scrollProgress.value < 0.66) return "night";
    return "dawn";
  });

  const backgroundOpacities = computed(() => ({
    hero: Math.max(0, 1 - scrollProgress.value * 3),
    universe:
      scrollProgress.value < 0.33
        ? Math.min(1, (scrollProgress.value - 0.2) * 7.5)
        : scrollProgress.value > 0.66
          ? Math.max(0, 1 - (scrollProgress.value - 0.5) * 6)
          : 1,
    sunrise: Math.min(1, Math.max(0, (scrollProgress.value - 0.5) * 3)),
  }));

  function setScrollProgress(value: number): void {
    scrollProgress.value = Math.max(0, Math.min(1, value));
  }

  function setActiveSection(section: number): void {
    activeSection.value = section;
  }

  return {
    scrollProgress,
    activeSection,
    timeOfDay,
    backgroundOpacities,
    setScrollProgress,
    setActiveSection,
  };
});
