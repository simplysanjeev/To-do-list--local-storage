var addToListButton = document.querySelector('.add__to__list');
addToListButton.addEventListener('click', addItemToDoList);
var toDoList = document.querySelector('.to__do__list');
var count = 0;
var deleted = 0;
function addItemToDoList(){
    var listItem = document.createElement("li");
    listItem.classList.add("to__do__list__item");
// <input type="checkbox" name="" id="item__1" class="list__item"></input>
    var inputCheckBox = document.createElement("input");
    inputCheckBox.type = "checkbox";
    count++;
    var inputCheckBoxId = "item__" + count;
    inputCheckBox.id = inputCheckBoxId;
    inputCheckBox.classList.add("list__item");
/* <label for="item__1" class="list__item__label">content</label> */
    var inputLabel = document.createElement("label");
    inputLabel.htmlFor = "item__" + count;
    inputLabel.classList.add("list__item__label");
    inputLabel.innerText = document.querySelector('.to__do__list__item__input').value;
    // <button class="remove__list__item__button"></button>
    var button = document.createElement("button");
    button.classList.add("remove__list__item__button");
    console.log(listItem);
    listItem.appendChild(inputCheckBox);
    listItem.appendChild(inputLabel);
    listItem.appendChild(button);
    toDoList.appendChild(listItem);
    document.querySelector('.number__of__task').innerHTML = (count - deleted);
    button.addEventListener('click', function(event){
        event.currentTarget.parentNode.remove();
        deleted += 1;
        document.querySelector('.number__of__task').innerHTML = (count - deleted);
    });

}