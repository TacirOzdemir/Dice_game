/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Variables
var dice = 0;
var scores = [0,0];
var roundScore = 0;
var activePlayer = 0;
var diceDom = document.querySelector('.dice');
var gamePlaying = false;

// Initialize game
init();

// Roll button event listener
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    // Check if game is playing
    if( gamePlaying ){
        
        // Random number
        dice = Math.floor(Math.random() * 6) + 1;

        // Display result
        diceDom.style.display = 'block';
        diceDom.src = 'img/dice-' + dice + '.png';
        document.querySelector('#current-' + activePlayer).textContent = dice;

        // Check wether player has rolled 1
        if( dice !== 1 ){

            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else{

            // Change player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    
    // Add current score to global score
    scores[activePlayer] += roundScore;
    
    // Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    // Check if player won the game
    if( scores[activePlayer] >= 100 ){
        
        // Set player as winner
        document.querySelector('#name-' + activePlayer).textContent = 'Winner !';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
        // Reset roundScore
        roundScore = 0;
        
        // Upddate UI
        document.querySelector('#current-' + activePlayer).textContent = 0;
        
        // Reset gamePlaying
        gamePlaying = false;
    }
    else{
        
        // Change player
        nextPlayer();
    }
    
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
    
    // Set score to 0
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
    // Remove UI active player
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
    // Change player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
    // Add UI active player
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function init(){
    
    // Initialize variables
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    
    // Set dice display to none
    document.querySelector('.dice').style.display = 'none';
    
    // Initialize score display to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    // Reset player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    // Reset winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    // Reset active class
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    // Set player 1 active
    document.querySelector('.player-0-panel').classList.add('active');
    
    // Set gamePlaying
    gamePlaying = true;
}






















