# KOKE CAFE — 飲食店向け LP テンプレート

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion で作った、
1ページ構成の飲食店向けランディングページ。
**[`src/config/siteConfig.ts`](src/config/siteConfig.ts) を書き換えるだけで別店舗のサイトとして使えます。**

- スマホファースト
- スクロール時のフェードインアニメーション
- 日本語 / 英語 の2言語対応（`/` = ja, `/en` = en）
- OG / Twitter Card / hreflang / JSON-LD（schema.org `CafeOrCoffeeShop`）

---

## はじめに

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 本番ビルド (webpack)
npm run start  # 本番起動
```

> ⚠️ プロジェクトパスにマルチバイト文字（例: `個人開発`）が含まれると Turbopack の本番ビルドが panic する既知の問題があるため、`build` は webpack 固定にしています（`next build --webpack`）。dev は Turbopack のままで OK です。

---

## ディレクトリ構成

```
src/
  app/
    layout.tsx          # フォント・<html lang> をリクエスト時に決定
    page.tsx            # `/` 日本語ページ
    en/page.tsx         # `/en` 英語ページ
    globals.css         # デザイントークン (CSS変数 + Tailwind @theme)
  components/
    LandingPage.tsx     # 全セクションの組み合わせ + JSON-LD埋め込み
    Nav.tsx             # 固定ナビ + 言語切替ボタン
    Hero.tsx
    Concept.tsx
    Menu.tsx            # タブ切替（Drinks / Food / Sweets）
    Gallery.tsx
    Quote.tsx
    Access.tsx          # Google Map iframe
    InstagramCTA.tsx
    Footer.tsx
    Reveal.tsx          # 共通フェードインラッパー (Framer Motion)
    SectionHeader.tsx
    JsonLd.tsx          # 構造化データ埋め込み
  config/
    siteConfig.ts       # ★ サイトの全データはここ
  lib/
    metadata.ts         # generateMetadata 用ヘルパー
    jsonLd.ts           # schema.org JSON-LD ビルダー
  proxy.ts              # ロケール判定（リクエストヘッダー x-locale）
public/
  images/               # 画像差し替え先（後述）
```

---

## 画像差し替えガイド

すべての画像は [`siteConfig.ts`](src/config/siteConfig.ts) の `site.images` で一元管理。
現状は Unsplash のサンプルURLが入っていますが、本番では `/public/images/` 以下に置いた画像を相対パスで指定するのが推奨です。

### 推奨ファイル配置

`public/images/` 配下に以下のファイル名で配置してください。
配置後、`siteConfig.ts` の `site.images` の各値を `/images/xxx.jpg` に書き換えるだけで反映されます。

| ファイル名 | スロット | 用途 | 推奨サイズ |
|---|---|---|---|
| `public/images/hero.jpg` | `site.images.hero` | Hero（ファーストビュー）の背景 | 1920 × 1280 以上 |
| `public/images/concept.jpg` | `site.images.concept` | Concept セクション横の縦長写真 | 900 × 1125（4:5） |
| `public/images/menu-featured.jpg` | `site.images.menuFeatured` | Today's Special の丸画像 | 400 × 400（1:1） |
| `public/images/og.jpg` | `site.images.og` | **SNS共有時のリッチカード画像（OG画像）** | **1200 × 630（必須）** |
| `public/images/gallery/01.jpg` | `site.images.gallery[0]` | Gallery 左端の縦長セル（`span: "tall"`） | 800 × 1600（1:2） |
| `public/images/gallery/02.jpg` | `site.images.gallery[1]` | Gallery 通常セル | 800 × 800（1:1） |
| `public/images/gallery/03.jpg` | `site.images.gallery[2]` | Gallery 通常セル | 800 × 800（1:1） |
| `public/images/gallery/04.jpg` | `site.images.gallery[3]` | Gallery 通常セル | 800 × 800（1:1） |
| `public/images/gallery/05.jpg` | `site.images.gallery[4]` | Gallery 通常セル | 800 × 800（1:1） |

### 差し替え例

```ts
// src/config/siteConfig.ts
export const site: SiteShared = {
  // ...
  images: {
    hero: "/images/hero.jpg",                  // ← Unsplash URLから差し替え
    concept: "/images/concept.jpg",
    menuFeatured: "/images/menu-featured.jpg",
    og: "/images/og.jpg",
    gallery: [
      { src: "/images/gallery/01.jpg", span: "tall" },
      { src: "/images/gallery/02.jpg" },
      { src: "/images/gallery/03.jpg" },
      { src: "/images/gallery/04.jpg" },
      { src: "/images/gallery/05.jpg" },
    ],
  },
  // ...
};
```

外部URLを使う場合は [`next.config.ts`](next.config.ts) の `images.remotePatterns` にホストを追加してください（現状 Unsplash は許可済み）。

### Gallery の alt テキスト

画像の `src` は共通ですが、`alt` テキストは言語別に持っています。
`content[locale].gallery.altText` の配列順が `site.images.gallery` と対応します。

---

## SNSシェア時のリッチカード（OG画像）

LINE / X / Slack / Facebook 等にURLを貼ったときに表示される画像・タイトル・説明文。

| 設定項目 | 場所 | 内容 |
|---|---|---|
| OG画像 | `site.images.og` | 1200×630の画像。専用画像を作るのが理想（hero流用も可） |
| OGタイトル | `content[locale].meta.title` | 言語別 |
| OG説明文 | `content[locale].meta.description` | 言語別 |
| サイト名 | `site.shop.name` | 共通 |
| サイトURL | `site.url` | **本番デプロイ時に必ず差し替え（現在 `https://koke-cafe.example.com`）** |

`site.url` は OG / canonical / hreflang / JSON-LD すべてのベースURLになります。**デプロイ前に必ず差し替えてください。**

シェア確認は以下のツールでテストできます。
- X (Twitter) Card Validator: https://cards-dev.twitter.com/validator
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- LINE は実際に貼って確認

---

## 多言語対応（i18n）

| URL | 言語 | 設定箇所 |
|---|---|---|
| `/` | 日本語 | `content.ja` |
| `/en` | 英語 | `content.en` |

### 文言を編集する

[`siteConfig.ts`](src/config/siteConfig.ts) の `ja` / `en` オブジェクトをそれぞれ書き換えてください。型は `SiteContent` で揃っているので、片方だけ追加すると TypeScript エラーになります。

### 言語切替ボタン

ナビ右端に `EN` / `JA` ボタンを表示。クリックで反対側のロケールページへ遷移します。
ラベルは `content[locale].nav.switchToOtherLocale` で変更可能。

### 仕組み

- [`src/proxy.ts`](src/proxy.ts) がリクエストパスを見て `x-locale` ヘッダーを付ける
- [`src/app/layout.tsx`](src/app/layout.tsx) がそのヘッダーを読み `<html lang>` に反映
- 各ページ (`app/page.tsx`, `app/en/page.tsx`) が `getSiteConfig(locale)` で言語別データを取得し `<LandingPage config={...} />` に渡す
- 各セクションコンポーネントは `config` prop を受け取るだけで言語を意識しない

---

## SEO

- **`<title>` / `<meta description>`** ... `content[locale].meta`
- **OG / Twitter Card** ... `lib/metadata.ts` で生成
- **canonical / hreflang** ... `lib/metadata.ts` の `alternates`
- **JSON-LD（構造化データ）** ... `lib/jsonLd.ts` で `CafeOrCoffeeShop` schema を生成し、`<LandingPage>` 内で埋め込み

JSON-LDで使う住所・営業時間は `site.map.schemaAddress` と `site.map.openingHours` で管理。
Googleの検索結果やマップのナレッジパネルに反映されやすくなります。

検証ツール:
- リッチリザルトテスト: https://search.google.com/test/rich-results

---

## デザイントークン

カラーとフォントは [`src/app/globals.css`](src/app/globals.css) の `:root` と `@theme inline` で定義。
Tailwind ユーティリティとして `bg-bg`, `text-accent`, `font-head` のように使えます。

| トークン | 役割 |
|---|---|
| `--bg` `--bg2` | ベージュ系の背景 |
| `--text` `--text-mid` | 本文・サブテキスト |
| `--accent` `--accent2` | ブラウン系のアクセント |
| `--white` | 反転用の暖色ホワイト |
| `--font-head` | 見出し（Cormorant Garamond） |
| `--font-body` | 本文（Noto Sans JP） |

色味やフォントを変えたいときはここを書き換えるだけで全体に反映されます。

---

## 別店舗テンプレートとして使うとき

1. `siteConfig.ts` の `site` と `content.ja` / `content.en` を書き換え
2. `public/images/` に画像配置 → `site.images.*` を相対パスに変更
3. `site.url` を本番URLに差し替え
4. `globals.css` の `:root` でカラーを微調整
5. `app/layout.tsx` の `<title>` 系は `siteConfig` から自動で反映されるので触らなくてOK
