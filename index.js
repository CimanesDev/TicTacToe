const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const timerDisplay = document.getElementById("timer");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;
let scoreX = 0;
let scoreO = 0;
let scoreDraws = 0;
let timeLeft = 10;
let timer;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`
    stopTimer();
    startTimer();
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions. length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            
            if (roundWon) {
                condition.forEach(index => {
                    document.querySelector(`[cellIndex="${index}"]`).classList.add("highlight");
                });
            }
            
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = 'Draw!';
        running = false;
    }
    else{
        changePlayer();
    }

    if (roundWon) {
        if (currentPlayer === "X") {
            scoreX++;
            document.querySelector("#scoreX").textContent = scoreX;
        } else {
            scoreO++;
            document.querySelector("#scoreO").textContent = scoreO;
        }
    } else if (!options.includes("")) {
        scoreDraws++;
        document.querySelector("#scoreDraws").textContent = scoreDraws;
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";``
        cell.classList.remove("highlight");
    });    
    stopTimer();
    startTimer();
    running = true;
}

function startTimer() {
    timeLeft = 10;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            changePlayer();
        } else {
            timeLeft--;
            timerDisplay.textContent = `Time left: ${timeLeft}s`;
        }
    }, 1000);
}
function stopTimer(){
    clearInterval(timer);
}

// --------------toggle dark mode---------------

const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;
const gameContainer = document.getElementById('gameContainer');
const scoreBoard = document.getElementById('scoreBoard');

// Event listener for the theme toggle button
themeToggleBtn.addEventListener('click', () => {
    // Toggle dark theme class on body and other elements
    body.classList.toggle('dark-theme');
    gameContainer.classList.toggle('dark-theme');
    cells.forEach(cell => cell.classList.toggle('dark-theme'));
    scoreBoard.classList.toggle('dark-theme');
    timer.classList.toggle('dark-theme');
    restartBtn.classList.toggle('dark-theme');
    
    // Toggle button text based on theme
    if (body.classList.contains('dark-theme')) {
        themeToggleBtn.textContent = 'Switch to Light Mode';
    } else {
        themeToggleBtn.textContent = 'Switch to Dark Mode';
    }
});
