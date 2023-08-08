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
            puzzlePiece.addEventListener('touchstart', startDragging);
            puzzlePiece.addEventListener('touchmove', continueDragging);
            puzzlePiece.addEventListener('touchend', stopDragging);
            puzzlePiece.addEventListener('touchcancel', stopDragging);
        });
    }

    let draggingPiece = null;
    let touchOffsetX = 0;
    let touchOffsetY = 0;

    function startDragging(event) {
        draggingPiece = event.target;
        const puzzlePieceRect = draggingPiece.getBoundingClientRect();
        const touch = event.touches[0];
        touchOffsetX = touch.clientX - puzzlePieceRect.left;
        touchOffsetY = touch.clientY - puzzlePieceRect.top;
        draggingPiece.style.cursor = 'grabbing';
        draggingPiece.style.zIndex = 1;
    }

    function continueDragging(event) {
        if (!draggingPiece) return;
        event.preventDefault();
        const touch = event.touches[0];
        const newX = touch.clientX - touchOffsetX;
        const newY = touch.clientY - touchOffsetY;
        draggingPiece.style.left = newX + 'px';
        draggingPiece.style.top = newY + 'px';
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
