// Update questions every 24 hours, (I think this would go at the bottom of the apiRequest function)
setInterval(apiRequest, 24 * 60 * 60 * 1000); // 24 hours in milliseconds, (here for later use) 
// We have to locally store the questions. 
// When the user accesses the page check if they are stored in the local storage.
//If they are, dislplay those questions; if not, fetch the questions from the server.