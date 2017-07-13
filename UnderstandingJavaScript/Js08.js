function Person(name) {
    this.name = name;
    this.sayHello = function () {
        console.log("Hello I'm " + this.name);
    }
};

function Employee(name, salary) {
    Person.call(this, name);
    this.salary = salary;
    this.ShowMeTheMoney = function () {
        console.log(this.name + " $ " + this.salary);
    };
};

var BillGates = new Person("Bill Gates");
var SteveJobs = new Employee("Steve Jobs", 1234);

BillGates.sayHello();
SteveJobs.sayHello();

SteveJobs.ShowMeTheMoney();

console.log(BillGates.constructor == Person);
console.log(SteveJobs.constructor == Employee);

console.log(BillGates.sayHello == SteveJobs.sayHello);