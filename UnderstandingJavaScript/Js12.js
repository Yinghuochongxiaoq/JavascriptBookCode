function New(aClass, aParams) {
    function new_() {
        aClass.Create.apply(this, aParams);
    };
    new_.prototype = aClass;
    return new new_();
};

var Person = {
    Create: function (name, age) {
        this.name = name;
        this.age = age;
    },
    SayHello: function () {
        console.log("Hello,I'm " + this.name);
    },
    HowOld: function () {
        console.log(this.name + " is " + this.age + " years old.");
    }
};

var BillGates = New(Person, ["BillGates", 53]);
BillGates.SayHello();
BillGates.HowOld();
console.log(BillGates.constructor == Object);