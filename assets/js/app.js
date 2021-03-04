import {ToDo} from './todo.js';

// localStorage.clear();

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
            // empty textField after input
            textField.value = "";
            setLocalStorage(key, localObj);
        }
    })
}

/* renderHTML()
 * render the HTML saved in localStorage */

// function makeHTML(elem, type, idx){
//     return `<li class="${type}" id="${type}-${idx}">
//         <input type="checkbox" class="${type}-checkbox" id="${type}-checkbox-${idx}">
//         <p class="${type}-text" id="${type}-text-${idx}">${elem}</p>
//         <button type="button" class="${type}-button" id="${type}-button-${idx}"></button>
//     </li>`;
// }

// function clearHTML(){
//     const list = document.querySelector('ul');
//     let localObj = getLocalStorage(getKey());
//     if (localObj) list.innerHTML = '';
// }

// function renderHTML(){
//     const list = document.querySelector('ul');
//     let localObj = getLocalStorage(getKey());
//     if(localObj){
//         localObj.todo.forEach((elem, idx) => {
//             if(elem.length) {
//                 list.innerHTML += makeHTML(elem, 'todo', idx);
//             }   
//         })
//     }  
// }

function makeHTML(elem, type, idx){
    const unorderedList = document.querySelector('ul');
    const listElement = document.createElement('li');
    listElement.innerHTML = 
    `<input type="checkbox" class="${type}-checkbox" id="${type}-checkbox-${idx}">
    <p class="${type}-text" id="${type}-text-${idx}">${elem}</p>
    <button type="button" class="${type}-button" id="${type}-button-${idx}"></button>`;
    unorderedList.appendChild(listElement);
}

function removeHTML(){
    const unorderedList = document.querySelector('ol');
    if(unorderedList) unorderedList.remove();
}

function renderList(){
    removeHTML();
    const localObj = getLocalStorage(getKey());
    if(localObj){
        localObj.todo.forEach((elem, idx) => {
            if(elem.length) makeHTML(elem, 'todo', idx);
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
            console.log(event);
        }
        console.log(event.target);
    })
}

render();


