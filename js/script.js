document.addEventListener("DOMContentLoaded", () => {
  const puzzleContainer = document.getElementById("puzzle-container");

  // Function to handle drag events
  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.dropEffect = "move";
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDrop(e) {
    e.preventDefault();
    const draggedPieceId = e.dataTransfer.getData("text/plain");
    const draggedPiece = document.getElementById(draggedPieceId);
    const offsetX = e.clientX - draggedPiece.dataset.clientX;
    const offsetY = e.clientY - draggedPiece.dataset.clientY;
    draggedPiece.style.left = `${offsetX}px`;
    draggedPiece.style.top = `${offsetY}px`;
    updatePuzzlePositions();
  }

  // Function to update the puzzle piece positions
  function updatePuzzlePositions() {
    const puzzlePieces = document.getElementsByClassName("puzzle-piece");
    for (let i = 0; i < puzzlePieces.length; i++) {
      const piece = puzzlePieces[i];
      const rect = piece.getBoundingClientRect();
      piece.dataset.clientX = rect.left;
      piece.dataset.clientY = rect.top;
    }
  }

  // Load 24 puzzle pieces onto the page
  for (let i = 1; i <= 24; i++) {
    const puzzlePiece = document.createElement("img");
    puzzlePiece.src = `images/puzzle_pieces/puzzle_${i}.png`;
    puzzlePiece.id = `puzzle-${i}`;
    puzzlePiece.classList.add("puzzle-piece");
    puzzlePiece.style.position = "absolute";
    puzzlePiece.style.left = "0";
    puzzlePiece.style.top = "0";

    puzzlePiece.addEventListener("dragstart", handleDragStart);
    puzzleContainer.appendChild(puzzlePiece);
  }

  puzzleContainer.addEventListener("dragover", handleDragOver);
  puzzleContainer.addEventListener("drop", handleDrop);
});
