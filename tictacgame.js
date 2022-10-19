var origBoard;
var tabelaO = []
const huPlayer = 'circle'
const computer = 'x'
const hover = '.cell:hover'
const winCombos = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7]
]
const cells = document.querySelectorAll('.cell');/*vsebina oz celica od številke*/
let checker = (arr, target) => target.every(v => arr.includes(v));
restartButton.addEventListener('click', startGame)
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const board = document.getElementById('board')

startGame();

function startGame() {
	console.log("start game")
  origBoard = [1,2,3,4,5,6,7,8,9]
  winningMessageElement.classList.remove('show')
  for (var i = 0; i < cells.length; i++) {
	cells[i].addEventListener('click', turnClick, { once: true });/*k enkrt klikneš nemoreš več spreminjat*/
	cells[i].classList.remove(huPlayer)
	cells[i].classList.remove(computer)
	cells[i].innerText = '';
  }
  tabelaO=[]
  console.log("tabela O " + tabelaO);
  preveri()
}

function turnClick(square) {
	turn(square.target.id, huPlayer)
	if (checkWinO() === true){
		endGameO()
		console.log("O je zmagu")}
	else if (tabelaO.length === 5){
		endGameTie()
		console.log("Noben ni zmagu")
	}else
	serverPlay()

}

function turn(squareId) {
	document.getElementById(squareId).classList.add(huPlayer)
	document.getElementById(squareId).innerHTML=" "
	tabelaO.push(Number(squareId))
	play()
}

function checkWinO() {
	for (var n=0; n<8; n++){
		if (checker(tabelaO,winCombos[n]) === true){
			return true;
		}
	}
}

function play() {
	var audio = document.getElementById("click");
	audio.play();
  }