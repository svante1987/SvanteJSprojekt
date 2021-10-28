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
/* kod för att göra candlestick graf ifrån lightweight charts dokumentation som jag har modifierat lite.
https://jsfiddle.net/TradingView/eaod9Lq8/*/
var chart = LightweightCharts.createChart(document.getElementById('stockChart'), {
	width: 1000,
  height: 500,
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
        //lägger till nedan så att tid visas
        timeVisible: true,
        secondsVisible: false,
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