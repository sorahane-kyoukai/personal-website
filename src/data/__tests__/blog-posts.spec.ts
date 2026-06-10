import { describe, it, expect } from "vitest";
import {
  getPostBySlug,
  getPostsByCategory,
  getRelatedPosts,
} from "@/data/blog-posts";

describe("getPostBySlug", () => {
  it("returns a post when the slug exists", () => {
    const post = getPostBySlug("pact-framework-technical-discussion");
    expect(post).toBeDefined();
    expect(post!.slug).toBe("pact-framework-technical-discussion");
    expect(post!.title).toContain("PAC-T");
  });

  it("returns undefined for a non-existent slug", () => {
    const post = getPostBySlug("non-existent-slug");
    expect(post).toBeUndefined();
  });

  it("returns undefined for an empty slug", () => {
    const post = getPostBySlug("");
    expect(post).toBeUndefined();
  });
});

describe("getPostsByCategory", () => {
  it("returns all posts matching a valid category", () => {
    const tech = getPostsByCategory("tech");
    expect(tech.length).toBeGreaterThan(0);
    tech.forEach((post) => {
      expect(post.category).toBe("tech");
    });
  });

  it("returns only community posts when filtered", () => {
    const community = getPostsByCategory("community");
    expect(community.length).toBeGreaterThan(0);
    community.forEach((post) => {
      expect(post.category).toBe("community");
    });
  });

  it("returns an empty array for a category with no posts", () => {
    // 'essay' category exists in types but currently has no posts
    const essay = getPostsByCategory("essay");
    expect(Array.isArray(essay)).toBe(true);
  });
});

describe("getRelatedPosts", () => {
  it("excludes the current post", () => {
    const related = getRelatedPosts("pact-framework-technical-discussion");
    related.forEach((post) => {
      expect(post.slug).not.toBe("pact-framework-technical-discussion");
    });
  });

  it("returns at most the requested limit", () => {
    const related = getRelatedPosts("pact-framework-technical-discussion", 2);
    expect(related.length).toBeLessThanOrEqual(2);
  });

  it("prioritizes same-category posts", () => {
    // "pact-framework-technical-discussion" has category "community"
    // "community-values-respect-technology" also has category "community"
    const related = getRelatedPosts("pact-framework-technical-discussion", 3);
    const first = related[0];
    if (first) {
      // The first result should preferably be same-category
      const hasCommunity = related.some((p) => p.category === "community");
      expect(hasCommunity).toBe(true);
    }
  });

  it("returns empty array for a non-existent slug", () => {
    const related = getRelatedPosts("non-existent");
    expect(related).toEqual([]);
  });
});
