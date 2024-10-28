document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll("#board div");
    const statusDiv = document.getElementById("status");
    const newGameButton = document.querySelector(".btn");
    let currentPlayer = "X";
    let gameState = Array(9).fill(null);
    let isGameOver = false;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    squares.forEach((square, index) => {
        square.classList.add("square");

        square.addEventListener("click", () => {
            if (!isGameOver && !square.textContent) {
                square.textContent = currentPlayer;
                square.classList.add(currentPlayer);
                gameState[index] = currentPlayer;

                if (checkWinner()) {
                    statusDiv.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
                    statusDiv.classList.add("you-won");
                    isGameOver = true;
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    statusDiv.textContent = `Player ${currentPlayer}'s Turn`;
                }
            }
        });

        square.addEventListener("mouseover", () => {
            square.classList.add("hover");
        });

        square.addEventListener("mouseout", () => {
            square.classList.remove("hover");
        });
    });

    newGameButton.addEventListener("click", () => {
        gameState.fill(null);
        isGameOver = false;
        currentPlayer = "X";
        statusDiv.textContent = "Move your mouse over a square and click to play an X or an O.";
        statusDiv.classList.remove("you-won");

        squares.forEach(square => {
            square.textContent = "";
            square.classList.remove("X", "O");
        });
    });

    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }
});
