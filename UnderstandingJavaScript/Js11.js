function Person(name) {
    this.name = name;
};
Person.prototype.SayHello = function () {
    console.log("Hello,I'm " + this.name);
};

function Employee(name, salary) {
    Person.call(this, name);
    this.salary = salary;
};

Employee.prototype = new Person();

Employee.prototype.ShowMeTheMoney = function () {
    console.log(this.name + " $ " + this.salary);
}

var BillGates = new Person("Bill Gates");
var SteveJobs = new Employee("Steve Jobs", 1234);

BillGates.SayHello();
SteveJobs.SayHello();
SteveJobs.ShowMeTheMoney();

console.log(BillGates.SayHello == SteveJobs.SayHello);