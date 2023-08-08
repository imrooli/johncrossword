// Define the puzzle pieces array
const puzzlePieces = [
    "puzzle_1.png",
    "puzzle_2.png",
    "puzzle_3.png",
	"puzzle_4.png",
    "puzzle_5.png",
    "puzzle_6.png",
	"puzzle_7.png",
    "puzzle_8.png",
    "puzzle_9.png",
	"puzzle_10.png",
    "puzzle_11.png",
    "puzzle_12.png",
	"puzzle_13.png",
    "puzzle_14.png",
    "puzzle_15.png",
	"puzzle_16.png",
    "puzzle_17.png",
    "puzzle_18.png",
	"puzzle_19.png",
    "puzzle_20.png",
    "puzzle_21.png",
	"puzzle_22.png",
    "puzzle_23.png",
    "puzzle_24.png"
];

// Function to load the puzzle pieces onto the page
function loadPuzzlePieces() {
    const puzzleContainer = document.getElementById("puzzleContainer");
    puzzlePieces.forEach((piece, index) => {
        const puzzlePiece = document.createElement("img");
        puzzlePiece.src = "images/puzzle_pieces/" + piece;
        puzzlePiece.className = "puzzle-piece";
        puzzlePiece.style.zIndex = index + 1;
        puzzlePiece.addEventListener("mousedown", dragStart);
        puzzleContainer.appendChild(puzzlePiece);
    });
}

// Function to handle dragging puzzle pieces
function dragStart(event) {
    const puzzlePiece = event.target;
    puzzlePiece.style.zIndex = 999; // Bring the piece to the top during dragging
    puzzlePiece.style.position = "absolute";

    function onMouseMove(e) {
        puzzlePiece.style.left = e.pageX - puzzlePiece.width / 2 + "px";
        puzzlePiece.style.top = e.pageY - puzzlePiece.height / 2 + "px";
    }

    function onMouseUp() {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
}

// Call the loadPuzzlePieces function when the page is loaded
window.addEventListener("load", loadPuzzlePieces);
