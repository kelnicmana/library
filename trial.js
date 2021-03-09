let anArray = [];

function Object(name, age, birthYear) {
    this.name = name;
    this.age = age;
    this.birthYear = birthYear;
}

Object.prototype.curYear = function() {
    return `Your last birthday was in ${this.birthYear + this.age}`;
}

const myObject = new Object('Kellie', 34, 1986);

anArray.push(myObject);
