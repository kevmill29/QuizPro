import React, { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import axios from 'axios';

const Quiz = () => {
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [quizApis, setQuizApis] = useState([
    'https://opentdb.com/api.php?amount=5&category=20&difficulty=medium&type=multiple',
    'https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple',
    'https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple',
  ]);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [quizTitle, setQuizTitle] = useState('');

  useEffect(() => {
    fetchQuizQuestions();
  }, [selectedQuizIndex]);

  const fetchQuizQuestions = () => {
    setLoading(true);
    axios.get(quizApis[selectedQuizIndex])
      .then(response => {
        setQuestions(response.data.results);
        setQuizTitle(response.data.results[0].category);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      })
  }

  const quizQuestion = questions.map(result => ({
    question: result.question,
    options: [...result.incorrect_answers, result.correct_answer].sort(() => Math.random() - 0.5),
    answer: result.correct_answer,
    category: result.category
  }));

  const handleAnswer = (questionIndex, option) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = option;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    const correctAnswers = quizQuestion.filter((question, index) => answers[index] === question.answer);
    setScore(correctAnswers.length)
  }

  const handleQuizSelect = (index) => {
    setSelectedQuizIndex(index);
  }

  return (
    <div>
      <h1>Quizzes</h1>
      <div>
        {quizApis.map((apiUrl, index) => (
          <button key={index} onClick={() => handleQuizSelect(index)}>Quiz {index + 1}</button>
        ))}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{decode(quizTitle)}</h1>
          {decode(quizQuestion).map((question, index) => (
            <div key={index}>
              <h2>{decode(question.question)}</h2>
              {question.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswer(index, option)}
                  className={answers[index] === option ? 'selected' : 'answerBtn'}
                >
                  {decode(option)}
                </button>
              ))}
            </div>
          ))}
          <button className='submitBtn' onClick={handleSubmit}>Submit Answers</button>
          {score !== null && <p>Score: {score}/{quizQuestion.length}</p>}
        </>
      )}
    </div>
  )
}

export default Quiz;