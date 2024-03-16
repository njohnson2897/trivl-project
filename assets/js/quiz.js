function apiRequest() {
    const fetchAndDisplayQuestions = () => {
        const requestUrl = 'https://the-trivia-api.com/api/questions';

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                localStorage.setItem('triviaQuestions', JSON.stringify(data));


                displayQuestions(data);
            })


            .catch(function (error) {
                console.error('Fetch error:', error);
                $('#carousel-demo').text('Failed to load questions. Please try again later.');
            });

    }

    const updateData = () => {
        const triviaQuestions = localStorage.getItem('triviaQuestions');
        const lastUpdateTime = localStorage.getItem('lastUpdateTime');
        const currentTime = new Date().getTime();

        if (triviaQuestions && lastUpdateTime && (currentTime - parseInt(lastUpdateTime) < 60 * 1000)) { // set to one minute for showing purposes
            const parsedData = JSON.parse(triviaQuestions);                                              //    for a daily question change add 24 * 60 * 60 * 1000
            displayQuestions(parsedData);
        } else {
            fetchAndDisplayQuestions();
            localStorage.setItem('lastUpdateTime', currentTime.toString());
        }
    }

    updateData();

    setInterval(updateData, 24 * 60 * 60 * 1000);
}

// modal for javascript: https://bulma.io/documentation/components/modal/#image-modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('trivlModal');
    if (modal) {
        // Automatically show the modal when the page is loaded
        modal.classList.add('is-active');

        const modalBg = modal.querySelector('.modal-background');
        const modalClose = modal.querySelector('.modal-close');

        [modalBg, modalClose].forEach(el => {
            if (el) {
                el.addEventListener('click', () => modal.classList.remove('is-active'));
            }
        });

        //Prevent modal content clicks from closing the modal
        let modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => e.stopPropagation());
        }

        apiRequest();
    } else {
        console.error('Modal element not found');
    }
});

// Function to display quiz questions and their options as buttons
function displayQuestions(questions) {
    const container = $('#carousel-demo');
    container.empty();

    questions.forEach((question, index) => {
        const questionBlock = $('<div>').addClass('question-block');
        const questionText = $('<p>').addClass('question-text').text(`Question ${index + 1}: ${question.question}`);

        let options = [
            { value: question.correctAnswer, text: question.correctAnswer },
            ...question.incorrectAnswers.map(answer => ({ value: answer, text: answer }))
        ];

        shuffleArray(options);

        const optionButtons = options.map(option => {
            return $('<button>')
                .addClass('button option-button')
                .text(option.text)
                .click(function() {
                    localStorage.setItem(`question${index}`, JSON.stringify({ questionId: question.id, selectedAnswer: option.value }));
                    $(this).siblings().removeClass('is-selected');
                    $(this).addClass('is-selected');
                    
                    // Check if all questions have been answered after each selection
                    checkIfAllQuestionsAnswered(questions);
                });
        });

        questionBlock.append(questionText, ...optionButtons);
        container.append(questionBlock);
    });

    // Check if all questions have been answered already (useful for page refreshes)
    checkIfAllQuestionsAnswered(questions);

    const carousels = bulmaCarousel.attach('#carousel-demo', {
        loop: true,
        slidesToScroll: 1,
        slidesToShow: 1,
    });
}

function checkIfAllQuestionsAnswered(questions) {
    let allAnswered = true;
    for (let i = 0; i < questions.length; i++) {
        if (!localStorage.getItem(`question${i}`)) {
            allAnswered = false;
            break;
        }
    }

    if (allAnswered) {
        $('#submit-quiz').show(); // Or use .prop('disabled', false) if the button is initially disabled
    } else {
        $('#submit-quiz').hide(); // Or use .prop('disabled', true) to disable the button
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

$(document).ready(function() {
    $('#submit-quiz').hide(); // Optionally hide the submit button on page load
});

// document.addEventListener('DOMContentLoaded', function() {
    // Ensure the submit button is fully loaded before attaching the event listener
    const submitQuizBtn = document.getElementById('submit-quiz');
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', function() {
            console.log("gothere3");
            const questions = JSON.parse(localStorage.getItem('triviaQuestions')) || [];
            let answers = [];
            
            let correctCount = 0
            questions.forEach(function(question, index) {
                // let selectedOption = document.querySelector(`input[name="answerChoices${index}"]:checked`);
                const userChoice = JSON.parse(localStorage.getItem(`question${index}`));

            
                console.log(`question${index}`)
                console.log(index,question.correctAnswer, userChoice);
                if (userChoice) {
                if (question.correctAnswer === userChoice.selectedAnswer) {
                    correctCount = correctCount + 1 
                 }}
            
            });

            for (let index = 0; index < answers.length; index++) {
                const element = answers[index];
                console.log(answers[index]);   
            }

            // Store the total number of correct answers and total questions for access in results.html
            localStorage.setItem('correctCount', correctCount);
            localStorage.setItem('totalQuestions', questions.length);
            
            // Redirect to results.html to display the results
            window.location.href = 'results.html';
        });
    } else {
        console.error('Submit button not found.');
    }

