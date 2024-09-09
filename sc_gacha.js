let menuLength = 0;
let randomNum;
let sum = 0;
let rate = [1.08, 1.1];
let menuName = [];
let menuPrice = [];
let results = []; // ガチャ結果を保持するためのオブジェクトの配列

// JSONファイルを読み込む
fetch('menu.json')
    .then(response => response.json())
    .then(data => {
        const menuItems = data.menu;
        menuItems.forEach(item => {
            menuName.push(item.name);
            menuPrice.push(item.price);
            menuLength++;
        });
    })
    .catch(error => console.error('Error loading menu:', error));

// イートインボタン
let btn_in = document.getElementById("eatin");
btn_in.addEventListener('click', function () {
    Gacha(1);
}, false);

// テイクアウトボタン
let btn_out = document.getElementById("takeout");
btn_out.addEventListener('click', function () {
    Gacha(0);
}, false);

function Gacha(i) {
    sum = 0;
    results = []; // 結果の配列を初期化

    let limit = parseInt(document.getElementById("budget").value, 10);
    // clear results
    document.getElementById("result").innerHTML = "";

    while (sum <= limit / rate[i] - 20) {
        randomNum = Math.floor(Math.random() * menuLength);
        sum += menuPrice[randomNum];
        if (sum <= limit / rate[i]) {
            results.push({
                name: menuName[randomNum],
                price: menuPrice[randomNum]
            });
            PrintResults();
        } else {
            sum -= menuPrice[randomNum];
        }
    }
    document.getElementById("result").innerHTML += "<p>合計:" + sum + "円(税込:" + Math.floor(sum * rate[i]) + "円)</p>";
    document.getElementById("send").innerHTML = '<input type="button" id="toX" value="結果を&#x1D54Fに投稿する">';

    let postText = GenerateTweetText(limit, sum, rate[i]);

    let btn_send = document.getElementById("toX");
    btn_send.addEventListener('click', function () {
        window.open('http://twitter.com/intent/tweet?&text=' + postText, "blank", "width=600, height=300");
    });
}

function PrintResults() {
    const lastResult = results[results.length - 1]; // 最新の結果を取得
    document.getElementById("result").innerHTML += "<p>" + lastResult.name + ":" + lastResult.price + "円</p>";
}

function GenerateTweetText(limit, sum, rate) {
    let baseText = "学食ガチャを予算" + limit + "円で回した結果・・・\n\n";
    let resultText = "";

    // 140文字以内に収めるため、結果を短縮
    for (let j = 0; j < results.length; j++) {
        const itemText = results[j].name + ":" + results[j].price + "円\n";
        if ((baseText + resultText + itemText).length > 110) { // URLなども含めて文字数を考慮
            resultText += "他" + (results.length - j) + "品…\n";　// 制限文字数を超えた部分は略記
            break;
        }
        resultText += itemText;
    }

    baseText += resultText;
    baseText += "\n合計" + sum + "(税込:" + Math.floor(sum * rate) + ")円でした!\n";
    baseText += "↓ガチャを回す↓\nhttps://tdtiger.github.io/SchoolCafeteriaGacha/";

    return encodeURIComponent(baseText);
}
