const x_player = 'x'
const o_player = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn
var winX
var winCircle
var All_games
var countx
var countcircle
var countGames
var Games

var stevec = 0;

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  //circleTurn = false
  swapTurns();
  cellElements.forEach(cell => {
    cell.classList.remove(x_player)
    cell.classList.remove(o_player)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? o_player : x_player
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    All_games();
    winningMessageTextElement.innerText = 'Draw!';
    playDraw();
  } else {
    All_games();
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    circleTurn ? Circle_wins() : X_wins();
    playY();
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(x_player) || cell.classList.contains(o_player)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
  console.log(cellElements);
  play();
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(x_player)
  board.classList.remove(o_player)
  if (circleTurn) {
    board.classList.add(o_player)
  } else {
    board.classList.add(x_player)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function X_wins(){
  var winX = document.getElementById('xcount')
  var countx = parseInt(winX.innerHTML);
  countx++;
  winX.innerHTML = countx.toString();
}

function Circle_wins(){
  var winCircle = document.getElementById('ycount')
  var countcircle = parseInt(winCircle.innerHTML);
  countcircle++;
  winCircle.innerHTML = countcircle.toString();

}

function All_games(){
  Games = document.getElementById('allGamess')
  countGames = parseInt(Games.innerHTML);
  countGames++;
  Games.innerHTML = countGames.toString();
}

function play() {
	var audio = document.getElementById("click");
	audio.play();
  }

function playY() {
  var audio = document.getElementById("win");
  audio.play();
 }
 
 function playDraw() {
  var audio = document.getElementById("draw");
  audio.play();
  }