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

    const winningPositions = [
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


    const checkWin = () => {
        for(const position of winningPositions){
            if(playBoard[position[0]] != "" && 
            (playBoard[position[0]] === playBoard[position[1]] && 
            playBoard[position[0]] === playBoard[position[2]])){
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
        }else if(checkTie() === true){
            gameOver = checkTie();
        }else{
            changeTurn();
        }
    }
    
    const resetGame = () => {
        currentTurn = players[0];
        playBoard = gameBoard.getBoard();
        turnCount = 0;
        displayController.resetDisplay();
    }

    return {players, mark, getTurn, getGameOver, resetGame};
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
        }
    }



    return {resetDisplay};
})();