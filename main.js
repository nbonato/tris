let container = document.getElementById("container");

const gameBoard = (() => {
    // create a board which is an array of 9 undefined
    const board = Array(9);
    board[2] = "x";

    /* empty() checks the board array, if the indexed element is
    undefined, it says the cell is empty, otherwise it says it isn't */
    const empty = (index) => {
        if (board[index]) {
            return "not empty"
        };
        return "empty";
    };

    // returning everything into an object
    return {board, empty};
})();


// refresh generates the cells (divs) based on gameBoard.board
function refresh() {for (let item of gameBoard.board) {
    let cell = document.createElement("div");
    cell.classList.add("cell");

    // checking for item's existence, every undefined results in an empty cell
    if (!item) {
        cell.textContent = "empty";
    } else if (item === "x") {
        cell.textContent = "x";
    } else {
        cell.textContent = "o";
    };
    container.appendChild(cell);
}};
