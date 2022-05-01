let cnt = 0;
let borad = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
let boradID = Array(Array("block1","block2","block3","block4"),Array("block5","block6","block7","block8"),Array("block9","block10","block11","block12"),Array("block13","block14","block15","block16"));
let score;

//2048 보드 판 나타내기 혹은 감추기
document.addEventListener("DOMContentLoaded",
function(e){
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
    })
});
//키보드 입력 처리
document.onkeydown = keyDownEventHandler;
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
    score = 0;
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
            let cell = document.getElementById(boradID[i][j]);//자꾸 null값이 반환됨. 고쳐야함
            console.log(boradID[i][j]);
            cell.innerHTML = borad[i][j]==0?"":borad[i][j];
            coloring(cell);
        }
    }
    document.getElementById("score").innerHTML=score;
}

//블럭 색 바꾸기
function coloring(cell){
    let cellNum=cell.innerHTML;
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
                cell.style.color="lightgray";
                cell.style.backgroundColor="lightgray";
            }
            break;
    }
}

//10분의 1 확률로 4 생성 아니면 2 생성
function getNewNum(){
    let rand = Math.floor(Math.random()*10);
    if(rand == 0) return 4;
    return 2;
}
        

//2048 글씨 색깔
function darkorange(e){
    if(cnt===0){
        e.target.style.color = "darkorange"
    } else {
        e.target.style.color = "black"
    }
}
function black(e){
    if(cnt===0){
        e.target.style.color = "black"
    } else {
        e.target.style.color = "darkorange"
    }
    
}