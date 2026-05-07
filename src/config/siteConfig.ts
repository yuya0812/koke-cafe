// =============================================================================
//  Site Config
//  -----------
//  全データはこのファイルに集約。別店舗のLPに転用するときも、ここを書き換えるだけ。
//
//  - `site`     ... 言語に依存しない共有設定（画像パス・SNS・地図・住所など）
//  - `content`  ... 言語ごとの文字列（ja/en）
//
//  画像差し替え方法は README.md の「画像差し替えガイド」を参照。
// =============================================================================

export type Locale = "ja" | "en";

export const locales: readonly Locale[] = ["ja", "en"] as const;
export const defaultLocale: Locale = "ja";

// -----------------------------------------------------------------------------
//  共有: 言語に依存しない設定
// -----------------------------------------------------------------------------

export type GalleryImage = {
  /** /public/images/gallery/01.jpg のような相対パス、または外部URL */
  src: string;
  /** "tall" にすると左端の縦長セルになる（PC表示時のみ） */
  span?: "tall" | "default";
};

export type SiteShared = {
  /** 本番URL。OG/canonical/JSON-LDで使用 */
  url: string;
  shop: {
    name: string;
    nameShort: string;
    /** Heroの大きいタイトル（言語不問の店名ロゴ） */
    titleLines: string[];
  };
  /**
   * 画像スロット。Unsplashサンプルは /public/images/... へ差し替え推奨。
   * README の「画像差し替えガイド」を参照。
   */
  images: {
    /** Heroの背景（推奨: 1920x1280以上） */
    hero: string;
    /** Concept横の縦長画像（推奨: 4:5・900x1125以上） */
    concept: string;
    /** Today's Special の丸画像（推奨: 1:1・400x400） */
    menuFeatured: string;
    /** SNSシェア時のOGカード画像（推奨: 1200x630・JPG/PNG） */
    og: string;
    /** Galleryの画像。最初の1枚は span: "tall" にすると映える */
    gallery: GalleryImage[];
  };
  social: {
    instagramUrl: string;
    instagramHandle: string;
    email: string;
  };
  map: {
    /** Google Maps の埋め込みiframe URL */
    embedUrl: string;
    /** 「Google マップで開く」リンク先 */
    linkUrl: string;
    /** JSON-LD用の構造化住所 */
    schemaAddress: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    /** 営業時間（JSON-LD用） */
    openingHours: {
      /** 開いている曜日（schema.orgの形式） */
      daysOfWeek: Array<
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday"
        | "Sunday"
      >;
      /** "HH:MM" */
      opens: string;
      /** "HH:MM" */
      closes: string;
    };
  };
};

export const site: SiteShared = {
  url: "https://koke-cafe.example.com", // ← 本番URLに差し替え
  shop: {
    name: "KOKE CAFE",
    nameShort: "KOKE",
    titleLines: ["KOKE", "CAFE"],
  },
  images: {
    // 差し替え時は /public/images/hero.jpg のようなパスに変更
    hero: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1920&q=80",
    concept:
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=80",
    menuFeatured:
      "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=400&q=80",
    // OG画像。/public/images/og.jpg に差し替え推奨。1200x630の専用画像が望ましい
    og: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&h=630&q=80",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
        span: "tall",
      },
      {
        src: "https://images.unsplash.com/photo-1542181961-9590d0c79dab?auto=format&fit=crop&w=800&q=80",
      },
      {
        src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      },
      {
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80",
      },
      {
        src: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  social: {
    instagramUrl: "https://instagram.com/",
    instagramHandle: "@koke_cafe",
    email: "hello@koke-cafe.jp",
  },
  map: {
    // APIキー不要のシンプルなiframe埋め込み形式。q= で住所/座標を指定
    embedUrl:
      "https://maps.google.com/maps?q=%E4%B8%8B%E9%B4%A8%E7%A5%9E%E7%A4%BE&t=&z=15&ie=UTF8&iwloc=&output=embed",
    linkUrl: "https://maps.google.com/?q=下鴨神社",
    schemaAddress: {
      streetAddress: "下鴨泉川町×-× パーク下鴨 1F",
      addressLocality: "京都市左京区",
      addressRegion: "京都府",
      postalCode: "606-0801",
      addressCountry: "JP",
    },
    openingHours: {
      daysOfWeek: [
        "Monday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  },
};

// -----------------------------------------------------------------------------
//  言語別: 画面に表示する文字列
// -----------------------------------------------------------------------------

export type MenuItem = {
  name: string;
  description: string;
  price: string;
};

export type MenuCategory = {
  id: "drinks" | "food" | "sweets";
  label: string;
  items: MenuItem[];
};

export type ValueItem = {
  num: string;
  title: string;
  description: string;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    items: { label: string; href: string }[];
    /** 言語切替ボタンに表示する反対側の言語ラベル */
    switchToOtherLocale: string;
  };
  hero: {
    eyebrow: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    scrollLabel: string;
  };
  concept: {
    label: string;
    title: string;
    titleEm: string;
    paragraphs: string[];
    values: ValueItem[];
  };
  menu: {
    label: string;
    title: string;
    titleEm: string;
    categories: MenuCategory[];
    featured: {
      label: string;
      name: string;
      description: string;
    };
  };
  gallery: {
    label: string;
    title: string;
    titleEm: string;
    /** site.images.gallery と同じ並び順で alt を指定 */
    altText: string[];
  };
  quote: {
    text: string[];
    author: string;
  };
  access: {
    label: string;
    title: string;
    titleEm: string;
    addressLabel: string;
    addressLines: string[];
    hoursLabel: string;
    hoursLines: string[];
    holiday: string;
    directionLabel: string;
    direction: string;
    contactLabel: string;
    mapOpenLabel: string;
  };
  instagram: {
    title: string;
    subtitle: string;
    followLabel: string;
  };
  footer: {
    tagline: string;
    locationLabel: string;
    hoursTitle: string;
    linksTitle: string;
    instagramLinkLabel: string;
    copyright: string;
  };
};

const ja: SiteContent = {
  meta: {
    title: "KOKE CAFE — 苔と珈琲の静かな時間",
    description:
      "京都・下鴨の路地に佇む小さなカフェ。スペシャルティコーヒーと手作りのお菓子で、ゆっくりと流れる時間をお届けします。",
  },
  nav: {
    items: [
      { label: "Concept", href: "#concept" },
      { label: "Menu", href: "#menu" },
      { label: "Gallery", href: "#gallery" },
      { label: "Access", href: "#access" },
    ],
    switchToOtherLocale: "EN",
  },
  hero: {
    eyebrow: "Since 2019 — Kyoto, Shimogamo",
    subtitle: "苔と珈琲の、静かな時間",
    ctaLabel: "Discover More",
    ctaHref: "#concept",
    scrollLabel: "Scroll",
  },
  concept: {
    label: "Our Concept",
    title: "一杯の珈琲が\nつくる",
    titleEm: "余白",
    paragraphs: [
      "京都・下鴨の静かな路地に佇む小さなカフェ。スペシャルティコーヒーと手作りのお菓子を、丁寧にお届けしています。",
      "忙しい日常から少し離れて、ゆっくりと流れる時間を感じてほしい。そんな想いでつくった空間です。",
    ],
    values: [
      {
        num: "01",
        title: "Specialty Coffee",
        description:
          "産地にこだわったスペシャルティコーヒーを、毎朝丁寧にハンドドリップ。",
      },
      {
        num: "02",
        title: "Handmade Sweets",
        description:
          "季節の素材を使ったお菓子を、毎日少量ずつ手作りしています。",
      },
      {
        num: "03",
        title: "Quiet Space",
        description:
          "読書や思索に集中できる、静かでゆったりとした空間を心がけています。",
      },
    ],
  },
  menu: {
    label: "Menu",
    title: "丁寧に選んだ\n",
    titleEm: "一杯と一皿",
    categories: [
      {
        id: "drinks",
        label: "Drinks",
        items: [
          {
            name: "Hand Drip Coffee",
            description: "本日のスペシャルティ豆をハンドドリップで",
            price: "¥680",
          },
          {
            name: "Café Latte",
            description: "自家製エスプレッソと有機牛乳のやさしい一杯",
            price: "¥720",
          },
          {
            name: "Matcha Latte",
            description: "京都産宇治抹茶を使ったまろやかな抹茶ラテ",
            price: "¥750",
          },
          {
            name: "Houjicha Latte",
            description: "深みのある焙じ茶と北海道牛乳の温かいラテ",
            price: "¥700",
          },
          {
            name: "Tonic Espresso",
            description: "トニックウォーターにエスプレッソを注いだ夏の定番",
            price: "¥780",
          },
        ],
      },
      {
        id: "food",
        label: "Food",
        items: [
          {
            name: "Morning Plate",
            description: "トースト・ゆで卵・サラダの朝の定番プレート（11時まで）",
            price: "¥880",
          },
          {
            name: "Avocado Toast",
            description: "自家製パンにアボカドとクリームチーズを重ねて",
            price: "¥950",
          },
          {
            name: "Soup of the Day",
            description: "毎日変わる季節野菜のスープ。パン付き",
            price: "¥680",
          },
        ],
      },
      {
        id: "sweets",
        label: "Sweets",
        items: [
          {
            name: "Basque Cheesecake",
            description: "外はほろ苦く、中はとろける自家製バスクチーズケーキ",
            price: "¥580",
          },
          {
            name: "Seasonal Tart",
            description: "旬の果物を使ったタルト。週替わりで変わります",
            price: "¥620",
          },
          {
            name: "Warabi Mochi",
            description: "京都産のわらび粉を使ったわらびもち。抹茶蜜添え",
            price: "¥520",
          },
        ],
      },
    ],
    featured: {
      label: "Today's Special",
      name: "エチオピア イルガチェフェ",
      description:
        "ジャスミンやベリーを思わせる華やかな香りと、明るい酸味が特徴のナチュラルプロセス。毎週水曜日に新鮮な豆が届きます。",
    },
  },
  gallery: {
    label: "Gallery",
    title: "空間と",
    titleEm: "記憶",
    altText: [
      "店内の様子",
      "ラテアート",
      "スイーツ",
      "窓辺の様子",
      "コーヒー豆",
    ],
  },
  quote: {
    text: [
      "時間をかけて一杯を淹れる。",
      "その行為そのものが、",
      "もてなしだと思っています。",
    ],
    author: "— KOKE CAFE オーナー",
  },
  access: {
    label: "Access",
    title: "お越しの",
    titleEm: "方へ",
    addressLabel: "住所",
    addressLines: [
      "〒606-0801",
      "京都府京都市左京区下鴨泉川町×-×",
      "パーク下鴨 1F",
    ],
    hoursLabel: "営業時間",
    hoursLines: ["月・水〜日 / 9:00 – 18:00"],
    holiday: "火曜定休",
    directionLabel: "アクセス",
    direction: "市バス「下鴨神社前」停留所より徒歩3分",
    contactLabel: "お問い合わせ",
    mapOpenLabel: "Google マップで開く →",
  },
  instagram: {
    title: "Instagram",
    subtitle: "日々のコーヒーや店内の様子をお届けしています",
    followLabel: "@koke_cafe をフォロー",
  },
  footer: {
    tagline: "苔と珈琲の、静かな時間。",
    locationLabel: "京都・下鴨",
    hoursTitle: "Hours",
    linksTitle: "Links",
    instagramLinkLabel: "Instagram",
    copyright: "© 2026 KOKE CAFE. All rights reserved.",
  },
};

const en: SiteContent = {
  meta: {
    title: "KOKE CAFE — A quiet moment with moss and coffee",
    description:
      "A small café tucked into a quiet alley in Shimogamo, Kyoto. Specialty coffee and handmade sweets, served with care.",
  },
  nav: {
    items: [
      { label: "Concept", href: "#concept" },
      { label: "Menu", href: "#menu" },
      { label: "Gallery", href: "#gallery" },
      { label: "Access", href: "#access" },
    ],
    switchToOtherLocale: "JA",
  },
  hero: {
    eyebrow: "Since 2019 — Kyoto, Shimogamo",
    subtitle: "A quiet moment with moss and coffee",
    ctaLabel: "Discover More",
    ctaHref: "#concept",
    scrollLabel: "Scroll",
  },
  concept: {
    label: "Our Concept",
    title: "A cup of coffee\ncreates ",
    titleEm: "stillness",
    paragraphs: [
      "A small café tucked into a quiet alley in Shimogamo, Kyoto. We craft specialty coffee and handmade sweets with care.",
      "Step away from busy days and feel time slow down — that's the space we built.",
    ],
    values: [
      {
        num: "01",
        title: "Specialty Coffee",
        description:
          "Single-origin specialty beans, hand-dripped fresh every morning.",
      },
      {
        num: "02",
        title: "Handmade Sweets",
        description:
          "Small-batch sweets made daily with seasonal ingredients.",
      },
      {
        num: "03",
        title: "Quiet Space",
        description:
          "A calm, unhurried place designed for reading and reflection.",
      },
    ],
  },
  menu: {
    label: "Menu",
    title: "Carefully chosen\n",
    titleEm: "cups & plates",
    categories: [
      {
        id: "drinks",
        label: "Drinks",
        items: [
          {
            name: "Hand Drip Coffee",
            description: "Today's specialty bean, hand-dripped to order",
            price: "¥680",
          },
          {
            name: "Café Latte",
            description: "House espresso with organic milk, gently balanced",
            price: "¥720",
          },
          {
            name: "Matcha Latte",
            description: "Smooth Uji matcha latte from Kyoto",
            price: "¥750",
          },
          {
            name: "Houjicha Latte",
            description: "Deep-roasted houjicha with Hokkaido milk, warm and mellow",
            price: "¥700",
          },
          {
            name: "Tonic Espresso",
            description: "Tonic water topped with espresso — a summer staple",
            price: "¥780",
          },
        ],
      },
      {
        id: "food",
        label: "Food",
        items: [
          {
            name: "Morning Plate",
            description: "Toast, boiled egg and salad (until 11:00)",
            price: "¥880",
          },
          {
            name: "Avocado Toast",
            description: "House bread with avocado and cream cheese",
            price: "¥950",
          },
          {
            name: "Soup of the Day",
            description: "Daily seasonal vegetable soup, served with bread",
            price: "¥680",
          },
        ],
      },
      {
        id: "sweets",
        label: "Sweets",
        items: [
          {
            name: "Basque Cheesecake",
            description:
              "Caramelized top, soft and creamy inside — house-baked",
            price: "¥580",
          },
          {
            name: "Seasonal Tart",
            description: "Tart with seasonal fruit. Rotates weekly.",
            price: "¥620",
          },
          {
            name: "Warabi Mochi",
            description: "Kyoto warabi mochi with matcha syrup",
            price: "¥520",
          },
        ],
      },
    ],
    featured: {
      label: "Today's Special",
      name: "Ethiopia Yirgacheffe",
      description:
        "Bright acidity with floral jasmine and berry notes from a natural process. Fresh beans arrive every Wednesday.",
    },
  },
  gallery: {
    label: "Gallery",
    title: "Space &\n",
    titleEm: "memory",
    altText: [
      "Cafe interior",
      "Latte art",
      "Sweets",
      "Window seat",
      "Coffee beans",
    ],
  },
  quote: {
    text: [
      "Brewing one cup with care.",
      "That act itself,",
      "is hospitality to me.",
    ],
    author: "— Owner, KOKE CAFE",
  },
  access: {
    label: "Access",
    title: "Visiting ",
    titleEm: "us",
    addressLabel: "Address",
    addressLines: [
      "Park Shimogamo 1F",
      "×-× Izumigawa-cho, Shimogamo,",
      "Sakyo-ku, Kyoto 606-0801",
    ],
    hoursLabel: "Hours",
    hoursLines: ["Mon, Wed–Sun / 9:00 – 18:00"],
    holiday: "Closed on Tuesdays",
    directionLabel: "Direction",
    direction: "3-min walk from 'Shimogamo Jinja-mae' bus stop",
    contactLabel: "Contact",
    mapOpenLabel: "Open in Google Maps →",
  },
  instagram: {
    title: "Instagram",
    subtitle: "Daily coffee and quiet moments from the shop",
    followLabel: "Follow @koke_cafe",
  },
  footer: {
    tagline: "A quiet moment with moss and coffee.",
    locationLabel: "Kyoto, Shimogamo",
    hoursTitle: "Hours",
    linksTitle: "Links",
    instagramLinkLabel: "Instagram",
    copyright: "© 2026 KOKE CAFE. All rights reserved.",
  },
};

export const content: Record<Locale, SiteContent> = { ja, en };

// -----------------------------------------------------------------------------
//  Helper: getSiteConfig(locale)
//  各ページ・コンポーネントがこの返り値を受け取って描画する。
// -----------------------------------------------------------------------------

export type SiteConfig = {
  locale: Locale;
  altLocale: Locale;
  /** 反対言語ページのパス */
  altLocalePath: string;
  /** 自言語のホームパス */
  homePath: string;
  /** OG用ロケール (ja_JP / en_US) */
  ogLocale: string;
  site: SiteShared;
  content: SiteContent;
};

export function getSiteConfig(locale: Locale): SiteConfig {
  const altLocale: Locale = locale === "ja" ? "en" : "ja";
  return {
    locale,
    altLocale,
    altLocalePath: altLocale === "ja" ? "/" : "/en",
    homePath: locale === "ja" ? "/" : "/en",
    ogLocale: locale === "ja" ? "ja_JP" : "en_US",
    site,
    content: content[locale],
  };
}

export function isLocale(value: string | undefined): value is Locale {
  return value === "ja" || value === "en";
}
