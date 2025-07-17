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
    const response = await axios.get('https://script.google.com/macros/s/AKfycbyQX2O29UD5hJqNOsmoyxXDdPaTX0ZGmfUuwdmUXpps6Gk9zSBEpO80spmN_lnMIegqpg/exec', {
      timeout: 5000 // 5秒でタイムアウト
    });
    
    // APIレスポンスの構造を確認し、サーバーデータを取得
    let servers = [];
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      servers = response.data.data;
    } else if (Array.isArray(response.data)) {
      servers = response.data;
    }
    
    // レスポンスデータをビューに渡してレンダリング
    res.render('index', { servers: servers });
  } catch (error) {
    console.error('API取得エラー:', error.message);
    
    // APIが利用できない場合のフォールバックデータ
    const fallbackServers = [
      {
        "サーバー名": "サンプルサーバー1",
        "connect_key": "sample1",
        "protocol": "tcp",
        "mcinfo": {
          "version": "1.20.1",
          "players": "5",
          "motd": "§aサンプルサーバーです §b- §eAPIが利用できません",
          "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
        },
        "created_at": new Date().toISOString(),
        "updated_at": new Date().toISOString()
      },
      {
        "サーバー名": "サンプルサーバー2",
        "connect_key": "sample2", 
        "protocol": "udp",
        "mcinfo": {
          "version": "1.20.1",
          "players": "3",
          "motd": "§cAPIエラー時のフォールバック §6データです",
          "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
        },
        "created_at": new Date().toISOString(),
        "updated_at": new Date().toISOString()
      }
    ];
    
    // フォールバックデータでレンダリング（エラーページではなく）
    res.render('index', { 
      servers: fallbackServers,
      apiError: true,
      errorMessage: 'APIサーバーが一時的に利用できません。フォールバックデータを表示しています。'
    });
  }
});

// APIエンドポイント（クライアントサイド用）
app.get('/api/servers', async (req, res) => {
  try {
    // APIリクエスト
    const response = await axios.get('https://script.google.com/macros/s/AKfycbyQX2O29UD5hJqNOsmoyxXDdPaTX0ZGmfUuwdmUXpps6Gk9zSBEpO80spmN_lnMIegqpg/exec', {
      timeout: 5000 // 5秒でタイムアウト
    });
    
    // APIレスポンスの構造を確認し、サーバーデータを取得
    let servers = [];
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      servers = response.data.data;
    } else if (Array.isArray(response.data)) {
      servers = response.data;
    }
    
    // JSON形式でレスポンス
    res.json({ success: true, data: servers });
  } catch (error) {
    console.error('API取得エラー:', error.message);
    
    // APIが利用できない場合のフォールバックデータ
    const fallbackServers = [
      {
        "サーバー名": "サンプルサーバー1",
        "connect_key": "sample1",
        "protocol": "tcp",
        "mcinfo": {
          "version": "1.20.1",
          "players": "5",
          "motd": "§aサンプルサーバーです §b- §eAPIが利用できません",
          "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
        },
        "created_at": new Date().toISOString(),
        "updated_at": new Date().toISOString()
      },
      {
        "サーバー名": "サンプルサーバー2",
        "connect_key": "sample2", 
        "protocol": "udp",
        "mcinfo": {
          "version": "1.20.1",
          "players": "3",
          "motd": "§cAPIエラー時のフォールバック §6データです",
          "favicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
        },
        "created_at": new Date().toISOString(),
        "updated_at": new Date().toISOString()
      }
    ];
    
    // エラー時もJSONで返す
    res.json({ 
      success: false, 
      data: fallbackServers,
      error: 'APIサーバーが一時的に利用できません。フォールバックデータを表示しています。'
    });
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