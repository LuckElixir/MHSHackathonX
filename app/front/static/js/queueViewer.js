const serveNextBtn = document.getElementById('serveNextBtn');
const currentContactEl = document.querySelector('.current-contact');
const currentNameEl = document.querySelector('.current-name');

const addForm = document.getElementById('addForm');
const newPhoneInput = document.getElementById('newPhone');
const newNameInput = document.getElementById('newName');
const queueListEl = document.getElementById('queueList');
const queueCountEl = document.getElementById('queueCount');

let queueCount = 0;

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
serveNextBtn.addEventListener('click', () => {
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

// Add to queue
addForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const phoneVal = newPhoneInput.value.trim();
  const nameVal = newNameInput.value.trim();
  if (!phoneVal || !nameVal) return;

  alert('Successfully added to the queue! (Simulated)');
  appendToQueue(nameVal, phoneVal);

  // AJAX call placeholder
  /*
  $.ajax({
    url: '/api/add',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ name: nameVal, phone: phoneVal }),
    success: () => appendToQueue(nameVal, phoneVal),
    error: () => alert('Failed to add to the queue.')
  });
  */
});

// Initial update
updateQueueDisplay();