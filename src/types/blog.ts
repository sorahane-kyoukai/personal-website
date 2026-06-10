export type BlogCategory = "tech" | "essay" | "community";

export type ContentBlockType =
  | "paragraph"
  | "heading"
  | "subheading"
  | "code"
  | "image"
  | "quote"
  | "list"
  | "callout"
  | "divider";

export interface ContentBlock {
  type: ContentBlockType;
  text?: string;
  language?: string;
  src?: string;
  alt?: string;
  caption?: string;
  items?: string[];
  variant?: "info" | "warning" | "tip" | "quote";
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: ContentBlock[];
  category: BlogCategory;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  coverImage?: string;
  readingTime: number;
  featured: boolean;
  authorName: string;
}
