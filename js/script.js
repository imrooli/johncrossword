document.addEventListener('DOMContentLoaded', () => {
    const puzzleBoard = document.getElementById('puzzle-board');
    const puzzlePieces = [];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function shufflePiecesPositions() {
        const puzzleBoardRect = puzzleBoard.getBoundingClientRect();
        const boardWidth = puzzleBoardRect.width;
        const boardHeight = puzzleBoardRect.height;
        const centerX = boardWidth / 2;
        const centerY = boardHeight / 2;
        const maxOffsetX = centerX - puzzlePieces[0].offsetWidth / 2;
        const maxOffsetY = centerY - puzzlePieces[0].offsetHeight / 2;

        puzzlePieces.forEach(puzzlePiece => {
            const randomOffsetX = Math.random() * maxOffsetX * 2 - maxOffsetX;
            const randomOffsetY = Math.random() * maxOffsetY * 2 - maxOffsetY;
            puzzlePiece.style.left = `${centerX + randomOffsetX}px`;
            puzzlePiece.style.top = `${centerY + randomOffsetY}px`;
        });
    }

    function addEventListenersToPieces() {
        puzzlePieces.forEach(puzzlePiece => {
            puzzlePiece.addEventListener('mousedown', startDragging);
        });
    }

    function startDragging(event) {
        const puzzlePiece = event.target.closest('.puzzle-piece');
        const shiftX = event.clientX - puzzlePiece.getBoundingClientRect().left;
        const shiftY = event.clientY - puzzlePiece.getBoundingClientRect().top;

        puzzlePiece.style.cursor = 'grabbing';
        puzzlePiece.style.zIndex = 1;

        function moveAt(pageX, pageY) {
            puzzlePiece.style.left = pageX - shiftX + 'px';
            puzzlePiece.style.top = pageY - shiftY + 'px';
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
    shufflePiecesPositions(); // Shuffle the initial positions of the puzzle pieces
});
