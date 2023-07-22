//fetching the elements
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".gameInfo");
const newGameBtn = document.querySelector(".btn");

console.log(boxes);
console.log(gameInfo);
console.log(newGameBtn);

let currentPlayer;
let gameGrid;

const winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create a function to initialise the game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    
    boxes.forEach((box, index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        //initialize the box with css properties again
        box.classList = `box bx${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();


function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    // newGameBtn.classList.add("active");
    let answer="";
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" ||gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")&&
        (gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]])){

            //check is winnext is X
            if(gameGrid[position[0]]==="X"){
                answer= "X";
            }else{
                answer= "O";
            }
            
            //disable pointer events
            boxes.forEach(box=>{
                box.style.pointerEvents="none";
            });

            //now we know X/O is the winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });

    //it means we have a winner
    if(answer !==""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //when there is a tie
    let filledCount = 0;
    gameGrid.forEach(box=>{
        if(box!==""){
            filledCount++;
        }
    }); 

    if(filledCount === 9){
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents ="none";
        //swap kro turn ko
        swapTurn();

        //check the winning case
        checkGameOver();
    }
}

boxes.forEach((box, index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});


newGameBtn.addEventListener('click', initGame);