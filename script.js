const squares = document.querySelectorAll('.board-row div');
const boardWrap = document.querySelector('.board-wrap');
const announcement = document.querySelector('h2');
const announcementNumber = document.querySelector('h2 span');
const playAgainButton = document.querySelector('.play-again');

//Sort of a state/switch to see who's turn is it
let player1 = 1;

//Storing all possible winning combinations
const winningResults1 = ["1", "2", "3"];
const winningResults2 = ["1", "4", "7"];
const winningResults3 = ["1", "5", "9"]; 
//const winningResults4 = ["1", "5", "8"];
const winningResults5 = ["3", "5", "7"];
const winningResults6 = ["3", "6", "9"];
const winningResults7 = ["4", "5", "6"];
const winningResults8 = ["7", "8", "9"];
const winningResults9 = ["2", "5", "8"];

//All winning combinations in a single multidimensional Array, for eay looping
const multidimensional = [ winningResults1, winningResults2, winningResults3, winningResults5, winningResults6, winningResults7, winningResults8, winningResults9 ];

//An Array where each player stores the squares they chose
let player1Arr = [];
let player2Arr = [];


//If the play Again button is visible, hide it on click
document.querySelector('.play-again').addEventListener('click', function(){
  this.classList.toggle('active');
  playAgain();
})


/* Everytime a player adds a square to their Array, this functions is fired, 
to see if they have a winning combination inside of their Array */
const checkForWinner = ( playerArr ) => {
  //Multidimensional contains all of the winning combinations Arrays
  //Loop through each Array, check for matching items
  multidimensional.forEach( arr => { 
    //If any of the player Arrays includes the Player Arr...
    if( arr.every( e => playerArr.includes(e) ) ){
        //We fir the player won function
        playerWon();
    } else {
        return
    }
  });
  //Todo
  tiedGame();
};

//Check for a tie
const tiedGame = () =>{
  let tiedCount = 0;
  squares.forEach( square =>{
    if( square.textContent.includes('○') || square.textContent.includes('×') ){
      tiedCount++
    } else {
      return;
    };
    if( tiedCount == 9){
      announcement.textContent = "It's a tie";
      playAgainButton.classList.toggle('active');
    }
  })
}

//Fire this function when a player wins
const playerWon = () => { 
  player1 === 1 ? document.querySelector('h2').textContent = "Player 1 wins!" : document.querySelector('h2').textContent = "Player 2 wins!";
  //Reveal the button to play again
  playAgainButton.classList.toggle('active');
}


//Reset the Game
const playAgain = () =>{
  document.querySelector('h2').innerHTML = `It's player's <span class="player-turn">1</span> turn`
  squares.forEach( square => square.innerHTML = '');
  player1Arr = [];
  player2Arr = [];
  player1 = 1;
}


boardWrap.addEventListener('click', function(e){
  
  if(player1 === 1){
    document.querySelector('h2 span').textContent = "2";
    //If there is something on the clicked square, return, the square is occupied/taken
    if( e.target.innerHTML ){
      return;
    } else {
      //Mark the square
      e.target.innerHTML = '&times;';
      //Push the class name (a number) of that square to the player Array
      player1Arr.push( e.target.dataset["number"] );
      //Finally, fire the checkForWinner function to see if the player has a winning combination of squares
      checkForWinner( player1Arr );
      //Change the player number from 1 to 0 so players change turns
      player1 = 0;
    }
  } else if (player1 === 0){
    document.querySelector('h2 span').textContent = "1";
    if( e.target.innerHTML){
        return;
    } else {
        e.target.innerHTML = '&#9675;';
        player2Arr.push(  e.target.dataset["number"] );
        checkForWinner( player2Arr );
        player1 = 1;
    }
  }
});