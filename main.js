let container = document.getElementById("container");
const gameBoard = (() => {
    let board = Array(9);
    board[2] = "x";
    return {board};
})();



function refresh() {for (let item of gameBoard.board) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    if (!item) {
        cell.textContent = "empty";
    } else if (item === "x") {
        cell.textContent = "x";
    } else {
        cell.textContent = "o";
    };
    container.appendChild(cell);
}};
