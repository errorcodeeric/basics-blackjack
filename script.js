// Declarations

// Deck Building
const suits = ["♠", "♦", "♣", "♥"];
const values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
// var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// var values = ["A"];
// var values = [1,1,1,1,1,1,1,1,1,1]


// Player and Dealer Hand Arrays
var playerHand = []; 
var dealerHand = [];

// Hand display arrays
var pHand = []
var dHand = []
var hand = []


// Various other declarations
var playerhandsize = playerHand.length
var dealerhandsize = dealerHand.length

let playerScore = 0;
let dealerScore = 0;
let result = "null";

var playerStay ="Yes"
var dealerStay ="No"

// Set Game Phase to determine what buttons are displayed
var gamephase = "start"

// Make Deck
function makeDeck()
{
	let deck = new Array();

	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			let card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	}

	return deck;
}
// Shuffle Deck
function shuffleDeck(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Display deck in popup window
function checkDeck(){ alert(JSON.stringify(deck)) }

// Format object to display nicely
function handToString(hand, cards){


  var cardDisplay = [cards]
  
    for(i=0;i<=cards;i++){
      cardDisplay[i]=scrubCard(JSON.stringify(hand[i].Value) + JSON.stringify(hand[i].Suit))
      
    };

    // console.log(cardDisplay)

  return cardDisplay
}

// Remove double quotes in card strings
function scrubCard(card){
  card = card.replaceAll('"', '')
  return card
}

// Initial setup
function setup(){

  // Create and shuffle deck
  initDeck = makeDeck();
  deck = shuffleDeck(initDeck);

  // Setup Play/Reset button
  document.querySelector("#playorreset").innerHTML = '<button id="playbutton" type="button" onClick="deal()">Play or Reset</button> <BR>';
} 

// Draw gameplay buttons after first deal
function drawButtons(){

  document.querySelector("#gamebuttons").innerHTML = '<button id="hit" type="button" onClick="hit()">Hit</button> <button id="Stay" type="button" onClick="stay()">Stay</button>';

}

function hit(){

  // Draw one more card
  playerHand.push(deck.pop())

  // Upkeep
  updatePlayarea()
  checkWinner()

}

function stay(){

    if (dealerHand.length == 5) dealerStay = "Yes";
  // Draw one more card if between 16 and 19
    if(dealerHand.length != 4 || dealerStay == "No"){
      if (dealerScore <= 17) { console.log(dealerHand.length); dealerHand.push(deck.pop());stay();}
      if (dealerScore > 17) { checkWinner(); dealerStay = "Yes";}

    }

  // Upkeep
  updatePlayarea()
  checkWinner()

} 

function checkWinner(){

  for(const i in playerHand){

    if(!isNaN(playerHand[i].Value)) playerScore += playerHand[i].Value;
    if(isNaN(playerHand[i].Value) && playerHand[i].Value != "A") playerScore += 10;
    if(playerHand[i].Value == "A" && playerHand.length == 2) playerScore += 11;

  }

  for(const i in dealerHand){
    if(!isNaN(dealerHand[i].Value)) dealerScore += dealerHand[i].Value;
    if(isNaN(dealerHand[i].Value) && dealerHand[i].Value != "A") dealerScore += 10;
    if(dealerHand[i].Value == "A" && dealerHand.length == 2) dealerScore += 11;

  }

  // Check for starting hand double aces
  if(playerScore == 22 && playerHand.length == 2) playerScore = "Ban Ban!";
  if(dealerScore == 22 && dealerHand.length == 2) dealerScore = "Ban Ban!";

  // Check for Blackjack
  if(playerScore == 21 && playerHand.length == 2) playerScore = "Blackjack!";
  if(dealerScore == 21 && dealerHand.length == 2) dealerScore = "Blackjack!";

  // Check for Bust
  if (dealerStay == "Yes" && playerStay == "Yes"){
    if(playerScore > 21 && playerHand.length != 2) result = "Player Bust! Dealer Win!";
    if(dealerScore > 21 && dealerHand.length != 2 && playerScore < 22) result = "Dealer Bust! Player Win!";
  }

  // console.log("Player: " + playerScore + ", Dealer: " + dealerScore)

  if(playerScore != "Blackjack!" || dealerScore != "Blackjack!") drawButtons();

  // if(playerScore > dealerScore) {result = "Player win!";}
  // if(playerScore < dealerScore) {result = "Dealer win!";}
  // if(playerScore == dealerScore) {result = "Push!";}

  document.querySelector("#results").innerHTML = result;
  
}

  // Display updated Player and Dealer Cards
function updatePlayarea(){

  playerhandsize = playerHand.length
  dealerhandsize = dealerHand.length
  // console.log("playerHand.length: " + playerHand.length)

  pHand = handToString(playerHand, playerhandsize-1)
  dHand = handToString(dealerHand, dealerhandsize-1)


  // Change handToString(dealerHand, 1) to handToString(dealerHand, 0) to hide card 
  document.querySelector("#playarea").innerHTML = 'Player Hand: '+ pHand + '  <br>Dealer Hand: ' +  dHand + '<p>' + 'Cards Left: ' + deck.length


}

deal = function () { 

  // New shuffled deck
  initDeck = makeDeck();
  deck = shuffleDeck(initDeck);

  // Deal initial 2 cards to player and dealer
  playerHand[0] = deck.pop()
  playerHand[1] = deck.pop()
  dealerHand[0] = deck.pop()
  dealerHand[1] = deck.pop()

  // Check dealer and player hands
  // console.log(playerHand)
  // console.log(dealerHand)

  // Check for winner
  checkWinner()

  updatePlayarea()

  // Hide play button after initial deal
  // document.getElementById("playbutton").style.visibility = "hidden";


  // Display choice buttons if no win

  // Check for winner
  }