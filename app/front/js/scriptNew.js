// DOM Elements
const servingNumberEl = document.getElementById('servingNumber');
const currentContactEl = document.querySelector('.current-contact');
const currentNameEl = document.querySelector('.current-name');
const addForm = document.getElementById('addForm');
const newContactInput = document.getElementById('newContact');
const newNameInput = document.getElementById('newName');
const queueListEl = document.getElementById('queueList');
const queueCountEl = document.getElementById('queueCount');

// State
let servingNumber = 0;
let queueCount = 0;

// Update the displayed serving number
function updateServingDisplay() {
  servingNumberEl.textContent = servingNumber;
}

// Update the displayed queue count
function updateQueueDisplay() {
  queueCountEl.textContent = queueCount;
}

// Append a new person to the queue list
function appendToQueue(name, contact) {
  const li = document.createElement('li');
  li.className = 'queue-item';

  const textSpan = document.createElement('span');
  textSpan.className = 'item-text';
  textSpan.textContent = `${name} – ${contact}`;

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.textContent = '✖';
  removeBtn.addEventListener('click', () => {
    li.remove();
    queueCount -= 1;
    updateQueueDisplay();
  });

  li.appendChild(textSpan);
  li.appendChild(removeBtn);
  queueListEl.appendChild(li);

  queueCount += 1;
  updateQueueDisplay();

  newContactInput.value = '';
  newNameInput.value = '';
}

// Handle serving the next person in the queue
function serveNextPerson() {
  updateServingDisplay();

  const firstItem = queueListEl.querySelector('li');
  if (firstItem) {
    const itemText = firstItem.querySelector('.item-text').textContent;
    const [namePart, contactPart] = itemText.split(' – ');
    currentNameEl.textContent = namePart || 'No one';
    currentContactEl.textContent = contactPart || '(---)';

    firstItem.remove();
    queueCount -= 1;
    updateQueueDisplay();
  } else {
    currentNameEl.textContent = 'No one';
    currentContactEl.textContent = '(---)';
  }
}

// Click to go to next number
servingNumberEl.addEventListener('click', () => {
  servingNumber += 1;
  serveNextPerson();
});

// Right-click to go back
servingNumberEl.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  if (servingNumber > 0) {
    servingNumber -= 1;
    updateServingDisplay();
  }
});

// Handle form submission
addForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const contactVal = newContactInput.value.trim();
  const nameVal = newNameInput.value.trim();
  if (!contactVal || !nameVal) return;

  const isEmail = contactVal.includes('@');

  // AJAX POST to appropriate endpoint (email or SMS)
  $.ajax({
    url: isEmail ? 'https://example.com/send-email' : 'https://example.com/send-sms',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ name: nameVal, contact: contactVal }),
    success: function () {
      alert('User added to queue!');
      appendToQueue(nameVal, contactVal);
    },
    error: function () {
      alert('Failed to add user to the queue. Please try again.');
    }
  });
});

// Initialize UI on load
updateServingDisplay();
updateQueueDisplay();