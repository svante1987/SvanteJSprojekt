let webSocket = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade');


webSocket.onmessage = (event) => {
    console.log(event.data);
}