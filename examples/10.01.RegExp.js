// var pattern = /s$/;
// var pattern = new RegExp("s$");
/**
 * 以下字符具有特殊含义：^$.*+?=!:|\/()[]{} 在正则表达式中使用这些字符的直接量进行匹配，则必须使用前缀\，这是通用规则。
 * 正则表达式/[abc]/就和字母"a","b","c",中的任意一个都匹配。可以通过“^”符号来定义否定字符类，匹配所有不包含在方括号内的字符。定义否定字符类时，将一个“^”符号作为左方括号内的第一个字符。
 * \s匹配的是空格符、制表符和其他Unicode空白符，\S匹配的是非Unicode空白符的字符。
 * {n,m}匹配前一项至少n次，但不能超过m次
 * {n,}匹配前一项n次或者更多次
 * {n}匹配前一项n次
 * ?匹配前一项0ci或者1次，也就是说前一项是可选的，等价于{0,1}
 * +匹配前一项1次或者多次，等价于{1,}
 * *匹配前一项0次或多次，等价于{0,}
 * 选择项匹配从左到右，如果左边的选择项匹配就忽略右边的匹配项，即使它产生更好的匹配。
 * ^匹配字符串的开头，在多行检索中，匹配一行的开头
 * $匹配字符串的结尾，在多行检索中，匹配一行的结尾
 * \b匹配一个单词的边界，简言之，就是位于字符\w和\W之间的位置，或位于字符\w和字符串的开头或者结尾之间的位置（Node:[\b]匹配的是退格符）
 * \B匹配非单词边界的位置
 * (?=p)零宽正向先行断言，要求接下来的字符都与p匹配，但不能包括匹配p的那些字符
 * (?!p)零宽负向先行断言，要求接下来的字符不与p匹配
 * i执行不区分大小写的匹配
 * g执行一个全局匹配，简言之，即找到所有的匹配，而不是在找到第一个之后就停止
 * m多行匹配模式，^匹配一行的开头和字符串的开头，$匹配行的结束和字符串的结束
 * | 选择，匹配的是该符号左边的子表达式或右边的子表达式
 * (……)组合，将几个项组合为一个单元，这个单元可通过"*"，“+”，“？”和“|”等符号加以修饰，而且可以记住和这个组合相匹配的字符串以供此后的引用使用
 * (?:...)只组合，把项组合到一个单元，但不记忆该组相匹配的字符
 * \n和第n个分组第一次匹配的字符相匹配，组是圆括号中的子表达式，组索引是从左到右的左括号数
 * 
 * 整个解构赋值运算的返回值是右侧的整个数据结构，而不是从中提取出来的某个值。可以链式解构赋值。
 */

var pattern = /Java/g;
var text = "Javascript is more fun than java";
var result;
while ((result = pattern.exec(text)) != null) {
    console.log("Matched '" + result[0] + "'" + " at position " + result.index + "; next search begins at " + pattern.lastIndex);
}