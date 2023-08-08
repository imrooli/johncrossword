document.addEventListener("DOMContentLoaded", () => {
  const puzzleContainer = document.getElementById("puzzle-container");
  const puzzlePieces = [];

  // Function to create a puzzle piece and make it draggable
  function createPuzzlePiece(id) {
    const puzzlePiece = document.createElement("img");
    puzzlePiece.src = `images/puzzle_pieces/puzzle_${id}.png`;
    puzzlePiece.id = `puzzle-${id}`;
    puzzlePiece.classList.add("puzzle-piece");
    puzzlePiece.draggable = true;

    puzzlePiece.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", e.target.id);
    });

    puzzlePieces.push(puzzlePiece);
    puzzleContainer.appendChild(puzzlePiece);
  }

  // Function to update the puzzle piece positions
  function updatePuzzlePositions() {
    puzzlePieces.forEach((piece) => {
      const rect = piece.getBoundingClientRect();
      piece.dataset.left = rect.left;
      piece.dataset.top = rect.top;
    });
  }

  // Function to handle drag events
  function handleDragEvents(e) {
    e.preventDefault();

    const draggedPieceId = e.dataTransfer.getData("text/plain");
    const draggedPiece = document.getElementById(draggedPieceId);
    const offsetX = e.clientX - parseInt(draggedPiece.dataset.left);
    const offsetY = e.clientY - parseInt(draggedPiece.dataset.top);

    function movePiece(e) {
      draggedPiece.style.left = e.clientX - offsetX + "px";
      draggedPiece.style.top = e.clientY - offsetY + "px";
    }

    function releasePiece() {
      puzzleContainer.removeEventListener("mousemove", movePiece);
      puzzleContainer.removeEventListener("mouseup", releasePiece);
      updatePuzzlePositions();
    }

    puzzleContainer.addEventListener("mousemove", movePiece);
    puzzleContainer.addEventListener("mouseup", releasePiece);
  }

  // Load 24 puzzle pieces onto the page
  for (let i = 1; i <= 24; i++) {
    createPuzzlePiece(i);
  }

  puzzleContainer.addEventListener("dragover", handleDragEvents);
});
