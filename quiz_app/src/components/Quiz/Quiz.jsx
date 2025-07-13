import React, { useState, useEffect } from "react";
import { fetchQuestion, submitAnswer } from "../../services/api";
import "./quiz.css";

const Quiz = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Quiz component mounted");
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    console.log("Loading question...");
    try {
      setLoading(true);
      setError(null);
      const questionData = await fetchQuestion();
      console.log("Question data received:", questionData);
      setQuestion(questionData);
    } catch (err) {
      console.error("Error loading question:", err);
      setError("Failed to load question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (index) => {
    if (!submitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = async () => {
    if (selectedOption !== null && question) {
      try {
        const result = await submitAnswer(question.id, selectedOption);
        console.log("Submit result:", result);
        setSubmitted(true);
      } catch (err) {
        console.error("Error submitting answer:", err);
        setError("Failed to submit answer. Please try again.");
      }
    } else {
      alert("Please select an option before submitting!");
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setSubmitted(false);
    loadQuestion();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="quiz-container">
          <p className="loading-text">Loading question...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="quiz-container">
          <p className="error-text">{error}</p>
          <button className="submit-btn" onClick={loadQuestion}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container">
        <div className="quiz-container">
          <p className="error-text">No question available.</p>
          <button className="submit-btn" onClick={loadQuestion}>
            Load Question
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="quiz-container">
        <h2 className="question">{question.text}</h2>
        <div className="options-container">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option ${
                selectedOption === index ? "selected" : ""
              } ${
                submitted
                  ? index === question.correctAnswer
                    ? "correct"
                    : selectedOption === index
                    ? "incorrect"
                    : ""
                  : ""
              }`}
              onClick={() => handleOptionClick(index)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="submit-container">
          {!submitted ? (
            <button className="submit-btn" onClick={handleSubmit}>
              Submit Answer
            </button>
          ) : (
            <>
              <p className="result-text">
                {selectedOption === question.correctAnswer
                  ? "Correct! Well done!"
                  : "Incorrect. Try again!"}
              </p>
              <button className="submit-btn" onClick={handleNextQuestion}>
                Next Question
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
