var life = {};
for (life.age = 1; life.age <= 3; life.age++) {
    switch (life.age) {
        case 1:
            life.body = "卵细胞"; life.say = function () { console.log(this.body); }
            break;
        case 2:
            life.tail = "尾巴";
            life.gill = "鳃";
            life.body = "蝌蚪";
            life.say = function () { console.log(this.age + this.body + this.tail + this.gill); }
            break;
        case 3:
            delete life.tail;
            delete life.gill;
            life.legs = "四条腿";
            life.lung = "肺";
            life.say = function () { console.log(this.age + this.body + this.legs + this.lung); }
            break;
    }
    life.say();
}