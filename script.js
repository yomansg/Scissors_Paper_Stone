// Initialise some global variables to keep track of...
var games = 0;    // number of games played
var wins = 0;     // number of games won
var gameStage = 0;  // which stage of the game
var playerName = '';  // player name
var gameMode = '';   // whether rules are normal or reversed


var main = function (input) {
  // Initial stage of the game is for player to input a name 
  if (gameStage == 0) {
    myOutputValue = getPlayerName(input);
    return myOutputValue;
  }

  // This stage is to get user input whether rules are normal or reversed
  if (gameStage == 1) {
    myOutputValue = getGameMode(input);
    return myOutputValue;
  }


  // Perform input validation for what the user input
  if (input != "scissors" && input != "paper" && input != "stone") {
    return 'Please input only "scissors", "paper", or "stone"';
  }
  
  // Generate a random hand from program
  var randomHand = generateHand();
  // convert the hands (from program and player input) into symbols
  var randomSymbol = showSymbol(randomHand);
  var inputSymbol = showSymbol(input);
  
  var myOutputValue = 
  `The computer chose ${randomHand} ${randomSymbol}. <br>
  You chose ${input} ${inputSymbol}. <br>`;
  
  // Default output value is 'DRAW'.
  var outcome = 'DRAW';

  // Depend on what is the user input, there are two possibilities in each case
  // if none of the possibilities, then default outcome is DRAW
  switch(input) {
    case "scissors":
      if (gameMode != 'reverse') {  // normal rules
        if (randomHand == "paper") {outcome = 'You win!'; wins = wins + 1; }
        if (randomHand == "stone") {outcome = 'You lose! Bummer.'}
      } else {  // reverse rules
        if (randomHand == "paper") {outcome = 'You lose! Bummer.'}
        if (randomHand == "stone") {outcome = 'You win!'; wins = wins + 1; }
      }
      break;

    case "paper":
      if (gameMode != 'reverse') {  // normal rules
        if (randomHand == "scissors") {outcome = 'You lose! Bummer.'}
        if (randomHand == "stone") {outcome = 'You win!'; wins = wins + 1; }
      } else { // reverse rules
        if (randomHand == "scissors") {outcome = 'You win!'; wins = wins + 1; }
        if (randomHand == "stone") {outcome = 'You lose! Bummer.'}
      }
      break;    

    case "stone":
      if (gameMode != 'reverse') { // normal rules
        if (randomHand == "scissors") {outcome = 'You win!'; wins = wins + 1; }
        if (randomHand == "paper") {outcome = 'You lose! Bummer.'}
      } else { // reverse rules
        if (randomHand == "scissors") {outcome = 'You lose! Bummer.'}
        if (randomHand == "paper") {outcome = 'You win!'; wins = wins + 1;}
      }
      break;
  }
  // Increment number of games played ONLY IF user input is different from the Hand generated
  if (input != randomHand) {games = games + 1; } 
  

  // Format a meaningful output message to be returned.
  var comment = '';
  var perfMsg = `So far ${playerName}, you have been winning ${wins}/${games} turns. `;
  if (wins/ games >= 0.6) {
    comment = 'Pretty good!'
  } else {
    comment = 'Buck up!'
  }

  return myOutputValue + '<br>' + outcome + '<br><br>' + perfMsg + comment;
};


var showSymbol = function(inputHand) {
  if (inputHand == "scissors") {return "✂️"}
  if (inputHand == "paper") {return "🗒"}
  if (inputHand == "stone") {return "OO"}
}

var generateHand = function () {
  // declare an array to store the possible outputs
  const hand = ["scissors", "paper", "stone"]

  // Generate a decimal from 0 through 3, inclusive of 0 and exclusive of 3.
  var randomDecimal = Math.random() * 3;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 2 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  return hand[randomInteger];
};

var getPlayerName = function(input) {
  if (input != '') {
    playerName = input;
    gameStage = gameStage + 1;
    return `OK ${playerName}, now you can choose 'normal' or 'reverse' to decide the game mode.`
  } else {
    return 'Please input your name: '
  }
}

var getGameMode = function(input) {
  if (input != 'normal' && input != 'reverse') {
    return 'Please input only "normal" or "reverse" for the game mode.';
  } else {
    gameMode = input;
    gameStage = gameStage + 1;
    return `OK ${playerName}, now you can start playing...`
  }
}
