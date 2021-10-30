let bodyBtcImage = "./img/bitcoin-city.jpg";
let bodyEthImage = "./img/heroEth.png";
function changeBackgroundImage(){
if(document.getElementById('kryptoNamn') === 'Bitcoin'){
document.getElementById('bodyYo').style.backgroundImage = bodyBtcImage;
}else if(document.getElementById('kryptoNamn') === 'Ethereum')
document.getElementById('bodyYo').style.backgroundImage = bodyEthImage;
}
window.onload = changeBackgroundImage();