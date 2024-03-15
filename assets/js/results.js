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
  btn.onclick = function() {
    modal.style.display = "block";
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
  