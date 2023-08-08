function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");

  // Make sure the dropped item is an image
  if (event.target.tagName === "IMG") {
    const draggedPiece = document.getElementById(data);
    const container = event.target.parentNode;
    container.insertBefore(draggedPiece, event.target);
  }
}
