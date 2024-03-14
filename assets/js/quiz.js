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
    // Automatically show the modal when the page is loaded
    modal.classList.add('is-active');

    const modalBg = modal.querySelector('.modal-background');
    const modalClose = modal.querySelector('.modal-close');

    [modalBg, modalClose].forEach(el => {
        el.addEventListener('click', () => modal.classList.remove('is-active'));
    });

    //Prevent modal content clicks from closing the modal
    document.querySelector('.modal-content').addEventListener('click', (e) => e.stopPropagation());
    apiRequest();
});

function displayQuestions(questions) {
    const container = $('#carousel-demo')
    container.addClass('columns')
    container.empty(); // Clear previous content

    questions.forEach((question, index) => {
        const questionBlock = $('<div>').addClass('question-block column');
        const questionText = $('<p>').addClass('question-text columns is-full').text(`Question ${index + 1}: ${question.question}`);
        const optionBlockA = $('<div>').addClass('option-block columns')
        const optionBlockB = $('<div>').addClass('option-block columns')
        const optionBlockC = $('<div>').addClass('option-block columns')
        const optionBlockD = $('<div>').addClass('option-block columns')
        const optionA = $(`<input type="radio" name="answerChoices${index}" value="optionA">`)
        const optionAText = $('<label for="optionA">').text(question.correctAnswer)
        const optionB = $(`<input type="radio" name="answerChoices${index}" value="optionB">`)
        const optionBText = $('<label for="optionB">').text(question.incorrectAnswers[0])
        const optionC = $(`<input type="radio" name="answerChoices${index}" value="optionC">`)
        const optionCText = $('<label for="optionC">').text(question.incorrectAnswers[1])
        const optionD = $(`<input type="radio" name="answerChoices${index}" value="optionD">`)
        const optionDText = $('<label for="optionD">').text(question.incorrectAnswers[2])
        
        optionBlockA.append(optionA, optionAText)
        optionBlockB.append(optionB, optionBText)
        optionBlockC.append(optionC, optionCText)
        optionBlockD.append(optionD, optionDText)
        questionBlock.append(questionText);
        questionBlock.append(optionBlockA, optionBlockB, optionBlockC, optionBlockD);
        container.append(questionBlock)

    });
    const carousels = bulmaCarousel.attach('#carousel-demo', {
        loop: true,
        slidesToScroll: 1,
        slidesToShow: 1,
    });
}