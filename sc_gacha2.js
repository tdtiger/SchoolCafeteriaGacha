let menuLength = 0;
let randomNum;
let sum = 0;
let cnt = 0;
let rate =[1.08, 1.1];
let menuName = [];
let menuPrice = [];
let resultName = [];
let resultPrice = [];

let riceMenu = {
    // ご飯，スープ類
    "ライス(SS)" : 80,
    "ライス(S)" : 100,
    "ライス(M)" : 120,
    "ライス(L)" : 160,
    //カレー，丼
    "カレーライス" : 290,
    "チキンカレー" : 310,
    "牛丼" : 380,
    "カツカレー" : 460,
    "豚塩カルビ焼肉丼" : 490,
    //麺類
    "かけうどん" : 230,
    "きつねうどん" : 270,
    "若布うどん" : 270,
    "冷やしうどん" : 270,
    "カレーうどん" : 330,
    "冷やしぶっかけおろしうどん" : 330
}

let mainMenu = {
    //メインおかず
    "揚げ餅(醤油)" : 140,
    "牛肉じゃが" : 220,
    "旨厚ハムカツ" : 230,
    "銀鮭の塩焼き" : 260,
    "ささみカツ卵とじあんかけ" : 300,
    "ハンバーグテリヤキペッパーソース" : 300,
    "日替わり" : 300,
    "鶏ポン唐揚げ" : 310,
    "チキン南蛮": 340
}

let subMenu = {
    //サブおかず
    "味付け海苔" : 20,
    "彩り野菜サラダ" : 140,
    "ジャンボフランク&ポテト" : 150,
    "味噌汁" : 20,
    "スタミナスープ": 60,
    //小鉢
    "漬物" : 40,
    "納豆" : 50,
    "キムチ" : 60,
    "豆腐" : 60,
    "法蓮草" : 60,
    "じゃこおくらスライス" : 80,
    "巣ごもりたまご" : 90,
    "大学芋" : 100,
    "おくらと山芋のねばねばサラダ" : 100,
    "スタミナ豆腐" : 100,
    "肉団子" : 100
}

let desert = {
    //デザート
    "パンナコッタMIXベリー" : 140,
    "シュークリーム(バニラ)" : 180,
    "シュークリーム(抹茶)" : 180
}

menuName = Object.keys(menu);

for(let i in menu){
    menuLength++;
    menuPrice.push(menu[i]);
}

function Gacha(i){
    sum = 0;

    let limit = parseInt(document.getElementById("budget").value, 10);
    // clear results
    document.getElementById("result").innerHTML = "";

    while(sum <= limit/rate[i] - 20){
        randomNum = Math.floor(Math.random() * menuLength);
        sum = sum + menuPrice[randomNum];
        if(sum <= limit/rate[i]){
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

function PrintResults(cnt){
    document.getElementById("result").innerHTML += "<p>" + resultName[cnt] + ":" + resultPrice[cnt] + "円</p>";
}