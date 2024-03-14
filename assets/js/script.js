// submit quiz function
document.addEventListener('DOMContentLoaded', function() {
    // Assuming 'questions' array is populated somewhere in your script or fetched from an API
    const questions = JSON.parse(localStorage.getItem('triviaQuestions')) || [];

    // Submit quiz function
    document.querySelector('#submit-quiz').addEventListener('click', function() {
        var answers = [];
        questions.forEach(function(question, index) {
            var selectedOption = document.querySelector('input[name="answerChoices' + index + '"]:checked');
            if (selectedOption) {
                // Assuming 'question.id' exists, otherwise use 'index' or a suitable identifier
                answers.push({ questionId: question.id, selectedAnswer: selectedOption.value });
            }
        });
        localStorage.setItem('quizAnswers', JSON.stringify(answers));
        // Redirect to results.html to display the answers
        window.location.href = 'results.html';
    });
});
