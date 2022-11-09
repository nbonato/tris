let container = document.getElementById("container");
let turn = 0;
const gameBoard = (() => {
    // create a board which is an array of 9 undefined
    const board = Array(9);

    /* empty() checks the board array, if the clicked cell is
    undefined, it says the cell is empty, otherwise it says what is in it */
    const empty = (index) => {
        if ((board[index] == "x" | board[index] == "o")) {
            return false;
        };
        return true;
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
        } else {
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
                    console.log("Victory");
                };
            };
            game.switchPlayers();
        };     
    };
    const active = 1;
    return {playerName, mark, active, symbol};
};

const player1 = player("p1", "x");
const player2 = player("p2", "o");
let currentPlayer = player1;


const game = (() => {
    const render = () => {
        container.innerHTML = "";
        for (let [index, item] of gameBoard.board.entries()) {
            let cell = gameBoardCell(item, index).cell;
            container.appendChild(cell);
    }};    
    const switchPlayers = () => {
        if (currentPlayer.playerName == "p1") {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        };
    };


    return {render, switchPlayers};
})();

const gameBoardCell = (content, position) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = content;
    cell.dataset.position = position;
    cell.addEventListener("click", () => {
        currentPlayer.mark(position);
    });
    return{cell};
};

game.render();