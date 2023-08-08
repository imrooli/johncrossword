document.addEventListener('DOMContentLoaded', () => {
    const puzzleBoard = document.getElementById('puzzle-board');
    const puzzlePieces = [];

    function allowDrop(event) {
        event.preventDefault();
    }

    function drag(event) {
        const draggedImage = event.target;
        offsetX = event.clientX - draggedImage.getBoundingClientRect().left;
        offsetY = event.clientY - draggedImage.getBoundingClientRect().top;
        draggedImage.style.cursor = "grabbing";
        draggedPiece = draggedImage;
    }

    function drop(event) {
        event.preventDefault();
        if (draggedPiece) {
            const x = event.clientX - puzzleBoard.getBoundingClientRect().left - offsetX;
            const y = event.clientY - puzzleBoard.getBoundingClientRect().top - offsetY;
            draggedPiece.style.left = `${x}px`;
            draggedPiece.style.top = `${y}px`;
            draggedPiece.style.cursor = "grab";
            draggedPiece = null;
        }
    }

    // Add puzzle pieces to the board
    for (let i = 1; i <= 24; i++) {
        const puzzlePiece = document.createElement('div');
        puzzlePiece.classList.add('puzzle-piece');
        const puzzleImage = new Image();
        puzzleImage.src = `images/puzzle_pieces/puzzle_${i}.png`;
        puzzleImage.draggable = true;
        puzzleImage.addEventListener('dragstart', drag);
        puzzleImage.onload = () => {
            const originalWidth = puzzleImage.width;
            const originalHeight = puzzleImage.height;
            puzzlePiece.style.backgroundImage = `url(${puzzleImage.src})`;
            puzzlePiece.style.backgroundSize = 'cover';
            puzzlePiece.style.width = originalWidth + 'px';
            puzzlePiece.style.height = originalHeight + 'px';
        };
        puzzlePiece.appendChild(puzzleImage);
        puzzleBoard.appendChild(puzzlePiece);
        puzzlePieces.push(puzzlePiece);
    }
});
