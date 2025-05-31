$(document).ready(function () {
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();

    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();

    // 🔁 BACKEND INTERACTION: Replace URL with real login endpoint
    $.ajax({
      url: 'https://example.com/api/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
      success: function () {
        $('#loginMessage').css('color', '#2d8f3b').text('Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = 'indexNew.html'; // redirect destination
        }, 1000);
      },
      error: function () {
        $('#loginMessage').css('color', '#d63031').text('Invalid email or password. Please try again.');
      }
    });
  });
});