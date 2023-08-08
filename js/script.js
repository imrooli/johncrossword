document.addEventListener('DOMContentLoaded', () => {
    const puzzleBoard = document.getElementById('puzzle-board');
    const puzzlePieces = [];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function addEventListenersToPieces() {
        puzzlePieces.forEach(puzzlePiece => {
            puzzlePiece.draggable = true;
            puzzlePiece.addEventListener('dragstart', startDragging);
            puzzlePiece.addEventListener('dragend', stopDragging);
        });
    }

    let draggingPiece = null;

    function startDragging(event) {
        draggingPiece = event.target;
        event.dataTransfer.setData('text/plain', ''); // Required for dragging in Firefox
        draggingPiece.style.cursor = 'grabbing';
        draggingPiece.style.zIndex = 1;
    }

    function stopDragging() {
        if (!draggingPiece) return;
        draggingPiece.style.cursor = 'grab';
        draggingPiece.style.zIndex = 0;
        draggingPiece = null;
    }

    // Add puzzle pieces to the board
    for (let i = 1; i <= 24; i++) {
        const puzzlePiece = document.createElement('div');
        puzzlePiece.classList.add('puzzle-piece');
        puzzlePiece.style.backgroundImage = `url(images/puzzle_pieces/puzzle_${i}.png)`;
        puzzlePiece.style.backgroundSize = 'contain';
        puzzleBoard.appendChild(puzzlePiece);
        puzzlePieces.push(puzzlePiece);
    }

    addEventListenersToPieces();
});
