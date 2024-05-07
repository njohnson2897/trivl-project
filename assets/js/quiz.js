const oneDayCountdown = 24 * 60 * 60 * 1000   //    one day in milliseconds 24 * 60 * 60 * 1000

function apiRequest() {
    const fetchAndDisplayQuestions = () => {
        console.log("fetching new questions")
        const requestUrl = 'https://the-trivia-api.com/api/questions';

        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                localStorage.setItem('triviaQuestions', JSON.stringify(data));


                displayQuestions(data);
            })

            // .catch statement : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
            .catch(function (error) {
                console.error('Fetch error:', error);
                $('#carousel-demo').text('Failed to load questions. Please try again later.');
            });

    }

    const updateData = () => {
        const triviaQuestions = localStorage.getItem('triviaQuestions');
        const lastUpdateTime = localStorage.getItem('lastUpdateTime');
        const currentTime = new Date().getTime();

        if (triviaQuestions && lastUpdateTime && (currentTime - parseInt(lastUpdateTime) < oneDayCountdown - 1000)) {
            console.log(currentTime, parseInt(lastUpdateTime))
            const parsedData = JSON.parse(triviaQuestions);
            displayQuestions(parsedData);
        } else {
            fetchAndDisplayQuestions();
            localStorage.setItem('lastUpdateTime', currentTime.toString());
        }
    }

    updateData();

    // setInterval(updateData, oneDayCountdown);
}

// modal for javascript: https://bulma.io/documentation/components/modal/#image-modal
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired!');
    const trivlModal = document.getElementById('trivlModal');
    const timerModal = document.getElementById('timerModal');
    // Tracks if quiz has been taken
    const trackUse = localStorage.getItem("takenQuiz");
    console.log(typeof (trackUse))

    if (trackUse === "true") {
        console.log("already took it!");
        // Show the timerModal only if the quiz has been taken
        if (timerModal) {
            timerModal.classList.add('is-active');
            console.log('openingTimer')
            setupModal(timerModal);
        } else {
            console.error('Timer Modal element not found');
        }
    } else {
        // Show the trivlModal if the quiz has not been taken
        //setTimeout(function(){

            if (trivlModal) {
                trivlModal.classList.add('is-active');
                setupModal(trivlModal);
                apiRequest();
            } else {
                console.error('Trivl Modal element not found');
            }
        
        //}, 1000)

    }
    function setupModal(modal) {
        const modalBg = modal.querySelector('.modal-background');
        const modalClose = modal.querySelector('.modal-close');
        [modalBg, modalClose].forEach(el => {
            if (el) {
                el.addEventListener('click', () => modal.classList.remove('is-active'));
            }
        });
        // Prevent modal content clicks from closing the modal
        let modalContent = modal.querySelector('.modal-content');
        console.log(modalContent)
        if (modalContent) {
            modalContent.addEventListener('click', (e) => e.stopPropagation());
        }
    }
    $("#timer-reset").on('dblclick', () => {
        localStorage.setItem("takenQuiz", "false")
        localStorage.removeItem("lastUpdateTime");
        clearInterval(timerInterval);
        apiRequest()
        $('#timer').text(`Generating New Quiz`);
    });
});
// Function to display quiz questions and their options as buttons
function displayQuestions(questions) {
    const container = $('#carousel-demo');
    container.empty();

    // Define the audio element for button clicks
    const clickSound = new Audio('./assets/audio/button_click.mp3');

    questions.forEach((question, index) => {
        const questionBlock = $('<div>').addClass('carousel-item question-block');
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
                // jQuery method for .on, used by attech
                .on('click', function () {
                    // play click sound on.click
                    clickSound.pause(); // Reset audio playback position
                    clickSound.currentTime = 0; // Ensures the sound can play from start immediately
                    clickSound.play().catch(function (error) {
                        console.error('Audio playback failed:', error);
                    });
                    // Handle option selection UI feedback
                    $(this).closest('.question-block').find('.option-button').removeClass('selected');
                    $(this).addClass('selected');

                    // Store the answer
                    const answerData = {
                        sessionId: localStorage.getItem('quizSessionId'),
                        questionId: question.id,
                        selectedAnswer: option.value
                    };
                    localStorage.setItem(`question${index}`, JSON.stringify(answerData));

                    // Advance to the next question in the carousel
                    myCarouselInstance.next();

                    // Check if all questions have been answered
                    checkIfAllQuestionsAnswered(questions);
                });
        });

        questionBlock.append(questionText, ...optionButtons);
        container.append(questionBlock);
    });

    // Initialize the carousel and store the instance for later use
    var quizCarousel = bulmaCarousel.attach('#carousel-demo', {
        slidesToShow: 1,
        slidesToScroll: 1,
        loop: false,
        infinite: false
    });
    window.myCarouselInstance = quizCarousel[0];
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
        $('#submit-quiz').show();
    } else {
        $('#submit-quiz').hide();
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

$(document).ready(function () {
    // Hide the submit button initially
    $('#submit-quiz').hide();

    // Clear quiz-related localStorage items for a fresh start
    // similiar to C+ but review this for more information: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('question') || key === 'quizSessionId') {
            localStorage.removeItem(key);
        }
    });

    // Generate a new session ID for this quiz attempt
    const sessionId = new Date().getTime();
    localStorage.setItem('quizSessionId', sessionId.toString());

    // Load the questions and initialize the quiz
    // Assuming displayQuestions is called within loadQuestions() or directly here
    // displayQuestions(quizQuestions); // Replace quizQuestions with your questions array or fetching mechanism
});
// document.addEventListener('DOMContentLoaded', function() {
// Ensure the submit button is fully loaded before attaching the event listener
const submitQuizBtn = document.getElementById('submit-quiz');
if (submitQuizBtn) {
    submitQuizBtn.addEventListener('click', function () {
        console.log("gothere3");
        const questions = JSON.parse(localStorage.getItem('triviaQuestions')) || [];
        let answers = [];

        let correctCount = 0
        questions.forEach(function (question, index) {
            // let selectedOption = document.querySelector(`input[name="answerChoices${index}"]:checked`);
            const userChoice = JSON.parse(localStorage.getItem(`question${index}`));


            console.log(`question${index}`)
            console.log(index, question.correctAnswer, userChoice);
            if (userChoice) {
                if (question.correctAnswer === userChoice.selectedAnswer) {
                    correctCount = correctCount + 1
                }
            }

        });

        for (let index = 0; index < answers.length; index++) {
            const element = answers[index];
            console.log(answers[index]);
        }

        // Store the total number of correct answers and total questions for access in results.html
        localStorage.setItem('correctCount', correctCount);
        localStorage.setItem('totalQuestions', questions.length);
        localStorage.setItem('takenQuiz', "true");
        // Redirect to results.html to display the results
        window.location.href = 'results.html';
    });
} else {
    console.error('Submit button not found.');
}
const timerInterval = setInterval(() => {
    const timer = $('#timer')
    const currentTime = (new Date().getTime() / 1000)
    const lastUpdateTime = parseInt(localStorage.getItem('lastUpdateTime')) / 1000;
    const timeSinceUpdate = (currentTime - lastUpdateTime)
    const expiryTime = (oneDayCountdown / 1000) - timeSinceUpdate;
    console.log(timeSinceUpdate, expiryTime)
    const hours = Math.floor(expiryTime / 3600) % 24
    const minutes = Math.floor((expiryTime % (60 * 60) / 60))
    const seconds = Math.floor((expiryTime % (60 * 60)) % 60)
    console.log(`${hours}h ${minutes}m ${seconds}s`)
    if (expiryTime <= 0) {
        localStorage.setItem("takenQuiz", "false")
        clearInterval(timerInterval);
        apiRequest()
        // location.reload()
        timer.text(`Generating New Quiz`);

    } else {
        timer.text(`Time remaining to next quiz: ${hours}h ${minutes}m ${seconds}s`);
    }
}, 1000); // Update every second






