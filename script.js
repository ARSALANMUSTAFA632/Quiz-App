

// References
let timeLeft = document.querySelector(".timer-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");

let questionCount = 0;
let scoreCount = 0;
let count = 10;
let countdown;

// Questions and Options array
const quizArray = [
  {
    id: "0",
    question: "What does AI stand for?",
    options: ["Artificial Innovation", "Artificial Intelligence", "Automated Integration", "Advanced Interaction"],
    correct: "Artificial Intelligence",
  },
  {
    id: "1",
    question: "Who is considered the father of AI?",
    options: ["Alan Turing", "John McCarthy", "Marvin Minsky", "Andrew Ng "],
    correct: "John McCarthy",
  },
  {
    id: "2",
    question: "Which of the following is an example of supervised learning?",
    options: ["Clustering", "Classification", "Reinforcement learning", "None of the above"],
    correct: "Classification",
  },
  {
    id: "3",
    question: "Which programming language is commonly used for AI development?",
    options: ["Python", "JavaScript", "HTML", "Swift"],
    correct: "Python",
  },
  {
    id: "4",
    question: "Which AI technology is commonly used in self-driving cars?",
    options: ["Expert systems", "Natural Language Processing", "Computer vision", "Speech recognition"],
    correct: "Computer vision",
  },
];

// Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

// Next Button
nextBtn.addEventListener("click", (displayNext = () => {
    questionCount += 1;
    
    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      userScore.innerHTML = `Your score is ${scoreCount} out of ${questionCount}`;
    } else {
      countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Question`;
      quizDisplay(questionCount);
      count = 10;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

// Timer
const timerDisplay = () => {
  timeLeft.innerHTML = `${count}s`;
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

// Display quiz card
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  quizCards[questionCount].classList.remove("hide");
};

// Quiz Creation
function quizCreator() {
  quizArray.sort(() => Math.random() - 0.5);
  
  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);
    
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    
    div.innerHTML += `
      <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

// Checker Function
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });
}

// Initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 10;
  clearInterval(countdown);
  quizCreator();
  timerDisplay();
  quizDisplay(questionCount);
  countOfQuestion.innerHTML = `1 of ${quizArray.length} Question`;
}

// Start Button Click
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

// Windows Load Setup
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
  scoreContainer.classList.add("hide");
};
