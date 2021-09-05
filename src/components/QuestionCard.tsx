import { AnswerObject } from '../App';

type Props = {
  question: string;
  answers: string[];
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNum: number;
  totalQuestions: number;
};

// you have to use React.FC to tell typescript this is a functional component. We can no use these props inside of our component

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,

}) => {
  return(
    <div>
        <p className="number">
            Question: {questionNum} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html: question}}/>
        <div>
            {answers.map((answer) => (
                <div key={answer}
                >
                    <button disabled={!!userAnswer} onClick={callback} value={answer} className={userAnswer?.correctAnswer === answer  ? "correct" : userAnswer?.answer === answer ? "incorrect" : ""} >
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </div>
            ))}
        </div>
    </div>
  ); 
};

export default QuestionCard;
