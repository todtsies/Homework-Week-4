// Array of the quiz questions, the choices to choose from, and the correct answer
var questions = [
    {
        title: "What does HTML stand for?",
        choices: ["Hypertext Machine Language", "Hypertext Tools Markup Links", "Hypertext Markup Language", "High-Tech Markup Lists"],
        answer: "Hypertext Markup Language"
    },
    {
        title: "Which of the following characters indicates the closing of a tag?",
        choices: ["<", ">", "/", "\\"],
        answer: "/"
    },
    {
        title: "How many heading tags are there in HTML5?",
        choices: ["2", "4", "5", "6"],
        answer: "6"
    },
    {
        title: "Which of the following attributes is used to add a link to any element?",
        choices: ["ref", "#", "href", "link"],
        answer: "href"
    },
    {
        title: "Which of the following HTML elements is used to create an unordered list?",
        choices: ["ui", "li", "ul", "list"],
        answer: "ul"
    }
]


// Declaring the numerical values of my score and timer functions
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// After start is clicked, the timer begins to count down
function start() {
    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;

        // If timer hits below 0, the game ends
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    
    }, 1000);
    
    next();
}

// The game ends when the timer is stopped
function endGame() {
    clearInterval(timer);

    var quizContent = `
        <h2>Game over!</h2>
        <h3>You got a ` + score + ` /100!</h3>
        <h3>That means you got ` + score / 20 + ` questions correct!</h3>
        <input type="text" id="name" placeholder="Please enter your initals">
        <button onclick="setScore()">Set score!</button>`;

        document.getElementById("quizBody").innerHTML = quizContent;
}

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}

function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br>

    <button onclick="clearScore()">Clear score</button><button onclick="resetGame()">Play again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//Clears the score name and value in the local storage if the user selects "clear score"
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

//Reset the quiz
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        Coding Quiz!
    </h1>
    <h3>
        Click Start to play!
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;

}

//Deduct 15 seconds from the timer if user guesses wrong
function incorrect() {
    timeLeft -=15;
    next();
}

//Increase the score by 20 if the user guesses right
function correct() {
    score += 20;
    next()
}
// This function loopos through the questions
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {        
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";         
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);        
        
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {           
             buttonCode = buttonCode.replace("[ANS]", "correct()");        
        }   else { 
               buttonCode = buttonCode.replace("[ANS]", "incorrect()");       
             }        
             quizContent += buttonCode   
    }
    
    document.getElementById("quizBody").innerHTML = quizContent;
}