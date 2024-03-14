// extra line comments so I can remember how to do this :)
// Listen for the DOMContentLoaded event to ensure the DOM is fully loaded before executing the script.
document.addEventListener('DOMContentLoaded', function() {
    var questions = JSON.parse(localStorage.getItem('triviaQuestions')) || [];
    // Retrieve the array of user answers from localStorage, or initialize as an empty array if not found.
    var answers = JSON.parse(localStorage.getItem('quizAnswers')) || [];
    // Initialize a counter to track the number of correct answers.
    var correctCount = 0;

    answers.forEach(function(answer) {
        // Find the corresponding question in the questions array using the question ID.
        var question = questions.find(function(q) { return q.id === answer.questionId; });
        // Check if the question exists then selected answer matches the correct answer.
        if (question && question.correctAnswer === answer.selectedAnswer) {
            // Increment the correct answer count if the answer is correct.
            correctCount++;
        }
    });

    // Create a new div element to serve as the container for the results display.
    var resultsContainer = document.createElement('div');
    // Set the inner HTML of the results container to display the number of correct answers out of the total number of questions.
    resultsContainer.innerHTML = 'You answered ' + correctCount + ' out of ' + questions.length + ' questions correctly.';
    // Append the results container to the body of the document, making it visible on the page.
    document.body.appendChild(resultsContainer);
});