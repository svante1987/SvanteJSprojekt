"use strict";

let bitcoinText = "Bitcoin";
let ethereumText = "Ethereum";

//document.getElementById("kryptoButton").addEventListener("click", bitcoinPage);
/*function changeFunction(){
    if(document.getElementById('kryptoNamn') === 'Ethereum')
bitcoinPage();
    else if(document.getElementById('kryptoNamn') === 'Bitcoin'){

    }
}*/


function changePage(){
    changeKryptoLogo();
    changeKryptoNamn();
    changeKryptoButton();
}

function changeKryptoButton(){
    if(document.getElementById("kryptoButton").innerText === 'Ethereum'){
        document.getElementById("kryptoButton").innerText = 'Bitcoin';
    } else if (document.getElementById("kryptoButton").innerText === 'Bitcoin'){
        document.getElementById("kryptoButton").innerText = 'Ethereum';
    }
}

function changeKryptoLogo(){
    if(document.getElementById('kryptoNamn').innerText === 'Bitcoin'){
    document.getElementById("kryptoLogo").src = './img/bitcoin-btc-logo-full.svg';
    }else if(document.getElementById('kryptoNamn').innerText === 'Ethereum'){
        document.getElementById("kryptoLogo").src = './img/ethereum-logo-landscape-purple.png';
    }
}


function changeKryptoNamn(){
    if(document.getElementById('kryptoNamn').innerText === 'Ethereum'){
        document.getElementById('kryptoNamn').innerText = 'Bitcoin';
    }else if(document.getElementById('kryptoNamn').innerText === 'Bitcoin'){
        document.getElementById('kryptoNamn').innerText = 'Ethereum';
    }
}
/*
function changeStockPriceId(){
    document.getElementById('stockPrice').id = 'btcStockPrice';
}*/

function changeToBitcoin(){
///#region SHOW PRICE
// min websocket som hämtar information om kryptovaluta från binance api url.
// wss står för websocket secure connection
let webSocketPrice = new WebSocket('wss://stream.binance.com:9443/ws/btceur@trade');
let stockPriceElement = document.getElementById('btcStockPrice');
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
}



















/*
function showTable(obj) {
    $.ajax({
        type: "GET",
        data: { kaka : obj },
        url: '/BDCdata/Show',
    });
}
/*
function bitcoinPage(){
    if (document.getElementById("kryptoButton") === ethereumText) {
        document.getElementById("kryptoLogo").src = "./img/bitcoin-btc-logo-full.svg";
    }
    else {
        document.getElementById("kryptoLogo").src = "./img/ethereum-logo-landscape-purple.png";
        document.getElementById("kryptoButton").innerText = bitcoinText;
    }}
/*function bitcoinPage(){
    document.getElementById("kryptoLogo").src = "./img/bitcoin-btc-logo-full.svg";
    document.getElementById("kryptoButton").innerText = ethereumText;
}

function showTable(obj) {
    $.ajax({
        type: "GET",
        data: { kaka : obj },
        url: '/BDCdata/Show',
    });
}*/