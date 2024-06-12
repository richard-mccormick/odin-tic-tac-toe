console.log("IT'S WORKING!!");

const gameBoard = (function() {
    let board = [
        "","","",
        "","","",
        "","",""];

    const getBoard = () => board;

    const clearBoard = () => {board = ["","","","","","","","",""]};

    return {getBoard, clearBoard};
})();

function createPlayer(name, symbol) {
    return {name, symbol};
}

const gameController = (function(){
    
    const players = [createPlayer("Player 1", "O"), createPlayer("Player 2", "X")];

    let currentTurn = players[0];
    let turnCount = 0;
    let playBoard = gameBoard.getBoard();
    let gameOver = false;
    const getGameOver = () => gameOver;

    getTurn = () => currentTurn;

    const changeTurn = () => {
        if(currentTurn === players[0]){
            currentTurn = players[1];
        }else{
            currentTurn = players[0];
        }
    }

    const winningCombos = [
        //horizontal
        [0,1,2],
        [3,4,5],
        [6,7,8],
        //vertical
        [0,3,6],
        [1,4,7],
        [2,5,8],
        //diagonal
        [0,4,8],
        [2,4,6]
        
    ];

    //used to mark spaces on DOM
    let winningPosition = ["","",""];
    const getWin = () => winningPosition;

    const checkWin = () => {
        for(const position of winningCombos){
            if(playBoard[position[0]] != "" && 
            (playBoard[position[0]] === playBoard[position[1]] && 
            playBoard[position[0]] === playBoard[position[2]])){
                winningPosition = position;
                return true;
            }

        }
    }

    const checkTie = () => {
        if(turnCount === 9 && checkWin != true){
            return true;
        }
    }

    const mark = (space) => {
        playBoard[space] = currentTurn.symbol;
        turnCount++;
        if(checkWin() === true){
            gameOver = checkWin();
            displayController.displayWin();
        }else if(checkTie() === true){
            gameOver = checkTie();
        }else{
            changeTurn();
        }
    }
    
    const resetGame = () => {
        currentTurn = players[0];
        gameBoard.clearBoard();
        playBoard = gameBoard.getBoard();
        turnCount = 0;
        displayController.resetDisplay();
        gameOver = false;
        winningPosition = ["","",""];
    }

    return {players, mark, getTurn, getGameOver, resetGame, getWin};
})();

const displayController = (function(){

    const displayArray = document.querySelectorAll(".game-space");

    const displayMark = (space) => {
        if(space.textContent === "" && gameController.getGameOver() === false){
            space.textContent = gameController.getTurn().symbol;
             //adds mark to playBoard array at div index #
            gameController.mark(space.dataset.index);
        }

    }

    //add event listener to all spaces
    for(const item of displayArray){
        item.addEventListener("click", () =>{
            displayMark(item);
        });
    }

    const resetDisplay = () => {
        for(const item of displayArray){
            item.textContent = "";
            item.classList.remove("won");
        }
    }

    displayWin = () => {
        const winningPosition = gameController.getWin();
        for(position of winningPosition){
            displayArray[position].classList.add("won");
        }
    }



    return {resetDisplay, displayWin};
})();