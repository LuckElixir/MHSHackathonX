// Elements
const contactPreference = document.getElementById('contactPreference');
const smsFields = document.getElementById('smsFields');
const emailFields = document.getElementById('emailFields');
const submitBtn = document.getElementById('submitBtn');
const contactForm = document.getElementById('contactForm');

// Helper: show or hide a section by toggling the "visible" class
function toggleSection(section, show) {
  if (show) {
    section.classList.add('visible');
  } else {
    section.classList.remove('visible');
  }
}

// 1) Animate the form sections when dropdown changes
contactPreference.addEventListener('change', () => {
  const method = contactPreference.value;

  // Hide both first
  toggleSection(smsFields, false);
  toggleSection(emailFields, false);
  toggleSection(submitBtn, false);

  // Show the one chosen
  if (method === 'sms') {
    toggleSection(smsFields, true);
    toggleSection(submitBtn, true);
  } else if (method === 'email') {
    toggleSection(emailFields, true);
    toggleSection(submitBtn, true);
  }
});

// 2) Live validation feedback for phone & email
function setupValidation(inputElem) {
  inputElem.addEventListener('input', () => {
    // If field is required and valid according to its built-in pattern/type
    if (inputElem.checkValidity()) {
      inputElem.classList.add('valid');
      inputElem.classList.remove('invalid');
    } else {
      inputElem.classList.add('invalid');
      inputElem.classList.remove('valid');
    }
  });
}

// Attach validation to both phone and email inputs
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
if (phoneInput) setupValidation(phoneInput);
if (emailInput) setupValidation(emailInput);

// 3) Handle form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simple confirmation message
  alert('Thank you! Your request has been submitted. We will contact you soon.');

  // Reset & hide everything again
  contactForm.reset();
  toggleSection(smsFields, false);
  toggleSection(emailFields, false);
  toggleSection(submitBtn, false);
  contactPreference.value = '';
});