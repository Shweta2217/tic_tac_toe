
var turnAudio = new Audio("Music/turn.mp3");
var gameOver = new Audio("Music/GameOver.mp3");
var turn = "X";
var GameOver = false;
var turnText=document.querySelector(".turnText");
let val;
//-------------------------------Name Input On LOad--------------------------

// Entering Name of Player
function Names() {
  document.querySelector(".playerNames").style.display = "block";
}

//Adding EventListner To Start Buttton
var startBtn = document.querySelector(".startBtn");
inputBox = document.querySelectorAll(".nameInput");
startBtn.addEventListener("click", function () {
  if (inputBox[0].value == "" || inputBox[1].value == "") {
    document.querySelector(".warrning").style.visibility = "visible";
  } else {
    document.querySelector(".playerNames").style.display = "none";
    document.querySelector(".warrning").style.visibility = "hidden";
  }
});

//Hiding Warrning On Oninput
function hideWarrning() {
  if (document.querySelector(".warrning").style.visibility == "visible") {
    document.querySelector(".warrning").style.visibility = "hidden";
  }
}

// -------------------------------MAin Game Logic-------------------------------


//function to change the turn
function changeTurn() {
  if (turn == "X") {
    return (turn = "O");
  } else {
    return (turn = "X");
  }
}


//Checking For the Winner
var Items = document.querySelectorAll(".item");
function checkWinner() { 
 val = 0;
  var wins = [
    [0, 1, 2],
    [0, 3, 6],
    [6, 7, 8],
    [2, 5, 8],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
    [3, 4, 5],
  ];
  wins.forEach((element) => {
    if (
      Items[element[0]].innerText == Items[element[1]].innerText &&
      Items[element[1]].innerText == Items[element[2]].innerText &&
      Items[element[0]].innerText != ""
    ) {
      document.querySelector(".winningDiv").style.display = "flex";
      if (turn == "X") {
        document.querySelector(".winnerName").innerText =
          inputBox[1].value + " Won";
      } else
        document.querySelector(".winnerName").innerText =
          inputBox[0].value + " Won";
      gameOver.play();
      val++;
      console.log(val);
    }
  });
 
}
//checking For Tie

function checkTie(){
  let count=0;
for(let i=0; i<Items.length;i++){
  if (Items[i].innerText!="") {
    count+=1;
  }  
}
if (count==9) {
  document.querySelector(".tie").style.display = "flex";  
  gameOver.play();
  
}
}
var TiePlayAgain = document.querySelector(".TiePlayAgain");
TiePlayAgain.addEventListener("click", function () {
  for (var i = 0; i < Items.length; i++){
    Items[i].innerText="";
  }
  document.querySelector(".tie").style.display = "none";  
});

//Adding EventListner To All Items[boxes]
var Items = document.querySelectorAll(".item");
console.log(Items);
for (var i = 0; i < Items.length; i++) {
  document.querySelectorAll(".item")[i].addEventListener("click", function () {
    if (this.innerText == "") {
      this.innerText = turn;
      if(turn == "X"){
        turnText.innerText=`${inputBox[1].value}'s  turn`;
      }
      else{
      turnText.innerText=`${inputBox[0].value}'s  turn`;
      }
      turn = changeTurn();
      turnAudio.play();     
      checkWinner();
      if(val!=1)
      checkTie();
    }
  });
}


// ------------------------------After Winning------------------------

//Adding EventListner to Play Again Button
var playAgain = document.querySelector(".playagainBtn");
playAgain.addEventListener("click", function () {
  for (var i = 0; i < Items.length; i++){
    Items[i].innerText="";
  }
  document.querySelector(".winningDiv").style.display = "none";
});
