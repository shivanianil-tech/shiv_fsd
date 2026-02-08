document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll(".content-section");
  const taskList = document.getElementById("taskList");
  const taskCount = document.getElementById("taskCount");
  const dailyNotes = document.getElementById("dailyNotes");

  window.showSection = (id) => {
    sections.forEach(sec => sec.style.display = "none");
    document.getElementById(id).style.display = "block";
  };

  // TASKS
  window.addTask = () => {
    const input = document.getElementById("taskInput");
    if (!input.value.trim()) return;

    const li = document.createElement("li");
    li.innerHTML = `
      <span onclick="toggleTask(this)">${input.value}</span>
      <button onclick="removeTask(this)">✖</button>
    `;
    taskList.appendChild(li);
    input.value = "";
    saveTasks();
  };

  window.toggleTask = (el) => {
    el.parentElement.classList.toggle("done");
    saveTasks();
  };

  window.removeTask = (btn) => {
    btn.parentElement.remove();
    saveTasks();
  };

  function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
    taskCount.textContent = taskList.children.length;
  }

  taskList.innerHTML = localStorage.getItem("tasks") || "";
  taskCount.textContent = taskList.children.length;

  // NOTES
  window.saveNotes = () => {
    localStorage.setItem("notes", dailyNotes.value);
    alert("Notes saved ☕");
  };
  dailyNotes.value = localStorage.getItem("notes") || "";

  // STUDENT INFO
  window.saveStudentInfo = () => {
    const subjects = subjectsInput.value;
    const assignments = assignmentsInput.value;
    const exams = examsInput.value;
    const attendance = attendanceInput.value;

    localStorage.setItem("studentInfo", JSON.stringify({
      subjects, assignments, exams, attendance
    }));

    updateDashboard();
    alert("Student info saved 🎓");
  };

  function updateDashboard() {
    const data = JSON.parse(localStorage.getItem("studentInfo")) || {};
    subjectsCount.textContent = data.subjects || 0;
    assignmentsCount.textContent = data.assignments || 0;
    examsCount.textContent = data.exams || 0;
    attendanceDisplay.textContent = (data.attendance || 0) + "%";
  }

  updateDashboard();

  // DARK MODE
  const toggle = document.getElementById("darkToggle");
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("dark", toggle.checked);
  });

  if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }

});
