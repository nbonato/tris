let container = document.getElementById("container");
let resultDisplay = document.getElementById("result");
let player1Name = document.getElementById("name1");
let player2Name = document.getElementById("name2");
let nameForm = document.getElementById("name-form");
let playAgain = document.getElementById("play-again");
let turn = 0;
const gameBoard = (() => {
    // create a board which is an array of 9 undefined
    const board = Array(9);

    /* empty() checks the board array, if the clicked cell is
    undefined, it says the cell is empty, otherwise it says what is in it */
    const empty = (index) => {
        if ((board[index] != player1.symbol | board[index] != player2.symbol)) {
            return true;
        };
        return false;
    };
    const checkWin = (index, player) => {
        let win = (Array(3).fill(player.symbol)).toString();
        
        let row = [];
        if (index < 3) {
            row = [0,1,2];
        } else if (index < 6) {
            row = [3,4,5];
        } else {
            row = [6,7,8];
        };

        if (win === (row.map(i=>board[i])).toString()) {
            return true;
        };

        let col = [];
        if (index % 3 == 0) {
            col = [0,3,6];
        } else if (index % 3 == 1) {
            col = [1,4,7];
        } else {
            col = [2,5,8];
        };
        if (win === (col.map(i=>board[i])).toString()) {
            return true;
        };

        let dia = [];
        let topLeft = [0,4,8].map(i=>board[i]).toString()
        let topRight = [2,4,6].map(i=>board[i]).toString()
        if (index == 4) {
            if (win == topLeft || win == topRight) {    
                return true;
            };           
        } else if (index == 0 || index == 8) {
            dia = topLeft;
        } else if (index == 2 || index == 6){
            dia = topRight;
        };

        if (win === dia) {
            return true;
        };
    };
    
    // returning everything into an object
    return {board, empty, checkWin};
})();
 
const player = (name, symbol) => {
    const playerName = name;
    const mark = (index) => {
        if (gameBoard.empty(index)) {
            gameBoard.board[index] = symbol;
            game.render();
            turn ++;
            if (turn > 4) {
                if(gameBoard.checkWin(index, currentPlayer)) {
                    game.over(`Victory for ${currentPlayer.playerName}`);
                } else if (turn === 9) {
                    game.over("Draw!");
                };
            };
            game.switchPlayers();
        };     
    };
    return {playerName, mark, symbol};
};


const game = (() => {
    const assignPlayers = () => {
        let player1 = player(player1Name.value, "X");
        let player2 = player(player2Name.value, "O");
        let currentPlayer = player1;
        return {player1, player2, currentPlayer};
    };
    
    
    const render = () => {
        container.innerHTML = "";
        for (let [index, item] of gameBoard.board.entries()) {
            let cell = gameBoardCell(item, index).cell;
            container.appendChild(cell);
    }};    
    const switchPlayers = () => {
        if (currentPlayer.playerName == player1Name.value) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        };
    };

    const over = (message) => {
        resultDisplay.textContent = message;
        playAgain.style.display = "block";
    };

    const restart = ()  => {
        nameForm.reset();
        nameForm.style.display = "block";
        gameBoard.board = Array(9);
        container.innerHTML = "";
        playAgain.style.display = "none";
        resultDisplay.innerHTML = "";
        turn = 0;  
    };
    return {assignPlayers, render, switchPlayers, over, restart};
})();

const gameBoardCell = (content, position) => {
    const cell = document.createElement("div");
    const cellText = document.createElement("p");
    cell.appendChild(cellText);
    cell.classList.add("cell");
    cellText.textContent = content;
    cell.dataset.position = position;
    cell.addEventListener("click", () => {
        currentPlayer.mark(position);
    });
    return{cell};
};

nameForm.addEventListener("submit", (event) => {
    nameForm.style.display = "none";
    event.preventDefault();
    game.render();
    player1 = game.assignPlayers().player1;
    player2 = game.assignPlayers().player2;
    currentPlayer = game.assignPlayers().currentPlayer;
});

playAgain.addEventListener("click", () => {game.restart()});