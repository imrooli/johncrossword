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

  puzzlePieceUrls.forEach((url, index) => {
    const piece = document.createElement("div");
    piece.className = "puzzle-piece";
    piece.setAttribute("draggable", "true");
    piece.style.backgroundImage = `url(${url})`;
    piece.style.left = Math.random() * 500 + "px"; // Random initial position
    piece.style.top = Math.random() * 300 + "px";

    board.appendChild(piece);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createPuzzlePieces();

  const puzzlePieces = document.querySelectorAll(".puzzle-piece");

  let draggedPiece = null;

  puzzlePieces.forEach(piece => {
    piece.addEventListener("dragstart", handleDragStart);
    piece.addEventListener("dragend", handleDragEnd);
  });

  function handleDragStart(event) {
    draggedPiece = event.target;
    event.dataTransfer.setData("text/plain", ""); // Required for Firefox to enable dragging
  }

  function handleDragEnd(event) {
    draggedPiece = null;
  }

  document.addEventListener("dragover", event => event.preventDefault());

  document.addEventListener("drop", event => {
    event.preventDefault();
    if (draggedPiece) {
      const rect = event.target.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      draggedPiece.style.left = offsetX - draggedPiece.offsetWidth / 2 + "px";
      draggedPiece.style.top = offsetY - draggedPiece.offsetHeight / 2 + "px";
    }
  });
});
