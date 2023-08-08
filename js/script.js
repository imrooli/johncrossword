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
            puzzlePiece.addEventListener("pointerdown", handleDragStart);
            puzzlePiece.addEventListener("pointerup", handleDragEnd);
            puzzlePiece.addEventListener("pointermove", handleDrag);
        });
    }

    function handleDragStart(event) {
        const puzzlePiece = event.target.closest('.puzzle-piece');
        puzzlePiece.style.cursor = 'grabbing';
        puzzlePiece.style.zIndex = 1;
        puzzlePiece.setPointerCapture(event.pointerId);
    }

    function handleDrag(event) {
        const puzzlePiece = event.target.closest('.puzzle-piece');
        if (!puzzlePiece.hasPointerCapture(event.pointerId)) return;

        const shiftX = event.clientX - puzzlePiece.getBoundingClientRect().left;
        const shiftY = event.clientY - puzzlePiece.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            puzzlePiece.style.left = pageX - shiftX + 'px';
            puzzlePiece.style.top = pageY - shiftY + 'px';
        }

        moveAt(event.pageX, event.pageY);
    }

    function handleDragEnd(event) {
        const puzzlePiece = event.target.closest('.puzzle-piece');
        puzzlePiece.style.cursor = 'grab';
        puzzlePiece.style.zIndex = 0;
        puzzlePiece.releasePointerCapture(event.pointerId);
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
