let container = document.getElementById("container");

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
    // returning everything into an object
    return {board, empty};
})();
 
const player = (name, symbol) => {
    const playerName = () => {
        console.log(name);
    };
    const mark = (index) => {
        if (gameBoard.empty(index)) {
            gameBoard.board[index] = symbol;
            game.render();
        };     
    };
    return {playerName, mark};
};

const game = (() => {
    const render = () => {
        container.innerHTML = "";
        for (let [index, item] of gameBoard.board.entries()) {
            let cell = gameBoardCell(item, index).cell;
            container.appendChild(cell);
    }};
    const player1 = player("p1", "x");
    const player2 = player("p2", "o");
    let currentPlayer = player1;

    return {render, currentPlayer, player1, player2, switchPlayers};
})();

const gameBoardCell = (content, position) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = content;
    cell.dataset.position = position;
    cell.addEventListener("click", () => {
        game.currentPlayer.mark(position);
    });
    return{cell};
};
 
game.render();