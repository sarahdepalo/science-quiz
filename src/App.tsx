import React, { useState } from "react";
import { fetchQuizQuestions } from './API';
//Components 
import QuestionCard from "./components/QuestionCard";
//Types
import { Difficulty } from './API';

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  //imports from the API file that we can now use!
  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  const startTrivia = async () => {};

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    //TS will throw an error if event isn't specified. You don't need the HtmlButton part but it specifies it even more.
  };

  const nextQuestion = () => {};

  return (
    <div>
      <h1>Science Pop Quiz!</h1>
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      <p className="score">Score: </p>
      <p>Loading Questions...</p>
      {/* <QuestionCard
        questionNum={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button type="button" className="next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
}

export default App;
