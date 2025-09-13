import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import quizData from './utils/quizData';

const App = () => {
    const [score, setScore] = useState(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);

    const handleQuizCompletion = (finalScore) => {
        setScore(finalScore);
        setIsQuizCompleted(true);
    };

    return (
        <div>
            <h1>Quiz Application</h1>
            {isQuizCompleted ? (
                <Result score={score} totalQuestions={quizData.length} />
            ) : (
                <Quiz onComplete={handleQuizCompletion} />
            )}
        </div>
    );
};

export default App;