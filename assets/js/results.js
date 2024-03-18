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
  
  // Get the modal
  var modal = document.getElementById("myModal");
  
  // Get the button that opens the modal
  var btn = document.getElementById("openModalBtn");
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  
  // When the user clicks the button, open the modal 
  const answerList = $('#answerList')
  btn.onclick = function() {
    modal.style.display = "block";
    answerList.empty()
    const answerKey = JSON.parse(localStorage.getItem('triviaQuestions'))
    console.log(answerKey)
    for (let i=0; i<answerKey.length; i++) {
    const question = $('<li>')
    const answer =  $('<li>')
    question.text(`Question: ${answerKey[i].question}`)
    answer.text(`Correct Answer: ${answerKey[i].correctAnswer}`)
    answerList.append(question, answer)
    };
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
