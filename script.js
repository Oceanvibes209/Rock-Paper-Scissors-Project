const totalScore = { computerScore: 0, playerScore: 0 }
// ** getComputerChoice randomly selects between `rock` `paper` `scissors` and returns that string **
// getComputerChoice() 👉 'Rock'
// getComputerChoice() 👉 'Scissors'
function getComputerChoice() {
    const rpsChoice = ['Rock', 'Paper', 'Scissors'];

    // Generate a random index to choose from the `choices` array
    const randomNumber = Math.floor(Math.random() * rpsChoice.length);

    // Return the element at the random index
    return rpsChoice[randomNumber];
}

// Call the function to get a random computer choice
const computerChoice = getComputerChoice();
console.log(computerChoice);

// ** getResult compares playerChoice & computerChoice and returns the score accordingly **
// human wins - getResult('Rock', 'Scissors') 👉 1
// human loses - getResult('Scissors', 'Rock') 👉 -1
// human draws - getResult('Rock', 'Rock') 👉 0
function getResult(playerChoice, computerChoice) {
    // return the result of score based on if you won, drew, or lost
    let score = 0;
    // Check for the different win conditions and increment the score
    if (playerChoice == 'Rock' && computerChoice == 'Scissors') {
        score = 1;
    } else if (playerChoice == 'Scissors' && computerChoice == 'Paper') {
        score = 1;
    } else if (playerChoice == 'Paper' && computerChoice == 'Rock') {
        score = 1;  // All situations where human wins, set `score` to 1
    } else if (playerChoice == computerChoice) {// All situations where human draws, set `score` to 0
        score = 0;
    } else { // Otherwise human loses (aka set score to -1)
        score = -1;
    } // Return the final score
    return score;
}

// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
function showResult(score, playerChoice, computerChoice) {
    const resultDiv = document.getElementById('result');
    const playerScoreDiv = document.getElementById('player-score');
    const handsDiv = document.getElementById('hands');

    if (score === -1) {
        resultDiv.innerText = 'You Lose! :(';
    } else if (score === 1) {
        resultDiv.innerText = 'You Win! :D';
    } else {
        resultDiv.innerText = "It's a Draw!";
    }

    handsDiv.innerText = ` Your choice: ${playerChoice} vs Computer Choice: ${computerChoice}`
    playerScoreDiv.innerText = `Your Score: ${totalScore['playerScore']}`
}
// Hint: on a score of -1
// You should do result.innerText = 'You Lose!'
// Don't forget to grab the div with the 'result' id!

// ** Calculate who won and show it on the screen **
function onClickRPS(playerChoice) {
    console.log({ playerChoice })
    const computerChoice = getComputerChoice()
    console.log({ computerChoice })
    const score = getResult(playerChoice, computerChoice)
    totalScore['playerScore'] += score
    console.log(totalScore)
    console.log({ score })
    showResult(score, playerChoice, computerChoice)
}


// ** Make the RPS buttons actively listen for a click and do something once a click is detected **
function playGame() {
    // use querySelector to select all RPS Buttons
    const rpsButtons = document.querySelectorAll('.rpsButton')
    rpsButtons[0].onclick = () => console.log(rpsButtons[0].value)
    // * Adds an on click event listener to each RPS button and every time you click it, it calls the onClickRPS function with the RPS button that was last clicked *

    // 1. loop through the buttons using a forEach loop
    // 2. Add a 'click' event listener to each button
    // 3. Call the onClickRPS function every time someone clicks
    // 4. Make sure to pass the currently selected rps button as an argument
    rpsButtons.forEach(rpsButton => {
        rpsButton.onclick = () => onClickRPS(rpsButton.value)
    })
    // Add a click listener to the end game button that runs the endGame() function on click
    const endGameButton = document.getElementById('endGameButton')
    endGameButton.onclick = () => endGame(totalScore)
}

// ** endGame function clears all the text on the DOM **
function endGame() {
    totalScore['playerScore'] = 0
    totalScore['computerScore'] = 0
    const resultDiv = document.getElementById('result');
    const playerScoreDiv = document.getElementById('player-score');
    const handsDiv = document.getElementById('hands');

    resultDiv.innerText = ''
    playerScoreDiv.innerText = ''
    handsDiv.innerText = ''
}

playGame()