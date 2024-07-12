let menuLength = 0;
let randomNum;
let sum = 0;
let cnt = 0;
let rate = [1.08, 1.1];
let menuName = [];
let menuPrice = [];
let resultName = [];
let resultPrice = [];

fetch('menu.json')
    .then(response => response.json())
    .then(data => {
        let menu = data;
        menuName = Object.keys(menu);
        for (let i in menu) {
            menuLength++;
            menuPrice.push(menu[i]);
        }
    })
    .catch(error => console.error('Error loading menu:', error));

function Gacha(i) {
    sum = 0;

    let limit = parseInt(document.getElementById("budget").value, 10);
    // clear results
    document.getElementById("result").innerHTML = "";

    while (sum <= limit / rate[i] - 20) {
        randomNum = Math.floor(Math.random() * menuLength);
        sum = sum + menuPrice[randomNum];
        if (sum <= limit / rate[i]) {
            resultName[cnt] = menuName[randomNum];
            resultPrice[cnt] = menuPrice[randomNum];
            PrintResults(cnt);
            cnt++;
        } else {
            sum = sum - menuPrice[randomNum];
        }
    }
    document.getElementById("result").innerHTML += "<p>合計:" + sum + "円(税込:" + Math.floor(sum * rate[i]) + "円)</p>";
}

function PrintResults(cnt) {
    document.getElementById("result").innerHTML += "<p>" + resultName[cnt] + ":" + resultPrice[cnt] + "円</p>";
}