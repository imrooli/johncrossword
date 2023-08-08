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
            puzzlePiece.addEventListener('pointerdown', startDragging);
        });
    }

    function startDragging(event) {
        const puzzlePiece = event.target.closest('.puzzle-piece');
        const initialX = event.clientX;
        const initialY = event.clientY;
        const puzzlePieceRect = puzzlePiece.getBoundingClientRect();
        const offsetX = initialX - puzzlePieceRect.left;
        const offsetY = initialY - puzzlePieceRect.top;

        puzzlePiece.style.cursor = 'grabbing';
        puzzlePiece.style.zIndex = 1;

        function onMouseMove(event) {
            const newX = event.clientX - offsetX;
            const newY = event.clientY - offsetY;

            puzzlePiece.style.left = newX + 'px';
            puzzlePiece.style.top = newY + 'px';
        }

        function stopDragging() {
            document.removeEventListener('pointermove', onMouseMove);
            puzzlePiece.style.cursor = 'grab';
            puzzlePiece.style.zIndex = 0;
            document.removeEventListener('pointerup', stopDragging);
        }

        document.addEventListener('pointermove', onMouseMove);
        document.addEventListener('pointerup', stopDragging);
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
