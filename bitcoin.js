"use strict";
/*Denna funktion kallas när man trycker på knappen i naven för att byta kryptovalute
changeKryptoLogo, bytar navbar logon till relevant logo.
changeKryptoNamn, sätter h1 elementet med id kryptoNamn.
changeKryptoButton, bytar namn på knappen i naven som man klickar på för att byta kryptovaluta.
if statementet använder jag för att subscribea till relevant websocket och unsubscribea till den orelevanta.
*/
function changePage(){
    changeKryptoLogo();
    changeKryptoNamn();
    changeKryptoButton();
    if(document.getElementById('kryptoNamn').innerText === 'Ethereum'){
        ethPriceElement();
        webSocketEthPrice.send(JSON.stringify({
            "method": "SUBSCRIBE",
            "params": [
              "etheur@trade"
            ],
            "id": 1
        }));
        webSocketBtcPrice.send(JSON.stringify({
            "method": "UNSUBSCRIBE",
            "params": [
              "btceur@trade"
            ],
            "id": 312
        }));
        ethCandlestick();
        webSocketEthCandlestick.send(JSON.stringify({
            "method": "SUBSCRIBE",
            "params": [
              "etheur@kline_1m"
            ],
            "id": 1
        }));
        webSocketBtcCandlestick.send(JSON.stringify({
            "method": "UNSUBSCRIBE",
            "params": [
              "btceur@kline_1m"
            ],
            "id": 312
        }));
    }
        
    else if (document.getElementById('kryptoNamn').innerText === 'Bitcoin'){
        btcPriceElement();
        webSocketBtcPrice.send(JSON.stringify({
            "method": "SUBSCRIBE",
            "params": [
              "btceur@trade"
            ],
            "id": 1
        }));
        webSocketEthPrice.send(JSON.stringify({
            "method": "UNSUBSCRIBE",
            "params": [
              "etheur@trade"
            ],
            "id": 312
        }));
        btcCandlestick();
        webSocketBtcCandlestick.send(JSON.stringify({
            "method": "SUBSCRIBE",
            "params": [
              "btceur@kline_1m"
            ],
            "id": 1
        }));
        webSocketEthCandlestick.send(JSON.stringify({
            "method": "UNSUBSCRIBE",
            "params": [
              "etheur@kline_1m"
            ],
            "id": 312
        }));
    }
}

function changeKryptoButton(){
    if(document.getElementById('kryptoNamn').innerText === 'Ethereum'){
        document.getElementById("kryptoButton").innerText = 'Bitcoin';
    } else if (document.getElementById('kryptoNamn').innerText === 'Bitcoin'){
        document.getElementById("kryptoButton").innerText = 'Ethereum';
    }
}

function changeKryptoLogo(){
    if(document.getElementById('kryptoNamn').innerText === 'Bitcoin'){
    document.getElementById("kryptoLogo").src = './img/ethereum-logo-landscape-purple.png';
    }else if(document.getElementById('kryptoNamn').innerText === 'Ethereum'){
        document.getElementById("kryptoLogo").src = './img/bitcoin-btc-logo-full.svg';
    }
}

function changeKryptoNamn(){
    if(document.getElementById('kryptoNamn').innerText === 'Ethereum'){
        document.getElementById('kryptoNamn').innerText = 'Bitcoin';
    }else if(document.getElementById('kryptoNamn').innerText === 'Bitcoin'){
        document.getElementById('kryptoNamn').innerText = 'Ethereum';
    }
}