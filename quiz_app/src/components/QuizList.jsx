import React, { useEffect, useState } from 'react';
import axios from 'axios';

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/quizzes")
      .then((res) => {
        setQuizzes(res.data);
      })
      .catch((err) => {
        console.error("Error fetching quizzes:", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="mb-4 p-4 border rounded shadow">
          <h2 className="text-xl">{quiz.title}</h2>
          <ul className="list-disc pl-5 mt-2">
            {quiz.questions.map((q, index) => (
              <li key={index}>{q.question}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default QuizList;
