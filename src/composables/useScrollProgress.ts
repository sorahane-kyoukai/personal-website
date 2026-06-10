import { ref, onMounted, onUnmounted } from "vue";

interface ScrollProgress {
  progress: ReturnType<typeof ref<number>>;
  scrollY: ReturnType<typeof ref<number>>;
  viewportHeight: ReturnType<typeof ref<number>>;
  documentHeight: ReturnType<typeof ref<number>>;
}

export function useScrollProgress(): ScrollProgress {
  const progress = ref(0);
  const scrollY = ref(0);
  const viewportHeight = ref(0);
  const documentHeight = ref(0);

  let ticking = false;

  function updateScrollProgress(): void {
    scrollY.value = window.scrollY;
    viewportHeight.value = window.innerHeight;
    documentHeight.value = document.documentElement.scrollHeight;

    const maxScroll = documentHeight.value - viewportHeight.value;
    progress.value = maxScroll > 0 ? Math.min(scrollY.value / maxScroll, 1) : 0;

    ticking = false;
  }

  function handleScroll(): void {
    if (!ticking) {
      requestAnimationFrame(updateScrollProgress);
      ticking = true;
    }
  }

  function handleResize(): void {
    viewportHeight.value = window.innerHeight;
    documentHeight.value = document.documentElement.scrollHeight;
    updateScrollProgress();
  }

  onMounted(() => {
    updateScrollProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
  });

  return {
    progress,
    scrollY,
    viewportHeight,
    documentHeight,
  };
}
