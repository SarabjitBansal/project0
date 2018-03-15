
const game2 = {

  storeBoard:[[],[],[]],
  storeMove:{
    '00' :['01','10'],
    '20' :['10','21'],
    '02' :['01','12'],
    '22' :['12','21'],
    '01' :['00','02'],
    '10' :['00','20'],
    '12' :['02','22'],
    '21' :['20','22'],
  },
  winnerCheck:"",
  letterPlayed: "",
  xWon:0,
  oWon:0,
  gridSize:3,
  aiPlayer:"X",
  huPlayer:"O",
  playerNo:"",
  clearBoard: function() {

  },

  startGame: function() {
    if ( this.letterPlayed !== "" && typeof(this.letterPlayed)!== "undefined") {
      if (this.letterPlayed === "X") {
        this.letterPlayed="O";
      } else if (this.letterPlayed === "O"){
          this.letterPlayed="X";
        }
      }else {
        this.letterPlayed="X";


     }
     return this.letterPlayed;
  },

  checkWinner: function(arr) {
    var checkResult = false;
    var cntr =0;
    var firstElement = arr[0].innerHTML;
    if (firstElement ==="X"|| firstElement === "O") {
      cntr =0;
      for (var i = 1; i < arr.length; i++) {
        if (arr[i].innerHTML === firstElement) {
          checkResult= true;
          //cntr = cntr +1;
          this.winnerCheck = firstElement;
        } else {
          checkResult =false;
          return checkResult;
        }
      }
    }
    return checkResult;
  }

};
