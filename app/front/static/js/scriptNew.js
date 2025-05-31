// Elements
const servingNumberEl = document.getElementById('servingNumber');
const currentContactEl = document.querySelector('.current-contact');
const currentNameEl = document.querySelector('.current-name');

const addForm = document.getElementById('addForm');
const newPhoneInput = document.getElementById('newPhone');
const newNameInput = document.getElementById('newName');
const queueListEl = document.getElementById('queueList');
const queueCountEl = document.getElementById('queueCount');

let servingNumber = 0;
let queueCount = 0;

// Update UI displays
function updateServingDisplay() {
  servingNumberEl.textContent = servingNumber;
}

function updateQueueDisplay() {
  queueCountEl.textContent = queueCount;
}

function appendToQueue(name, phone) {
  const li = document.createElement('li');
  li.className = 'queue-item';

  const textSpan = document.createElement('span');
  textSpan.className = 'item-text';
  textSpan.textContent = `${name} – ${phone}`;

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

  newPhoneInput.value = '';
  newNameInput.value = '';
}

// Serve next person
servingNumberEl.addEventListener('click', () => {
  servingNumber += 1;
  updateServingDisplay();

  const firstItem = queueListEl.querySelector('li');
  if (firstItem) {
    const itemText = firstItem.querySelector('.item-text').textContent;
    const [namePart, phonePart] = itemText.split(' – ');
    currentNameEl.textContent = namePart || 'No one';
    currentContactEl.textContent = phonePart || '(---) --------';

    firstItem.remove();
    queueCount -= 1;
    updateQueueDisplay();
  } else {
    currentNameEl.textContent = 'No one';
    currentContactEl.textContent = '(---) --------';
  }
});

// Add to queue with simulated AJAX response
addForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const phoneVal = newPhoneInput.value.trim();
  const nameVal = newNameInput.value.trim();
  if (!phoneVal || !nameVal) return;

  // Simulated success response
  alert('Successfully added to the queue! (Simulated)');
  appendToQueue(nameVal, phoneVal);

  /*
  // AJAX POST to dummy URL
  $.ajax({
    url: 'https://example.com/api/add-to-queue',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ name: nameVal, phone: phoneVal }),
    success: function () {
      alert('Successfully added to the queue!');
      appendToQueue(nameVal, phoneVal);
    },
    error: function () {
      alert('Failed to add to the queue. Please try again.');
    }
  });
  */
});

// Init displays
updateServingDisplay();
updateQueueDisplay();