export default class todoDate{
     // get today's date and return it as an object
    getTodayDate(){
        const today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth()+1;
        let day = today.getDate();
        return {year, month, day};
    }

    // set today's date on the date input field
    setTodayDate(dateObj){
        const dateField = document.querySelector('.date-field');
        let month = this.padZero(dateObj.month);
        let day = this.padZero(dateObj.day);
        dateField.value = `${dateObj.year}-${month}-${day}`;
    }

    // pad one zero before the chosen month or date
    padZero(num){
    if(num.toString().length == 1) return '0' + num;
    else return num;
}

}