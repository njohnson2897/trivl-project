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
            $('#carousel-demo').text('Failed to load questions. Please try again later.');
        });
}

function displayQuestions(questions) {
    const container = $('#carousel-demo');
    container.empty(); // Clear previous content
    
    questions.forEach((question, index) => {
        const questionBlock = $('<div>').addClass('question-block');
        const questionText = $('<p>').addClass('question-text').text(`Question ${index + 1}: ${question.question}`);
        // const answerText = $('<p>').addClass('answer-text').html(`Answer: <strong>${question.correctAnswer}</strong>`);
        // const questionText = $('<')
        
        questionBlock.append(questionText);
        // questionBlock.append(answerText);
        container.append(questionBlock);

    });
        const carousels = bulmaCarousel.attach('#carousel-demo',{
            loop: true,
            slidesToScroll: 1,
            slidesToShow: 1,
    });
}




$(document).ready(function() {
    apiRequest();
});