document.addEventListener('DOMContentLoaded', () => {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function addEventListenersToPieces() {
        puzzlePieces.forEach(puzzlePiece => {
            puzzlePiece.addEventListener('mousedown', startDragging);
        });
    }

    function startDragging(event) {
        const puzzlePiece = event.target;
        puzzlePiece.style.cursor = 'grabbing';
        puzzlePiece.style.zIndex = 1;
        const shiftX = event.clientX - puzzlePiece.getBoundingClientRect().left;
        const shiftY = event.clientY - puzzlePiece.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            puzzlePiece.style.left = pageX - shiftX + 'px';
            puzzlePiece.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            puzzlePiece.removeEventListener('mouseup', onMouseUp);
            puzzlePiece.style.cursor = 'grab';
            puzzlePiece.style.zIndex = 0;
        }

        moveAt(event.pageX, event.pageY);

        document.addEventListener('mousemove', onMouseMove);
        puzzlePiece.addEventListener('mouseup', onMouseUp);
    }

    // Shuffle the puzzle pieces and add them to the board
    shuffleArray(puzzlePieces);
    const puzzleBoard = document.getElementById('puzzle-board');
    puzzlePieces.forEach(puzzlePiece => puzzleBoard.appendChild(puzzlePiece));

    addEventListenersToPieces();
});
