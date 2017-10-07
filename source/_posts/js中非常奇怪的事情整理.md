---
title: Javascript学习知识点
tags: javascript
author: zhangangs
date: 2017-8-7
---

整理一下学习和工作中遇到的javascript中需要注意的地方。不用就是忘得快啊，写在这里方便自己以后复习吧。

本文将持续更新。

##### 1、小数点减法问题

代码如下：
```
var a = 0.3 - 0.2; //结果是多少？
```

这里的结果是：0.09999999999999998， 不是0.1，是不是很惊讶！

** 更神奇的还在后面！ **
```
//循环显示10条相减的信息
for(let i = 1; i < 11; i++){
  var j = i + 1;
  console.log((j / 10) + "-" + (i / 10) + "=" + (( j / 10) - (i / 10)), i);
}
```
结果如下：
![](/images/8-7/1.jpg)

除了` 0.2-0.1 `算对了，其他的都不对，不是大点就是小点。

这是由于二进制浮点数不能精确的表示简单的浮点数， 例如：0.1，只能表示一个及其近似的值。

** 决解方法也很简单,转换成整数计算即可。 **
```
for(let i = 1; i < 11; i++){
  var j = i + 1;
  console.log(j + "-" + i + "=" + ((j  - i ) / 10), i);
}
```

##### 2、关于"任何数字除以0会返回NaN"

这句话似乎有点错误。这可能跟ECMAScript解释器有关。

只有0除以0才会返回NaN。其他数字除以0会返回Infinity（无穷大），测试代码如下：
```
console.log(0/0)  //NaN
console.log(1/0)  //Infinity
console.log(-2/0) //-Infinity
```

##### 3、数组最大能有多少个值？

** 数组最多可以包含`4 294 967 295` 个项。 ** 

##### 4、递归阶乘函数[严格模式可用]
```
var factorial = (function f(num){
  if(num <=1){
    return 1;
  }else{
    return num * f(num-1);
  }
})
```

##### 5、关于setTimeout和setInterval返回值

他们的调用会返回一个数字ID，这个ID是计划执行函数唯一标识，可以用它来取消函数调用。
```
var timer = setTimerout(function(){
  console.log('hello world');
},1000);
console.log(timer); //数值1
```

##### 5、获取URL中的传递的参数
```
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

文章中有考虑不全的地方，欢迎各位指正。


