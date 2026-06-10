import { ref, onMounted, onUnmounted, type Ref } from "vue";

interface SectionVisibilityOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

interface SectionVisibility {
  sectionRef: Ref<HTMLElement | null>;
  isVisible: Ref<boolean>;
  hasBeenVisible: Ref<boolean>;
}

export function useSectionVisibility(
  options: SectionVisibilityOptions = {},
): SectionVisibility {
  const { threshold = 0.2, rootMargin = "0px", once = true } = options;

  const sectionRef = ref<HTMLElement | null>(null);
  const isVisible = ref(false);
  const hasBeenVisible = ref(false);

  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (!sectionRef.value) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.value = entry.isIntersecting;

          if (entry.isIntersecting) {
            hasBeenVisible.value = true;

            if (once && observer) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(sectionRef.value);
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    sectionRef,
    isVisible,
    hasBeenVisible,
  };
}
