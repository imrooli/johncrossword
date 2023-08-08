// Array containing URLs of puzzle piece images
const puzzlePieceUrls = [
  "https://i.imgur.com/4oYIM2J.png",
  // Add other image links here for the remaining puzzle pieces
];

// Create puzzle pieces and add them to the board
function createPuzzlePieces() {
  const board = document.getElementById("puzzle-board");

  puzzlePieceUrls.forEach((url, index) => {
    const piece = document.createElement("div");
    piece.className = "puzzle-piece";
    piece.style.left = Math.random() * 500 + "px"; // Random initial position
    piece.style.top = Math.random() * 300 + "px";
    piece.innerHTML = `<img src="${url}" alt="Piece ${index + 1}">`;

    // Add event listeners for dragging the puzzle piece
    piece.addEventListener("mousedown", handleDragStart);
    piece.addEventListener("mouseup", handleDragEnd);

    board.appendChild(piece);
  });
}

let draggedPiece = null;

function handleDragStart(event) {
  draggedPiece = event.target;
  event.target.style.cursor = "grabbing";
}

function handleDragEnd(event) {
  draggedPiece = null;
  event.target.style.cursor = "grab";
}

document.addEventListener("mousemove", handleDrag);

function handleDrag(event) {
  if (draggedPiece) {
    draggedPiece.style.left = event.pageX - draggedPiece.offsetWidth / 2 + "px";
    draggedPiece.style.top = event.pageY - draggedPiece.offsetHeight / 2 + "px";
  }
}

// Initialize the puzzle
createPuzzlePieces();
