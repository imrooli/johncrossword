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
        document.addEventListener('mousemove', continueDragging);
        document.addEventListener('mouseup', stopDragging);
    }

    let draggingPiece = null;
    let offsetX = 0;
    let offsetY = 0;

    function startDragging(event) {
        draggingPiece = event.target;
        offsetX = event.clientX - parseFloat(getComputedStyle(draggingPiece).left);
        offsetY = event.clientY - parseFloat(getComputedStyle(draggingPiece).top);
        draggingPiece.style.cursor = 'grabbing';
        draggingPiece.style.zIndex = 1;
    }

    function continueDragging(event) {
        if (!draggingPiece) return;
        draggingPiece.style.left = (event.clientX - offsetX) + 'px';
        draggingPiece.style.top = (event.clientY - offsetY) + 'px';
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
