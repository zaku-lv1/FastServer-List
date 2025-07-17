// XMLHttpRequestオブジェクトの作成
var request = new XMLHttpRequest();

// URLを開く
request.open('GET', 'https://script.google.com/macros/s/AKfycbyQX2O29UD5hJqNOsmoyxXDdPaTX0ZGmfUuwdmUXpps6Gk9zSBEpO80spmN_lnMIegqpg/exec', true);

// レスポンスが返ってきた時の処理を記述 
request.onload = function () {
  // レスポンスが返ってきた時の処理
}

// リクエストをURLに送信
request.send();
