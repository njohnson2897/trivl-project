function apiRequest() {
    const requestUrl = 'https://the-trivia-api.com/v2/questions';

    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            console.log(data)
            const list = $('<ul>')
            const container = $('#list-container') 
            data.forEach((question) => {
                const listItem = $('<li>');
                listItem.html(`${question.question.text} <br> Answer: ${question.correctAnswer} <br> Incorrect Answers: ${question.incorrectAnswers}`)
                list.append(listItem)
                container.append(list)
            });
            
        });
}