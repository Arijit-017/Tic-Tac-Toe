let turn = "X";
let gameOver = false;
const turnX = document.getElementById("turnX");
const turnO = document.getElementById("turnO");
const result = document.getElementById("result");
const boxes = document.querySelectorAll(".box");

function switchTurn() {
  if (turn === "X") {
    turn = "O";
    turnX.hidden = true;
    turnO.hidden = false;
  } else {
    turn = "X";
    turnX.hidden = false;
    turnO.hidden = true;
  }
}
function checkWin() {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const boxValues = Array.from(boxes).map((box) => box.textContent);
  for (const [a, b, c] of wins) {
    if (
      boxValues[a] &&
      boxValues[a] === boxValues[b] &&
      boxValues[a] === boxValues[c]
    ) {
      gameOver = true;
      return boxValues[a];
    }
  }
  return null;
}
function handleClick(event) {
  if (gameOver) return;
  const box = event.target;
  if (box.textContent === "") {
    box.textContent = turn;
    const winner = checkWin();
    if (winner) {
      result.textContent = `${winner} wins!`;
    } else if (Array.from(boxes).every((box) => box.textContent !== "")) {
      result.textContent = "It's a draw!";
      gameOver = true;
    } else {
      switchTurn();
    }
  }
}

function resetGame() {
  turn = "X";
  gameOver = false;
  turnX.hidden = false;
  turnO.hidden = true;
  result.textContent = "";
  boxes.forEach((box) => (box.textContent = ""));
}

boxes.forEach((box) => box.addEventListener("click", handleClick));
document.getElementById("reset").addEventListener("click", resetGame);
