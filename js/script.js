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
            puzzlePiece.addEventListener('mousedown', startDragging);
        });
    }

    function startDragging(event) {
        const puzzlePiece = event.target.closest('.puzzle-piece');
        const offsetX = event.clientX - puzzlePiece.getBoundingClientRect().left;
        const offsetY = event.clientY - puzzlePiece.getBoundingClientRect().top;

        puzzlePiece.style.cursor = 'grabbing';
        puzzlePiece.style.zIndex = 1;

        function moveAt(pageX, pageY) {
            const left = pageX - offsetX;
            const top = pageY - offsetY;
            puzzlePiece.style.left = left + 'px';
            puzzlePiece.style.top = top + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.clientX, event.clientY);
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

    // Shuffle the order of puzzle pieces
    shuffleArray(puzzlePieces);
    // Append the shuffled pieces back to the board
    puzzlePieces.forEach(puzzlePiece => puzzleBoard.appendChild(puzzlePiece));

    addEventListenersToPieces();
});
