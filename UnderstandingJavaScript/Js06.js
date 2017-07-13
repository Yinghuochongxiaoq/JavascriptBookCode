var anObject = {};
anObject.aProperty = "Property of object";
anObject.aMethod = function () {
    console.log("Method of object.")
};

console.log(anObject["aProperty"]);
anObject["aMethod"]();

for (var s in anObject) {
    console.log(s + " is a " + typeof (anObject[s]));
}

var anFunction = function () { };
anFunction.aProperty = "Property of object";
anFunction.aMethod = function () {
    console.log("Method of object.")
};

console.log(anFunction["aProperty"]);
anObject["aMethod"]();

for (var s in anFunction) {
    console.log(s + " is a " + typeof (anFunction[s]));
}
