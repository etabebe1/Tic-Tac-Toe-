const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElement = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message"
);
const restart = document.getElementById("restartBtn");

let circleTurn;

startGame();

restart.addEventListener("click", startGame);

//starting the startGame()
function startGame() {
  //looping through each cells onclick for once
  cellElement.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    // cell.removeEventListener("click,  handleClick")
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

//a function that handles every event in the game
function handleClick(event) {
  const cell = event.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  //PlaceMark
  placeMark(cell, currentClass);

  //Check For Win and swap turns
  if (checkWins(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHoverClass();
  }
}

function isDraw() {
  return [...cellElement].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${
      circleTurn ? "O's" : "X's"
    } Wins!!`;
  }
  winningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

//check for all winning combinations if some of the combination are met
function checkWins(currentClass) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElement[index].classList.contains(currentClass);
    });
  });
}
