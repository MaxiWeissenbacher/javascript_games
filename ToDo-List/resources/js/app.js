/*eslint-env browser */

import Task from "./Task.js";
import TaskView from "./TaskView.js";

var taskMap = new Map(),
  taskListEl;

function init() {
  let addTaskButton = document.querySelector(".button.new-task"),
    clearListButton = document.querySelector(".button.clear-list");
  taskListEl = document.querySelector(".task-list");
  addTaskButton.addEventListener("click", addTask);
  clearListButton.addEventListener("click", clearList);
}

function addTask() {
  let newTask = new Task(),
    taskView = new TaskView(newTask);
  taskMap.set(newTask.id, newTask);
  taskListEl.appendChild(taskView.getElement());
  taskView.focus();
}

function clearList() {
  for (let task of taskMap.values()) {
    if (task.completed === true) {
      taskMap.delete(task.id);
      taskListEl.querySelector("[data-id=\"" + task.id + "\"]").remove();
    }
  }
}

init();