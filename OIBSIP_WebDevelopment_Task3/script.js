let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

const list = document.getElementById("taskList");

// SAVE
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// TOAST (FIXED PROPERLY)
function showToast(msg) {
  const toast = document.getElementById("toast");

  toast.innerText = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
}

// ADD
function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dueDate").value;
  const category = document.getElementById("category").value;

  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    date,
    category,
    completed: false
  });

  document.getElementById("taskInput").value = "";
  document.getElementById("dueDate").value = "";

  save();
  render();
  showToast("Task added");
}

// TOGGLE
function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  save();
  render();
}

// DELETE (FIXED ICON ISSUE)
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
  showToast("Task deleted");
}

// FILTER
function setFilter(e, type) {
  filter = type;

  document.querySelectorAll(".filters button").forEach(btn =>
    btn.classList.remove("active")
  );

  e.target.classList.add("active");
  render();
}

// RENDER
function render() {
  list.innerHTML = "";

  const search = document.getElementById("search").value.toLowerCase();

  let filtered = tasks.filter(t => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  filtered = filtered.filter(t =>
    t.text.toLowerCase().includes(search)
  );

  filtered.forEach(task => {
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""} 
          onchange="toggleTask(${task.id})" />
        <div>
          <div class="task-text">${task.text}</div>
          <div class="meta">${task.category} | ${task.date || "No date"}</div>
        </div>
      </div>

      <div class="actions">
        <button onclick="deleteTask(${task.id})">
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>
    `;

    list.appendChild(li);
  });
}

// SEARCH
document.getElementById("search").addEventListener("input", render);

// INIT
render();