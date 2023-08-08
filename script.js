const puzzlePieceUrls = [
  "https://i.imgur.com/4oYIM2J.png",
  "https://i.imgur.com/zODk3CC.png",
  "https://i.imgur.com/n5DUWlS.png",
  "https://i.imgur.com/UVmY9cF.png",
  "https://i.imgur.com/sytQIcj.png",
  "https://i.imgur.com/qRdjMLv.png",
  "https://i.imgur.com/Ufw6yy4.png",
  "https://i.imgur.com/eWJ82eZ.png",
  "https://i.imgur.com/mhXCzWQ.png",
  "https://i.imgur.com/X41bp2L.png",
  "https://i.imgur.com/nvyDWOv.png",
  "https://i.imgur.com/9PmClqT.png",
  "https://i.imgur.com/Xv4MzM6.png",
  "https://i.imgur.com/0soVHsc.png",
  "https://i.imgur.com/QUCnbcp.png",
  "https://i.imgur.com/iqErEnr.png",
  "https://i.imgur.com/IWhSQp3.png",
  "https://i.imgur.com/5Duhm4y.png",
  "https://i.imgur.com/pdvJPNa.png",
  "https://i.imgur.com/JnD04cm.png",
  "https://i.imgur.com/H2IACyW.png",
  "https://i.imgur.com/L3649O7.png",
  "https://i.imgur.com/MtYGuIt.png",
  "https://i.imgur.com/ELGdn97.png",
  
  // Add other image links here for the remaining puzzle pieces
];

function createPuzzlePieces() {
  const board = document.getElementById("puzzle-board");

  // Clear the puzzle board before creating new pieces
  board.innerHTML = "";

  const uniqueUrls = new Set(puzzlePieceUrls); // Convert array to a set to remove duplicates

  uniqueUrls.forEach((url) => {
    const piece = document.createElement("div");
    piece.className = "puzzle-piece";
    piece.style.backgroundImage = `url("${url}")`; // Use the background-image property
    piece.style.left = Math.random() * 500 + "px"; // Random initial position
    piece.style.top = Math.random() * 300 + "px";

    board.appendChild(piece);

    // Add event listeners for dragging the puzzle pieces after creating them
    piece.addEventListener("pointerdown", handleDragStart);
    piece.addEventListener("pointerup", handleDragEnd);
    piece.addEventListener("pointermove", handleDrag);
  });
}

let draggedPiece = null;
let offsetX = 0;
let offsetY = 0;

function handleDragStart(event) {
  draggedPiece = event.target;
  offsetX = event.clientX - draggedPiece.getBoundingClientRect().left;
  offsetY = event.clientY - draggedPiece.getBoundingClientRect().top;
  draggedPiece.style.cursor = "grabbing";
}

function handleDragEnd(event) {
  draggedPiece = null;
  event.target.style.cursor = "grab";
}

function handleDrag(event) {
  if (draggedPiece) {
    draggedPiece.style.left = event.clientX - offsetX + "px";
    draggedPiece.style.top = event.clientY - offsetY + "px";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  createPuzzlePieces();
});
