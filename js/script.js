document.addEventListener('DOMContentLoaded', () => {
    const puzzleBoard = document.getElementById('puzzle-board');
    const puzzlePieces = [];

function startDragging(event) {
    const puzzlePiece = event.target.closest('.puzzle-piece');
    const boundingRect = puzzlePiece.getBoundingClientRect();
    const shiftX = event.clientX - boundingRect.left;
    const shiftY = event.clientY - boundingRect.top;

    puzzlePiece.style.cursor = 'grabbing';
    puzzlePiece.style.zIndex = 1;

    function moveAt(pageX, pageY) {
        const newX = pageX - shiftX;
        const newY = pageY - shiftY;

        puzzlePiece.style.left = newX + 'px';
        puzzlePiece.style.top = newY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    function stopDragging() {
        document.removeEventListener('mousemove', onMouseMove);
        puzzlePiece.style.cursor = 'grab';
        puzzlePiece.style.zIndex = 0;
        document.removeEventListener('mouseup', stopDragging);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopDragging);
}

    // Add puzzle pieces to the board
    for (let i = 1; i <= 24; i++) {
        const puzzlePiece = document.createElement('div');
        puzzlePiece.classList.add('puzzle-piece');
        const puzzleImage = new Image();
        puzzleImage.src = `images/puzzle_pieces/puzzle_${i}.png`;
        puzzleImage.onload = () => {
            const originalWidth = puzzleImage.width;
            const originalHeight = puzzleImage.height;
            puzzlePiece.style.width = originalWidth + 'px';
            puzzlePiece.style.height = originalHeight + 'px';
        };
        puzzlePiece.appendChild(puzzleImage);
        puzzlePiece.dataset.target = `target_${i}`;
        puzzleBoard.appendChild(puzzlePiece);
        puzzlePieces.push(puzzlePiece);
    }

    shuffleArray(puzzlePieces);
    addEventListenersToPieces();
});
