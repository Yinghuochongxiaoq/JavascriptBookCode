//定义类的语法甘露：Class()
//最后一个参数是JSON表示的类定义
//如果参数数量大于1个，则第一个参数是基类
//第一个和最后一个之间参数，将来可表示类实现的接口
//返回值是类，类是一个构造函数
function Class() {
    //最后一个参数是类的定义
    var aDefine = arguments[arguments.length - 1];
    if (!aDefine) return;
    //解析基类
    var aBase = arguments.length > 1 ? arguments[0] : object;
    //构造prototype的临时函数，用于挂接原型链
    function prototype_() {};
    //准备传递prototype
    prototype_.prototype = aBase.prototype;
    //建立类要用的prototype
    var aPrototype = new prototype_();
    //复制类定义到当前类的prototype
    for (var member in aDefine)
    //构造函数不用复制
        if (member != "Create") aPrototype[member] = aDefine[member];
        //类型即为该构造函数
    if (aDefine.Create) var aType = aDefine.Create;
    //否则为默认构造函数
    else {
        aType = function() {
            this.base.apply(this, arguments);
        };
    }
    //设置类（构造函数）的prototype
    aType.prototype = aPrototype;
    //设置类型关系
    aType.Base = aBase;
    //为本来对象扩展一个Type属性
    aType.prototype.Type = aType;
    //返回构造函数作为类
    return aType;
};

//根类object定义；
//定义小写的object根类，用于实现最基础的方法等
function object() {};
//判断对象是否属于某类型
object.prototype.isA = function(aType) {
    var self = this.Type;
    while (self) {
        if (self == aType) return true;
        self = self.Base;
    };
    return false;
};

//调用基类的构造函数
object.prototype.base = function() {
    var Caller = object.prototype.base.caller;
    Caller && Caller.Base && Caller.Base.apply(this, arguments);
};

//语法甘露的应用效果
//默认派生自object基本类
var Person = Class({
    Create: function(name, age) {
        this.base();
        this.name = name;
        this.age = age;
    },
    SayHello: function() {
        console.log("Hello,I'm " + this.name + " ," + this.age + " years old.");
    }
});

//派生自Person类
var Employee = Class(Person, {
    Create: function(name, age, salary) {
        //调用基类的构造函数
        this.base(name, age);
        this.salary = salary;
    },
    ShowMeTheMoney: function() {
        console.log(this.name + " $ " + this.salary);
    }
});

var BillGates = new Person("BillGates", 53);
var SteveJobs = new Employee("SteveJobs", 53, 1234);
BillGates.SayHello();
SteveJobs.SayHello();
SteveJobs.ShowMeTheMoney();

//用BillGate的类型建littleBill
var littleBill = new BillGates.Type("littleBill", 6);
littleBill.SayHello();

console.log(BillGates.isA(Person));
console.log(BillGates.isA(Employee));
console.log(SteveJobs.isA(Person));