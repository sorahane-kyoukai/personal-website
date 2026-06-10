import { describe, it, expect, vi } from "vitest";
import { getAssetUrl } from "@/utils/assets";

describe("getAssetUrl", () => {
  it("prepends the base URL to the path", () => {
    vi.stubEnv("BASE_URL", "/");
    expect(getAssetUrl("/images/logo.webp")).toBe("/images/logo.webp");
  });

  it("handles paths with a leading slash", () => {
    vi.stubEnv("BASE_URL", "/my-app/");
    expect(getAssetUrl("/images/hero.webp")).toBe("/my-app/images/hero.webp");
  });

  it("handles paths without a leading slash", () => {
    vi.stubEnv("BASE_URL", "/my-app/");
    expect(getAssetUrl("images/hero.webp")).toBe("/my-app/images/hero.webp");
  });

  it("returns the correct URL with root base path", () => {
    vi.stubEnv("BASE_URL", "/");
    expect(getAssetUrl("favicon.ico")).toBe("/favicon.ico");
  });
});
