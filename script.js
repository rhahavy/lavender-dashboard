// Lavender Dashboard JavaScript

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const listItem = document.createElement("li");
  listItem.classList.add("fade-in");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.marginRight = "10px";

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  checkbox.addEventListener("change", function () {
    taskSpan.classList.toggle("completed", checkbox.checked);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.onclick = function () {
    listItem.classList.add("fade-out");
    setTimeout(() => {
      listItem.remove();
      const remainingTasks = document.querySelectorAll("#taskList li").length;
      if (remainingTasks === 0) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#E6E6FA', '#D8A7B1', '#C1B2D3', '#FCEFF9']
        });
      }
    }, 400);
  };

  listItem.appendChild(checkbox);
  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(listItem);
  taskInput.value = "";
}

document.getElementById("taskInput")?.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById("clock").textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

function renderCalendar() {
  const calendar = document.getElementById("calendar");
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  calendar.textContent = today.toLocaleDateString(undefined, options);
}
renderCalendar();

const quotes = [
  "Progress, not perfection.",
  "You’ve got this!",
  "Done is better than perfect.",
  "Small steps every day.",
  "Start where you are. Use what you have. Do what you can."
];

function loadQuote() {
  const quoteText = document.getElementById("quoteText");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = `"${quotes[randomIndex]}"`;
}
loadQuote();
setInterval(loadQuote, 20000);

function addScheduleItem() {
  const time = document.getElementById("timeInput").value.trim();
  const activity = document.getElementById("activityInput").value.trim();
  if (!time || !activity) return;

  const ul = document.querySelector(".time-blocks ul");
  const li = document.createElement("li");

  const itemContent = document.createElement("span");
  itemContent.innerHTML = `<strong>${time}</strong> ${activity}`;
  itemContent.contentEditable = "true";
  itemContent.style.outline = "none";
  itemContent.title = "Click to edit";

  itemContent.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      itemContent.blur();
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("schedule-delete");
  deleteBtn.onclick = function () {
    li.remove();
  };

  li.appendChild(itemContent);
  li.appendChild(deleteBtn);
  ul.appendChild(li);

  document.getElementById("timeInput").value = "";
  document.getElementById("activityInput").value = "";
}

// ✅ Fixed version of enterDashboard
function enterDashboard() {
  document.getElementById("homepage").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}
