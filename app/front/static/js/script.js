const contactPreference = document.getElementById('contactPreference');
const smsFields = document.getElementById('smsFields');
const emailFields = document.getElementById('emailFields');
const submitBtn = document.getElementById('submitBtn');

contactPreference.addEventListener('change', () => {
  // Hide all form sections initially
  smsFields.style.display = 'none';
  emailFields.style.display = 'none';
  submitBtn.style.display = 'none';

  // Show relevant fields based on selection
  if (contactPreference.value === 'sms') {
    smsFields.style.display = 'block';
    submitBtn.style.display = 'block';
  } else if (contactPreference.value === 'email') {
    emailFields.style.display = 'block';
    submitBtn.style.display = 'block';
  }
});

// Handle form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simple feedback message
  alert('Thank you! Your request has been submitted. We will contact you soon.');
  contactForm.reset();

  // Hide form sections again
  smsFields.style.display = 'none';
  emailFields.style.display = 'none';
  submitBtn.style.display = 'none';
  contactPreference.value = '';
});