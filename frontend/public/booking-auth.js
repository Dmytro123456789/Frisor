// Booking page auth logic
(function() {
  const storage = localStorage;
  const TOKEN_KEY = 'token';
  function isLoggedIn() {
    return !!storage.getItem(TOKEN_KEY);
  }
  function showAuthMessage() {
    let msg = document.createElement('div');
    msg.className = 'auth-message';
    msg.innerText = 'Please log in to book an appointment.';
    document.querySelector('.booking-section')?.prepend(msg);
  }
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#bookingForm');
    if (!form) return;
    if (!isLoggedIn()) {
      form.style.display = 'none';
      showAuthMessage();
    } else {
      form.style.display = '';
      let msg = document.querySelector('.auth-message');
      if (msg) msg.remove();
    }
  });
})(); 