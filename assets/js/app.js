import {ToDo} from './todo.js';

// localStorage.clear();

const idNumArr = [0];

// generates non-duplicate number ids
function generateId(){
    return idNumArr[0]++;
}

function render(){
    // set today's date on the date input field
    setTodayDate(getTodayDate());
    // initially render the list
    renderList();
    // save the todo when it is entered
    saveToDo();
    // render the list when there is date change
    detectDateChange();
    // set HTML according to checkbox change and deletion
    detectListItemChange();
}

/* setTodayDate()
 * Set the current date */

 // get today's date and return it as an object
function getTodayDate(){
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let day = today.getDate();
    return {year, month, day};
}

// pad one zero before the chosen month or date
function padZero(num){
    if(num.toString().length == 1) return '0' + num;
    else return num;
}

// set today's date on the date input field
function setTodayDate(dateObj){
    const dateField = document.querySelector('.date-field');
    let month = padZero(dateObj.month);
    let day = padZero(dateObj.day);
    dateField.value = `${dateObj.year}-${month}-${day}`;
}

/* saveToDo()
 * save the entered todo in localStorage */

// get the key of localStorage(aka the changed date)
function getKey(){
    const dateField = document.querySelector('.date-field');
    return dateField.value;
}

// get the localStorage object
function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

// set the localStorage object
function setLocalStorage(key, obj){
    localStorage.setItem(key, JSON.stringify(obj));
}

// make a new object and return it
function makeNewObj(key){
    let date = key.split("-");
    let {year, month, day} = date;
    let newObj = new ToDo(new Map(), year, month, day);
    return newObj;
}

// save todo when entered and display it
function saveToDo(){
    const textField = document.querySelector('.text-field');
    textField.addEventListener('keypress', function(e){
        if(e.key == "Enter"){
            // get key to access localStorage
            let key = getKey();
            let localObj = getLocalStorage(key);
            if(!localObj) localObj = makeNewObj(key);
            // add todo to local object
            localObj.list[textField.value] = 'todo';
            // append html
            makeHTML(textField.value, 'todo', generateId());
            // empty textField after input
            textField.value = "";
            // save to localStorage
            setLocalStorage(key, localObj);
        }
    })
}

/* renderList()
 * render the HTML saved in localStorage */

 // make HTML for a list item
function makeHTML(elem, type, idx){
    const unorderedList = document.querySelector('ul');
    const listElement = document.createElement('li');
    const checked = type == 'todo' ? '' : 'checked';
    const strikethrough = type == 'todo' ? '' : 'style=\"text-decoration:line-through;\"'
    // add a checkbox, text and button
    listElement.innerHTML = 
    `<input type="checkbox" class="${type}-checkbox" id="checkbox-${idx}" ${checked}>
    <p class="${type}-text" id="${type}-text-${idx}" ${strikethrough}>${elem}</p>
    <button type="button" class="${type}-button" id="button-${idx}"></button>`;
    listElement.id = `li-${idx}`;
    unorderedList.appendChild(listElement);
}

// remove HTML for initialization purposes
function removeHTML(){
    const elements = document.querySelectorAll('li');
    if(elements) {
        elements.forEach((element) => element.remove());
    }
}

// clear out HTML and render list items
function renderList(){
    removeHTML();
    const localObj = getLocalStorage(getKey());
    if(localObj){
        let map = Object.entries(localObj.list);
        for(let [key, value] of map){
            if(value == 'todo') makeHTML(key, 'todo', generateId());
            else makeHTML(key, 'completed', generateId());
        }
    }
}

/* detectDateChanges()
 * render HTML according to date area change */

function detectDateChange(){
    const dateField = document.querySelector(".date-field");
    dateField.addEventListener('change', function(event){
        renderList();
    })
}

/* detectCheckbox()
 * render HTML according to date area change */

function detectListItemChange(){
    // event delegation from the div
    const listDiv = document.querySelector('.list');
    // listen to events from the whole div
    listDiv.addEventListener('click', function(event){
        // get key to access localStorage
        let key = getKey();
        let localObj = getLocalStorage(key);
        // get id of event item
        let id = event.path[0].id.split('-')[1];
        // get text regarding event item
        let content = event.path[1].innerText;
        
        // act according to checkboxChange
        checkboxChange(event, key, localObj, id, content);
        deleteButtonClick(event, key, localObj, id, content);
    })
}

// switch between todo and completed according to checkbox click
function checkboxChange(event, key, localObj, id, content){
    // if the checkbox is clicked
    if(event.target.type == 'checkbox'){
        // if the checkbox is clicked to be checked
        if(event.target.checked){
            // set the item as completed
            localObj.list[content] = 'completed';
            // set text id as completed and style as strikethrough
            let text = document.querySelector(`#todo-text-${id}`);
            text.setAttribute('id', `completed-text-${id}`);
            text.setAttribute("style", "text-decoration:line-through");
        }
        // if the checkbox is clicked to be unchecked
        else{
            // set the item to todo
            localObj.list[content] = 'todo';
            // set the text id as todo and style as none
            let text = document.querySelector(`#completed-text-${id}`);
            text.setAttribute('id', `todo-text-${id}`);
            text.setAttribute("style", "text-decoration:none");
        }
        setLocalStorage(key, localObj);
    }
}

function deleteButtonClick(event){
    if(event.target.type == 'button'){
        let key = getKey();
        let localObj = getLocalStorage(key);
        console.log(event);
        let id = event.path[0].id.split('-')[1];
        let content = event.path[1].innerText;
        console.log(id);
    }
}

render();


