import React, { useState } from 'react';
import Question from './Question';
import quizData from '../utils/quizData';

// This is the main component for the quiz logic.
// It manages the state of the quiz, such as the current question, the score, and whether the quiz is finished.
const Quiz = ({ onComplete }) => {
    // 'useState' is a React Hook that lets you add state to functional components.
    // 'currentQuestionIndex' keeps track of which question the user is on. It starts at 0 (the first question).
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // 'score' holds the number of correct answers. It starts at 0.
    const [score, setScore] = useState(0);

    // This function is called when the user selects an
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setIsQuizFinished(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsQuizFinished(false);
    };

    return (
        <div className="quiz-container">
            {isQuizFinished ? (
                <Result score={score} totalQuestions={quizData.length} restartQuiz={restartQuiz} />
            ) : (
                <Question 
                    question={quizData[currentQuestionIndex]} 
                    handleAnswer={handleAnswer} 
                />
            )}
        </div>
    );
};

export default Quiz;