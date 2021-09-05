import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
//Components
import QuestionCard from "./components/QuestionCard";
//Types
import { QuestionState, Difficulty } from "./API";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]); //specifies that it will be an array from questionState
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    //TS will throw an error if event isn't specified. You don't need the HtmlButton part but it specifies it even more.
    if(!gameOver) {
      //users answer
      const answer = event.currentTarget.value;
      //check answer against the correct value
      const correct = questions[number].correct_answer === answer;
      //add score if answer is correct
      if(correct) setScore((prev) => prev + 1);
      //save answer 
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question (if not the last question)
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion); //setting the next question number
    }
  };

  return (
    <div className="wrapper">
      <section className="intro">
        <h1>Science Pop Quiz!</h1>
        <p>The Fathers of Science have stopped you for a random science quiz! Don't let them down...</p>

        {!gameOver && userAnswers.length === TOTAL_QUESTIONS ? 
          (<p>{score >= 8 ? ("Well done, Bill and Neil are proud of you.") : ("Dang, you shouldn't have fallen asleep in science class! Try again?")}</p>)  
        : null}

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start bouncy" onClick={startTrivia}>
            Start
          </button>
        ) : null}
      </section>

      <section className={!gameOver ? "quiz" : "hidden"}>
        {!gameOver ? <p className="score">Score: {score}</p> : null}

        {loading ? <p>Loading Questions...</p> : null}

        {!gameOver && !loading ? (
          <QuestionCard
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        ) : null}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button type="button" className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </section>

    </div>
  );
}

export default App;
