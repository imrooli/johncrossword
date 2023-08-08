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
            puzzlePiece.addEventListener('mouseup', stopDragging);
        });
    }

    function startDragging(event) {
        const puzzlePiece = event.target;
        puzzlePiece.style.cursor = 'grabbing';
        puzzlePiece.style.zIndex = 1;

        function onMouseMove(event) {
            puzzlePiece.style.left = event.clientX - puzzlePiece.offsetWidth / 2 + 'px';
            puzzlePiece.style.top = event.clientY - puzzlePiece.offsetHeight / 2 + 'px';
        }

        document.addEventListener('mousemove', onMouseMove);

        function stopDragging() {
            document.removeEventListener('mousemove', onMouseMove);
            puzzlePiece.style.cursor = 'grab';
            puzzlePiece.style.zIndex = 0;
        }

        puzzlePiece.addEventListener('mouseup', stopDragging);
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
            puzzlePiece.style.left = Math.random() * (puzzleBoard.offsetWidth - originalWidth) + 'px';
            puzzlePiece.style.top = Math.random() * (puzzleBoard.offsetHeight - originalHeight) + 'px';
        };
        puzzlePiece.appendChild(puzzleImage);
        puzzleBoard.appendChild(puzzlePiece);
        puzzlePieces.push(puzzlePiece);
    }

    addEventListenersToPieces();
});
