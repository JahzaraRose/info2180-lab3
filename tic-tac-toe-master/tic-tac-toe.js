document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('#board div');
    const statusDiv = document.getElementById('status');
    const newGameButton = document.querySelector('.btn'); // Assuming the button has a class 'btn'
    let currentPlayer = 'X'; // Start with player 'X'
    const gameState = Array(9).fill(null); // Array to keep track of the game state

    // Define the winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    squares.forEach((square, index) => {
        // Add click event listener
        square.addEventListener('click', () => {
            // Check if the square is already filled or if there is a winner
            if (!square.textContent && !checkWinner()) {
                // Set the text to 'X' or 'O'
                square.textContent = currentPlayer;
                // Add the class 'X' or 'O' for styling
                square.classList.add(currentPlayer);
                // Update the game state
                gameState[index] = currentPlayer;

                // Check if there is a winner
                if (checkWinner()) {
                    // Update the status message
                    statusDiv.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
                    // Add the 'you-won' class to the status div
                    statusDiv.classList.add('you-won');
                } else {
                    // Switch players if there is no winner
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });

        // Add mouseover event listener to add the 'hover' class
        square.addEventListener('mouseover', () => {
            square.classList.add('hover');
        });

        // Add mouseout event listener to remove the 'hover' class
        square.addEventListener('mouseout', () => {
            square.classList.remove('hover');
        });
    });

    // Add click event listener to the New Game button
    newGameButton.addEventListener('click', () => {
        // Reset the game state array
        gameState.fill(null);
        // Clear each square's content and remove the 'X' or 'O' class
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('X', 'O');
        });
        // Reset the status message and remove the 'you-won' class
        statusDiv.textContent = 'Move your mouse over a square and click to play an X or an O.';
        statusDiv.classList.remove('you-won');
        // Reset currentPlayer to 'X'
        currentPlayer = 'X';
    });

    // Function to check if there is a winner
    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }
});
