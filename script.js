const buttons = document.querySelectorAll('.buttons button');
const playerChoiceP = document.getElementById('player-choice');
const computerChoiceP = document.getElementById('computer-choice');
const resultP = document.getElementById('game-result');
const playerScoreP = document.getElementById('player-score');
const computerScoreP = document.getElementById('computer-score');
const playAgainBtn = document.getElementById('play-again');
const themeSwitch = document.getElementById('theme-switch');
const randomTip = document.getElementById('random-tip');

let playarScore = 0; 
let playerScore = 0;
let computerScore = 0;

const tips = [
    "Tip: Scissors beats paper, but can't cut rock! 🪨",
    "Tip: First move? Go with your gut!",
    "Fun fact: Computer is random, so no cheating!",
    "Tip: You can switch to dark mode for night vibes.",
    "Tip: Try to guess what the computer might choose (it won't help, but it's fun!)"
];

// Show a random tip on load 
function showRandomTip() {
    const index = Math.floor(Math.random() * tips.length);
    randomTip.textContent = tips[index];
}
showRandomTip();

// dark mode switch
themeSwitch.addEventListener('change', function() {
    document.body.classList.toggle('dark', themeSwitch.checked);
    // not sure if needed, but just in case
    document.body.classList.toggle('darkmode', themeSwitch.checked);
});

// random selection
function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIdx = Math.floor(Math.random() * 3);
    return choices[randomIdx];
}

function playRound(playerSelection) {
    const computerSelection = getComputerChoice();
    playerChoiceP.textContent = `You chose: ${playerSelection}`;
    computerChoiceP.textContent = `Computer chose: ${computerSelection}`;

    let result = '';
    // Emoji to make the results a bit more fun!
    let resultEmoji = '';
    if (playerSelection === computerSelection) {
        result = "It's a tie!";
        resultEmoji = "😐";
    } else if (
        (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
        (playerSelection === 'Paper' && computerSelection === 'Rock') ||
        (playerSelection === 'Scissors' && computerSelection === 'Paper')
    ) {
        result = "You win!";
        resultEmoji = "🎉";
        playerScore++;
    } else {
        result = "You lose.";
        resultEmoji = "😢";
        computerScore++;
    }

    resultP.textContent = `Result: ${result} ${resultEmoji}`;
    playerScoreP.textContent = `Your Score: ${playerScore}`; 
    computerScoreP.textContent = `Computer Score: ${computerScore}`;
    showRandomTip();
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Get the word after the emoji
        playRound(btn.textContent.trim().split(' ')[1]); // "Rock", "Paper", "Scissors"
        playAgainBtn.style.display = "inline-block";
        playarScore = playerScore; 
    });
});

playAgainBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    // Small bug: Doesn't reset random tip, so tip stays the same until next round
    playerChoiceP.textContent = "You chose: ...";
    computerChoiceP.textContent = "Computer chose: ...";
    resultP.textContent = "Result: ...";
    playerScoreP.textContent = "Your Score: 0";
    computerScoreP.textContent = "Computer Score: 0";
    playAgainBtn.style.display = "none";
});

