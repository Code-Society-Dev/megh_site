const task = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector("#time #taskName");

renderTime();
renderTask();


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value !== "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTask();
  }
});

function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    tittle: value,
    completed: false,
  };

  task.unshift(newTask);
}

function renderTask() {
  const html = task.map((task) => {
    return `  <div class="task">
                <div class="completed">${
                  task.completed
                    ? `<span class="done">Done</span>`
                    : `<button class="start-button" data-id="${task.id}">Start</button>`
                }</div>
                <div class="tittle">${task.tittle}</div>
                </div>
                `;
  });

  const taskContainer = document.querySelector("#tasks");
  taskContainer.innerHTML = html.join(" ");

  const startButtons = document.querySelectorAll(".task .start-button");

  startButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (!timer) {
        const id = button.getAttribute("data-id");
        starButtonHandler(id);
        button.textContent = "In Progress";
      }
    });
  });
}

function starButtonHandler(id) {
  time = 25 * 60;
  current = id;
  const taskIndex = task.findIndex((task) => task.id === id);
  const taskName = document.querySelector("#time #taskName");
  taskName.textContent = task[taskIndex].tittle;

  timer = setInterval(() => {
    timeHandler(id);
  }, 1000);
}

function timeHandler(id) {
    time--;
    renderTime();

    if (time === 0) {
      clearInterval(timer);
      current = null;
      markCompleted(id);
      timer = null;
      renderTask();
      startBreak();

    }
}

function timeHandlerBreak() {
    time--;
    renderTime();

    if (time === 0) {
      clearInterval(timerBreak);
      current = null;
      timerBreak = null;
      taskName.textContent = " ";
    }
}

function renderTime() {
    const timeDiv = document.querySelector("#time #value");
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);
        //esto es para que cuando llegue a 0 se detenga el timer
    timeDiv.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function markCompleted(id) {
    const taskIndex = task.findIndex((task) => task.id === id);
    task[taskIndex].completed = true;
}

function startBreak() {
    time = 5 * 60;
    taskName.textContent = "Break";
    timerBreak = setInterval(() => {
        timeHandlerBreak();
    }, 1000);
}