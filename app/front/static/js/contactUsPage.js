$(document).ready(function () {
  const $contactPreference = $('#contactPreference');
  const $smsFields = $('#smsFields');
  const $emailFields = $('#emailFields');
  const $submitBtn = $('#submitBtn');
  const $contactForm = $('#contactForm');

  // Toggle visibility of form sections
  function toggleSection($section, show) {
    if (show) {
      $section.addClass('visible');
    } else {
      $section.removeClass('visible');
    }
  }

  // Toggle visibility of submit button
  function toggleSubmitBtn(show) {
    if (show) {
      $submitBtn.addClass('visible');
    } else {
      $submitBtn.removeClass('visible');
    }
  }

  // Show appropriate form section based on dropdown
  $contactPreference.on('change', function () {
    const method = $(this).val();

    toggleSection($smsFields, false);
    toggleSection($emailFields, false);
    toggleSubmitBtn(false);

    if (method === 'sms') {
      toggleSection($smsFields, true);
      toggleSubmitBtn(true);
    } else if (method === 'email') {
      toggleSection($emailFields, true);
      toggleSubmitBtn(true);
    }
  });

  // Attach validation to input
  function setupValidation($inputElem) {
    $inputElem.on('input', function () {
      if (this.checkValidity()) {
        $(this).addClass('valid').removeClass('invalid');
      } else {
        $(this).addClass('invalid').removeClass('valid');
      }
    });
  }

  // Set up validation for phone and email fields
  setupValidation($('#phone'));
  setupValidation($('#email'));

  // Handle form submission via AJAX
  $contactForm.on('submit', function (e) {
    e.preventDefault();

    const method = $contactPreference.val();
    let formData = {};

    if (method === 'sms') {
      formData = {
        name: $('#name_sms').val(),
        phone: $('#phone').val(),
        issue: $('#issue_sms').val(),
        type: 'sms'
      };
    } else if (method === 'email') {
      formData = {
        name: $('#name_email').val(),
        email: $('#email').val(),
        issue: $('#issue_email').val(),
        type: 'email'
      };
    }

    $.ajax({
      url: '/submit', // Replace with actual endpoint
      method: 'POST',
      data: JSON.stringify(formData),
      contentType: 'application/json',
      success: function () {
        alert('Thank you! Your request has been submitted.');
        $contactForm[0].reset();
        toggleSection($smsFields, false);
        toggleSection($emailFields, false);
        toggleSubmitBtn(false);
        $contactPreference.val('');
      },
error: function(xhr, textStatus, errorThrown) {
  // Get the actual HTTP status code
  const statusCode = xhr.status;

  // Try to parse JSON error message from Flask
  let errorMessage = "Unknown error";
  try {
    const response = JSON.parse(xhr.responseText);
    errorMessage = response.message || errorMessage;
  } catch (e) {
    // Not JSON — fallback to default
    errorMessage = "Unexpected error occurred.";
  }

  if (statusCode === 401) {
    alert(errorMessage); // "Number/email already in the queue!"
  } else {
    alert("Oops! " + errorMessage);
  }
}
    });
  });
});
