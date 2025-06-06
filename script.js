//分页
//开始页面
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const startBtn = document.getElementById("start-btn");
//答题页面
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");
//结束页面
const resultScreen = document.getElementById("result-screen");
const finalScoreSpan = document.getElementById("final-score");
const resultMessageSpan = document.getElementById("result-message");
const maxScoreSpan = document.getElementById("max-score");
const restartButton = document.getElementById("restart-btn");
//准备题目
const quizQuestions = [
  {
    question: "1+1=?",
    answers: [
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
      { text: "5", correct: false }
    ]
  },
  {
    question: "2+2=?",
    answers: [
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false }
    ]
  },
  {
    question: "3+3=?",
    answers: [
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "4", correct: false },
      { text: "6", correct: true }
    ]
  },
  {
    question: "4+4=?",
    answers: [
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "4", correct: false },
      { text: "8", correct: true }
    ]
  },
  {
    question: "5+5=?",
    answers: [
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "4", correct: false },
      { text: "10", correct: true }
    ]
  }
]
//全局变量
let score = 0;
let currentQuestionIndex = 0;
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;
//允许用户点击答案
let answersDisabled = false;
//事件监听
startBtn.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  scoreSpan.textContent = 0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
}
function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  answersDisabled = false;
  //获取当前问题
  questionText.textContent = currentQuestion.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  //添加答案按钮
  answersContainer.textContent = "";
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answers-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  })
  //设置进度条
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

}
function selectAnswer(event) {
  if (answersDisabled) return;// 如果被禁用了，就直接返回
  answersDisabled = true;// 禁止重复点击提交
  //获取用户点击的按钮
  const selectButton = event.target;
  const isCorrect = selectButton.dataset.correct === "true";
  //判断答案对错
  Array.from
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    } else if (button === selectButton) {
      button.classList.add('incorrect');
    }
  });
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}
function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;
  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultMessageSpan.textContent = "你是个天才";
  } else if (percentage >= 80) {
    resultMessageSpan.textContent = "做得好！你真懂行！";
  } else if (percentage >= 60) {
    resultMessageSpan.textContent = "努力做得很好！继续学习！";
  } else if (percentage >= 40) {
    resultMessageSpan.textContent = "不错！再试一次以提高！";
  } else {
    resultMessageSpan.textContent = "继续学习！你会变得更好的！";
  }
}
function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
