document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('#board div');
    let currentPlayer = 'X'; // Start with player 'X'
    const gameState = Array(9).fill(null); // Array to keep track of the game state

    squares.forEach((square, index) => {
        // Add click event listener
        square.addEventListener('click', () => {
            // Check if the square is already filled
            if (!square.textContent) {
                // Set the text to 'X' or 'O'
                square.textContent = currentPlayer;
                // Add the class 'X' or 'O' for styling
                square.classList.add(currentPlayer);
                // Update the game state
                gameState[index] = currentPlayer;
                // Switch players
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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
});
