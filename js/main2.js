//TODO
// 1.Accept user name
// 2.Give the option to user either choose X or O
// 3.Artifical Intelligence
// 4.Work on CSS

let result;
// func to clear board
const clearboard = function() {
  $('.boxes').addClass('clearBoard');
  $('.boxes').html("");
  game2.letterPlayed = "";
  game2.winnerCheck ="";
  nextLetter = "";
   $('h2').html("");

   $('#gridSize').val("");
   $('#tbl').empty();

  game2.letterPlayed ="";
  nextLetter="";
  $('playAgain').addClass("displayNone");
  $('#tbl').addClass("displayNone");
  $('#size').addClass("displayNone");
  $('#disp').addClass("displayNone");
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
       game2.storeBoard[i][j] = "";
    }
  }

}

// to create Board N * N
// In case of Player1 -3X3 -
// In case of Player2 - user enters size
const createBoard = function(boardSize) {

  if (boardSize !== "" && typeof(boardSize) !== 'undefined') {
    for (let i = 0; i < boardSize; i++) {
      var row = $('<tr />').appendTo('#tbl');
      for (let j = 0; j < boardSize; j++) {

        let tabId = `B${i}${j}`;
        var cell = $('<td />').attr({id:tabId, class : 'boxes'}).appendTo(row);
        cell.addClass('row'+i);
        cell.addClass('col'+j);
        if (i === j){
          cell.addClass("diag0");
        } else if ((i+j) === (boardSize-1)){
            cell.addClass("diag1");
          }

          // clear borders - assigned classes
          if (i=== 0){cell.addClass('nobordersT')}
          if (j=== 0){cell.addClass('nobordersL')}
          if (i === boardSize-1){cell.addClass('nobordersB')}
          if (j === boardSize-1){cell.addClass('nobordersR')}

        //
      }
    }
    $('#tbl').removeClass('animated rubberBand');
    $('#tbl').show();
    $('#disp').removeClass('displayNone');
    $('#tbl').addClass('animated rubberBand');
  }

  // $('#tbl').trigger('click');
  if (game2.playerNo === "1p") {
    aifunc();
  }
}
// function ends

  const aifunc = function () {
    if ( $('#B11').html() === "" )
    {
      $('#B11').html(game2.aiPlayer);
      //$('#B11').html("<img src ='images/x_3.png' />");

      game2.storeBoard[1][1] = game2.aiPlayer;
      game2.letterPlayed =game2.aiPlayer;
      this.letterPlayed = "X";
      nextLetter = "O";
      $('h2').html(`${nextLetter} turn`);
    }

  }
// Page Load

$('#gridSize').on('change',function() {
  if (game2.playerNo === "2p")  {
  //console.log("inside");
  $('#tbl').empty();
  createBoard($('#gridSize').val());
  $('h2').html(`X turn`);
  // $('#tbl').trigger('click');
  }
});

$(document).ready(function() {
  result = false;
  let nextLetter ="";
  game2.xWon=0;
  game2.oWon=0;
  $('#disp').html(`Score - X: ${game2.xWon}    |    O: ${game2.oWon}`);

  // on click of table
  // we are considering target as the table is created in run time
  // getting X or O on board
  $('#tbl').on('click', function(event) {
    var $element = event.target;
    $('#playAgain').removeClass('displayNone');
    if (!result)
    {
      if ($element.innerHTML !== "X" && $element.innerHTML !== "O")
      {

        var letter = game2.startGame();
        //console.log(letter);
        //  gettin letter from func startgame.
        //(($element.id) !== 'tbl') - as we are considering the tbl - it updates the table
          if ($element.id !== 'tbl' && typeof($element.id)!== "undefined")
          {
            var newId = $element.id.replace('B','');
            var k = newId[0];
            var t = newId[1];
            $('#B'+k+t).removeClass('animated bounce');
            $('#B'+k+t).addClass('animated bounce');
            if (letter === "X") { nextLetter = "O"; }
            else if (letter === "O") { nextLetter = "X"; }
            $('h2').html(`${nextLetter} turn`);
            if (game2.playerNo === "1p")
            {

              game2.storeBoard[k][t]= letter;
              //console.log("First Index"+ k + "Sec Index"+ t);

              if (letter === "O")
                {
                  $element.innerHTML = letter;
                  //$element.innerHTML ="<img src ='images/o_3.png' />";
                  setTimeout(function() {
                  placeX($element.id.replace("B",""));
                  winner(game2.gridSize, letter);

                  }, 400);
                  // placeX($element.id.replace("B",""));
                }

            }
            else if(game2.playerNo === "2p")
            {
              $element.innerHTML = letter;
              var size = ($('#gridSize').val());
              winner(size, letter);
            }
        }
      }
    }
  });
// func ends

var placeX = function(pos) {
  var chkres = false;
  if (chkres!== true) {
    for (var key in game2.storeMove) {
      if (key === pos) {
        let k = (game2.storeMove[key]);
        for (var i = 0; i < k.length; i++) {
          var kVal = k[i];
          let m = kVal[0];
          let n = kVal[1];
          //console.log(m+n);
          if (game2.storeMove[kVal] !== "") {
            //console.log(game2.storeBoard[m][n]);
            // debugger;
            if (game2.storeBoard[m][n]!== "X" && game2.storeBoard[m][n]!== "O") {

              $('#B'+kVal).html("X");
              //$('#B'+kVal).html("<img src ='images/x_3.png' />");
              game2.storeBoard[m][n] = "X";
              game2.letterPlayed="X";
              nextLetter = "O";
              $('h2').html(`${nextLetter} turn`);
              chkres = true;

              break;

            }

          }
        }


      }
    }

    if (!chkres) {

      var randomNo = randomno();
      if (typeof(randomNo)!== "undefined") {
        // console.log(randomNo);
        m = randomNo[0];
        n = randomNo[1];
        $('#B'+randomNo).html(game2.aiPlayer);
        //$('#B'+randomNo).html("<img src ='images/x_3.png' />");
        game2.storeBoard[m][n] = game2.aiPlayer;
        game2.letterPlayed=game2.aiPlayer;
        nextLetter = "O";
        $('h2').html(`${nextLetter} turn`);
        chkres = true;
      }

    }

  }

}
  // play agin - to reset the screen
  $('#playAgain').on('click',function() {
    clearboard();
     result = false;
     $('#playAgain').addClass('displayNone');
  });
  // func ends
  $('#player1').on('click',function() {
    //debugger;

    $('#player1').removeClass("animated rubberBand");
    $('#player1').addClass("animated rubberBand");



    game2.playerNo = "1p";
    $('#size').hide();
    $('#tbl').empty();
    createBoard(game2.gridSize);
  });


  $('#player2').on('click',function() {

    $('#player2').addClass("animated rubberBand");
    game2.playerNo = "2p";
    $('#size').show();
    $('#tbl').empty();
    $('#tbl').hide();
    $('h2').html("");
    $('#gridSize').val("");

  });
  // function to check winner
  const winner = function (gridSize, curBoxID) {
     result = false;

     if ($('#tbl tr').length > 0)
     { //debugger;
       game2.cntr=0;
       for (let i = 0; i < gridSize; i++)
       {
          if (game2.checkWinner($('.row'+i)) === true||game2.checkWinner($('.col'+i)) === true ||game2.checkWinner($('.diag0')) === true|| game2.checkWinner($('.diag1')) === true)
          { result = true; }



        }
        //debugger;
          if (result === true) {
            $('#playAgain').removeClass('dispNone');
            //console.log(game2.winnerCheck);
            if (game2.playerNo === "1p") {
              if (game2.winnerCheck === 'X')  {
                game2.xWon+=1;
                $('h2').html('You Lose!!');
              } else if (game2.winnerCheck === 'O')  {
                game2.oWon+=1;
                $('h2').html('You Won');
              }

              $('#disp').html(`Score - X: ${game2.xWon}    |    O: ${game2.oWon}`);
            } else if (game2.playerNo === "2p"){

              if (game2.winnerCheck === 'X')  {
                game2.xWon+=1;
              } else if (game2.winnerCheck === 'O')  {
                game2.oWon+=1;
              }
              $('h2').html(`${game2.winnerCheck} Won!!`);
              $('#disp').html(`Score - X: ${game2.xWon}    |    O: ${game2.oWon}`);

            }
            else {
              // if (game2.cntr === gridSize*gridSize){
              //     $('h2').html(`XO Draw`);
              // }
            }

          }

      }
    }
});

 var randomno = function() {
  var k;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (game2.storeBoard[i][j]!== "X" && game2.storeBoard[i][j]!== "O")
        {  k = i.toString()+j.toString();
          return(k);
        }
      }
    }
 }
