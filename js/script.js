document.addEventListener("DOMContentLoaded", () => {
  const puzzleContainer = document.getElementById("puzzle-container");

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

    puzzleContainer.appendChild(puzzlePiece);
  }

  // Load 24 puzzle pieces onto the page
  for (let i = 1; i <= 24; i++) {
    createPuzzlePiece(i);
  }
});
