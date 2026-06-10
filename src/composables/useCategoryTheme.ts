import { computed } from "vue";
import { useRoute } from "vue-router";
import { getAssetUrl } from "@/utils/assets";

export type ThemeType =
  | "galgame"
  | "anime"
  | "programming"
  | "gamedev"
  | "thoughts"
  | "writing"
  | "health"
  | "music"
  | "default";

export interface ThemeConfig {
  key: ThemeType;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  colors: {
    primary: string; // Main brand color
    accent: string; // Secondary/Highlight color
    text: string; // Specific text color override
    bgOverlay: string; // Specific overlay color/opacity
  };
  bgEffect:
    | "sakura"
    | "speed-lines"
    | "matrix"
    | "ripple"
    | "ink"
    | "aurora"
    | "visualizer"
    | "stars"
    | "god-rays"
    | "feathers"
    | "bubbles"
    | "dust"
    | "snow"
    | "pixel"
    | "literary";
  cardStyle:
    | "dialog"
    | "tech"
    | "terminal"
    | "minimal"
    | "scroll"
    | "soft"
    | "vinyl"
    | "rpg";
  backgroundImage?: string;
  layoutMode: "center" | "left" | "console" | "zen";
  fontFamily?: string;
  textShadow?: string;
}

const themes: Record<ThemeType, ThemeConfig> = {
  galgame: {
    key: "galgame",
    title: "Galgame",
    subtitle: "Visual Novel Adventures",
    description: "探索視覺小說的世界，分享遊戲心得與推薦",
    icon: getAssetUrl("/images/icons/galgame_icon.webp"),
    colors: {
      primary: "#db2777", // pink-600
      accent: "#be185d", // pink-700
      text: "#4a044e", // fuchsia-950
      bgOverlay: "rgba(255, 235, 245, 0.6)", // Warm Pinkish wash
    },
    bgEffect: "sakura",
    cardStyle: "dialog",
    backgroundImage: getAssetUrl("/images/galgame_bg.webp"),
    layoutMode: "left",
    textShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
  },
  anime: {
    key: "anime",
    title: "二次元天地",
    subtitle: "Anime & Manga World",
    description: "動漫評論、角色分析、作品推薦",
    icon: getAssetUrl("/images/icons/anime_icon.webp"),
    colors: {
      primary: "#0284c7", // sky-600
      accent: "#ca8a04", // yellow-600
      text: "#0c4a6e", // sky-950
      bgOverlay: "rgba(240, 249, 255, 0.5)", // Cool White wash
    },
    bgEffect: "bubbles",
    cardStyle: "tech",
    backgroundImage: getAssetUrl("/images/anime_bg.webp"),
    layoutMode: "center",
    textShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
  },
  programming: {
    key: "programming",
    title: "程式技術",
    subtitle: 'System.out.println("Hello World");',
    description: "技術文章、開發心得、程式教學",
    icon: getAssetUrl("/images/icons/programming_icon.webp"),
    colors: {
      primary: "#4ade80", // green-400
      accent: "#22c55e", // green-500
      text: "#dcfce7", // green-50
      bgOverlay: "rgba(5, 5, 5, 0.85)", // High contrast dark
    },
    bgEffect: "matrix",
    cardStyle: "terminal",
    layoutMode: "console",
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    backgroundImage: getAssetUrl("/images/code_bg.webp"),
    textShadow: "0 0 10px rgba(74, 222, 128, 0.5)",
  },
  gamedev: {
    key: "gamedev",
    title: "遊戲開發",
    subtitle: "Press Start to Begin",
    description: "遊戲引擎、圖學渲染、關卡設計",
    icon: getAssetUrl("/images/icons/gamedev_icon.webp"),
    colors: {
      primary: "#facc15", // gold
      accent: "#ef4444", // red
      text: "#fefce8", // pale yellow
      bgOverlay: "rgba(0, 0, 0, 0.4)",
    },
    bgEffect: "pixel",
    cardStyle: "rpg",
    layoutMode: "console",
    fontFamily: '"Courier New", Courier, monospace',
    backgroundImage: getAssetUrl("/images/gamedev_bg.webp"),
    textShadow: "2px 2px 0px #451a03",
  },
  thoughts: {
    key: "thoughts",
    title: "心境與筆記",
    subtitle: "Thoughts & Notes",
    description: "生活隨筆、思考紀錄、個人感想",
    icon: getAssetUrl("/images/icons/thoughts_icon.webp"),
    colors: {
      primary: "#94a3b8", // slate-400
      accent: "#cbd5e1", // slate-300
      text: "#f8fafc", // slate-50
      bgOverlay:
        "linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.9))",
    },
    bgEffect: "ripple",
    cardStyle: "minimal",
    layoutMode: "zen",
    backgroundImage: getAssetUrl("/images/thoughts_bg.webp"),
    textShadow: "0 4px 12px rgba(0, 0, 0, 0.8)",
  },
  writing: {
    key: "writing",
    title: "寫作技巧",
    subtitle: "The Art of Storytelling",
    description: "創作心法、寫作技巧、故事構思",
    icon: getAssetUrl("/images/icons/writing_icon.webp"),
    colors: {
      primary: "#e2e8f0", // slate-200
      accent: "#fcd34d", // amber-300
      text: "#fefce8", // yellow-50
      bgOverlay:
        "radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)",
    },
    bgEffect: "literary", // Gold dust was here
    cardStyle: "scroll",
    layoutMode: "zen",
    fontFamily: '"Shippori Mincho", serif',
    backgroundImage: getAssetUrl("/images/writing_bg.webp"),
    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
  },
  health: {
    key: "health",
    title: "健康知識",
    subtitle: "Body & Soul",
    description: "健康資訊、生活習慣、身心平衡",
    icon: getAssetUrl("/images/icons/health_icon.webp"),
    colors: {
      primary: "#f59e0b", // amber-500
      accent: "#d97706", // amber-600
      text: "#451a03", // amber-950 (Dark Warm)
      bgOverlay: "rgba(255, 250, 240, 0.5)", // Warm white wash
    },
    bgEffect: "snow",
    cardStyle: "soft",
    layoutMode: "center",
    backgroundImage: getAssetUrl("/images/health_bg.webp"),
    textShadow: "none",
  },
  music: {
    key: "music",
    title: "音樂賞析",
    subtitle: "Resonance",
    description: "音樂評論、專輯推薦、聆聽感想",
    icon: getAssetUrl("/images/icons/music_icon.webp"),
    colors: {
      primary: "#a21caf", // fuchsia-700
      accent: "#4338ca", // indigo-700
      text: "#1e1b4b", // indigo-950
      bgOverlay: "rgba(255, 255, 255, 0.85)", // Stronger white wash
    },
    bgEffect: "visualizer",
    cardStyle: "vinyl",
    layoutMode: "center",
    backgroundImage: getAssetUrl("/images/music_bg.webp"),
    textShadow: "none",
  },
  default: {
    key: "default",
    title: "分類",
    subtitle: "Category",
    description: "探索空羽ノ境的各類文章",
    icon: getAssetUrl("/images/logo.webp"), // Fallback to logo
    colors: {
      primary: "#f5c542",
      accent: "#312e81",
      text: "#ffffff",
      bgOverlay: "rgba(15, 23, 42, 0.8)",
    },
    bgEffect: "stars",
    cardStyle: "minimal",
    backgroundImage: getAssetUrl("/images/universe_bg.webp"),
    layoutMode: "center",
  },
};

export function useCategoryTheme() {
  const route = useRoute();

  const currentTheme = computed<ThemeConfig>(() => {
    // Extract the first segment of the path, removing the leading slash
    const slug = route.path.split("/")[1] as ThemeType | undefined;

    if (slug && themes[slug]) {
      return themes[slug];
    }
    return themes.default;
  });

  return {
    currentTheme,
    themes,
  };
}
