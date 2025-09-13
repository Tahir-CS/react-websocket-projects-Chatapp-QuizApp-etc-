// This file exports an array of objects, where each object represents a single quiz question.
// This is a simple and effective way to store quiz data when you don't need a database.
// For a larger application, this data might come from an API.

const quizData = [
    {
        // 'question' holds the text of the question to be displayed.
        question: "What is the capital of France?",
        // 'options' is an array of strings, representing the multiple-choice answers.
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        // 'answer' is the correct answer from the 'options' array.
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "F. Scott Fitzgerald", "Ernest Hemingway"],
        answer: "Harper Lee"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "NaCl"],
        answer: "H2O"
    }
];

// The 'export default' statement makes the quizData array available for other files to import and use.
export default quizData;