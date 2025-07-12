const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// ✅ Sample questions array
const questions = [
  {
    id: "1",
    text: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: 1,
  },
  {
    id: "2",
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    id: "3",
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
  },
  {
    id: "4",
    text: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
    correctAnswer: 1,
  },
  {
    id: "5",
    text: "Which is the largest planet in our solar system?",
    options: ["Mars", "Saturn", "Jupiter", "Neptune"],
    correctAnswer: 2,
  },
  {
    id: "6",
    text: "What is the chemical symbol for Gold?",
    options: ["Ag", "Au", "Fe", "Cu"],
    correctAnswer: 1,
  },
  {
    id: "7",
    text: "Which language is primarily spoken in Brazil?",
    options: ["Spanish", "Portuguese", "English", "French"],
    correctAnswer: 1,
  },
  {
    id: "8",
    text: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1,
  },
  {
    id: "9",
    text: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
  },
  {
    id: "10",
    text: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 2,
  },
];

// ✅ Shuffle logic
function shuffleArray(array) {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ✅ Initialize shuffled state
let shuffledQuestions = shuffleArray(questions);
let currentIndex = 0;

// Test routes
app.get("/", (req, res) => {
  console.log("Root route accessed");
  res.json({ message: "Server is running!" });
});

app.get("/test", (req, res) => {
  console.log("Test route accessed");
  res.json({ message: "Test successful!" });
});

// ✅ Get one random (non-repeating) question
app.get("/api/questions/random", (req, res) => {
  console.log("Random question route accessed");

  if (currentIndex >= shuffledQuestions.length) {
    console.log("All questions used, reshuffling...");
    shuffledQuestions = shuffleArray(questions);
    currentIndex = 0;
  }

  const question = shuffledQuestions[currentIndex];
  currentIndex++;
  console.log("Sending question:", question);
  res.json(question);
});

// ✅ Submit answer
app.post("/api/questions/:id/submit", (req, res) => {
  console.log("Submit answer route accessed");
  const { id } = req.params;
  const { selectedAnswer } = req.body;

  const question = questions.find((q) => q.id === id);
  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  const isCorrect = selectedAnswer === question.correctAnswer;

  console.log("Answer result:", {
    isCorrect,
    correctAnswer: question.correctAnswer,
  });

  res.json({
    correct: isCorrect,
    correctAnswer: question.correctAnswer,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
  console.log("Routes:");
  console.log("GET /");
  console.log("GET /test");
  console.log("GET /api/questions/random");
  console.log("POST /api/questions/:id/submit");
  console.log(`🧠 Total questions: ${questions.length}`);
});
