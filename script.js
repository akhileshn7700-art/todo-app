function addTask(taskText = null, completed = false) {
    let input = document.getElementById("taskInput");
    let task = taskText || input.value;

    if (task === "") return;

    let li = document.createElement("li");
    li.textContent = task;

    if (completed) {
        li.classList.add("done");
    }

    // Mark as completed on click
    li.onclick = function () {
        li.classList.toggle("done");
        saveTasks();
    };

    // Delete button
    let delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = function (e) {
        e.stopPropagation(); // prevent triggering li click
        li.remove();
        saveTasks();
    };

    li.appendChild(delBtn);
    document.getElementById("taskList").appendChild(li);

    input.value = "";

    saveTasks();
}
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            done: li.classList.contains("done")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
window.onload = function () {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTask(task.text, task.done));
};
