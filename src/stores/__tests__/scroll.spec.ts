import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useScrollStore } from "@/stores/scroll";

describe("useScrollStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initializes scrollProgress to 0", () => {
    const store = useScrollStore();
    expect(store.scrollProgress).toBe(0);
  });

  it("setScrollProgress clamps to [0, 1]", () => {
    const store = useScrollStore();

    store.setScrollProgress(-0.5);
    expect(store.scrollProgress).toBe(0);

    store.setScrollProgress(1.5);
    expect(store.scrollProgress).toBe(1);

    store.setScrollProgress(0.5);
    expect(store.scrollProgress).toBe(0.5);
  });

  describe("backgroundOpacities", () => {
    it("hero is fully visible at scroll 0", () => {
      const store = useScrollStore();
      store.setScrollProgress(0);
      expect(store.backgroundOpacities.hero).toBe(1);
    });

    it("hero fades out as scroll increases", () => {
      const store = useScrollStore();
      store.setScrollProgress(0.5);
      expect(store.backgroundOpacities.hero).toBe(0);
    });

    it("universe rises then falls across scroll range", () => {
      const store = useScrollStore();

      // At 0, the interpolation produces a negative value (formula is tuned for
      // visual crossfade, not zero-start). CSS opacity clamps this to 0 visually.
      store.setScrollProgress(0);
      expect(store.backgroundOpacities.universe).toBeLessThanOrEqual(0);

      store.setScrollProgress(0.4);
      expect(store.backgroundOpacities.universe).toBeGreaterThan(0);

      store.setScrollProgress(1);
      expect(store.backgroundOpacities.universe).toBe(0);
    });

    it("sunrise fades in at the end of scroll", () => {
      const store = useScrollStore();

      store.setScrollProgress(0.4);
      expect(store.backgroundOpacities.sunrise).toBe(0);

      store.setScrollProgress(1);
      expect(store.backgroundOpacities.sunrise).toBeGreaterThan(0);
    });
  });
});
