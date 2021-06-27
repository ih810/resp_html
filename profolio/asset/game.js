var origBoard;
//set a varible for later use
const huPlayer = "O";
//set the human player to a value, it can be anything
const aiPlayer = "X";
//set the ai to a value, it can be anything
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//set the wincombo for later to determine win
const cells = $(".field");
//for easier reg

startGame();
//call the function

// $(".newGame").on("click", 
function startGame() {
    origBoard = Array.from(Array(9).keys())
    //generate a array of 9 element
    for (var i=0; i < cells.length; i++){
    //loop through the td/boxes
        cells[i].innerText ='';
        //when game start, change the innerText of the box to nothing for new game
        cells[i].addEventListener('click', turnClick, false)
        //when ever the box is click, change the turnClick to false so it cant be clicked
    }
}

async function turnClick(square) {
    //this function fires off whenever a box is clicked
    if(typeof origBoard[square.target.id] == 'number'){
    //check if the box is available for clicking
    console.log(square.target.id)
    turn(square.target.id, huPlayer)
    //call the turn function so the box will be marked as selected by human player(O)
    if(!checkTie())turn( await bestSpot(), aiPlayer);
    //if the game is not tied, the ai will choose a random number(bestSpot()) to select
}
}

function turn(squareId, player){
    //this function takes two parameter, one is the sq id, the other is which player
    origBoard[squareId] = player;
    //set the sq id as marked by the current player
    // console.log(`turn`, $(this))
    console.log($(`#${squareId}`)[0])
    $(`#${squareId}`)[0].innerText = player;
    //change the innerText to current player
    let gameWon = checkWin(origBoard, player)
    //everytime a turn is passed, check if the game is won
    if (gameWon) gameOver(gameWon)
    //if the game is won, change the color of the key square's color
}

function checkWin(board, player) {
    //this function takes two parameter, one is the board and the current player(O/X?)
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
        //the smartest fucing way to push the selected box into an arry
        //a = array, accmulated array??
        //e = the current value
        //i = the index of the board 
        //when e === O/X concat i into a, it works like that????
	let gameWon = null;
        //default gameWon to null
	for (let [index, win] of winCombos.entries()) {
        //index is the index of the winCombo's array index
        //win is the array
        //so e.g. index[0] win[0,1,2]
		if (win.every(elem => plays.indexOf(elem) > -1)) {
        //win.every(elem..) will take every element out of the array and check them
        //so every elements u got from win, check if it exist in plays, the array set above
			gameWon = {index: index, player: player};
            //gameWon will get which combination the player win with
			break;
		}
	}
	return gameWon;
    //if no one wins, gameWon = null, if game is won, gameWon will run the game over
}

function gameOver(gameWon) {
    //this function is fired when the gameWon is not null
	for (let index of winCombos[gameWon.index]) {
        //loop through the index we got from checkWin function
		document.getElementById(index).style.backgroundColor =
        //select the corresponding index's box
			gameWon.player == huPlayer ? "blue" : "red";
        //change the color of the box
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
        //when the game ends, prevent anyone from clicking the boxes
	}
}

function declareWinner(who) {
    //declare who is the winner
	if (who != "Tie Game!") {
        alert (`${who} won!`)
    } else {
        alert (`${who}`)
    }
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
    //check if the box is available
    //if the type of !== number, it is "X" or "O"
}

function bestSpot() {
	//return emptySquares()[0];
    let newArr = emptySquares()
    //get the available square
    let ranNum = Math.floor(Math.random() * Math.floor(9));
    //set ranNum to random number
    if (newArr.indexOf(ranNum) != -1){
        //if the ranNum is in the available array, return the number
        console.log("sucssse", ranNum)
        return ranNum
    } else {
        console.log(`new`, newArr)
        console.log(`ran`, ranNum)
        ranNumm = Math.floor(Math.random() * Math.floor(9));
        console.log('try again')
        //if the ranNum is not in the available array, run the function again
         return bestSpot();
    }
//  for (ranNum= Math.floor(Math.random() * Math.floor(9)); newArr.indexOf(ranNum) > -1; ranNum++){
//         console.log(`new`, newArr)
//         console.log(`ran`, ranNum) 
//     return ranNum
//  }
}

function checkTie() {
    //check if the game is a tie, this function is fired everytime the ai makes a move
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
            //if there is no empty spot left
			cells[i].style.backgroundColor = "green";
            //change all color to green
			// cells[i].removeEventListener('click', turnClick, false);
            //block allbspot
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}
