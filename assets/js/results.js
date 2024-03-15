// extra line comments so I can remember how to do this :)
// Listen for the DOMContentLoaded event to ensure the DOM is fully loaded before executing the script.
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve stored questions and answers from localStorage
    var questions = JSON.parse(localStorage.getItem('triviaQuestions')) || [];
     var correctCount = JSON.parse(localStorage.getItem('correctCount')) || 0;
    
    // Assuming there's an element with the ID 'results-container' in your results.html
    var resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
        resultsContainer.innerHTML = `You answered ${correctCount} out of ${questions.length} questions correctly.`;
    } else {
        // Fallback if 'results-container' does not exist
        var fallbackContainer = document.createElement('div');
        fallbackContainer.innerHTML = `You answered ${correctCount} out of ${questions.length} questions correctly.`;
        document.body.appendChild(fallbackContainer);
    }
});
