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
      applyStrikethrough(a, b, c)
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

function applyStrikethrough(a, b, c) {
    if (a === 0 && b === 1 && c === 2) {
        strikethrough.classList.add("horizontal");
        strikethrough.style.top = "50px";
    } else if (a === 3 && b === 4 && c === 5) {
        strikethrough.classList.add("horizontal");
        strikethrough.style.top = "150px";
    } else if (a === 6 && b === 7 && c === 8) {
        strikethrough.classList.add("horizontal");
        strikethrough.style.top = "250px";
    } else if (a === 0 && b === 3 && c === 6) {
        strikethrough.classList.add("vertical");
        strikethrough.style.left = "50px";
    } else if (a === 1 && b === 4 && c === 7) {
        strikethrough.classList.add("vertical");
        strikethrough.style.left = "150px";
    } else if (a === 2 && b === 5 && c === 8) {
        strikethrough.classList.add("vertical");
        strikethrough.style.left = "250px";
    } else if (a === 0 && b === 4 && c === 8) {
        strikethrough.classList.add("diagonal1");
    } else if (a === 2 && b === 4 && c === 6) {
        strikethrough.classList.add("diagonal2");
    }
}

function resetGame() {
  turn = "X";
  gameOver = false;
  turnX.hidden = false;
  turnO.hidden = true;
  result.textContent = "";
  boxes.forEach((box) => (box.textContent = ""));
  strikethrough.className = "strikethrough";
  strikethrough.style = "";
}

boxes.forEach((box) => box.addEventListener("click", handleClick));
document.getElementById("reset").addEventListener("click", resetGame);
