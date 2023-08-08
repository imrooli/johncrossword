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
        const puzzlePiece = createPuzzlePiece(piece, index);
        puzzleContainer.appendChild(puzzlePiece);
    });
}

// Function to create a puzzle piece element
function createPuzzlePiece(piece, index) {
    const puzzlePiece = document.createElement("div");
    puzzlePiece.classList.add("puzzle-piece");

    // Create an image element for the puzzle piece
    const img = new Image();
    img.src = `images/puzzle_pieces/${piece}`;
    img.onload = function() {
        // Calculate the aspect ratio
        const aspectRatio = img.width / img.height;

        // Set the puzzle piece's width and height based on the aspect ratio
        const maxWidth = 100; // Adjust the maximum width as needed
        const maxHeight = 100; // Adjust the maximum height as needed
        const width = Math.min(maxWidth, img.width);
        const height = width / aspectRatio;
        
        // Set the puzzle piece's dimensions
        puzzlePiece.style.width = width + "px";
        puzzlePiece.style.height = height + "px";

        // Set the background image with correct size
        puzzlePiece.style.backgroundImage = `url('${img.src}')`;
        puzzlePiece.style.backgroundSize = `${width}px ${height}px`;

        puzzlePiece.style.zIndex = index + 1;
        puzzlePiece.setAttribute("draggable", "true");
        puzzlePiece.addEventListener("dragstart", dragStart);
        puzzlePiece.addEventListener("dragover", dragOver);
        puzzlePiece.addEventListener("drop", drop);
    };

    return puzzlePiece;
}
// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to handle dragging puzzle pieces
let isDragging = false;
let puzzlePiece;

function dragStart(event) {
    isDragging = true;
    puzzlePiece = event.target;
    puzzlePiece.style.zIndex = 999; // Bring the piece to the top during dragging
    puzzlePiece.style.cursor = "grabbing";
}

function dragMove(event) {
    if (isDragging) {
        const puzzleContainer = document.getElementById("puzzleContainer");
        const containerRect = puzzleContainer.getBoundingClientRect();

        const offsetX = event.clientX - containerRect.left - puzzlePiece.offsetWidth / 2;
        const offsetY = event.clientY - containerRect.top - puzzlePiece.offsetHeight / 2;

        let left = offsetX;
        let top = offsetY;

        // Ensure the puzzle piece remains within the puzzle container
        left = Math.max(0, Math.min(left, puzzleContainer.clientWidth - puzzlePiece.offsetWidth));
        top = Math.max(0, Math.min(top, puzzleContainer.clientHeight - puzzlePiece.offsetHeight));

        puzzlePiece.style.left = left + "px";
        puzzlePiece.style.top = top + "px";
    }
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
}

// Call the loadPuzzlePieces function when the page is loaded
window.addEventListener("load", loadPuzzlePieces);
