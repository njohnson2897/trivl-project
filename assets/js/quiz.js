$(document).ready(function() {
    apiRequest();
});

function apiRequest() {
    const requestUrl = 'https://the-trivia-api.com/api/questions';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            displayQuestions(data);
        })
        .catch(function(error) {
            console.error('Fetch error:', error);
            $('#quiz-container').text('Failed to load questions. Please try again later.');
        });
}

function displayQuestions(questions) {
    const container = $('#quiz-container');
    container.empty(); // Clear previous content
    
    questions.forEach((question, index) => {
        const questionBlock = $('<div>').addClass('question-block');
        const questionText = $('<p>').addClass('question-text').text(`Question ${index + 1}: ${question.question}`);
        const answerText = $('<p>').addClass('answer-text').html(`Answer: <strong>${question.correctAnswer}</strong>`);
        
        questionBlock.append(questionText, answerText);
        container.append(questionBlock);
    });
}
