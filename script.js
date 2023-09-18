const totalScore = { computerScore: 0, playerScore: 0 }
// getComputerChoice randomly selects between `rock` `paper` `scissors` and returns that string 
function getComputerChoice() {
    const rpsChoice = ['Rock', 'Paper', 'Scissors', 'Spock', 'Lizard'];

    // Generate a random index to choose from the `choices` array
    const randomNumber = Math.floor(Math.random() * rpsChoice.length);

    // Return the element at the random index
    return rpsChoice[randomNumber];
}

// Call the function to get a random computer choice
const computerChoice = getComputerChoice();
console.log(computerChoice);

 

function getResult(playerChoice, computerChoice) {
    // return the result of score based on if you won, drew, or lost
    let score = 0;
    // Check for the different win conditions and increment the score// All situations where human wins, set `score` to 1
    if (playerChoice === 'Rock' && computerChoice === 'Scissors') {// rock smashes scissors
        score = 1;
    } else if (playerChoice === 'Rock' && computerChoice === 'Lizard') {// rock smashes lizard
        score = 1;
    } else if (playerChoice === 'Scissors' && computerChoice === 'Paper') {// scissors cuts paper
        score = 1;
    } else if (playerChoice === 'Scissors' && computerChoice === 'Lizard') {// scissors cuts lizard
        score = 1; 
    } else if (playerChoice === 'Paper' && computerChoice === 'Rock') {// paper covers rock
        score = 1;  
    } else if (playerChoice === 'Paper' && computerChoice === 'Spock') { //Paper disproves Spock
        score = 1;  
    } else if (playerChoice === 'Lizard' && computerChoice === 'Spock') { //Lizard poisons Spock
        score = 1;  
    } else if (playerChoice === 'Lizard' && computerChoice === 'Paper') { //Lizard eats Paper
        score = 1;  
    } else if (playerChoice === 'Spock' && computerChoice === 'Rock') { //Spock vaporizes Rock
        score = 1;  
    } else if (playerChoice === 'Spock' && computerChoice === 'Scissors') { //Spock smashes Scissors
        score = 1;  
    } else if (playerChoice === computerChoice) {  // All situations where human draws, set `score` to 0
        score = 0;
    } else {   // Otherwise human loses (aka set score to -1)
        score = -1;
    }   // Return the final score
    return score;
     
}

// showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice
function showResult(score, playerChoice, computerChoice) {
    const resultDiv = document.getElementById('result');
    const playerScoreDiv = document.getElementById('player-score');
    const handsDiv = document.getElementById('hands');
    const computerScoreDiv = document.getElementById('computer-score');

    if (score === -1) {
        resultDiv.innerText = 'You Lose! :(';
    } else if (score === 1) {
        resultDiv.innerText = 'You Win! :D';
    } else {
        resultDiv.innerText = "It's a Draw!";
    }

    handsDiv.innerText = ` Your choice: ${playerChoice} vs Computer Choice: ${computerChoice}`
    playerScoreDiv.innerText = `Your Score: ${totalScore['playerScore']}`
    computerScoreDiv.innerText = `Computer Score: ${totalScore['computerScore']}`

}

// Calculate who won and show it on the screen 
function onClickRPS(playerChoice) {
    console.log({ playerChoice })
    const computerChoice = getComputerChoice()
    console.log({ computerChoice })
    const score = getResult(playerChoice, computerChoice)
    
    if (score === 1) {
        totalScore['playerScore'] += 1;
        totalScore['computerScore'] -= 1;
        document.getElementById('player-score', 'result').style.color = 'green'// If player wins "Your score" turns green
        document.getElementById('computer-score').style.color = 'red'// If computer loses "Computer score" turns red
        document.getElementById('result').style.color = 'green' // Result turns green if player wins
    } else if (score === -1) {
        totalScore['computerScore'] += 1;
        totalScore['playerScore'] -= 1;
        document.getElementById('player-score').style.color = 'red' // If computer wins "Computer Score" turns green
        document.getElementById('computer-score').style.color = 'green'// If player loses "Your Score" turns red
        document.getElementById('result').style.color = 'red'  //Result turns red if player loses
    }else {
        document.getElementById('player-score').style.color = 'lightblue'
        document.getElementById('computer-score').style.color = 'lightblue'
        document.getElementById('result').style.color = 'lightblue' // Result turns lightblue if its a draw

    }

    console.log(totalScore)
    showResult(score, playerChoice, computerChoice)
}


// Make the RPS buttons actively listen for a click and do something once a click is detected **
function playGame() {
    // use querySelector to select all RPS Buttons
    const rpsButtons = document.querySelectorAll('.rpsButton')
    rpsButtons[0].onclick = () => console.log(rpsButtons[0].value)
    //  Adds an on click event listener to each RPS button and every time you click it, 
    //it calls the onClickRPS function with the RPS button that was last clicked 
    rpsButtons.forEach(rpsButton => {
        rpsButton.onclick = () => onClickRPS(rpsButton.value)
    })
    // Add a click listener to the end game button that runs the endGame() function on click
    const endGameButton = document.getElementById('endGameButton')
    endGameButton.onclick = () => endGame(totalScore)
}

// endGame function clears all the text on the DOM 
function endGame() {
    totalScore['playerScore'] = 0
    totalScore['computerScore'] = 0
    const resultDiv = document.getElementById('result');
    const playerScoreDiv = document.getElementById('player-score');
    const handsDiv = document.getElementById('hands');
    const computerScoreDiv = document.getElementById('computer-score');

    resultDiv.innerText = ''
    playerScoreDiv.innerText = ''
    handsDiv.innerText = ''
    computerScoreDiv.innerText=''
}

playGame()