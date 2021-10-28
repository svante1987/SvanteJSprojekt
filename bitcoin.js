

let x = document.getElementById('bitcoinButton');

function bitcoinPage(x){
    document.getElementById("kryptoLogo").src = "./img/bitcoin-btc-logo-full.svg";
}

function showTable(obj) {
    $.ajax({
        type: "GET",
        data: { kaka : obj },
        url: '/BDCdata/Show',
    });
}