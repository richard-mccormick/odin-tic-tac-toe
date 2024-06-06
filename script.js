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

    const changeTurn = () => {
        if(currentTurn === players[0]){
            currentTurn = players[1];
        }else{
            currentTurn = players[0];
        }
    }

    let playBoard = gameBoard.getBoard();

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


    const mark = (space) => {
        playBoard[space] = currentTurn.symbol;
        if(checkWin() === true){
            console.log(currentTurn.name+ " WON!!!!");
            gameBoard.clearBoard();
            playBoard = gameBoard.getBoard();
        }else{
            changeTurn();
            console.log(playBoard);
        }
    }
    

    return {players, mark};
})();

//const displayController = (function() {

//})();