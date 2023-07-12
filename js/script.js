//-------------------------------FACTORY-------------------------------//

const Player = marker => {
    return {marker};
}

//-------------------------------MODULES-------------------------------//

const GameBoard = (function() {
    let _board = new Array(9);

    function resetBoard() {
        for(let i = 0; i < 9; i += 1) {
            _board[i] = '';
        }
        gridBoxes.forEach((box, index) => {
            box.className = 'tile';
            box.style.pointerEvents = 'auto';
            box.textContent = _board[index];
        })
    }

    function setBoardMarker(marker, index) {
        _board[index] = marker;
    }

    function getBoardMarker(index) {
        return _board[index];
    }

    return {
        resetBoard,
        setBoardMarker,
        getBoardMarker
    };
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

    function displayCurrentPlayer () {
        if (this.currentPlayer === player1) {
            return 'Player 1';
        } else {
            return 'Player 2';
        }
    }

    function checkForWinner() {
        winningCombinations.forEach(item => {
            if (GameBoard.getBoardMarker(item[0]) === this.currentPlayer.marker && GameBoard.getBoardMarker(item[1]) === this.currentPlayer.marker && GameBoard.getBoardMarker(item[2]) === this.currentPlayer.marker) {
                this.setWinner();
            }
        })
    }

    function setWinner() {
        winner = true;
    }

    function getWinner() {
        return winner;
    }

    function reset() {
        this.currentPlayer = player1;
        this.remainingSpots = 9;
        winner = false;
    }

    return {
        currentPlayer, 
        nextPlayer, 
        remainingSpots, 
        checkForWinner, 
        setWinner, 
        getWinner,
        displayCurrentPlayer,
        reset
    };
})()

//-------------------------------DOM VARIABLES-------------------------------//

const restartOverlay = document.querySelector('.restart-game');
const currentPlayer = document.getElementById('current-player');
const restartButton = document.getElementById('restart-btn');
const gridBoxes = document.querySelectorAll('.tile');
const resultMessage = document.getElementById('result');

//-------------------------------EVENT LISTENERS-------------------------------//

restartButton.addEventListener('click', () => {
    Game.reset();
    GameBoard.resetBoard();
    currentPlayer.textContent = "Player 1's Turn";
    togglePopup();
})

gridBoxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        box.textContent = Game.currentPlayer.marker;
        box.classList.add(Game.currentPlayer.marker);
        box.style.pointerEvents = 'none';
        GameBoard.setBoardMarker(Game.currentPlayer.marker, index);
        Game.remainingSpots -= 1;
        Game.checkForWinner();
        if (Game.getWinner() === false) {
            if (Game.remainingSpots > 0) {
                Game.nextPlayer();
                currentPlayer.textContent = `${Game.displayCurrentPlayer()}'s Turn`;
            } else {
                togglePopup();
                resultMessage.textContent = "It's a tie!"
            }
        } else {
            togglePopup();
            resultMessage.textContent = `${Game.displayCurrentPlayer()} wins!`;
        }
    })
});

//-------------------------------DOM FUNCTIONS-------------------------------//

function togglePopup() {
    restartOverlay.classList.toggle('active');
}