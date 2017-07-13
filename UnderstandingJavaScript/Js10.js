function Person(name) {
    this.name = name;
};
Person.prototype.SayHello = function () {
    console.log("Hello,I'm " + this.name);
};

var BillGates = new Person("Bill Gates");
var SteveJobs = new Person("Steve Jobs");

BillGates.SayHello();
SteveJobs.SayHello();

console.log(BillGates.SayHello == SteveJobs.SayHello);