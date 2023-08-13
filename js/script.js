document.addEventListener('DOMContentLoaded', () => {
    const puzzleHolder = document.getElementById('puzzle-holder');
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
            // Prevent accidental selection of images
            puzzlePiece.addEventListener('dragstart', e => e.preventDefault());
        });
    }

    function startDragging(event) {
        const puzzlePiece = event.target.closest('.puzzle-piece');
        const boundingRect = puzzlePiece.getBoundingClientRect();
        const shiftX = event.clientX - boundingRect.left - boundingRect.width / 2;
        const shiftY = event.clientY - boundingRect.top - boundingRect.height / 2;

        puzzlePiece.style.position = 'absolute';
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


for (let i = 1; i <= 20; i++) {
    const puzzlePiece = document.createElement('div');
    puzzlePiece.classList.add('puzzle-piece');
    const puzzleImage = new Image();
    puzzleImage.src = `images/puzzle_pieces/puzzle_${i}.png`;
    puzzleImage.onload = () => {
        const originalWidth = puzzleImage.width;
        const originalHeight = puzzleImage.height;

        // Reduce the size by 50%
        const newWidth = originalWidth * 0.5;
        const newHeight = originalHeight * 0.5;

        puzzlePiece.style.width = newWidth + 'px';
        puzzlePiece.style.height = newHeight + 'px';
    };
    puzzlePiece.appendChild(puzzleImage);
    puzzlePiece.dataset.target = `target_${i}`;
    puzzlePieces.push(puzzlePiece);
}

    // Shuffle the order of puzzle pieces
    shuffleArray(puzzlePieces);

// Append the shuffled pieces to the holder initially
    puzzlePieces.forEach(puzzlePiece => puzzleHolder.appendChild(puzzlePiece));

    // Add event listeners to pieces
    addEventListenersToPieces();

    // Register drop event for the puzzle holder
    puzzleHolder.addEventListener('drop', event => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const puzzlePiece = document.getElementById(data);
        puzzleHolder.appendChild(puzzlePiece);
    });

    puzzleHolder.addEventListener('dragover', event => {
        event.preventDefault();
    });
});
