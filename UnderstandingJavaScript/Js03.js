var yourName="杨洪俊";
function rewriteFunction(){
    console.log("复写函数");
}

function rewriteFunction(){
    console.log("最终版本的function"+yourName)
    var yourName="FreshMan";
    console.log(rewriteFunction.toString());
}

rewriteFunction();