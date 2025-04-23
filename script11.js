document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    const shuffleButton = document.getElementById('shuffle-button');

    const puzzlePieces = [...Array(15).keys()].map(n => n + 1);
    puzzlePieces.push(null); // Add empty space

    function createPuzzle() {
        puzzleContainer.innerHTML = '';
        puzzlePieces.forEach(piece => {
            const div = document.createElement('div');
            div.className = 'puzzle-piece';
            if (piece) {
                div.textContent = piece;
            } else {
                div.classList.add('hidden');
            }
            puzzleContainer.appendChild(div);
        });
    }

    function shufflePuzzle() {
        for (let i = puzzlePieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [puzzlePieces[i], puzzlePieces[j]] = [puzzlePieces[j], puzzlePieces[i]];
        }
        createPuzzle();
    }

    function movePiece(index) {
        const emptyIndex = puzzlePieces.indexOf(null);
        const validMoves = [emptyIndex - 4, emptyIndex + 4, emptyIndex - 1, emptyIndex + 1];

        if (validMoves.includes(index)) {
            [puzzlePieces[emptyIndex], puzzlePieces[index]] = [puzzlePieces[index], puzzlePieces[emptyIndex]];
            createPuzzle();
        }
    }

    puzzleContainer.addEventListener('click', e => {
        if (e.target.className.includes('puzzle-piece')) {
            const index = Array.from(puzzleContainer.children).indexOf(e.target);
            movePiece(index);
        }
    });

    shuffleButton.addEventListener('click', shufflePuzzle);

    createPuzzle();
});