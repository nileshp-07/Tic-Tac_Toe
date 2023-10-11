const gameInfo= document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');
const boxes = document.querySelectorAll('.box');


let currentPlayer;
let gameGrid;

const winningPossitions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


initGame();

// initializing the game 
function initGame()
{
    currentPlayer ='X';
    // set current player to x 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    // make gameGrid empty 
    gameGrid =["","","","","","","","",""];


    // remove the values from UI too 
    boxes.forEach( (box , index) =>{
        box.innerText = "";
        box.style.pointerEvents = "all"; 

        // reset the properties for all boxes 
        box.classList = `box box${index+1}`;
    });

    // make new game button not visible 
    newGameBtn.classList.remove('active');
}



// Add Event Listener to all Boxes to Get Player Input
boxes.forEach( (box , index) =>{
    box.addEventListener('click' , () => {  
        handleClick(index);
    });
});


// switch the turns of players
function swapTurn() {
    currentPlayer = currentPlayer==='X' ? 'O'  : 'X';

    // update on UI 
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}


// Add Event Listener to Button 
newGameBtn.addEventListener('click', initGame);


function handleClick(index)
{
    // check if all  box is already filled or not 
    if(gameGrid[index] === "")
    {
        // render current player click to UI 
        boxes[index].innerText = currentPlayer;

        // make entry of clicked box in gameGrid 
        gameGrid[index] = currentPlayer;

        // make clicked box cursor unpointable
        boxes[index].style.pointerEvents= "none";

        // swap  the turn of player 
        swapTurn();

        // check if anyone wins 
        checkGameOver();
    }
}



function checkGameOver()
{
    let winner="";

    winningPossitions.forEach( (position) =>{
        if((gameGrid[position[0]]!== ""  && gameGrid[position[1]]!== "" && gameGrid[position[2]]!== "")
        &&(gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]]))
        {
            winner = gameGrid[position[0]] === 'X' ? 'X' : "O";

            // now disable pointer events 
            boxes.forEach( (box) =>{
                box.style.pointerEvents = "none";
            })

            // set background color for winning position
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });


    // set the winner on UI if any 
    if(winner != "")
    {
        gameInfo.innerText = `Winner Player - ${winner}`;
        newGameBtn.classList.add('active');
        return;
    }


    // check if game is tied 
    let fillCount =0;
    gameGrid.forEach( (box) => {
        if(box !== "")
        fillCount++;
    });

    if (fillCount === 9) {
        gameInfo.textContent = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}