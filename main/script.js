var startButton = document.getElementById("start-button");
var questionContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var optionsElement = document.getElementById("options");
var timerElement = document.getElementById("timer");
var scoreElement = document.getElementById("score");
var quizSection = document.getElementsByClassName("quiz-section"[0])

localStorage.setItem("score", "[]")
//questions for the quiz
var questions = [
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
    options: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correctAnswer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within __ when being assigned to variables?",
    options: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "curly brackets",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to debugger is?",
    options: ["javascript", "terminal/bash", "for loops", "console log"],
    correctAnswer: "console log",
  },
];

var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;

// startButton.addEventListener("click", function() {
//     quizSection.style.display = "none";
// })
startButton.addEventListener("click", startGame); {
    quizSection.style.display = "none";
};

function startGame() {
  optionsElement.outerHTMLHTML = "";
  showQuestion(0);
  startTimer();
}

function showQuestion(index) {
  var currentQuestion = questions[index];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    var optionItem = document.createElement("button");
    optionItem.textContent = option;
    optionItem.addEventListener("click", () =>
      checkAnswer(option, currentQuestion.answer)
    );
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
  }
  scoreElement.textContent = score;
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
}

function endQuiz() {
    if (timeLeft <= 0) {
      timeLeft = 0;
    }
    clearInterval(timerInterval);

    quizSection.style.display = "none";
  
    var scoresTable = document.createElement("table");
    var input = document.createElement("input");
    var buttonEl = document.createElement("button");
    var inputScore = document.createElement("div");
    var textEl = document.createElement("text");
    var allDoneEl = document.createElement("text");
    allDoneEl.textContent = "You did it!";
    textEl.textContent = "Enter Initials: ";
    buttonEl.textContent = "Save";
    inputScore.textContent = "Your score is: " + timeLeft;
    container.appendChild(scoresTable);
    container.append(allDoneEl);
    container.append(textEl);
    container.append(input);
    container.append(inputScore);
    container.append(buttonEl);
  
    document.getElementById("scores").addEventListener("click", displayScores);
    
    function displayScores() {
      var scores = JSON.parse(localStorage.getItem("score"));
  
      if (scores && scores.length > 0) {
        scoresTable.innerHTML = "";
        var headerRow = scoresTable.insertRow(0);
        headerRow.insertCell(0).textContent = "Initials";
        headerRow.insertCell(1).textContent = "Score";
  
        for (var i = 0; i < scores.length; i++) {
          var scoreData = scores[i];
          var newRow = scoresTable.insertRow(i + 1);
          newRow.insertCell(0).textContent = scoreData.initials;
          newRow.insertCell(1).textContent = scoreData.score;
        }
      } else {
        scoresTable.innerHTML = "No scores to display.";
      }
    }
  
    buttonEl.addEventListener("click", function () {
      var initials = input.value;
      if (initials === "") {
        alert("Please enter your initials.");
      } else {
        var userData = {
          initials: initials,
          score: timeLeft,
        };
  
        var existingData = JSON.parse(localStorage.getItem("score")) || [];
        existingData.push(userData);
        localStorage.setItem("score", JSON.stringify(existingData));
  
      }
    });
}