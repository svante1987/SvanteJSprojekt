// min websocket som hämtar information om kryptovaluta från binance api url.
// wss står för websocket secure connection
let webSocket = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade');


webSocket.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);

    console.log(stockObject.p);
};