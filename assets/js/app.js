import {ToDo} from './todo.js';

// localStorage.clear();

function render(){
    // set today's date on the date input field
    setTodayDate(getTodayDate());
    saveInfo();

}

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

function getKey(){
    const dateField = document.querySelector('.date-field');
    console.log('here: ', dateField.value);
    return dateField.value;
}

function getLocalStorage(){
    let key = getKey();
    let localObj = JSON.parse(localStorage.getItem(key));
    return localObj;
}

function setLocalStorage(obj){
    let key = getKey();
    localStorage.setItem(key, JSON.stringify(obj));
}

function makeNewObj(){
    let date = getKey().split("-");
    let {year, month, day} = date;
    let newObj = new ToDo("", "", year, month, day);
    return newObj;
}

function saveInfo(){
    // get text input area : textField
    const textField = document.querySelector('.text-field');
    textField.addEventListener('keypress', function(e){
        if(e.key == "Enter"){
            // when a todo is entered
            let localObj = getLocalStorage();
            // if(!localObj) localObj = new ToDo("", "", date.year, date.month, date.day);
            if(!localObj) localObj = makeNewObj();
            localObj.todo.push(textField.value);
            // empty textField after input
            textField.value = "";
            setLocalStorage(localObj);
        }
    })
}

function showHTML(){
    let list = document.querySelector('.list');
    
}

function makeHTML(){

}

render();


