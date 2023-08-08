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

async function getImageDimensions(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = url;
  });
}

async function createPuzzlePieces() {
  const board = document.getElementById("puzzle-board");

  // Clear the puzzle board before creating new pieces
  board.innerHTML = "";

  for (const url of puzzlePieceUrls) {
    try {
      const { width, height } = await getImageDimensions(url);

      const piece = document.createElement("div");
      piece.className = "puzzle-piece";
      piece.style.backgroundImage = `url("${url}")`; // Use the background-image property
      piece.style.width = `${width}px`;
      piece.style.height = `${height}px`;
      piece.style.left = Math.random() * (board.offsetWidth - width) + "px"; // Random initial position
      piece.style.top = Math.random() * (board.offsetHeight - height) + "px";

      board.appendChild(piece);

      // Add event listeners for dragging the puzzle pieces after creating them
      piece.addEventListener("mousedown", handleDragStart);
      piece.addEventListener("touchstart", handleDragStart, { passive: false });
      piece.addEventListener("mouseup", handleDragEnd);
      piece.addEventListener("touchend", handleDragEnd);
    } catch (error) {
      console.error(`Error loading image from ${url}:`, error);
    }
  }
}

let draggedPiece = null;
let offsetX = 0;
let offsetY = 0;

function handleDragStart(event) {
  if (event.type === "mousedown") {
    draggedPiece = event.target;
    offsetX = event.clientX - draggedPiece.getBoundingClientRect().left;
    offsetY = event.clientY - draggedPiece.getBoundingClientRect().top;
    draggedPiece.style.cursor = "grabbing";
  } else if (event.type === "touchstart") {
    draggedPiece = event.target;
    offsetX = event.touches[0].clientX - draggedPiece.getBoundingClientRect().left;
    offsetY = event.touches[0].clientY - draggedPiece.getBoundingClientRect().top;
    draggedPiece.style.cursor = "grabbing";
  }
}

function handleDragEnd(event) {
  draggedPiece = null;
  event.target.style.cursor = "grab";
}

document.addEventListener("mousemove", handleDrag);
document.addEventListener("touchmove", handleDrag, { passive: false });

function handleDrag(event) {
  if (draggedPiece) {
    const board = document.getElementById("puzzle-board");
    const boardRect = board.getBoundingClientRect();

    const minX = 0;
    const minY = 0;
    const maxX = boardRect.width - draggedPiece.offsetWidth;
    const maxY = boardRect.height - draggedPiece.offsetHeight;

    let x, y;

    if (event.type === "mousemove") {
      x = event.clientX - boardRect.left - offsetX;
      y = event.clientY - boardRect.top - offsetY;
    } else if (event.type === "touchmove") {
      x = event.touches[0].clientX - boardRect.left - offsetX;
      y = event.touches[0].clientY - boardRect.top - offsetY;
    }

    x = Math.min(Math.max(minX, x), maxX);
    y = Math.min(Math.max(minY, y), maxY);

    draggedPiece.style.left = x + "px";
    draggedPiece.style.top = y + "px";
  }
}

window.addEventListener("resize", createPuzzlePieces);

document.addEventListener("DOMContentLoaded", () => {
  createPuzzlePieces();
});
