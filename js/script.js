//-------------------------------FACTORY-------------------------------//

const Player = marker => {
    return {marker};
}

//-------------------------------MODULES-------------------------------//

const GameBoard = (function() {
    let board = new Array(9);
    function renderBoard() {
        const gridBoxes = document.querySelectorAll('.tile');
        gridBoxes.forEach((box, index) => {
            box.addEventListener('click', () => {
                box.textContent = Game.currentPlayer.marker;
                box.classList.add(Game.currentPlayer.marker);
                box.style.pointerEvents = 'none';
                board[index] = Game.currentPlayer.marker;
                Game.remainingSpots -= 1;
                Game.declareWinner();
                if (Game.winner === false) {
                    if (Game.remainingSpots > 0) {
                        Game.nextPlayer();
                    } else {
                        restartOverlay.classList.toggle('active');
                    }
                } else {
                    restartOverlay.classList.toggle('active');
                }
            })
        });
    }
    return {renderBoard, board};
})();

const Game = (function() {
    const player1 = Player('X');
    const player2 = Player('O');

    let currentPlayer = player1;
    let remainingSpots = 9;
    let winner = false;

    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    function nextPlayer() {
        this.currentPlayer === player1 ? this.currentPlayer = player2 : this.currentPlayer = player1;
    }
    
    function declareWinner() {
        winningCombinations.forEach(item => {
            if (GameBoard.board[item[0]] === this.currentPlayer.marker && GameBoard.board[item[1]] === this.currentPlayer.marker && GameBoard.board[item[2]] === this.currentPlayer.marker) {
                this.winner = true;
            }
        })
    }

    return {
        currentPlayer, nextPlayer, remainingSpots, winner, declareWinner, winningCombinations
    };
})()

//-------------------------------DOM VARIABLES-------------------------------//

const restartOverlay = document.querySelector('.restart-game');

//-------------------------------EVENT LISTENERS-------------------------------//