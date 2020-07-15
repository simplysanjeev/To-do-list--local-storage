let state = {taskList:[], tabStatus:"all"}
let tempState = localStorage.getItem('state')
if(tempState != null){
    state = JSON.parse(tempState); 
}
 
// {
//     taskList : [
//                  {task: 'task 1', completed: false},
//                  {task: 'task 2', completed: false},
//                  {task: 'task 3', completed: true}
//                ],
//     tabStatus : "all"   
//    }
function storeToLocalStorage(){
    localStorage.setItem('state', JSON.stringify(state));
}
let message = document.getElementById('message');
let toDoList = document.getElementById('to-do-list');
let taskCount = document.getElementById('count');
let addTaskButton = document.getElementById('add-task');
let inputTag = document.getElementById('task-input');
let markAllTaskCompletedButton = document.querySelector('.complete-all-task');
let clearCompletedTaskButton = document.querySelector('.clear-completed');
let switchToAllTaskTabButton =  document.querySelector('#all-tasks');
let switchToUncompletedTaskTabButton =  document.querySelector('#uncompleted-tasks');
let switchToCompletedTaskTabButton = document.querySelector('#completed-tasks');
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
switchToAllTaskTabButton.addEventListener('click', function(){
    setTabTextColor();
    state.tabStatus = "all";
    render();
});
switchToCompletedTaskTabButton.addEventListener('click', function(){
    setTabTextColor();
    state.tabStatus = "completed";
    render();
});
switchToUncompletedTaskTabButton.addEventListener('click', function(){
    setTabTextColor();
    state.tabStatus = "uncompleted";
    render();
});
addTaskButton.addEventListener('click', function(){
    let taskDescription = inputTag.value.trim(); 
    inputTag.value = '';
    if(taskDescription != ''){
        let item = {task : taskDescription, completed: false};
        state.taskList.push(item);
        render(); 
    }
});
function markAllTaskCompleted(){
    for(let task of state.taskList){
        task.completed = true;
    }
    render();
}
markAllTaskCompletedButton.addEventListener('click', function(){
    markAllTaskCompleted();
});
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
function clearList(){
    while(toDoList.hasChildNodes()){
        toDoList.removeChild(toDoList.firstChild);
    }
}
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