///#region SHOW PRICE
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
///#endregion SHOW PRICE

///#region CANDLESTICK GRAF
// kod för att göra candlestick graf.
var chart = LightweightCharts.createChart(document.getElementById('stockChart'), {
	width: 600,
  height: 300,
	layout: {
		backgroundColor: '#000000',
		textColor: 'rgba(255, 255, 255, 0.9)',
	},
	grid: {
		vertLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
		horzLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
	},
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
	rightPriceScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
	},
	timeScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
	},
});

var candleSeries = chart.addCandlestickSeries({
  upColor: 'rgba(255, 144, 0, 1)',
  downColor: '#000',
  borderDownColor: 'rgba(255, 144, 0, 1)',
  borderUpColor: 'rgba(255, 144, 0, 1)',
  wickDownColor: 'rgba(255, 144, 0, 1)',
  wickUpColor: 'rgba(255, 144, 0, 1)',
});


// nu ska jag göra en ny websocket för att hämta candlestick handelsinformation ifrån binance API.
let webSocketCandlestick = new WebSocket('wss://stream.binance.com:9443/ws/etheur@kline_1m');

webSocketCandlestick.onmessage = (event) => {
    let message = JSON.parse(event.data);
    //k hämtar candlestick datan och inte allt det andra som jag inte vill ha.
    let candlestick = message.k;
    console.log(message.k);

//metod för att uppdatera candlesticksen
candleSeries.update({
    time: candlestick.t / 1000,
    open: candlestick.o,
    high: candlestick.h,
    low: candlestick.l,
    close: candlestick.c
})
}
///#endregion CANDLESTICK GRAF