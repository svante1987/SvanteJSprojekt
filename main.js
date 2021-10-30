"use strict";
//Namn på olika element som skall ändras när man byter valuta.
document.getElementById('kryptoButton').innerText = 'Bitcoin';
document.getElementById('kryptoLogo').src = './img/ethereum-logo-landscape-purple.png';
document.getElementById('kryptoNamn').innerText = 'Ethereum';
///#Region SHOW PRICE
//Mina urls till mina websockets
// Wss står för websocket secure connection
let cryptoEthPriceUrl = 'wss://stream.binance.com:9443/ws/etheur@trade';
let cryptoBtcPriceUrl = 'wss://stream.binance.com:9443/ws/btceur@trade';
let cryptoName = document.getElementById('kryptoNamn').innerText;
// Skapar mina websocket som hämtar information om kryptovaluta från binance api url.
let webSocketEthPrice = new WebSocket(cryptoEthPriceUrl);
let webSocketBtcPrice = new WebSocket(cryptoBtcPriceUrl);

let stockPriceElement = document.getElementById('stockPrice');

function ethPriceElement(){
let lastPrice = null;
webSocketEthPrice.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    let ethPrice = parseFloat(stockObject.p).toFixed(2);
    stockPriceElement.innerText = ethPrice;
/*Om lastPrice är null eller oförändrat då blir siffrorna svarta. Price större än lastPrice då blir den grön, 
ifall mindre röd.
! = not / inte          === = strictly equal too/ strikt likamed
|| = or / eller         ? = if/om       : = delimiter / avgränsare*/                       
    stockPriceElement.style.color = !lastPrice || lastPrice === ethPrice ? 'black' : 
    ethPrice > lastPrice ? 'green' : 'red';
    lastPrice = ethPrice;
  };
} 

function btcPriceElement(){
  let lastPrice = null;
webSocketBtcPrice.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    let btcPrice = parseFloat(stockObject.p).toFixed(2);
    stockPriceElement.innerText = btcPrice;
                    
    stockPriceElement.style.color = !lastPrice || lastPrice === btcPrice ? 'black' : 
    btcPrice > lastPrice ? 'green' : 'red';
    lastPrice = btcPrice;
  };
}
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

//Funktion som gör mitt chart fönster lite mer responsivt.
let x = window.matchMedia("(max-width: 700px)")
  chartSize(x)
  x.addListener(chartSize)

function chartSize(x) {
    if (x.matches) {
        chart.resize(250, 150);
    }
    else{
        chart.resize(1000, 500);
    }
  }
  
let candleSeries = chart.addCandlestickSeries({
  upColor: 'rgba(255, 144, 0, 1)',
  downColor: '#000',
  borderDownColor: 'rgba(255, 144, 0, 1)',
  borderUpColor: 'rgba(255, 144, 0, 1)',
  wickDownColor: 'rgba(255, 144, 0, 1)',
  wickUpColor: 'rgba(255, 144, 0, 1)',
});

// nu ska jag göra en ny websocket för att hämta candlestick handelsinformation ifrån binance API.
let cryptoEthCandlestickUrl = 'wss://stream.binance.com:9443/ws/etheur@kline_1m';
let cryptoBtcCandlestickUrl = 'wss://stream.binance.com:9443/ws/btceur@kline_1m';
let webSocketEthCandlestick = new WebSocket(cryptoEthCandlestickUrl);
let webSocketBtcCandlestick = new WebSocket(cryptoBtcCandlestickUrl);

function ethCandlestick(){
webSocketEthCandlestick.onmessage = (event) => {
      let message = JSON.parse(event.data);
      //k hämtar candlestick datan och inte allt det andra som jag inte vill ha.
      let candlestick = message.k;
  //metod för att uppdatera candlesticksen
  candleSeries.update({
      time: candlestick.t / 1000,
      open: candlestick.o,
      high: candlestick.h,
      low: candlestick.l,
      close: candlestick.c
  })
  }
  chart.priceScale().applyOptions({autoScale : true});
}

function btcCandlestick(){
  webSocketBtcCandlestick.onmessage = (event) => {
      let message = JSON.parse(event.data);
      //k hämtar candlestick datan och inte allt det andra som jag inte vill ha.
      let candlestick = message.k;
  //metod för att uppdatera candlesticksen
  candleSeries.update({
      time: candlestick.t / 1000,
      open: candlestick.o,
      high: candlestick.h,
      low: candlestick.l,
      close: candlestick.c
  })
  }
  chart.priceScale().applyOptions({autoScale : true});
}
///#endregion CANDLESTICK GRAF