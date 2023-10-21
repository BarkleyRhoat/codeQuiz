// document.addEventListener("DOMContentLoaded", function()
    const startButton = document.getElementById("start-button");
    const questionContainer = document.getElementById("question-container");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options")
    const timerElement = document.getElementById("timer");
    const scoreElement = document.getElementById("score");
//questions for the quiz
const questions = [
    {
      question: "Commonly used data types DO NOT include?",
      options: ["Booleans", "Strings", "alerts", "numbers"],
      correctAnswer: "alerts",
    },
    {
      question: "The Condition in which if/false statements is enclosed with?",
      options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
      correctAnswer: "parenthesis",
    },
    {
        question: "Arrays in javascript can be used to store?",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above",
    },
    {
        question:"String values must be enclosed within __ when being assigned to variables?",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "curly brackets",
    },
    {
        question:"A very useful tool used during development and debugging for printing content to debugger is?",
        options: ["javascript", "terminal/bash", "for loops", "console log"],
        correctAnswer: "console log",
    }
];


  var currentQuestionIndex = 0;
    var score = 0;
    var timeLeft = 60;

    startButton.addEventListener("click", startGame);

    function startGame() {
        optionsElement.outerHTMLHTML = "";
        showQuestion(0);
        startTimer();
    }

    function showQuestion(index) {
        var currentQuestion = questions[index];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";
        currentQuestion.options.forEach(option => {
            var optionItem = document.createElement("button");
            optionItem.textContent = option;
            optionItem.addEventListener("click", () => checkAnswer(option, currentQuestion.answer));
            optionsElement.appendChild(optionItem);
        });
    }

    function startTimer() {
        var timerInterval = setInterval(function () {
            timeLeft--;
            timerElement.textContent = `Time: ${timeLeft}`;
            if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
                clearInterval(timerInterval);
                endQuiz();
            }
        }, 1000);
    }

    function checkAnswer(selectedOption, correctAnswer) {
        if (selectedOption === correctAnswer) {
            score++;
        } else {
            // timeLeft -= 15;
        }
        scoreElement.textContent = score;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            endQuiz();
        }
    }
    

    function endQuiz(){
        // if(timeLeft <=0){
        //     timeLeft = 0;
        // }
        //     clearInterval(timerInterval)

    var input = document.createElement("input");
    var buttonEl = document.createElement("button");
    var inputScore = document.createElement("div");
    var textEl = document.createElement("text")
    var allDoneEl = document.createElement("text");
    allDoneEl.textContent = ("You did it!");
    textEl.textContent = "Enter Initials: ";
    buttonEl.textContent = "save";
    inputScore.textContent = "your score is: " + timeLeft;
    container.append(allDoneEl);
    container.append(textEl);
    container.append(input);
    container.append(inputScore);
    container.append(buttonEl);
    buttonEl.addEventListener("click", saveInput)
    

    function saveInput (event){
        console.log(event.target);
        console.log(event.target.parentNode.childNodes);
        var  inputInitial = event.target.parentNode.childNodes[1];
        var inputScore = event.target.parentNode.childNodes[2];
        console.log(inputInitial.value, inputScore.textContent);
        container.innerHTML = " ";
    };
    };



