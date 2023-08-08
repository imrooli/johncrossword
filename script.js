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

let draggedPiece = null;
let offsetX = 0;
let offsetY = 0;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  const draggedImage = event.target;
  const isTouchEvent = event.type === "touchstart";

  offsetX = isTouchEvent
    ? event.touches[0].clientX - draggedImage.getBoundingClientRect().left
    : event.clientX - draggedImage.getBoundingClientRect().left;
  offsetY = isTouchEvent
    ? event.touches[0].clientY - draggedImage.getBoundingClientRect().top
    : event.clientY - draggedImage.getBoundingClientRect().top;

  draggedImage.style.cursor = "grabbing";
  draggedPiece = draggedImage;
}

function drop(event) {
  event.preventDefault();
  if (draggedPiece) {
    const board = document.getElementById("puzzle-board");
    const x = event.clientX - board.getBoundingClientRect().left - offsetX;
    const y = event.clientY - board.getBoundingClientRect().top - offsetY;
    draggedPiece.style.left = `${x}px`;
    draggedPiece.style.top = `${y}px`;
    draggedPiece.style.cursor = "grab";
    draggedPiece = null;
  }
}

async function createPuzzlePieces() {
  const board = document.getElementById("puzzle-board");

  // Clear the puzzle board before creating new pieces
  board.innerHTML = "";

  let totalWidth = 0;
  let maxHeight = 0;

  for (const url of puzzlePieceUrls) {
    try {
      const { width, height } = await getImageDimensions(url);
      totalWidth += width;
      maxHeight = Math.max(maxHeight, height);
    } catch (error) {
      console.error(`Error loading image from ${url}:`, error);
    }
  }

  // Calculate the scaling factor to fit the images within the board
  const scale = Math.min(board.offsetWidth / (totalWidth * 0.5), board.offsetHeight / (maxHeight * 0.5));

  let leftPosition = 0;

  for (const url of puzzlePieceUrls) {
    try {
      const { width, height } = await getImageDimensions(url);
      const scaledWidth = width * scale;
      const scaledHeight = height * scale;

      const piece = document.createElement("img");
      piece.src = url;
      piece.className = "puzzle-piece";
      piece.style.width = `${scaledWidth}px`;
      piece.style.height = `${scaledHeight}px`;
      piece.style.position = "absolute";
      piece.style.left = leftPosition + "px";
      piece.style.top = Math.random() * (board.offsetHeight - scaledHeight) + "px";
      piece.draggable = true;
      piece.addEventListener("dragstart", drag);
      piece.addEventListener("touchstart", drag);

      board.appendChild(piece);

      leftPosition += scaledWidth;
    } catch (error) {
      console.error(`Error loading image from ${url}:`, error);
    }
  }
}

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

window.addEventListener("resize", createPuzzlePieces);

document.addEventListener("DOMContentLoaded", () => {
  createPuzzlePieces();
});

document.addEventListener("mouseup", drop);
document.addEventListener("touchend", drop);
