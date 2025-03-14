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

function minecraftColorToHtml(text) {
  const colorCodes = {
    '0': '#000000', // ブラック
    '1': '#0000AA', // ダークブルー
    '2': '#00AA00', // ダークグリーン
    '3': '#00AAAA', // ダークアクア
    '4': '#AA0000', // ダークレッド
    '5': '#AA00AA', // ダークピンク
    '6': '#FFAA00', // ゴールド
    '7': '#AAAAAA', // グレー
    '8': '#555555', // ダークグレー
    '9': '#5555FF', // ブルー
    'a': '#55FF55', // グリーン
    'b': '#55FFFF', // アクア
    'c': '#FF5555', // レッド
    'd': '#FF55FF', // ピンク
    'e': '#FFFF55', // イエロー
    'f': '#FFFFFF', // ホワイト
  };

  let result = '';
  let currentColor = 'f';  // デフォルト色は白
  let isBold = false;  // ボールドを管理
  let isItalic = false;  // イタリックを管理

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    // Minecraftカラーコード（§[0-9a-f]）を検出
    if (char === '§' && /[0-9a-frkoiulmn]/i.test(text[i + 1])) {
      const code = text[i + 1].toLowerCase();

      // 色リセット
      if (code === 'r') {
        currentColor = 'f';  // デフォルト色にリセット
        isBold = false;
        isItalic = false;
      } 
      // カラーコード
      else if (colorCodes[code]) {
        currentColor = code;  // 色を更新
      }
      // スタイルコード
      else if (code === 'l') {  // ボールド
        isBold = true;
      } else if (code === 'o') {  // イタリック
        isItalic = true;
      }
      
      i++;  // 次の文字はカラーコードなのでスキップ
    } else {
      // カラーコードを適用した文字を追加
      let style = `color: ${colorCodes[currentColor]};`;

      if (isBold) style += ' font-weight: bold;';
      if (isItalic) style += ' font-style: italic;';

      result += `<span style="${style}">${char}</span>`;
    }
  }

  return result;
}


app.locals.minecraftColorToHtml = minecraftColorToHtml;