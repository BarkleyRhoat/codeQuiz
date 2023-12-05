var startButton = document.getElementById("start-button");
var questionContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var optionsElement = document.getElementById("options");
var timerElement = document.getElementById("timer");
var scoreElement = document.getElementById("score");
var quizSection = document.getElementsByClassName("quizSection"[0])

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


startButton.addEventListener("click", startGame); 
    // quizSection.style.display = "none";


function startGame() {
  // quizSection.style.display = "block";
  optionsElement.innerHTML = "";
  showQuestion(0);
  startTimer();

  startButton.addEventListener("click", startGame); 
  // quizSection.style.display = "none"; 
}

function showQuestion(index) {
  var currentQuestion = questions[index];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";

  //create and append buttons for each
  currentQuestion.options.forEach((option) => {
    var optionItem = document.createElement("button");
    optionItem.textContent = option;
    optionItem.addEventListener("click", () =>
      checkAnswer(option, currentQuestion.correctAnswer)
    );
    optionsElement.appendChild(optionItem);
  });

  if (index === questions.length - 1) {
    questionContainer.style.display = "none";
  } else {
    questionContainer.style.display = "block";
  }

}

function startTimer() {
  timerInterval = setInterval(function () {
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
  } 
scoreElement.textContent = score;
 currentQuestionIndex++;
 
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    clearInterval(timerInterval);
    completedQuiz = true;
    // quizSection.style.display = "none"
    endQuiz();
  }
}

function endQuiz() {
  // Clear the timer if it's out of time
  if (timeLeft <= 0) {
    timeLeft = 0;
    clearInterval(timerInterval);
  }

  

  var scoresTable = document.createElement("table");
  var input = document.createElement("input");
  var buttonEl = document.createElement("button");
  var inputScore = document.createElement("div");
  var textEl = document.createElement("text");
  var allDoneEl = document.createElement("text");

  allDoneEl.textContent = "Quiz completed!";
  textEl.textContent = "Enter Initials: ";
  buttonEl.textContent = "Save";
  inputScore.textContent = "Your score is: " + score;

  // Append elements to the document body
  document.body.appendChild(scoresTable);
  document.body.append(allDoneEl);
  document.body.append(textEl);
  document.body.append(input);
  document.body.append(inputScore);
  document.body.append(buttonEl);

  // Show the end quiz elements
  scoresTable.style.display = "block";
  allDoneEl.style.display = "block";
  textEl.style.display = "block";
  input.style.display = "block";
  inputScore.style.display = "block";
  buttonEl.style.display = "block";

  // Event listener to display scores
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

  // Event listener to save score
  buttonEl.addEventListener("click", function () {
    var initials = input.value;
    if (initials === "") {
      alert("Please enter your initials.");
    } else {
      var userData = {
        initials: initials,
        score: score,
      };

      var existingData = JSON.parse(localStorage.getItem("score")) || [];
      existingData.push(userData);
      localStorage.setItem("score", JSON.stringify(existingData));

      window.location.href = "index.html";
      
    }
  });
}
