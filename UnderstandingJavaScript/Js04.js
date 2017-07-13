function WhoCallMe(){
    console.log("My caller is "+WhoCallMe.caller);
}

function CallerA(){
    WhoCallMe();
}

function CallerB(){
    WhoCallMe();
}

console.log(WhoCallMe.caller);

WhoCallMe();

CallerA();
CallerB();