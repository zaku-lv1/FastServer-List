# FastServer List

**ZSHARE** が開発した **FastServer** サービスのサーバーリストWebアプリケーションです。提供されているAPIを元に、便利で使いやすいMinecraftサーバーリストを作成しています。

## 🚀 概要

FastServer Listは、Minecraftプレイヤーが高速で安定したサーバーを簡単に見つけられるようにするWebアプリケーションです。リアルタイムでサーバー情報を取得し、直感的なUIで表示します。

### ✨ 主な機能

- **リアルタイム更新**: 30秒間隔でサーバー情報を自動更新
- **高度な検索・フィルタリング**: サーバー名、プロトコル（TCP/UDP）での絞り込み
- **詳細なサーバー情報**: プレイヤー数、バージョン、MOTD、接続アドレスなど
- **レスポンシブデザイン**: PC、タブレット、スマートフォン対応
- **接続情報のコピー**: ワンクリックでサーバーアドレスをクリップボードにコピー
- **Minecraftスタイル**: MOTDのカラーコード表示に対応

## 🔗 ライブサイト

**[https://fss.zaku79.me/](https://fss.zaku79.me/)**

## 🛠️ 技術スタック

- **フロントエンド**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **スタイリング**: カスタムCSS, Font Awesome アイコン
- **API**: Google Apps Script API
- **デプロイ**: GitHub Pages
- **その他**: SweetAlert2 (通知), Progressive Web App対応

## 📋 サーバー情報

各サーバーカードには以下の情報が表示されます：

- **サーバー名**: サーバーの表示名
- **プロトコル**: TCP（Java版）または UDP（統合版）
- **プレイヤー数**: 現在のオンラインプレイヤー数
- **バージョン**: サポートするMinecraftバージョン
- **接続アドレス**: `{connect_key}.zcnc.me` 形式
- **MOTD**: サーバーのメッセージ（Minecraftカラーコード対応）
- **最終更新日時**: サーバー情報の最終更新タイムスタンプ

## 🚀 ローカル開発

### 前提条件

- モダンなWebブラウザ（Chrome, Firefox, Safari, Edge）
- ローカルWebサーバー（推奨）

### セットアップ

1. リポジトリをクローン
```bash
git clone https://github.com/zaku-lv1/FastServer-List.git
cd FastServer-List
```

2. ローカルサーバーを起動
```bash
# Python 3の場合
python -m http.server 8000

# Node.jsのhttpサーバーの場合
npx http-server

# PHP内蔵サーバーの場合
php -S localhost:8000
```

3. ブラウザで `http://localhost:8000` にアクセス

## 📁 ファイル構造

```
FastServer-List/
├── index.html          # メインページ
├── app.js             # メインのJavaScriptアプリケーション
├── styles.css         # スタイルシート
├── faq.html          # よくある質問ページ
├── sitemap.xml       # SEO用サイトマップ
├── CNAME             # GitHub Pagesドメイン設定
└── public/           # 静的リソース
    ├── logo.webp     # ロゴ画像
    └── styles.css    # 追加スタイル
```

## 🔧 API エンドポイント

### プライマリAPI
```
https://script.google.com/macros/s/AKfycbyQX2O29UD5hJqNOsmoyxXDdPaTX0ZGmfUuwdmUXpps6Gk9zSBEpO80spmN_lnMIegqpg/exec
```

### フォールバックAPI
```
/api/servers
```

### レスポンス形式
```json
{
  "data": [
    {
      "サーバー名": "サーバー名",
      "connect_key": "connection-key",
      "protocol": "tcp",
      "mcinfo": {
        "players": 10,
        "version": "1.20.1",
        "motd": "サーバーのMOTD",
        "favicon": "data:image/png;base64,..."
      },
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## 🎯 主要機能の実装

### 自動更新システム
- 30秒間隔でAPIを呼び出し
- 差分検出による効率的な更新
- エラー時のフォールバック機能

### 検索・フィルタリング
- リアルタイム検索（サーバー名）
- プロトコル別フィルタ（TCP/UDP）
- プレイヤー数・名前順ソート

### レスポンシブデザイン
- モバイルファーストアプローチ
- フレキシブルグリッドレイアウト
- タッチフレンドリーなUI

## 🤝 コントリビューション

このプロジェクトへの貢献を歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. Pull Requestを作成

## 📞 サポート・連絡先

- **よくある質問**: [FAQ](https://fss.zaku79.me/faq.html)
- **お問い合わせ**: [https://zaku79.me/profile/](https://zaku79.me/profile/)
- **Discord**: [https://discord.zpw.jp/](https://discord.zpw.jp/)
- **Twitter**: [@fastserverv3](https://x.com/fastserverv3)

## 📄 ライセンス

このプロジェクトのライセンス情報については、リポジトリの管理者にお問い合わせください。

## 🙏 謝辞

- **ZSHARE** - FastServerサービスの開発・提供
- **FastServer** - 高速で安定したMinecraftサーバーインフラの提供
- Minecraftコミュニティ - 継続的なサポートとフィードバック

---

**FastServer Connect** - 最高のMinecraftサーバー体験を提供します。