$(document).ready(function () {
  const $serveNextBtn = $("#serveNextBtn");
  const $currentContact = $("#current-contact");
  const $currentName = $("#current-name");
  const $queueList = $("#queueList");
  const $queueCount = $("#queueCount");

  // Helper: Extract the preferred contact (Phone or Email)
  function getContact(person) {
    return person.Phone ? person.Phone : person.Email;
  }

  // Update the list of people in queue
function updateQueueDisplay(queue) {
    $queueList.empty();
    $queueCount.text(queue.length);

    // Update "Now Serving"
    if (queue.length > 0) {
      const person = queue[0]; // First in queue
      const contact = getContact(person);
      $currentContact.text(contact);
      $currentName.text(person.Name);
    } else {
      $currentContact.text("(---) --------");
      $currentName.text("No one");
    }

    // Render full queue list
    queue.forEach((person) => {
      const contact = getContact(person);
      const $li = $(`
        <li class="queue-item">
          <span class="queue-name">${person.Name}</span>
          <span class="queue-contact">${contact}</span>
        </li>
      `);
      $queueList.append($li);
    });
  }


  // Fetch the queue from the backend
  function fetchQueue() {
    $.ajax({
      url: "/api/pull",
      method: "GET",
      dataType: "json",
      success: function (data) {
        updateQueueDisplay(data);
      },
      error: function () {
        console.error("Error fetching queue data.");
      }
    });
  }

  // Serve the next person
  function serveNextPerson() {
    $.ajax({
      url: "/api/pop",
      method: "POST",
      dataType: "json",
      success: function (person) {
        if (!person || (!person.Phone && !person.Email)) {
          $currentContact.text("(---) --------");
          $currentName.text("No one");
        } else {
          const contact = getContact(person);
          $currentContact.text(contact);
          $currentName.text(person.Name);
        }

        fetchQueue(); // Refresh queue after serving
      },
      error: function () {
        console.error("Error serving next person.");
      }
    });
  }

  // Bind click event to Serve Next button
  $serveNextBtn.on("click", serveNextPerson);

  // Initial fetch
  fetchQueue();

  // Auto-refresh the queue every 5 seconds
  setInterval(fetchQueue, 5000);
});
