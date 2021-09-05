import { shuffleArray } from "./utils";

//these are all based on the response you get back from fetchQuizQuestions
export type Question = {
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] }; //create a new property to Question type

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

//the enum ensures that we only use those values and not anything else (prevents typos)
export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=17&type=multiple`;
  const response = await fetch(endpoint).then((response) => response.json());
  return response.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]) //adds correact answer to the incorrect answer array and then shuffles it using the function we created in the utils file
  }));
};
