const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
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
  var Xwinnumber = 0;
  var Owinnnumber = 0;

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restart-button');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
var Xwins = document.getElementById('x-wincounter');
var Owins = document.getElementById('o-wincounter');
let circleTurn

const sfx = {
    placeO: new Howl({
        src: ['./effects/lololol 17-O.wav']
    }),
    placeX: new Howl({
        src: ['./effects/lololol 18-X.wav']
    }),
    ippipi: new Howl({
        src: ['./effects/ippipi.mp3'],
        loop: true
    })
}

sfx.ippipi.play();
startGame();

restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once : true});
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}


function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        swapTurns();
        setBoardHoverClass();
    }
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
               cell.classList.contains(CIRCLE_CLASS);
    });
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw';
    }else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
          if(circleTurn == true){
              Owinnnumber++;
              Owins.innerHTML = "o's wins: " + Owinnnumber;
          } else{
              Xwinnumber++;
              Xwins.innerHTML = "x's wins: " + Xwinnumber;
          }
    }
    winningMessageElement.classList.add('show');
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
    if (circleTurn){
        sfx.placeO.play();
    }else{
        sfx.placeX.play();
    }
}

function swapTurns(){
    circleTurn = !circleTurn;
    console.log("swapped");
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else{
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    });
}
