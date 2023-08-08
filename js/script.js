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

// Function to load the puzzle pieces onto the page in random order
function loadPuzzlePieces() {
    const puzzleContainer = document.getElementById("puzzleContainer");

    // Randomize the order of the puzzle pieces array
    shuffleArray(puzzlePieces);

    puzzlePieces.forEach((piece, index) => {
        const puzzlePiece = document.createElement("img");
        puzzlePiece.src = "images/puzzle_pieces/" + piece;
        puzzlePiece.className = "puzzle-piece";
        puzzlePiece.style.zIndex = index + 1;
        puzzlePiece.addEventListener("mousedown", dragStart);
        puzzleContainer.appendChild(puzzlePiece);
    });
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to handle dragging puzzle pieces
function dragStart(event) {
    const puzzlePiece = event.target;
    puzzlePiece.style.zIndex = 999; // Bring the piece to the top during dragging
    puzzlePiece.style.position = "absolute";

    const puzzleContainer = document.getElementById("puzzleContainer");
    const containerRect = puzzleContainer.getBoundingClientRect();

    const offsetLeft = event.clientX - containerRect.left - puzzlePiece.width / 2;
    const offsetTop = event.clientY - containerRect.top - puzzlePiece.height / 2;

    function onMouseMove(e) {
        let left = e.clientX - containerRect.left - offsetLeft;
        let top = e.clientY - containerRect.top - offsetTop;

        // Ensure the puzzle piece remains within the puzzle container
        left = Math.max(0, Math.min(left, puzzleContainer.clientWidth - puzzlePiece.width));
        top = Math.max(0, Math.min(top, puzzleContainer.clientHeight - puzzlePiece.height));

        puzzlePiece.style.left = left + "px";
        puzzlePiece.style.top = top + "px";
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
