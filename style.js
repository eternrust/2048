let cnt = 0;
let borad = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
let boradID = Array(Array("block1","block2","block3","block4"),Array("block5","block6","block7","block8"),Array("block9","block10","block11","block12"),Array("block13","block14","block15","block16"));
let score;
let best = 0
let moveCnt = 0;
let Gameover = document.querySelector("#Game_Over");

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
    options = {
        path: '/', // 경로 지정
        ...options // 아규먼트로 옵션을 넘겨줬을경우 전개연산자로 추가 갱신
    };
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString(); // 생 Date 객체라면 형식에 맞게 인코딩
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) { // 밸류가 없다면
        updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie; // 새로 갱신
}

//키보드 입력 처리
document.addEventListener("keydown",(e) => keyDownEventHandler(e));
function keyDownEventHandler(e){
    if(cnt==1){
        switch(e.keyCode){
            case 38: moveDir(0); break; //up
            case 40: moveDir(1); break; //down
            case 37: moveDir(2); break; //left
            case 39: moveDir(3); break; //right
        }
    }
}

//초기 값 설정
init();
function init(){
    if (!document.cookie) {
        setCookie('best', {secure: true, 'max-age': 3600});
        best=0;
    } else {
        best = getCookie('best');
    }    
    score = 0;
    Gameover.style.visibility = "hidden";
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            borad[i][j]=0;
        }
    }
    for(let k = 0; k < 2; k++){
        let y = Math.floor(Math.random()*16%4);
        let x = Math.floor(Math.random()*16%4);
        if(borad[y][x]==0) borad[y][x] = getNewNum();
        else k--;
    }
    Update();
}

//보드 업데이트
function Update(){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            let cell = document.getElementById(boradID[i][j]);
            cell.innerHTML = borad[i][j]==0?"":borad[i][j];
            coloring(cell);
        }
    }
    document.getElementById("score").innerHTML=score;
    if(score>best){
        best=score;
        setCookie('best', best);
    }
    document.getElementById("best").innerHTML=best;
}

//블럭 색 바꾸기
function coloring(cell){
    let cellNum=parseInt(cell.innerHTML);
    switch(cellNum){
        case 0:
        case 2:
            cell.style.color="#776e65";
            cell.style.backgroundColor="#eee4da";
            break;
        case 4:
            cell.style.color="#776e65";
            cell.style.backgroundColor="#ede1c9";
            break;
        case 8:
            cell.style.color="#FFFFFF";
            cell.style.backgroundColor="#f3b27a";
            break;
        case 16:
            cell.style.color="#FFFFFF";
            cell.style.backgroundColor="#f69664";
            break;
        case 32:
            cell.style.color="#FFFFFF";
            cell.style.backgroundColor="#f77b5f";
            break;
        case 64:
            cell.style.color="#FFFFFF";
            cell.style.backgroundColor="#f75f3a";
            break;
        case 128:
            cell.style.color="#FFFFFF";
            cell.style.backgroundColor="#eacd71";
            break;
        case 256:
            cell.style.color="#FFFFFF";
            cell.style.backgroundColor="#e9c85d";
            break;
        case 512:
            cell.style.color="#FFFFFF";
            cell.style.backgroundColor="#e9c54d";
            break;
        case 1024:
            cell.style.color="#FFFFFF";
            cell.style.backgroundColor="#eec642";
            break;
        case 2048:
            cell.style.color="#FFFFFF";
            cell.style.backgroundColor="#edc42e";
            break;
        case 4096:
            cell.style.color="#FFFFFF";
            cell.style.backgroundColor="#ef696a";
            break;
        case 8192:
            cell.style.color="#FFFFFF";
            cell.style.backgroundColor="#ef4d5a";
            break;
        case 16384:
            cell.style.color="#FFFFFF";
            cell.style.backgroundColor="#f54341";
            break;
        case 32768:
            cell.style.color="#FFFFFF";
            cell.style.backgroundColor="#74b6d6";
            break;
        default:
            if(cell > 32768){
                cell.style.color="#FFFFFF";
                cell.style.backgroundColor="#5da1de";
            } else {
                cell.style.color="lightgrey";
                cell.style.backgroundColor="lightgrey";
            }
            break;
    }
}
function moveDir(e){
    switch(e){
        case 0: move(); break;
        case 1: rotate(2); move(); rotate(2); break;
        case 2: rotate(3); move(); rotate(1); break;
        case 3: rotate(1); move(); rotate(3); break;
    }
    if(moveCnt==1){
        getNewAddress();
        Update();
    }
    let l = CheckGameOver();
    if(!l) setTimeout(()=> GameOver(),1000);
    else if(l==2) setTimeout(()=> GameClear(),1000);
}

function rotate(e){
    let boradCopy = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
    while (e--) {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				boradCopy[i][j] = borad[i][j];
			}
		}
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				borad[i][j] = boradCopy[j][3 - i];
			}
		}
	}
}

function move(){
    moveCnt=0;
    let mul=0;
    let num = 0;
    for(let i = 0; i < 4; i++){
        mul = 0;
        num = 0;
        for(let j = 1; j < 4; j++){
            if(borad[j][i]!=0){
                if(borad[j-1][i]==0){
                    borad[j-1][i]=borad[j][i];
                    borad[j][i]=0;
                    j = 0;
                    moveCnt = 1;
                } else if(borad[j-1][i]==borad[j][i]){
                    if(mul!=borad[j][i]){
                        borad[j-1][i]*=2;
                        borad[j][i]=0;
                        mul=borad[j-1][i];
                        j = 0;
                        score+=mul;
                    } else if(num==2){
                        mul=0;
                    }
                    num++;
                    moveCnt = 1;
                }
            }
        }
    }
}

function CheckGameOver(){
    let cnt = 0;
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(borad[i][j]==2048){
                cnt = 2;
            }else if(borad[i][j]==0&&cnt==0){
                cnt = 1;
            } else {
                if(i>0&&borad[i-1][j]==borad[i][j]&&cnt==0){
                    cnt = 1;
                }
                if(j>0&&borad[i][j-1]==borad[i][j]&&cnt==0){
                    cnt = 1;
                }
            }
        }
    }
    return cnt;
}

function GameOver(){
    Gameover.style.visibility = "visible";
    document.getElementById("GameOverTitle").innerHTML="Game Over!";
    document.getElementById("GameOverTitle").style.color="#996600";
    document.getElementById("Game_Over_background").style.backgroundColor="lightgray";
}
function GameClear(){
    Gameover.style.visibility = "visible";
    document.getElementById("GameOverTitle").innerHTML='You Win!';
    document.getElementById("GameOverTitle").style.color="#FFFFFF";
    document.getElementById("Game_Over_background").style.backgroundColor="#FFFF66";
}

function getNewAddress(){
    for(let k = 0; k < 1; k++){
        let y = Math.floor(Math.random()*16%4);
        let x = Math.floor(Math.random()*16%4);
        if(borad[y][x]==0) borad[y][x] = getNewNum();
        else k--;
    }
}

//10분의 1 확률로 4 생성 아니면 2 생성
function getNewNum(){
    let rand = Math.floor(Math.random()*10);
    if(rand == 0){
        return 4;
    }
    return 2;
}
        
//2048 보드 판 나타내기 혹은 감추기
let span = document.querySelector("#title_name");
let hidden = document.querySelector("#hidden");
span.addEventListener("click",
function(e){
    if(cnt===0){
        span.style.color = "darkorange";
        span.style.marginTop = "-8%";
        hidden.style.display = "flex";
        cnt=1;
    } else {
        span.style.color = "black";
        span.style.marginTop = "0%";
        hidden.style.display = "none";
        cnt=0;
    }
});
//2048 글씨 색깔
function darkorange(e){
    if(cnt===0){
        e.target.style.color = "darkorange";
    } else {
        e.target.style.color = "black";
    }
}
function black(e){
    if(cnt===0){
        e.target.style.color = "black";
    } else {
        e.target.style.color = "darkorange";
    }
}

function NewGameBorderOn(e){
    e.target.style.outline = "3px solid #836035";
}
function NewGameBorderDown(e){
    e.target.style.outline = "1px solid #836035";
}