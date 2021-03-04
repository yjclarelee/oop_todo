export {ToDo};

class ToDo{
    constructor(todo, completed, year, month, day){
        this.todo = [todo];
        this.completed = [completed];
        this.year = year;
        this.month = month;
        this.day = day;
    }
}

ToDo.prototype.addToDo = function(elem){
    this.todo.push(elem);
}
ToDo.prototype.addCompleted = function(elem){
    this.todo.push(elem);
}

ToDo.prototype.deleteToDo = function(elem){
    let idx = this.todo.indexOf(elem);
    this.todo.splice(idx, 1);
}

ToDo.prototype.deleteCompleted = function(elem){
    let idx = this.completed.indexOf(elem);
    this.completed.splice(idx, 1);
}