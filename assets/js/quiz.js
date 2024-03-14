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

// modal for javascript: https://bulma.io/documentation/components/modal/#image-modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('trivlModal');
    // Automatically show the modal when the page is loaded
    modal.classList.add('is-active');

    const modalBg = modal.querySelector('.modal-background');
    const modalClose = modal.querySelector('.modal-close');

    [modalBg, modalClose].forEach(el => {
        el.addEventListener('click', () => modal.classList.remove('is-active'));
    });

    //Prevent modal content clicks from closing the modal
    document.querySelector('.modal-content').addEventListener('click', (e) => e.stopPropagation());
});

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