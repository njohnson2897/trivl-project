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
    const container = $('#carousel-demo');
    container.empty(); // Clear previous content
    
    questions.forEach((question, index) => {
        const questionBlock = $('<div>').addClass('question-block');
        const questionText = $('<p>').addClass('question-text').text(`Question ${index + 1}: ${question.question}`);
        const answerText = $('<p>').addClass('answer-text').html(`Answer: <strong>${question.correctAnswer}</strong>`);
        
        questionBlock.append(questionText, answerText);
        container.append(questionBlock);

    });
        const carousels = bulmaCarousel.attach('#carousel-demo',{
            loop: true,
            slidesToScroll: 1,
            slidesToShow: 1,
    });
}

// To access to bulmaCarousel instance of an element
const element = document.querySelector('#my-element');
if (element && element.bulmaCarousel) {
	// bulmaCarousel instance is available as element.bulmaCarousel
}



$(document).ready(function() {
    apiRequest();
});