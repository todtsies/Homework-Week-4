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
        choices: ["<ui>", "<li>", "<ul>", "<list>"],
        answer: "<ul>"
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