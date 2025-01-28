
const questions = [
  {
    question: "What is 5 + 3?",
    options: ["5", "6", "7", "8"],
    correct: "8"
  },
  {
    question: "What is 12 - 7?",
    options: ["5", "6", "4", "3"],
    correct: "5"
  },
  {
    question: "What is 9 * 2?",
    options: ["16", "18", "20", "15"],
    correct: "18"
  },
  {
    question: "What is 15 ÷ 3?",
    options: ["5", "6", "4", "3"],
    correct: "5"
  },
  {
    question: "What is 25 + 10?",
    options: ["35", "30", "40", "45"],
    correct: "35"
  },
  {
    question: "What is 36 ÷ 6?",
    options: ["5", "6", "7", "8"],
    correct: "6"
  },
  {
    question: "What is 7 * 3?",
    options: ["19", "20", "21", "22"],
    correct: "21"
  },
  {
    question: "What is 50 - 28?",
    options: ["21", "22", "23", "25"],
    correct: "22"
  },
  {
    question: "What is 8 + 14?",
    options: ["22", "20", "24", "18"],
    correct: "22"
  },
  {
    question: "What is 100 ÷ 10?",
    options: ["10", "20", "15", "12"],
    correct: "10"
  }
];


let currentQuestion = 0;
let score = 0;

const progressBar = document.getElementById("progress-bar");
const progressImage = document.getElementById("progress-image");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const breakpointsContainer = document.getElementById("breakpoints");


function initializeBreakpoints() {
for(let i=0 ;i< questions.length;i++) {
  const breakpoint = document.createElement("div");
  breakpoint.classList.add("breakpoint");
  breakpointsContainer.appendChild(breakpoint);
};
}



function loadQuestion() {
const question = questions[currentQuestion];
let questionNo = currentQuestion +1;
document.getElementById("question").textContent =questionNo + ". " + question.question;
optionsContainer.innerHTML = "";
question.options.forEach(option => {
 optionElement = document.createElement("button");
optionElement.innerHTML = `${option}`;
  optionsContainer.appendChild(optionElement);
  optionElement.classList.add("option-btn");
  optionElement.style.backgroundColor ="white";
  optionElement.addEventListener("click",selectAns);
});
}

function updateProgress(correct) {
const progressPercentage = ((currentQuestion +1) / questions.length) * 100;
progressBar.style.width = `${progressPercentage}%`;
 progressBar.style.backgroundColor ="blue";
 progressImage.style.left = `${progressPercentage}%`;
const breakpoints = document.querySelectorAll(".breakpoint");
breakpoints[currentQuestion].classList.add("active");
console.log("function ",correct);
if(correct == true){
  breakpoints[currentQuestion].classList.add("correct");

}
else{
  breakpoints[currentQuestion].classList.add("incorrect");
}
}

function selectAns(event) {
const selectedOption = event.target;  // Get the text of the clicked option
const question = questions[currentQuestion];   // Get the current question object
var isCorrect = selectedOption.innerText === question.correct;
if (isCorrect) {
  selectedOption.style.backgroundColor = "rgb(21, 255, 0 ,0.5)";
  selectedOption.style.borderColor="rgb(47, 199, 33)";
  score++;
} else {
  selectedOption.style.backgroundColor = "rgb(243, 56, 56 ,0.7)";
  selectedOption.style.borderColor="rgb(230, 16, 20)";
}
console.log("inselectans " ,currentQuestion);

nextBtn.addEventListener("click", () => {
  currentQuestion=currentQuestion-1;
  console.log("in nextbtn ",currentQuestion);
  console.log("call time ",isCorrect);
  updateProgress(isCorrect);
  currentQuestion=currentQuestion+1;
 const selectedOption = document.querySelector(".option-btn");
 console.log("query selector called ");
 if (!selectedOption) {
   alert("Please select an option!");
   return;
 }

const options = document.querySelectorAll(".option-btn");
options.forEach(option => {
  option.disabled = true;
});

loadQuestion();
// if (currentQuestion < questions.length) {
//   loadQuestion();
// } else {
//   nextBtn.disabled = true;
//   submitBtn.disabled = false;
// }


});
currentQuestion++;
}

submitBtn.addEventListener("click", () => {
alert(`Quiz completed! Your score is ${score}/${questions.length}`);
location.reload();
});

initializeBreakpoints();
loadQuestion();