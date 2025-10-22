//ـــــــــــــــــــــTo Do List Poject (Pure JS) ــــــــــــــــــــــ
//ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
//ـــــــــــــــــــــــGet elements from htmlـــــــــــــــــــــــــ
let tasksArr = [];

//Load saved tasks
let savedTasks = localStorage.getItem("tasks");
if (savedTasks){
    tasksArr= JSON.parse(savedTasks);
}
//ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
let createBtn = document.getElementById("addBtn");
let removeAllBtn = document.getElementById("removeAllBtn");
let taskName = document.getElementById("taskName");
let taskDetails = document.getElementById("textArea");
let tasksContainer = document.getElementById("outputs");
//ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
let taskNumber = tasksArr.length+1;
//ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
//ـــــــــــــــــــــــCreate Tasks Containerــــــــــــــــــــــــــ
createBtn.onclick = function () {
  if (taskName.value !== "" && taskDetails.value !== "") {
    let newTask = {
      TNumber: taskNumber,
      TName: taskName.value,
      TDetails: taskDetails.value,
      editMode: false, //for (i) task (unique mode)
    };
    tasksArr.push(newTask);
    taskNumber++;
    saveTasks();
    showtasks();
    taskName.value="";
    taskDetails.value="";
  }
};
//ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
//ـــــــــــــــــــــــــــــShow Tsksـــــــــــــــــــــــــــــــ
function showtasks() {
  tasksContainer.innerHTML = "";

  for (let i = 0; i < tasksArr.length; i++) {
    let taskDiv = document.createElement("div");
    taskDiv.className = "taskBox";
    //ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
    // Edit Mode
    if (tasksArr[i].editMode) {
      taskDiv.innerHTML = `
        <input type="text" id="editName" value="${tasksArr[i].TName}">
        <textarea id="editDetails">${tasksArr[i].TDetails}</textarea>
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
        <hr>
      `;
      //ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
      // Save Edits
      let saveBtn = taskDiv.querySelector(".saveBtn");
      saveBtn.onclick = function () {
        let newName = taskDiv.querySelector("#editName").value;
        let newDetails = taskDiv.querySelector("#editDetails").value;
        tasksArr[i].TName = newName;
        tasksArr[i].TDetails = newDetails;
        tasksArr[i].editMode = false;
        showtasks();
      };
      //ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
      // Cancle Edits
      let cancelBtn = taskDiv.querySelector(".cancelBtn");
      cancelBtn.onclick = function () {
        tasksArr[i].editMode = false;
        showtasks();
      };
    } else {
      //ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
      // normal Mode (add task)
        taskDiv.innerHTML = `
            <h3 class="taskTitle">Task ${tasksArr[i].TNumber}: ${tasksArr[i].TName}</h3>
            <p class="taskDetails">${tasksArr[i].TDetails}</p> 
            <div class="taskHeader">
            <button class="editBtn">Edit</button>
            <button class="removeBtn">Remove</button>
            </div>
        </div>
        <hr>
        `;

      //ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
      // Remove (i) task
      let removeBtn = taskDiv.querySelector(".removeBtn");
      removeBtn.onclick = function () {
        tasksArr.splice(i, 1);
        saveTasks();
        showtasks();
      };
      //ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
      // Edit function
      let editBtn = taskDiv.querySelector(".editBtn");
      editBtn.onclick = function () {
        tasksArr[i].editMode = true;
        saveTasks();
        showtasks();
      };
    }

    tasksContainer.appendChild(taskDiv);
  }
}
//ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
// Remove all tasks
removeAllBtn.onclick = function () {
  tasksArr = [];
  taskNumber=1;
  saveTasks();
  showtasks();
  
};
//ـــــــــــــــــــSave tasks to localStorageـــــــــــــــــــــــــ
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasksArr));
}
//ــــــــــــــــــــShow tasks when page loadـــــــــــــــــــــــــ
showtasks();

