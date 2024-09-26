const taxRates = {
    eatIn: 1.1,
    takeOut: 1.08
};
let menuName = [];
let menuPrice = [];
let menuCategory = [];
let results = []; // ガチャ結果を保持するためのオブジェクトの配列
let mainFlag;

// JSONファイルを読み込む
fetch('menu.json')
    .then(response => response.json())
    .then(data => {
        const menuItems = data.menu;
        menuItems.forEach(item => {
            menuName.push(item.name);
            menuPrice.push(item.price);
            menuCategory.push(item.category);
        });
    })
    .catch(error => console.error('Error loading menu:', error));

// イートインボタン(ランダム排出)
let btn_in = document.getElementById("eatin");
btn_in.addEventListener('click', function () {
    rollRandomGacha(taxRates.eatIn);
}, false);

// テイクアウトボタン(ランダム排出)
let btn_out = document.getElementById("takeout");
btn_out.addEventListener('click', function () {
    rollRandomGacha(taxRates.takeOut);
}, false);

// イートインボタン(バランスよく排出)
let btn_in_B = document.getElementById("eatin2");
btn_in_B.addEventListener('click', function () {
    rollBalanceGacha(taxRates.eatIn);
}, false);

// テイクアウトボタン(バランスよく排出)
let btn_out_B = document.getElementById("takeout2");
btn_out_B.addEventListener('click', function () {
    rollBalanceGacha(taxRates.takeOut);
}, false);

// ガチャを回す関数(ランダム排出)
function rollRandomGacha(taxRate) {
    let randomNum = 0;
    let pretaxTotalPrice = 0;
    results = []; // 結果の配列を初期化

    let limit = parseInt(document.getElementById("budget").value, 10);
    // clear results
    document.getElementById("result").innerHTML = "";

    while (pretaxTotalPrice <= limit / taxRate - 20) {
        randomNum = Math.floor(Math.random() * menuName.length);
        pretaxTotalPrice += menuPrice[randomNum];
        if (pretaxTotalPrice <= limit / taxRate) {
            results.push({
                name: menuName[randomNum],
                price: menuPrice[randomNum]
            });
            printResults();
        } else {
            pretaxTotalPrice -= menuPrice[randomNum];
        }
    }
    document.getElementById("result").innerHTML += "<p>合計:" + pretaxTotalPrice + "円(税込:" + Math.floor(pretaxTotalPrice * taxRate) + "円)</p>";
    document.getElementById("send").innerHTML = '<input type="button" id="toX" value="結果を&#x1D54Fに投稿する">';

    let postText = generateTweetText(limit, pretaxTotalPrice, taxRate);

    let btn_send = document.getElementById("toX");
    btn_send.addEventListener('click', function () {
        window.open('http://twitter.com/intent/tweet?&text=' + postText, "blank", "width=600, height=300");
    });
}

// ガチャを回す関数(バランスよく排出)
function rollBalanceGacha(taxRate) {
    let randomNum = 0;
    let pretaxTotalPrice = 0;
    results = []; // 結果の配列を初期化
    mainFlag = false;

    let limit = parseInt(document.getElementById("budget").value, 10);
    // clear results
    document.getElementById("result").innerHTML = "";

    while (pretaxTotalPrice <= limit / taxRate - 20) {
        randomNum = Math.floor(Math.random() * menuName.length);

        if(mainFlag == true && (menuCategory[randomNum] == "ご飯" || menuCategory[randomNum] == "カレー・丼" || menuCategory[randomNum] == "麺類"))
            ;//2個目以降の主食だった場合は何もせずに次のガチャ回転へ
        else {
            pretaxTotalPrice += menuPrice[randomNum];
            if (pretaxTotalPrice <= limit / taxRate) {
                results.push({
                    name: menuName[randomNum],
                    price: menuPrice[randomNum]
                });
                printResults();

                //1回目の主食だったらフラッグを立てる
                if(mainFlag == false && (menuCategory[randomNum] == "ご飯" || menuCategory[randomNum] == "カレー・丼" || menuCategory[randomNum] == "麺類"))
                    mainFlag = true;
            } else {
                pretaxTotalPrice -= menuPrice[randomNum];
            }
        }
    }
    document.getElementById("result").innerHTML += "<p>合計:" + pretaxTotalPrice + "円(税込:" + Math.floor(pretaxTotalPrice * taxRate) + "円)</p>";
    document.getElementById("send").innerHTML = '<input type="button" id="toX" value="結果を&#x1D54Fに投稿する">';

    let postText = generateTweetText(limit, pretaxTotalPrice, taxRate);

    let btn_send = document.getElementById("toX");
    btn_send.addEventListener('click', function () {
        window.open('http://twitter.com/intent/tweet?&text=' + postText, "blank", "width=600, height=300");
    });
}

function printResults() {
    const lastResult = results[results.length - 1]; // 最新の結果を取得
    document.getElementById("result").innerHTML += "<p>" + lastResult.name + ":" + lastResult.price + "円</p>";
}

function generateTweetText(limit, pretaxTotalPrice, taxRate) {
    let baseText = "学食ガチャを予算" + limit + "円で回した結果・・・\n\n";
    let resultText = "";

    // 140文字以内に収めるため、結果を短縮
    for (let j = 0; j < results.length; j++) {
        const itemText = results[j].name + ":" + results[j].price + "円\n";
        if ((baseText + resultText + itemText).length > 110) { // URLなども含めて文字数を考慮
            resultText += "他" + (results.length - j) + "品…\n"; // 制限文字数を超えた部分は略記
            break;
        }
        resultText += itemText;
    }

    baseText += resultText;
    baseText += "\n合計" + pretaxTotalPrice + "(税込:" + Math.floor(pretaxTotalPrice * taxRate) + ")円でした!\n";
    baseText += "↓ガチャを回す↓\nhttps://tdtiger.github.io/SchoolCafeteriaGacha/";

    return encodeURIComponent(baseText);
}
