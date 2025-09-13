import React from 'react';

// This is a functional component in React, responsible for displaying a single question.
// It's a good practice to keep components small and focused on a single responsibility.
const Question = ({ question, options, onAnswer }) => {
    // This component receives three props:
    // - 'question': A string containing the text of the question.
    // - 'options': An array of strings representing the possible answers.
    // - 'onAnswer': A function that gets called when the user clicks on an answer.

    return (
        // The main container for the question.
        <div className="question-container">
            {/* The question text is displayed in an h2 tag. */}
            <h2>{question}</h2>
            {/* This div will hold the answer options. */}
            <div className="options">
                {/* We use the .map() function to iterate over the 'options' array. */}
                {/* For each 'option' in the array, we create a button. */}
                {options.map((option, index) => (
                    // Each button needs a unique 'key' prop, which helps React identify which items have changed, are added, or are removed.
                    // The 'onClick' event handler calls the 'onAnswer' function passed in through props, with the selected 'option' as an argument.
                    <button key={index} onClick={() => onAnswer(option)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

// We export the Question component to make it available for use in other parts of the application.
export default Question;