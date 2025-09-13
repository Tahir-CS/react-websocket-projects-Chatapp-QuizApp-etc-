import React from 'react';

const Result = ({ score, totalQuestions }) => {
    return (
        <div className="result">
            <h1>Your Score</h1>
            <p>
                You scored {score} out of {totalQuestions}.
            </p>
            {score / totalQuestions > 0.5 ? (
                <p>Congratulations! You passed the quiz!</p>
            ) : (
                <p>Better luck next time!</p>
            )}
        </div>
    );
};

export default Result;