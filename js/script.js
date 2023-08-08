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
            puzzlePiece.addEventListener('dragstart', () => false);
        });
    }

    function startDragging(event) {
        const puzzlePiece = event.target.closest('.puzzle-piece');
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
            checkPuzzleCompletion();
        }

        moveAt(event.pageX, event.pageY);

        document.addEventListener('mousemove', onMouseMove);
        puzzlePiece.addEventListener('mouseup', onMouseUp);
    }

    function checkPuzzleCompletion() {
        let completedPieces = 0;
        puzzlePieces.forEach(puzzlePiece => {
            const rect1 = puzzlePiece.getBoundingClientRect();
            const rect2 = puzzlePiece.dataset.target.getBoundingClientRect();
            const overlapping = !(rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom);

            if (overlapping) {
                puzzlePiece.style.pointerEvents = 'none';
                completedPieces++;
            }
        });

        if (completedPieces === puzzlePieces.length) {
            alert('Congratulations! Puzzle completed!');
        }
    }

    // Add puzzle pieces to the board
    for (let i = 1; i <= 24; i++) {
        const puzzlePiece = document.createElement('div');
        puzzlePiece.classList.add('puzzle-piece');
        const puzzleImage = new Image();
        puzzleImage.src = `images/puzzle_pieces/puzzle_${i}.png`;
        puzzlePiece.appendChild(puzzleImage);
        puzzlePiece.style.order = i;
        puzzlePiece.dataset.target = `target_${i}`;
        puzzleBoard.appendChild(puzzlePiece);
        puzzlePieces.push(puzzlePiece);
    }

    shuffleArray(puzzlePieces);
    addEventListenersToPieces();
});
