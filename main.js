// min websocket som hämtar information om kryptovaluta från binance api url.
// wss står för websocket secure connection
let webSocketPrice = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade');
let stockPriceElement = document.getElementById('stockPrice');
let lastPrice = null;

webSocketPrice.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    let price = parseFloat(stockObject.p).toFixed(2);
    stockPriceElement.innerText = price;
/*Om lastPrice är null eller oförändrat då blir siffrorna svarta. Price större än lastPrice då blir den grön, 
ifall mindre röd.
! = not / inte          === = strictly equal too/ strikt likamed
|| = or / eller         ? = if/om       : = delimiter / avgränsare*/                       
    stockPriceElement.style.color = !lastPrice || lastPrice === price ? 'black' : 
    price > lastPrice ? 'green' : 'red';

    lastPrice = price;
};

// nu ska jag göra en ny websocket för att hämta candlestick handelsinformation ifrån binance API.
let webSocketCandlestick = new WebSocket('wss://stream.binance.com:9443/ws/etheur@kline_1m');

webSocketCandlestick.onmessage = (event) => {
    console.log(event.data);
};