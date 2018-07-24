---
title: Javascript学习知识点-持续更新
tags: javascript
author: zhangangs
date: 2018-7-15
---

整理一下学习和工作中遇到的javascript中需要注意的地方。不用就是忘得快啊，写在这里方便自己以后复习吧，本文将持续更新。（**首次更新于：2017-8-7**）

** 1、小数点减法问题**

``` js
var a = 0.3 - 0.2; //结果是多少？
```

这里的结果是：0.09999999999999998， 不是0.1，是不是很惊讶！

** 更神奇的还在后面！ **
``` js
//循环显示10条相减的信息
for(var i = 1; i < 11; i++){
  var j = i + 1;
  console.log((j / 10) + "-" + (i / 10) + "=" + (( j / 10) - (i / 10)), i);
}
```
结果如下：
![](http://oxi2boc62.bkt.clouddn.com/8-7-1.jpg)

除了` 0.2-0.1 `算对了，其他的都不对，不是大点就是小点。

这是由于二进制浮点数不能精确的表示简单的浮点数， 例如：0.1，只能表示一个及其近似的值。

**决解方法也很简单,转换成整数计算即可避免这个问题。**

**2、关于"任何数字除以0会返回NaN"**

这是《Javascript高级程序设计》中的话，似乎有点错误。这可能跟ECMAScript解释器有关。

只有0除以0才会返回NaN。其他数字除以0会返回Infinity（无穷大）。
``` js
console.log(0/0);  //NaN
console.log(1/0);  //Infinity
console.log(-2/0); //-Infinity
```

**3、数组最大能有多少个值？**

数组最多可以包含`4 294 967 295` 个项。

不要问我为什么，某一天心血来潮，突然想起这个事情，就在网上找到了，博主没验证过这个数字(^_^)

**4、递归阶乘函数（严格模式可用）**
``` js
var factorial = (function f(num){
  if(num <=1){
    return 1;
  }else{
    return num * f(num-1);
  }
})
```

**5、关于setTimeout和setInterval返回值**

他们的调用会返回一个数字ID，这个ID是计划执行函数唯一标识，可以用它来取消函数调用。
``` js
var timer = setTimeout(function(){
  console.log('hello world');
},1000);

console.log(timer); //数值1

//可用于清除定时器
clearTimerout(timer);
```

**6、获取URL中的传递的参数**
``` js
function locationSerch(name){
  var obj = {};
  var local = window.location.search;
  //检测url
  if (!local) {console.error("没有参数"); return obj;}
  //去掉？和切割成数组
  var arr = local.substr(1).split("&");
  //数组循环储存到obj
  for (var i =0; i<arr.length; i++) {
    var sp = arr[i].split("=");
    obj[sp[0]] = sp[1];
  }
  //返回对象
  return obj[name];
}

console.log(locationSerch("name"))   // 1
```

**7、关于typeof 检测 NaN**

众所周知，`NaN`代表的意思是**不是一个数字**,那么用typeof检测`NaN`会返回什么类型呢？

``` js
typeof(NaN);    //number

```
返回的是`number`类型，这就有点尴尬了，但是也能理解，基础类型就哪几种，`number`如果不合适，其他类型更不合适。

**8、千分位分割**

看到最多的是正则表达式操作。用原生的`toLocaleString()`也可实现相应功能。

```js
var num = 1234567890;
num.toLocaleString();  //1,234,567,890
```

**9、为什么获取数组的最后一个元素需要减1？**

因为数组的长度是从1开始计算（符合人类使用标准），而计算机是从0开始，

即：我们说的第一位，计算机表示的是0，所以取第一个元素为arr[0]，最后一个则为数组的长度减去1位则为arr.length-1。

没毛病，老铁~

**10、split()、slice()和splice()有什么区别**

- **split：**用于字符串切割，例如：
``` js
var str = '1234';
 str.split(''); //[1,2,3,4]

 var str = '1,25';
 str.split(',); //[1,25]
```
- **slice(start,end)**:用于数组截取,不影响原数组。包含`start`，但不包含`end`。
```js
var arr = ['red','green','blue'];
arr.slice(1); //['green','blue'];
arr.slice(0,2); //['red','green'];
```
- **splice**:数组方法，可用于数组的删除、插入、替换等一系列操作。
```js
var arr = ['red','green','blue'];
//删除'red'
arr.splice(0,1); //['red']

//删除'red'，再删除的位置插入任意数量的项目。
arr.splice(0,1,'black','yellow'); //["black", "yellow", "green", "blue"]
arr.splice(0,1,['black','yellow']); //[["black", "yellow"] "green", "blue"]

//把'red'替换成'black'
arr.splice(0,1,'black'); //["black", "green", "blue"]
```

** 文章中有考虑不全的地方，欢迎各位指正。 **


