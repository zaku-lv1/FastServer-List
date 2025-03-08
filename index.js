const express = require('express');
const axios = require('axios');
const app = express();

// EJSをビューエンジンとして設定
app.set('view engine', 'ejs');
app.set('views', './views');

// 静的ファイルの設定（CSSや画像などがあればここで提供します）
app.use(express.static('public'));

// APIからサーバーリストを取得
app.get('/', async (req, res) => {
  try {
    // APIリクエスト
    const response = await axios.get('https://api.zpw.jp/connect/serverlist.php');
    
    // レスポンスデータをビューに渡してレンダリング
    res.render('index', { servers: response.data.data });
  } catch (error) {
    console.error(error);
    res.status(500).send('サーバーリストの取得に失敗しました。');
  }
});

// ポート3000でサーバーを開始
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
