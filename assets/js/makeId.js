export default class MakeId{
    constructor(){
        this.idNumArr = [0];
    }

    // generates non-duplicate number ids
    generateId(){
    return this.idNumArr[0]++;
    }
}