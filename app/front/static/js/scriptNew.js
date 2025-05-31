// Elements for serving section
const servingNumberEl = document.getElementById('servingNumber');
const currentContactEl = document.querySelector('.current-contact');
const currentNameEl = document.querySelector('.current-name');

// Elements for add‐to‐queue form & queue display
const addForm = document.getElementById('addForm');
const newPhoneInput = document.getElementById('newPhone');
const newNameInput = document.getElementById('newName');
const queueListEl = document.getElementById('queueList');
const queueCountEl = document.getElementById('queueCount');

// State
let servingNumber = 0;
let queueCount = 0;

// 1) Clicking the large “Now Serving” number → serve next person from queue if exists
servingNumberEl.addEventListener('click', () => {
  servingNumber += 1;
  updateServingDisplay();

  // If queue has at least one person, pop the first and show as current
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

// 2) “Add to Queue” form submission: add that person’s info to queue list
addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const phoneVal = newPhoneInput.value.trim();
  const nameVal = newNameInput.value.trim();
  if (!phoneVal || !nameVal) return;

  // Create list item
  const li = document.createElement('li');
  li.className = 'queue-item';

  const textSpan = document.createElement('span');
  textSpan.className = 'item-text';
  textSpan.textContent = `${nameVal} – ${phoneVal}`;

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
});

// Helpers to update counts
function updateServingDisplay() {
  servingNumberEl.textContent = servingNumber;
}

function updateQueueDisplay() {
  queueCountEl.textContent = queueCount;
}

// Initialize on page load
updateServingDisplay();
updateQueueDisplay();