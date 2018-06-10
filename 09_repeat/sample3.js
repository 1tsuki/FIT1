
// 変数定義は var 変数名 = 値で行う
var message1 = "Hello ";

// varを省略しても実は定義できる
var message2 = "I'm " + document.getElementById('name').value + "!";

// 変数に入れた値は加工したり、関数に渡すことができる
var message = message1 + message2;
alert(message);
