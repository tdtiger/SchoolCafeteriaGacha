let riceMenuLength = 0;
let mainMenuLength = 0;
let subMenuLength = 0;
let desertLength = 0;
let randomNum2;
let limit;
let sum2 = 0;
let cnt2 = 0;
let rate2 = [1.08,1.1];
let riceMenuName = [];
let riceMenuPrice = [];
let mainMenuName = [];
let mainMenuPrice = [];
let subMenuName = [];
let subMenuPrice = [];
let desertName = [];
let desertPrice = [];
let resultName2 = [];
let resultPrice2 = [];

let btn_in2 = document.getElementById("eatin2");
btn_in2.addEventListener('click',function(){
    GachaOperator(1);
},false);

let btn_out2 = document.getElementById("takeout2");
btn_out2.addEventListener('click',function(){
    GachaOperator(0);
},false);

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

riceMenuName = Object.keys(riceMenu);
mainMenuName = Object.keys(mainMenu);
subMenuName = Object.keys(subMenu);
desertName = Object.keys(desert);

for(let i in menu){
    riceMenuLength++;
    riceMenuPrice.push(riceMenu[i]);
}

for(let i in menu){
    mainMenuLength++;
    mainMenuPrice.push(mainMenu[i]);
}

for(let i in menu){
    subMenuLength++;
    subMenuPrice.push(subMenu[i]);
}

for(let i in menu){
    desertLength++;
    desertPrice.push(desert[i]);
}

function GachaOperator(i){
    sum2 = 0;

    limit = parseInt(document.getElementById("budget").value, 10);
    // clear results
    document.getElementById("result").innerHTML = "";
    RiceGacha();
    while(sum2 <= limit/rate2[i] - 20){
        MainGacha(rate2[i]);
        SubGacha(rate2[i]);
        DesertGacha(rate2[i]);
    }

    document.getElementById("result").innerHTML += "<p>合計:" + sum2 + "円(税込:" + Math.floor(sum2 * rate2[i]) + "円)</p>";
}

function RiceGacha(){
    randomNum2 = Math.floor(Math.random() * riceMenuLength);
    sum2 += riceMenuPrice[randomNum2];
    resultName2[cnt2] = riceMenuName[randomNum2];
    resultPrice2[cnt2] = riceMenuPrice[randomNum2];
    document.getElementById("result").innerHTML += "<h3>主食</h3>";
    PrintResults(cnt2);
    cnt2++;
}

function MainGacha(i){
    if(sum2 >= limit/rate2[i] -20){
        return;
    }
    randomNum2 = Math.floor(Math.random() * mainMenuLength);
    sum2 += mainMenuPrice[randomNum2];
    if(sum2 <= limit/rate2[i]){
        resultName2[cnt2] = mainMenuName[randomNum2];
        resultPrice2[cnt2] = mainMenuPrice[randomNum2];
        PrintResults(cnt2);
        cnt2++;
    } else {
        sum2 = sum2 - mainMenuPrice[randomNum2];
    }
}

function SubGacha(i){
    if(sum2 >= limit/rate2[i] -20){
        return;
    }
    randomNum2 = Math.floor(Math.random() * subMenuLength);
    sum2 += subMenuPrice[randomNum2];
    if(sum2 <= limit/rate2[i]){
        resultName2[cnt2] = subMenuName[randomNum2];
        resultPrice2[cnt2] = subMenuPrice[randomNum2];
        PrintResults(cnt2);
        cnt2++;
    } else {
        sum2 = sum2 - subMenuPrice[randomNum2];
    }
}

function DesertGacha(i){
    if(sum2 >= limit/rate2[i] -20){
        return;
    }
    randomNum2 = Math.floor(Math.random() * desertLength);
    sum2 += desertPrice[randomNum2];
    if(sum2 <= limit/rate2[i]){
        resultName[cnt2] = desertName[randomNum2];
        resultPrice[cnt2] = desertPrice[randomNum2];
        PrintResults(cnt2);
        cnt2++;
    } else {
        sum2 = sum2 - desertPrice[randomNum2];
    }
}

function PrintResults(cnt2){
    document.getElementById("result").innerHTML += "<p>" + resultName2[cnt2] + ":" + resultPrice2[cnt2] + "円</p>";
}