function SayHello() {
    console.log("Hello,I'm " + this.name);
}

function Person(name) {
    this.name = name;
    this.SayHello = SayHello;
}

var BillGates = new Person("Bill Getes");
var SteveJobs = new Person("Steve Jobs");

console.log(BillGates.SayHello == SteveJobs.SayHello);