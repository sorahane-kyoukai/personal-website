import type { BlogCategory } from "@/types/blog";

/**
 * Shared category display configuration.
 * Single source of truth for category labels and icons across the app.
 */
export interface CategoryDisplay {
  label: string;
  icon: string;
}

export const categoryDisplayMap: Record<BlogCategory, CategoryDisplay> = {
  tech: { label: "技術", icon: "◆" },
  essay: { label: "隨筆", icon: "◇" },
  community: { label: "社群", icon: "◎" },
};

/** Simple label-only mapping for views that only need text. */
export const categoryLabelMap: Record<BlogCategory, string> = {
  tech: "技術分享",
  essay: "隨筆筆記",
  community: "社群經營",
};
