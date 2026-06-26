// selecting elements from the page
const taskInput = document.querySelector("input");
const addBtn = document.querySelector(".add-button");
const taskContainer = document.querySelector(".task-container");
const activeBtn = document.querySelector(".active-tasks");
const completedBtn = document.querySelector(".completed-tasks");


// keeps track of the currently selected filter
let currentFilter = "active";


// active tasks is selected by default
activeBtn.classList.add("selected");


// event listeners
addBtn.addEventListener("click", addFunc);

activeBtn.addEventListener("click", () => {
    currentFilter = "active";

    activeBtn.classList.add("selected");
    completedBtn.classList.remove("selected");

    updateTasks();
});

completedBtn.addEventListener("click", () => {
    currentFilter = "completed";

    completedBtn.classList.add("selected");
    activeBtn.classList.remove("selected");

    updateTasks();
});



// FILTERING
// shows or hides tasks based on the selected filter
function updateTasks() {
    const allCards = document.querySelectorAll(".task-card");

    allCards.forEach(card => {
        if (currentFilter === "active") {
            if (card.classList.contains("completed")) {
                card.classList.add("hidden");
            }
            else {
                card.classList.remove("hidden");
            }
        }

        else if (currentFilter === "completed") {
            if (card.classList.contains("completed")) {
                card.classList.remove("hidden");
            }
            else {
                card.classList.add("hidden");
            }
        }

    });

    tasksProgressBar();
}



// ADDING TASK CARDS
// creates a new task card
function addFunc() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }


    // creating the task card
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    taskCard.innerHTML = `  
      
        <div class="card-all-text">  
            <p>${taskText}</p>  
            <input type="text" class="task-description" placeholder="Add description here...">  
        </div>  
          
        <div class="task-card-buttons">  
            <button class="add-description">Add description</button>  
              
            <button class="completed-task">  
                <i class="fa-solid fa-check"></i>  
            </button>  
            <button class="delete-task">  
                <i class="fa-regular fa-trash-can"></i>  
            </button>  
        </div>  
    `;


    // selecting elements inside the task card
    const taskComplete = taskCard.querySelector(".completed-task");
    const delTask = taskCard.querySelector(".delete-task");
    const addDes = taskCard.querySelector(".add-description");
    const description = taskCard.querySelector(".task-description");


    // marks a task as completed
    taskComplete.addEventListener("click", () => {

        taskCard.classList.add("completed");
        taskCard.classList.add("completing");

        setTimeout(() => {

            const message = document.createElement("p");
            message.classList.add("completing-message");
            message.textContent = "✅ Completed";

            taskContainer.insertBefore(message, taskCard);

            taskCard.classList.remove("completing");

            updateTasks();

            setTimeout(() => {
                message.remove();
            }, 1500);

        }, 350);

    });


    // deletes a task
    delTask.addEventListener("click", () => {

        taskCard.classList.add("completing");

        setTimeout(() => {

            const delMessage = document.createElement("p");
            delMessage.classList.add("deleting-message");
            delMessage.textContent = "🗑️ Task deleted";

            taskContainer.insertBefore(delMessage, taskCard);
            
            taskCard.remove();

            setTimeout(() => {
                delMessage.remove();
            }, 1500);

            updateTasks();

        }, 350);

        
    });


    // handles adding, saving and editing the description
    addDes.addEventListener("click", () => {

        if (addDes.textContent === "Add description") {
            description.classList.add("show");
            description.readOnly = false;
            description.focus();
            addDes.textContent = "Save description";
        }

        else if (addDes.textContent === "Save description") {
            description.readOnly = true;
            addDes.textContent = "Edit description";

            // empty description won't show
            if (description.value.trim() === "") {
                description.value = "";
                description.classList.remove("show");
                addDes.textContent = "Add description";
            }
        }

        else {
            description.readOnly = false;
            description.focus();
            addDes.textContent = "Save description";
        }

    });

    taskContainer.appendChild(taskCard);
    updateTasks();    // refreshes the current filter
    taskInput.value = "";

}



// PROGRESS BAR
// selecting elements for the progress bar
const progressText = document.querySelector(".progress-text");
const progressFill = document.querySelector(".progress-fill");


// function to update the progress bar
function tasksProgressBar() {

    // length of total tasks and completed tasks
    const totalTasks = document.querySelectorAll(".task-card").length;
    const completedTasks = document.querySelectorAll(".task-card.completed").length;

    if (totalTasks === 0) {
        progressText.textContent = "0 out of 0 tasks completed";
        progressFill.style.width = "0%";
        return;
    }

    // update progress text
    progressText.textContent = `${completedTasks} out of ${totalTasks} completed`;

    // update progress bar
    const percentage = completedTasks / totalTasks * 100;
    progressFill.style.width = percentage + "%";


    if (percentage === 100) {
        progressText.textContent = "🎉 Yayy all tasks completed!";
    }
}


