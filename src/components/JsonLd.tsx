/**
 * 構造化データ (schema.org JSON-LD) を <script type="application/ld+json"> として埋め込む。
 *
 * 安全性メモ:
 * - data はサーバーサイドで構築されたオブジェクト（外部入力なし）
 * - `<` を Unicode エスケープして `</script>` 注入を防止
 * - Next.js の公式パターンに準拠
 */
type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
