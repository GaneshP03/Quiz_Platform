import { appendFile } from "fs";
const indianStatesAndCapitals = {
  "Andhra Pradesh": "Amaravati",
  "Arunachal Pradesh": "Itanagar",
  Assam: "Dispur",
  Bihar: "Patna",
  Chhattisgarh: "Raipur",
  Goa: "Panaji",
  Gujarat: "Gandhinagar",
  Haryana: "Chandigarh",
  "Himachal Pradesh": "Shimla",
  Jharkhand: "Ranchi",
  Karnataka: "Bengaluru",
  Kerala: "Thiruvananthapuram",
  "Madhya Pradesh": "Bhopal",
  Maharashtra: "Mumbai",
  Manipur: "Imphal",
  Meghalaya: "Shillong",
  Mizoram: "Aizawl",
  Nagaland: "Kohima",
  Odisha: "Bhubaneswar",
  Punjab: "Chandigarh",
  Rajasthan: "Jaipur",
  Sikkim: "Gangtok",
  "Tamil Nadu": "Chennai",
  Telangana: "Hyderabad",
  Tripura: "Agartala",
  "Uttar Pradesh": "Lucknow",
  Uttarakhand: "Dehradun",
  "West Bengal": "Kolkata",
};

const states = Object.keys(indianStatesAndCapitals);
const totalQuestions = 5; // Hardcoded number of questions
let score = 0;
let currentQuestion = 0;
const askedQuestions = new Set();

function getRandomQuestion() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * states.length);
  } while (askedQuestions.has(randomIndex));
  askedQuestions.add(randomIndex);
  return randomIndex;
}

function askQuestion() {
  if (currentQuestion < totalQuestions) {
    const randomIndex = getRandomQuestion();
    const state = states[randomIndex];
    console.log(
      `Question ${currentQuestion + 1}: What is the capital of ${state}?`
    );

    process.stdin.once("data", function (data) {
      const answer = data.toString().trim();
      const correctAnswer = indianStatesAndCapitals[state];

      if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        console.log("Correct!\n");
        score++;
      } else {
        console.log(`Incorrect! The correct answer is ${correctAnswer}.\n`);
      }

      currentQuestion++;
      askQuestion();
    });
  } else {
    console.log(`Quiz Over! You scored ${score} out of ${totalQuestions}.`);
    recordScore();
  }
}

function recordScore() {
  process.stdout.write("Enter your name: ");
  process.stdin.once("data", function (nameData) {
    const studentName = nameData.toString().trim();

    process.stdout.write("Enter your roll number: ");
    process.stdin.once("data", function (rollData) {
      const rollNumber = rollData.toString().trim();

      const scoreEntry = `Name: ${studentName}, Roll Number: ${rollNumber}, Score: ${score}\n`;
      appendFile("scores.txt", scoreEntry, (err) => {
        if (err) throw err;
        console.log("The score has been saved!");
        process.exit();
      });
    });
  });
}

console.log("Welcome to the States and Capitals Quiz!");
console.log(`The quiz will consist of ${totalQuestions} questions.`);

askQuestion();
