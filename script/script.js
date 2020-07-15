{
// || Functions in Setting up "state" and store state in Local Storage

//Function to intilize State Variable
function intializeState(){
    let tempState = localStorage.getItem('state')
    if(tempState != null){
        return JSON.parse(tempState); 
    }else{
        return {taskList:[], tabStatus:"all"}
    }
}

//Function to intialize
function storeToLocalStorage(){
    localStorage.setItem('state', JSON.stringify(state));
}

//Loading "taskList" and "tabStatus" in state Varible
let state = intializeState();

// || Function to add task to TODO List on click of add task button
let addTaskButton = document.getElementById('add-task');
let inputTag = document.getElementById('task-input');

// Function to add task to TODO List
addTaskButton.addEventListener('click', function(){
    let taskDescription = inputTag.value.trim(); 
    inputTag.value = '';
    if(taskDescription != ''){
        let item = {task : taskDescription, completed: false};
        state.taskList.push(item);
        render(); 
    }
});

// Button to :
// 1. mark all task completed 
// 2. delete all tasks which are already done
let markAllTaskCompletedButton = document.querySelector('.complete-all-task');
let clearCompletedTaskButton = document.querySelector('.clear-completed');

// Function to mark All Task as Completed
function markAllTaskCompleted(){
    for(let task of state.taskList){
        task.completed = true;
    }
    render();
}
markAllTaskCompletedButton.addEventListener('click', function(){
    markAllTaskCompleted();
});

// Function to remove All Completed Task as Completed
function removeAllCompletedTask(){
    let tempList = [];
    for(let item of state.taskList){
        if(!item.completed){
            tempList.push(item);
        }
    }
    state.taskList = tempList;
    render();
}
clearCompletedTaskButton.addEventListener('click', function(){
    removeAllCompletedTask();
});

//Buttons for Switch Between Tabs of All, Completed, Uncompleted Tasks list
let switchToAllTaskTabButton =  document.querySelector('#all-tasks');
let switchToUncompletedTaskTabButton =  document.querySelector('#uncompleted-tasks');
let switchToCompletedTaskTabButton = document.querySelector('#completed-tasks');

//Function to switch to All Task List Tab
switchToAllTaskTabButton.addEventListener('click', function(){
    setTabTextColor();
    state.tabStatus = "all";
    render();
});

//Function to switch to Completed Task List Tab
switchToCompletedTaskTabButton.addEventListener('click', function(){
    setTabTextColor();
    state.tabStatus = "completed";
    render();
});

//Function to switch to Uncompleted Task List Tab
switchToUncompletedTaskTabButton.addEventListener('click', function(){
    setTabTextColor();
    state.tabStatus = "uncompleted";
    render();
});

// Function to Set Colour Of Tab
function setTabTextColor(){
    if(state.tabStatus == "all"){
        switchToAllTaskTabButton.style.color = "black";
        switchToUncompletedTaskTabButton.style.color = "lightgray";
        switchToCompletedTaskTabButton.style.color = "lightgray";
    }else if(state.tabStatus == "completed"){
        switchToAllTaskTabButton.style.color = "lightgray";
        switchToUncompletedTaskTabButton.style.color = "lightgray";
        switchToCompletedTaskTabButton.style.color = "black";
    }else if(state.tabStatus == "uncompleted"){
        switchToAllTaskTabButton.style.color = "lightgray";
        switchToUncompletedTaskTabButton.style.color = "black";
        switchToCompletedTaskTabButton.style.color = "lightgray";
    }
}

// || Function to add Event to eventListener to "mark completed task" and "delete a task" button 

let message = document.getElementById('message');
let toDoList = document.getElementById('to-do-list');
let taskCount = document.getElementById('count');


function addingEventListener(){
    let list = toDoList.childNodes;
    for(let listItem of list){
        listItem.childNodes[1].addEventListener('click', function(){
            let index = listItem.getAttribute('id');
            state.taskList[index].completed = !state.taskList[index].completed;
            render();
        });
        listItem.childNodes[5].addEventListener('click', function(){
            let index = listItem.getAttribute('id');
            let tempList = [];
            for(let i = 0; i < state.taskList.length; i++){
                if(i != index){
                    tempList.push(state.taskList[i]);
                }
            }
            state.taskList = tempList;
            render();
        });
    }
}

// Function to clear previously rendered List
function clearList(){
    while(toDoList.hasChildNodes()){
        toDoList.removeChild(toDoList.firstChild);
    }
}

// Function to count Number of Task Completed By Status 
// 1. All Task
// 2. Uncompleted Task
// 3. Completed Task

function countNumberOfUnCompletedTask(){
    let numberOfTask = 0
    if(state.tabStatus == "all"){
        for(let i = 0; i < state.taskList.length; i++){
                numberOfTask++; 
        }
    }else if(state.tabStatus == "uncompleted"){
        for(let i = 0; i < state.taskList.length; i++){
            if(!state.taskList[i].completed){
                numberOfTask++; 
            }
        }
    }else if(state.tabStatus == "completed"){
        for(let i = 0; i < state.taskList.length; i++){
            if(state.taskList[i].completed){
                numberOfTask++; 
            }
        }
    }
    return numberOfTask;
}

// Function to Render List according to status
function render(){
    clearList();
    setTabTextColor();
    let taskList = state.taskList;
    let visited = false;
    if(state.tabStatus == "all"){
        for(let i = 0; i < taskList.length; i++){
            visited = true;
            let task = `<li class="list-item" id=${i}>
                            <button class="circle ${taskList[i].completed ? 'task-completed':'task-uncompleted'}"></button>
                            <div class="task  ${taskList[i].completed ? 'strike-off':'remove-strike-off'}">${taskList[i].task}</div>
                            <button class="delete"><i class="far fa-times-circle"></i></button>
                        </li>`;
            toDoList.insertAdjacentHTML('beforeend', task);
        }
    }else if(state.tabStatus == "completed"){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].completed){
                visited = true;
                let task = `<li class="list-item" id=${i}>
                                <button class="circle ${taskList[i].completed ? 'task-completed':'task-uncompleted'}"></button>
                                <div class="task  ${taskList[i].completed ? 'strike-off':'remove-strike-off'}">${taskList[i].task}</div>
                                <button class="delete"><i class="far fa-times-circle"></i></button>
                            </li>`;
                toDoList.insertAdjacentHTML('beforeend', task);
            }
        }
    }else if(state.tabStatus == "uncompleted"){
        for(let i = 0; i < taskList.length; i++){
            if(!taskList[i].completed){
                visited = true;
                let task = `<li class="list-item" id=${i}>
                                <button class="circle ${taskList[i].completed ? 'task-completed':'task-uncompleted'}"></button>
                                <div class="task  ${taskList[i].completed ? 'strike-off':'remove-strike-off'}">${taskList[i].task}</div>
                                <button class="delete"><i class="far fa-times-circle"></i></button>
                            </li>`;
                toDoList.insertAdjacentHTML('beforeend', task);
            }
        }
    }
    if(visited == 0){
        message.style.display = "block";
    }else{
        message.style.display = "none";
    }
    storeToLocalStorage();
    addingEventListener();
    taskCount.innerText = countNumberOfUnCompletedTask();
}

render();
}