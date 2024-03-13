$(document).ready(function() {
    apiRequest();
});

function apiRequest() {
    const requestUrl = 'https://the-trivia-api.com/api/questions';

    fetch(requestUrl)
        .then(function(response) {
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

// $(document).ready(function() {
//     // Initially hide the message
//     $('.fullscreen-message').hide();

//     // Example: Show the message when a button is clicked (add a button with id="show-message" to your HTML)
//     $('#show-message').click(function() {
//         $('.fullscreen-message').show();
//     });

//     // Hide the message when the delete button is clicked
//     $('.fullscreen-message .delete').click(function() {
//         $(this).closest('.fullscreen-message').hide();
//     });
// });

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
