import type { BlogPost, BlogCategory } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    slug: "tech-leadership-value-driven-discussion",
    title: "不內耗的技術領導：從社群管理談價值驅動的討論文化",
    excerpt:
      "在技術社群中，如何建立一個不內耗、專注價值、尊重技術的討論環境？分享我管理「硬核 AI 交流社」的經驗與哲學。",
    content: [
      {
        type: "paragraph",
        text: "那個，我想先跟大家說一聲抱歉。我知道有些人帶有挑釁意味來的，或是想跟我你來我往，並且在噴子領域內得到勝利。那你贏，我個人回覆是看價值才回覆的。",
      },
      {
        type: "paragraph",
        text: "當我不回覆，基本上兩種情況：第一，討論的差不多了。第二，我看了你的回覆毫無價值可言，抱歉，懶得跟你扯。第二種人就算權威、專家、大神來跟你對話，都會輸你。反正就是想在最皮子上贏，而不是真正的具有討論價值。多回你一句都算是對我自己的不尊敬。",
      },
      {
        type: "heading",
        text: "減少內耗，專注價值",
      },
      {
        type: "paragraph",
        text: "減少跟你在那邊內耗，去解答真正有意義且能幫助另一個人的問題更加有意義。學術性、技術性的討論與爭吵，我個人是支持的，因為衝突帶來不同觀點與進步。",
      },
      {
        type: "paragraph",
        text: "耍嘴皮子，一顆燈泡不會亮，就是不會亮，別跟我說他發出耀眼的光芒。AI 不是玄學，是技術與工程問題，是需要經驗與知識的東西。到底是不是資工、軟體出來的不重要，重要的是：價值、價值、價值。",
      },
      {
        type: "heading",
        text: "言之有物，尊重技術",
      },
      {
        type: "paragraph",
        text: "一句「這很簡單。」、「這個沒意義。」卻不提供任何前後文與理論資訊的，除了能挑事，破壞踐踏別人的研究，基本上這種就是「毫無價值的垃圾」。技術上的差異爭辯，經驗上的不同討論，但請言之有物，不人身攻擊。",
      },
      {
        type: "paragraph",
        text: "你可以罵「行為」、「事件」，但罵人有點水準，同時提供具有價值的資訊。",
      },
      {
        type: "quote",
        text: "重點不是你吵贏了，而是你有沒有帶來價值。",
      },
      {
        type: "heading",
        text: "帶著精神前進",
      },
      {
        type: "paragraph",
        text: "硬核 AI 交流社，基本上都是我在發文（沒其他人發，也不知道為什麼），我看到問題我會直接管理。但我也希望每一個人能帶著這種「不內耗、提升自己、尊重技術與他人成果」這個軟體業界傳統精神帶著走。",
      },
      {
        type: "callout",
        variant: "tip",
        text: "核心精神：不內耗、提升自己、尊重技術與他人成果。與其內耗，不如解答真正能幫助別人的問題。",
      },
    ],
    category: "community",
    tags: ["社群管理", "技術領導", "討論文化", "開源精神"],
    createdAt: "2025-12-15",
    readingTime: 4,
    featured: true,
    authorName: "空羽ノ境",
  },
  {
    slug: "pact-framework-technical-discussion",
    title: "技術討論的 PAC-T 框架：如何進行有意義的深度交流",
    excerpt:
      "介紹 PAC-T 討論框架——剝離情緒、承認權衡、設定上下文、轉化為開放探討，讓每一次技術討論都產生真正的價值。",
    content: [
      {
        type: "paragraph",
        text: "發表觀點時，請剝離情緒，基於具體情境客觀分析技術的權衡與代價，並以開放探討取代絕對定論。這是我在「硬核 AI 交流社」中推行的 PAC-T 討論框架，它來自於軟體工程領域長期以來追求「客觀、可驗證、可重現」的工程精神。",
      },
      {
        type: "heading",
        text: "P — Problem Statement（剝離情緒，定義核心問題）",
      },
      {
        type: "paragraph",
        text: "在討論任何技術議題之前，先定義清楚我們到底在解決什麼問題。剝離情緒意味著把「我覺得」、「我認為」轉化為可量化的指標和具體的場景。一個好的問題定義本身就包含了可驗證的範圍。",
      },
      {
        type: "heading",
        text: "A — Acknowledge Trade-offs（承認權衡與代價）",
      },
      {
        type: "paragraph",
        text: "任何技術決策都有 trade-off。沒有完美的解決方案，只有適合特定情境的取捨。當我們承認這一點，討論就不再是「誰對誰錯」，而是「在這個情境下，哪個取捨更合理」。這會大幅降低討論中的防禦性心態。",
      },
      {
        type: "heading",
        text: "C — Context & Constraints（設定上下文與邊界）",
      },
      {
        type: "paragraph",
        text: "同樣的技術方案，在不同規模、不同資源、不同需求下，答案可能完全不同。討論時必須明確上下文——你的系統規模多大？延遲要求是什麼？團隊多少人？維運能力如何？沒有上下文的技術討論，很容易變成各說各話。",
      },
      {
        type: "heading",
        text: "T — Turn into a Question（轉化為開放性探討）",
      },
      {
        type: "paragraph",
        text: "最後一步是將前面的分析轉化成一個開放性問題。這不是為了模糊焦點，而是為了邀請更多視角。技術討論的目的不是「證明我對」，而是「找到更好的答案」。",
      },
      {
        type: "quote",
        text: "這裡不追求熱鬧，追求的是高品質、可累積、真正有技術含量的討論。",
      },
      {
        type: "callout",
        variant: "info",
        text: "PAC-T 框架的核心是從「對抗」轉向「協作」——從「你錯了」變成「讓我們一起看看在這個情境下什麼方案最合理」。",
      },
    ],
    category: "community",
    tags: ["討論框架", "PAC-T", "技術交流", "工程文化"],
    createdAt: "2025-12-10",
    readingTime: 5,
    featured: true,
    authorName: "空羽ノ境",
  },
  {
    slug: "llm-context-window-three-tiers",
    title: "LLM Context Window 的三層分級：從已證事實到純屬猜測",
    excerpt:
      "將 LLM Context Window 的行為分成三個層級來理解：已證事實（Established Fact）、工程默認（Engineering Default）、純屬猜測（Speculation），幫助開發者建立正確的心智模型。",
    content: [
      {
        type: "paragraph",
        text: "在 LLM 的開發與應用中，Context Window 的行為是我們每天都在處理的問題。但圍繞 Context Window 的資訊品質參差不齊——有些是經過嚴謹驗證的事實，有些是工程界的共識慣例，還有些純屬未經證實的推測。將這些資訊分層理解，有助於我們做出更好的工程決策。",
      },
      {
        type: "heading",
        text: "Tier 1：已證事實（Established Fact）",
      },
      {
        type: "paragraph",
        text: "這些是經過學術論文嚴格驗證的結論：Context 會退化——RULER 基準測試和 ICLR 論文已明確證實這一點。RoPE 在超長序列中會失效，而 YaRN 等技術可以有效補救。Prefix Cache 需要 token 級別的一致性才能命中。這些是我們可以放心依賴的基礎知識。",
      },
      {
        type: "heading",
        text: "Tier 2：工程默認（Engineering Default）",
      },
      {
        type: "paragraph",
        text: "這些是目前業界的共識做法，雖未必有嚴格的學術證明，但經過大量實踐驗證：任務指令放最尾——因為 RoPE 的 recency bias（非 MQA/GQA 架構下尤其明顯）。穩定內容放最前——這是最優的 cache 策略。這些是我們日常開發中的「最佳實踐」。",
      },
      {
        type: "heading",
        text: "Tier 3：純屬猜測（Speculation）",
      },
      {
        type: "paragraph",
        text: "這些是社群中的推測與假說，缺乏足夠的實證支持。在引用這類資訊時，應該明確標註其為推測，並在有條件時進行自己的實驗驗證。",
      },
      {
        type: "heading",
        text: "建議的 Prompt 結構",
      },
      {
        type: "paragraph",
        text: "基於以上分析，一個合理的 Prompt 結構應該是：穩定 Prefix（吃 cache）→ 動態內容 → 短任務指令（吃 recency）。這個結構同時兼顧了 cache 效率和指令遵循的準確性。",
      },
      {
        type: "callout",
        variant: "warning",
        text: "不要把 Tier 3 的推測當作 Tier 1 的事實來傳播。技術討論的品質，取決於我們對資訊來源的尊重與標註。",
      },
    ],
    category: "tech",
    tags: ["LLM", "Context Window", "RoPE", "Prompt Engineering", "Cache"],
    createdAt: "2025-12-18",
    readingTime: 4,
    featured: true,
    authorName: "空羽ノ境",
  },
  {
    slug: "sae-sparse-autoencoder-llm-interpretability",
    title: "理解 LLM 內部表徵：SAE 稀疏自編碼器入門",
    excerpt:
      "Sparse Autoencoder (SAE) 是理解 LLM 內部運作機制的關鍵工具。從 Feature Direction 的概念出發，逐步了解 SAE 如何將 LLM 的 activation 拆解成可解釋的稀疏特徵。",
    content: [
      {
        type: "heading",
        text: "SAE 是什麼？",
      },
      {
        type: "paragraph",
        text: "Sparse Autoencoder（稀疏自編碼器）是一種用於理解 LLM 內部表徵的工具。它不是單純看單一 neuron 的運作，而是用來理解 LLM 內部 feature 的重要方法。傳統上我們習慣透過觀察個別 neuron 的激活來理解模型，但這種方法有很大的局限性。",
      },
      {
        type: "heading",
        text: "為什麼重要？",
      },
      {
        type: "paragraph",
        text: "3D 神經元視覺化很吸睛，但不一定真正讓我們看見模型在做什麼。LLM 的 activation 往往混合了多種資訊；SAE 嘗試把它拆成少量、較可解釋的 sparse features。換句話說，SAE 幫助我們從「這個 neuron 亮了」走向「模型正在處理什麼概念」。",
      },
      {
        type: "heading",
        text: "Feature Direction 的概念",
      },
      {
        type: "paragraph",
        text: "Feature Direction 是 SAE 的核心概念之一。在 LLM 的高維空間中，一個「特徵」通常不是對應到單一 neuron，而是對應到 activation space 中的一個方向（direction）。SAE 的目標就是學習出這些有意義的方向，將 activation 向量分解為一組稀疏的、可解釋的特徵。",
      },
      {
        type: "heading",
        text: "SAE 在做什麼？",
      },
      {
        type: "paragraph",
        text: "對某一層的 activation 進行 sparse dictionary learning，找出更接近 feature direction 的表示。透過 ablation、activation patching、feature steering 等技術，我們可以驗證這些學到的特徵是否真的對應到模型的行為。",
      },
      {
        type: "heading",
        text: "如何驗證？",
      },
      {
        type: "paragraph",
        text: "驗證 SAE 學到的特徵通常需要：設計對照實驗，比較修改特定 feature 前後模型輸出的變化；跨樣本驗證，確保同一 feature 在不同輸入下表現一致；以及因果介入，透過操控特定 feature 來觀察對模型行為的因果影響。",
      },
      {
        type: "callout",
        variant: "info",
        text: "SAE 的核心價值在於「分解」——將 LLM 中混合的、難以理解的 activation 分解為少數可解釋的稀疏特徵。這是通往 LLM 可解釋性的重要路徑。",
      },
    ],
    category: "tech",
    tags: [
      "LLM",
      "SAE",
      "可解釋性",
      "Sparse Autoencoder",
      "Mechanistic Interpretability",
    ],
    createdAt: "2025-12-20",
    readingTime: 5,
    featured: false,
    authorName: "空羽ノ境",
  },
  {
    slug: "community-values-respect-technology",
    title: "社群價值宣言：尊重技術、尊重成果、不內耗",
    excerpt:
      "一個高品質技術社群的核心價值——回覆看價值、言之有物、不做人身攻擊、把時間留給真正有意義的討論。這不是口號，而是每日實踐的準則。",
    content: [
      {
        type: "heading",
        text: "這裡支持的是什麼？",
      },
      {
        type: "list",
        items: [
          "回覆看價值，不為嘴砲而嘴砲——每一個回覆都應該帶來新的資訊或觀點",
          "學術性、技術性的爭論可以有，但要言之有物——衝突可以帶來進步，前提是有實質內容",
          "AI 不是玄學，是技術、工程、經驗與知識——拒絕神秘化，擁抱工程化",
          "不做人身攻擊；可以批評行為與觀點，但請提供有價值的資訊",
          "與其內耗，不如解答真正能幫助別人的問題",
        ],
      },
      {
        type: "heading",
        text: "尊重技術、尊重成果、尊重彼此",
      },
      {
        type: "paragraph",
        text: "技術社群的本質，是一群對技術有熱情的人聚在一起，互相學習、共同成長。當我們批評一個技術方案時，不是在批評提出方案的人；當我們討論一個架構的優劣時，不是在比較誰比較聰明。技術歸技術，人歸人。",
      },
      {
        type: "heading",
        text: "不是吵贏，而是帶來價值",
      },
      {
        type: "paragraph",
        text: "很多人把技術討論當成辯論賽，目標是「贏」。但真正有意義的討論，目標應該是「找到更好的答案」或「讓所有人都學到東西」。只會說「這很簡單」、「這沒意義」，卻不提供前後文、理論與資訊——這不是討論，是破壞價值。",
      },
      {
        type: "quote",
        text: "歡迎加入 FB 社團：硬核 AI 交流社。願每一個人都帶著「不內耗、提升自己、尊重技術與他人成果」的軟體業界精神前進。",
      },
      {
        type: "callout",
        variant: "tip",
        text: "把時間留給真正有意義的討論。你的每一次回覆，都是在塑造這個社群的未來。選擇帶來價值，而不是製造噪音。",
      },
    ],
    category: "community",
    tags: ["社群價值", "工程文化", "技術交流", "開源精神"],
    createdAt: "2025-12-12",
    readingTime: 3,
    featured: false,
    authorName: "空羽ノ境",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === current.category && b.category !== current.category)
        return -1;
      if (a.category !== current.category && b.category === current.category)
        return 1;
      // Then by date
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, limit);
}
