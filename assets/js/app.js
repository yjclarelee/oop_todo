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
    renderList();
    saveToDo();
    detectDateChange();
    detectCheckbox();
}

/* setTodayDate()
 * Set the current date */

function getTodayDate(){
    // get today's date and return it as an object
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let day = today.getDate();
    return {year, month, day};
}

function padZero(num){
    // pad one zero before the chosen month or date
    if(num.toString().length == 1) return '0' + num;
    else return num;
}

function setTodayDate(dateObj){
    // set today's date on the date input field
    const dateField = document.querySelector('.date-field');
    let month = padZero(dateObj.month);
    let day = padZero(dateObj.day);
    dateField.value = `${dateObj.year}-${month}-${day}`;
}

/* saveToDo()
 * save the entered todo in localStorage */

function getKey(){
    const dateField = document.querySelector('.date-field');
    return dateField.value;
}

function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, obj){
    localStorage.setItem(key, JSON.stringify(obj));
}

function makeNewObj(key){
    let date = key.split("-");
    let {year, month, day} = date;
    let newObj = new ToDo("", "", year, month, day);
    return newObj;
}

function saveToDo(){
    // get text input area : textField
    const textField = document.querySelector('.text-field');
    textField.addEventListener('keypress', function(e){
        if(e.key == "Enter"){
            // when a todo is entered
            let key = getKey();
            let localObj = getLocalStorage(key);
            if(!localObj) localObj = makeNewObj(key);
            localObj.todo.push(textField.value);
            makeHTML(textField.value, 'todo', generateId());
            // empty textField after input
            textField.value = "";
            setLocalStorage(key, localObj);
        }
    })
}

/* renderList()
 * render the HTML saved in localStorage */

function makeHTML(elem, type, idx){
    const unorderedList = document.querySelector('ul');
    const listElement = document.createElement('li');
    const checked = type == 'todo' ? '' : 'checked';
    const strikethrough = type == 'todo' ? '' : 'style=\"text-decoration:line-through;\"'
    listElement.innerHTML = 
    `<input type="checkbox" class="${type}-checkbox" id="checkbox-${idx}" ${checked}>
    <p class="${type}-text" id="${type}-text-${idx}" ${strikethrough}>${elem}</p>
    <button type="button" class="${type}-button"></button>`;
    
    unorderedList.appendChild(listElement);
}

function removeHTML(){
    const elements = document.querySelectorAll('li');
    if(elements) {
        elements.forEach((element) => element.remove());
    }
}

function renderList(){
    removeHTML();
    const localObj = getLocalStorage(getKey());
    if(localObj){
        localObj.todo.forEach((elem) => {
            if(elem.length) makeHTML(elem, 'todo', generateId());
        });
        localObj.completed.forEach((elem) => {
            if(elem.length) makeHTML(elem, 'completed', generateId());
        });
    }
}

/* detectDateChanges()
 * render HTML according to date area change  */

function detectDateChange(){
    const dateField = document.querySelector(".date-field");
    dateField.addEventListener('change', function(event){
        renderList();
    })
}

function detectCheckbox(){
    const unorderedList = document.querySelector('.list');
    unorderedList.addEventListener('click', function(event){
        if(event.target.type == 'checkbox'){
            let key = getKey();
            let localObj = getLocalStorage(key);
            if(event.target.checked){
                let idx = localObj.todo.indexOf(event.path[1].innerText);
                localObj.todo.splice(idx, 1);
                localObj.completed.push(event.path[1].innerText);
                setLocalStorage(key, localObj);

                let id = event.path[0].id.split('-')[1];
                let text = document.querySelector(`#todo-text-${id}`);
                text.setAttribute('id', `completed-text-${id}`);
                text.setAttribute("style", "text-decoration:line-through");
            }
            else{
                let idx = localObj.completed.indexOf(event.path[1].innerText);
                localObj.completed.splice(idx, 1);
                localObj.todo.push(event.path[1].innerText);
                setLocalStorage(key, localObj);

                let id = event.path[0].id.split('-')[1];
                let text = document.querySelector(`#completed-text-${id}`);
                text.setAttribute('id', `todo-text-${id}`);
                text.setAttribute("style", "text-decoration:none");
            }

        }
    })
}

render();


