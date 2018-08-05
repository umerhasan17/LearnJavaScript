var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
    [0 , 1 , 2],
    [3 , 4, 5],
    [6 , 7 , 8], 
    [0 , 3, 6],
    [1 , 4, 7], 
    [2 , 5, 8],
    [0 , 4 , 8],
    [6 , 4, 2]
]
const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    for (var i = 0 ; i < cells.length ; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click' , turnClick , false);
    }
}

function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') { // means nobody has played in that spot
        // human player takes a turn
        turn(square.target.id , huPlayer)
        // if the game is not a tie. AI picks the best spot
        if (!checkTie()) turn(bestSpot() , aiPlayer);
    }
}

function turn(squareId , player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard , player)
    if (gameWon) gameOver(gameWon)
}

function checkWin(board , player) {
    let plays = board.reduce((a , e , i) => (e === player) ? a.concat(i) : a , []);
    let gameWon = null;
    // looping through all possible winning arrangements
    for (let [index , win] of winCombos.entries()) {
        // for every element in the array within the array check if plays.indexOf is more than -1. 
        // has the player played in every spot that counts as a win. 
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index , player: player};
            break;
        }
    }
    // will be null if no one has one
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";   
    }
    for (var i = 0 ; i < cells.length ; i++) {
        cells[i].removeEventListener('click' , turnClick , false);
    }

    // output to the screen
    declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}

function declareWinner(who) { 
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
    // filter to return only the empty squares
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
    return emptySquares()[0];
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0 ; i , cells.length ; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click' , turnClick , false);
        }
        declareWinner("Tie Game.");
        return true;
    }
    return false;
}


