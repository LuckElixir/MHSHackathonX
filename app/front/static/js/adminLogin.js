$(document).ready(function() {
  $('#loginButton').click(function (e) {
    e.preventDefault();
    console.log("This thing is cooked");
    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();

    console.log("Login button clicked!"); // Add this line for immediate feedback

    // BACKEND INTERACTION: Replace URL with real login endpoint
    $.ajax({
      url: '/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({"email": email, "password": password}),
      success: function () {
        $('#loginMessage').css('color', '#2d8f3b').text('Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = '/queue'; // redirect destination
        }, 1000);
      },
      error: function () {
        $('#loginMessage').css('color', '#d63031').text('Invalid email or password. Please try again.');
      }
    });
  });
});
