document.addEventListener("DOMContentLoaded", () => {
  const puzzleContainer = document.getElementById("puzzle-container");

  // Function to handle drag events
  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.dropEffect = "move";

    // Add a class to apply a drop shadow or any other visual effect while dragging
    e.target.classList.add("dragging");
  }

  function handleDragEnd(e) {
    // Remove the dragging class when the dragging ends
    const draggedPiece = document.querySelector(".dragging");
    if (draggedPiece) {
      draggedPiece.classList.remove("dragging");
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDrop(e) {
    e.preventDefault();
    const draggedPieceId = e.dataTransfer.getData("text/plain");
    const draggedPiece = document.getElementById(draggedPieceId);
    const offsetX = e.clientX - parseInt(draggedPiece.dataset.offsetX);
    const offsetY = e.clientY - parseInt(draggedPiece.dataset.offsetY);
    draggedPiece.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }

  // Load 24 puzzle pieces onto the page
  for (let i = 1; i <= 24; i++) {
    const puzzlePiece = document.createElement("img");
    puzzlePiece.src = `images/puzzle_pieces/puzzle_${i}.png`;
    puzzlePiece.id = `puzzle-${i}`;
    puzzlePiece.classList.add("puzzle-piece");
    puzzlePiece.style.position = "absolute";

    puzzlePiece.addEventListener("dragstart", handleDragStart);
    puzzlePiece.addEventListener("dragend", handleDragEnd);
    puzzleContainer.appendChild(puzzlePiece);
  }

  puzzleContainer.addEventListener("dragover", handleDragOver);
  puzzleContainer.addEventListener("drop", handleDrop);
});
