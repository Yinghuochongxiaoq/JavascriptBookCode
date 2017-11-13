// inherit() returns a newly created object that inherits properties from the
// prototype object p.  It uses the ECMAScript 5 function Object.create() if
// it is defined, and otherwise falls back to an older technique.
function inherit(p) {
    if (p == null) throw TypeError(); // p must be a non-null object
    if (Object.create) // If Object.create() is defined...
        return Object.create(p); //    then just use it.
    var t = typeof p; // Otherwise do some more type checking
    if (t !== "object" && t !== "function") throw TypeError();

    function f() {}; // Define a dummy constructor function.
    f.prototype = p; // Set its prototype property to p.
    return new f(); // Use f() to create an "heir" of p.
}

//判定o是否是一个类数组对象，字符串和函数有length属性，但是他们可以用typeof检测将其排除，在客户端Javascript中DOM文本节点也有length属性，需要用额外的判定o.nodeType!=3将其排除
function isArrayLike(o) {
    if (o &&
        typeof o === "object" &&
        isFinite(o.length) &&
        o.length >= 0 &&
        o.length === Math.floor(o.length) &&
        o.length < 4294967296)
        return true;
    else return false;
}

/**
1、要理解Javascript，首先放下对象和类的概念，回到数据和代码的本原。

2、简单数据只有undefined，null，boolean，number和string这五种，而复杂数据只有一种——object。

3、Javascript代码只体现为一种形式：就是function。

4、typeof运算符来获取一个Javascript元素的类型。由于typeof是运算符，因此，可以有两用等价的写法：typeof x和typeof(x),加不加括号无所谓。typeof运算之后得到的结果是一个string类型的值：typeof typeof 123的结果一定是string。

5、简单类型：
undefined：代表一切未知的失误，啥都没有；可以将undefined赋值给任何变量或属性，但是并不意味清除了该变量，返回会因此多了一个属性；
null：有那么一个概念，但没有东西；typeof(null) 返回object。
boolean：正确： undefined==null,简单类型值、所有对象和函数转换为逻辑值时都是true，错误：undefined,null,"",0转换为逻辑值时就是false；
number：typeof(NaN)和typeof(Infinity)都返回number；NaN!=NaN;Infinity/Infinity=NaN;
string:字符串；
"123"==123 true;
"0123"==0123 false;javascript认为将0开头的证书常量当八进制数处理，所以后面的0123实际是八进制数；
===表示全等，也就是数据值与数据类型都必须相等才是true。
!==表示不全等；

6、Javascript执行引擎并非一行一行分析执行程序，而是一段一段分析执行的。在同一段程序的分析执行中，定义式的函数语句会被提取出来有限之心，函数定义执行完之后，才会按顺序执行其他语句代码，也就是说，在第一次调用之前，第一个函数语句定义的代码逻辑，已经被第二个函数定义语句覆盖了。

7、对象中，每个属性还有一些与之相关的值，称为“属性特性”：
可写：表明是否可以设置该属性的值；
可枚举：表明是否可以通过for/in循环返回该属性；
可配置：表明是否可以删除或修改该属性；
在ES5之前，通过代码给对象创建的所有属性都是可写、可枚举的和可配置的。在ES5中可以对这些特性加以设置；
每个对象还拥有三个相关的对象特性：
对象的原型：指向另外一个对象，本对象的属性继承自他的原型对象；
对象的类：是一个标识对象类型的字符串；
对象的扩展标记：指明了ES5中是否可以向该对象添加新属性；

内置对象：是有ES规范定义的对象或类。比如数组，函数，日期或正则表达式都是内置对象；
宿主对象：是由Javascript解释器所嵌入的宿主环境定义的。客户端Javascript中表示网页结构的HTMLElement对象均是宿主对象；
自定义对象：是有运行中的Javascript代码创建的对象；
自有属性：是直接在对象中定义的属性；
继承属性：是在对象的原型对象中定义的属性。

8、Object.defineProperty()的属性描述符对象不必包含所有4个特性。对于新创建的属性来说，默认的特性值是falseh或undefined。对于修改的已有属性来说，默认的特性值没有做任何修改。这个方法要么修改已有属性要么新建自有属性，但不能修改继承属性。

要同时修改或转件多个属性，则需要使用Object.definePropertys(),第一个参数是要修改的对象，第二个参数是一个映射表，它包含要新建或修改的属性的名称，以及他们的属性描述符。

如果对象是不可扩展的，则可以编辑已有的自有属性，但不能给他添加新属性；
如果属性是不可配置的，则不能修改他的课配置性和可枚举性；
如果存取器属性是不可配置的，则不能修改其getter和setter方法，也不能将它转换为数据属性；
入股欧书记属性是不可配置的，则不能将它转换为存取器属性；
如果数据属性是不可配置的，则不能将他的可写性从false修改为true，但可以从true修改为false；
如果数据属性是不可配置且不可写的，则不能修改他的值，然而可配置但不可写属性的值是可以修改的（实际上是先将他标记为可写的，然后修改他的值，最后转换为不可写的）。

9、对象的三个属性：原型（prototype），类（class）和可扩展性（extensible attribute).

10、当使用多个参数调用unshift()时它的行为令人惊讶，参数是一次性插入的（就像splice()方法）而非一次一个地插入。这意味着最终的数组中插入的元素顺序和他们在参数列表中的顺序一致。而假如元素是一次一个地插入，它们的顺序应该是反过来的。

11、toString(),针对数组，该方法将其每个元素转化为字符串（如有必要将调用元素的toString()方法）并且输出用逗号分隔的字符串列表。输出不包括方括号或其他任何形式的包裹数值的分隔符。这里与不适用任何参数调用join()方法返回的字符串是一样的。

12、ES5中的数组方法：

forEach(),传递的函数作为forEach()的第一个参数，然后forEach()使用3个参数调用该函数：数组元素，元素的索引和数组本身。

map()方法将调用的数组的每个元素传递给指定的函数，并返回一个数组，它包含该函数的返回值。传递给map()的函数的调用方式和传递给forEach()的函数的调用方式一样。但传递给map()的函数应该有返回值。map()返回的是新数组，他不修改调用的数组。如果是稀疏数组，返回的也是相同方式的稀疏数组：具有相同的长度，相同的缺失元素。

filter()方法返回的数组元素是调用的数组的一个子集。传递的函数是用来逻辑判定的：该函数返回true或false，调用判定函数就像调用forEach()和map()一样。如果返回值为true或能转化为true的值，那么传递给判定函数的元素就是这个子集的成员，它将被添加到一个返回值的数组中。

every()和some()方法是数组的逻辑判定：他们对数组元素应用指定的函数进行判定，返回true或false。
every()方法就像数学中的“针对所有”的量词，当且仅当针对数组中的所有元素调用判定函数都返回true，它才返回true；

some()方法就像数学中的“存在”的量词；当数组中至少有一个元素调用判定函数返回true，它就返回true，并且当且仅当数值中所有元素调用判定函数都返回false，它才返回false；

reduce()和reduceRight()方法使用指定的函数将数组元素进行组合，生成单个值。这在函数式编程中是常见的操作，也可以称为注入和折叠。
reduce()需要两个参数。第一个是执行化简操作的函数。化简函数的任务就是用某种方法把两个字组合或化简为一个值，并返回化简后的值。当不指定初始值调用reduce()时，它将使用数组的第一个元素作为其初始值。这意味着第一次调用化简函数就使用了第一个和第二个数组元素作为其第一个和第二个参数。

在空数组上，不带初始值参数调用reduce()将导致类型错误异常。如果调用它的时候只有一个值——数组只有一个元素并且没有指定初始值，或者有一个空数组并且指定一个初始值——reduce()只是简单地返回那个值而不会调用化简函数。

reduceRight()的工作原理和reduce()一样，不同的是它按照数组索引从高到低（从右到左)处理数组，而不是从低到高。

indexOf()和lastIndexOf()搜索整个数组中具有给定值的元素，返回找到的第一个元素的索引或者如果没有找到就返回-1。indexOf()从头至尾搜索，而lastIndexOf()则反向搜索。
不接收一个函数作为其参数，第一个参数是需要搜索的值，第二个参数是可选的：它指定数组中的一个索引，从那里开始搜索。如果省略该参数，indexOf()从头开始搜索，而lastIndexOf()从尾开始搜索。第二个参数也可以是负数，它代表相对数组末尾的偏移量。

数组推导
data=[2,3,4,-5];//一个数组
squares=[x*x for each(x in data)];//对每个元素求平方:[4,9,16,25]
//如果数组元素是非负数，求它的平方根
roots=[Math.sqrt(x) for each (x in data) if (x>=0)]

//将一个对象的属性名放入新创建的数组中
o={a:1,b:2,f:function(){}}
let allkeys=[p for each (p in o)]
let ownkeys=[p for (p in o) if (o.hasOwnProperty(p))]
let notfuncs=[k for ([k,v] in Iterator(o)) if (typeof v!=="function")]

将数组推导中的方括号替换成圆括号，它就成了一个生成器表达式。生成器表达式（generator expression）和数组推导非常类似（两者在圆括号内的语法几乎完全一样），只是她的返回值是一个生成器对象，而不是一个数组。和数组推导相比，使用生成器表达式的好处是可以惰性求职（lazy evaluation），只有在需要的时候求值而不是每次都计算求值。生成器只支持对值得顺序存取，而不是随机存取。和数组不同，生成器并没有索引。

function map(i,f){//对于i的每个元素，生成器都会生成f(x)
    for(let x in i) yield f(x);
}

有了生成器表达式后：
let h=(f(x) for (x in g));

函数简写：对于简单的函数，Javascript 1.8引入了一种简写形式：表达式闭包。如果函数只计算一个表达式并返回它的值，关键字return和花括号都可以省略，并将待计算的表达式紧接着放在参数列表之后。
let succ=function(x) x+1,yes=function()true,no=function()false;

XML直接量语法中使用花括号作为转义字符；

内联形式Javascript引用；
在XHTML中<script></script>标签的内容被当做其他内容一样对待。如果Javascript代码包含了<或&字符，那么这些字符就被解释成为XML标记。因此，如果要使用XHTML，最好把所有的Javascript代码放到一个CDATA部分里面：
<script><![CDATA[
    //这里是Javascript代码
]]></script>

外部文件中的脚本，使用<script src="filepath"></script>

脚本类型，使用不标准的脚本语言，使用VBScript(只有IE支持)，必须用type属性指定脚本的MIME类型
<script type="text/vbscript">这里是VBScript代码</script>type属性默认值时“text/javascript";

<script defer src"deferred.js></script>
<script async src="async.js></script>
defer和async属性都像在告诉浏览器链接进来的脚本不会使用document.write()，也不会生成文档内容，因此浏览器可以在下载脚本时继续解析和渲染文档。defer属性使得浏览器延迟脚本的执行，知道文档的载入和解析完成，并可以操作。async属性使得浏览器可以尽快的执行脚本，而不用再下载脚本时阻塞文档解析。延迟的脚本会按他们在文档里出现顺序执行，而一部脚本在他们载入后执行，这意味着他们可能会无序执行；

setTimeout()方法用来实现一个函数在指定的毫秒之后运行；setTimeout()返回一个值，这个值可以传递给clearTimeout()用于取消这个函数的执行。
setInterval()和setTimeout()一样，只不过这个函数会在指定的毫秒数的间隔里重复调用；
setInterval()也返回一个值，这个值可以传递给clearInterval()用于取消后续函数的调用。

如果以0毫秒的超时时间来调用setTimeout()那么指定的函数不会立刻执行，相反，会把它放到队列中，等到前面处于等待状态的事件处理程序充不执行完成后再调用它。

可编辑的内容，有两种方法来启用编辑功能，其一，设置任何标签的HTML contenteditable属性；其二，设置对应元素的Javascript contenteditable属性；<div id="editor" contenteditable="true">Click to edit</div>

浏览器可能为表单字段和contenteditable元素支持自动拼写检查。添加spellcheck属性来显示开启拼写检查，而使用spellcheck=false来显示关闭该功能；Enter键另起一行，但不同的浏览器生成了不同的标记。有些开始了新的段落，而其他的只是插入了一个<br/>元素。

浏览器大部分没有键盘快捷键。使用Document对象的execCommand()方法，这是Document的方法，而不是设置了contenteditable属性的元素的方法。
 */