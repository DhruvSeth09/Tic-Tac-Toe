const current_player=document.querySelector(".game-info");
const boxes=document.querySelectorAll(".box");
const btn=document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winingPosition=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

// let's create a function to 

function initGame(){
    currPlayer="X";
    gameGrid=[...Array(9).fill("")];
    boxes.forEach((box,index)=>{
        boxes[index].innerHTML="";
        boxes[index].classList.remove("win");
        boxes[index].style.pointerEvents="all";
        // box.classList=`box box${index+1}`;
    });

    btn.classList.remove("active");
    current_player.innerHTML=`Current Player - ${currPlayer}`;
}
initGame();

function SwapTurn(){
    currPlayer=currPlayer==="X"?"O":"X";
    current_player.innerHTML=`Current Player - ${currPlayer}`;
}

function checkWinner(){
    let ans="";
    winingPosition.forEach((pos)=>{
        if(gameGrid[pos[0]]!=="" && gameGrid[pos[1]]!=="" && gameGrid[pos[2]]!=="" && gameGrid[pos[0]]===gameGrid[pos[1]]&&gameGrid[pos[1]]===gameGrid[pos[2]]){
            if(gameGrid[pos[0]]==="X"){
                ans="X";
            }
            else{
                ans="O";
            }
            boxes.forEach((box,index)=>{
                boxes[index].style.pointerEvents="none";
        
            });
            boxes[pos[0]].classList.add("win");
            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");
        }
    });
    if(ans!==""){
        current_player.innerText=`Winner Player - ${ans}`;
        btn.classList.add("active");
        return;
    }

    // when there is no winner
    let fillCount=0;
    gameGrid.forEach((box)=>{
    if(box!==""){
        fillCount++;
    }
    })
    if(fillCount===9){
        current_player.innerText="It's a Tie!";
        btn.classList.add("active");
        return;
    }              
}

function handelClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currPlayer;
        gameGrid[index]=currPlayer;
        boxes[index].style.pointerEvents="none";
        // swap player
        SwapTurn(); 
        checkWinner();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handelClick(index);
    })
});

btn.addEventListener("click",initGame);