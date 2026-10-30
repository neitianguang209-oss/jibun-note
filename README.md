# じぶんノート

問いのストックから今日の問いを選んで Claude と話し、出てきた考え・気づきとその変化を貯めて振り返るノート。

- データ: Supabase `gzayrjlhruhvklsidraw` の `jibun_questions`(問いストック)・`shukatsu_talks`(話した記録)・`shukatsu_insights`(気づき)・`shukatsu_reports`(週の変化レポート)。テーマは キャリア / 恋愛・人間関係 / 人生観 / 日々の気持ち
- アプリは関数 `jibun_api(合言葉, 動作, 引数)` だけを通して読み書きする。表は anon から閉じている。合言葉は初回だけ `#k=...` 付きのリンクで開くと端末に保存される
- 対話は claude.ai の指示文「トリガー6 自分を知るトーク」が担当(話す・保存する)

## iPhoneへの入れ方
1. 合言葉つきのリンクを **Safari** で開く
2. 共有ボタン → 「ホーム画面に追加」

## ローカル
`powershell -ExecutionPolicy Bypass -File serve.ps1` → http://localhost:5512
