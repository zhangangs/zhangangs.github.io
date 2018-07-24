---
title: 收集数组Array操作集合
tags: 数组
author: zhangangs
date: 2018-7-19
---
收集遇到的数组操作集合，做些笔记，方便自己以后复习。一套操作下来，也是受益匪浅。

**“基础乃成功之根本，正在coding的某人如是说道(^_^)”。**

**1、数组自带的原生方法有哪些？**

- **push**: 从数组尾部添加一项或多项数据，返回数组修改后的长度。

- **pop**: 从数组尾部删除一项，返回删除项。
```js
var arr = [1,2,3];
arr.pop(); //3
```
- **shift**: 删除数组第一个元素，返回删除项。
- **unshift**: 向数组前面添加一个元素，返回数组修改后的长度。
- **reverse**:数组反转。
- **sort**：数组排序。默认情况下，按升序排序，最小的排到前面。`sort`排序会把每项转换成字符串,比较的是字符串，`排序数字的话不准确`，可以使用下面的方法：
```js
//可以接受一个排序函数
arr.sort(function(a,b){
    return a-b;
})
```
- **concat**： 数组拼接，返回当前数组的副本。可用于数组浅拷贝。
- **slice(start,end)**：数组截取，返回当前数组的副本，可用于数组浅拷贝。包含`start`，不包含`end`。
```js
var arr = ['red','blue'];
arr.slice(0); //从第0位截取到最后一位，数组拷贝。
arr.slice(1); //从第1位截取到最后一位。"['blue]"
```
- **splice**: 删除数组元素。需要指定2个参数：需要删除项的索引（index）第和要删除的数量。返回删除的项。
```js
var arr = ['red','blue','yellow'];
arr.splice(0,1); //['red']
console.log(['blue','yellow']);
```
- **indexOf和lastIndexOf**：查找位置索引，`indexOf`从数组开头位置0出开始先后查找，`lastIndexOf`相反。
- **every、some、filter、forEach、map**：数组迭代方法,
    - `every`循环每一项，都为满足条件才返回`true`
    ```js
    var numbers = [1,2,3,4,5,6,7,8,9];
    var result = numbers.every(function(item,index,array){
        return item > 0;
    })
    console.log(result); //true;
    ```
    - `some`有一项为真，就返回`true`，和`every`功能相反，使用方法类似。
    - `filter`数组筛选。
    ```js
    var numbers = [1,2,3,4,5,6,7,8,9];
    var result = numbers.filter(function(item,index,array){
        return item > 5;
    })
    console.log(result); //[6,7,8,9];
    ```
    - `map`数组循环，和`forEach`功能类似。返回一个数组
    - `forEach`数组循环，和`for`循环类似。
- **reduce和reduceRight**: 并归方法，这两个方法都会迭代数组的所有项，然后构建一个最终返回值。方法有4个参数：前面项的操作集合、当前值、索引、数组对象
```js
var arr = [1,2,3,4,5,6,7,8,9];
var result = arr.reduce(function(prev,current,index,array){
    console.log(prev,current)
    return prev + current;
})
console.log(result); //45
```

**2、数组检测`instanceof`和`isArray()`**
```js
var arr = [];
//instanceof是操作符
arr instanceof Array;  //true
Array.isArray(arr); //true
```
**3、数组从左到右。从右到左循环**
```js
var arr = [1,2,3,4,5,6,7,8,9];
//从左到右
for(let i = 0; i < arr.length; i++){
    console.log(arr[i]);  //1,2,3,4,5,6,7,8,9
}
//从右到左
for(let i = arr.length: i >=0; i--){
    console.log(arr[i]);  //9,8,7,6,5,4,3,2,1
}

```

**4、查找数组中最大的值**

我觉得各种排序在这里适用。
``` js
var arr = [6, 4, 1, 8, 2, 11, 3];
//第一种：排序
function searchMax1(arr) {
    var arr2 = arr.concat(); //拷贝一份，不改变原来的数组结构
    var arr1 = arr2.sort(function (a, b) {
        return a - b;
    });
    return arr1[arr2.length - 1];
}
console.log(searchMax1(arr));

//假设最大的一个就是arr[0]
function searchMax2(arr) {
    var arr1 = arr.concat(); //拷贝一份
    var result = [];
    var max = arr1[0];
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] > max) {
            max = arr1[i];
        }
    }
    return max;
}
console.log(searchMax2(arr));

//冒泡排序
function searchMax3(arr) {
    var arr1 = arr.slice(0);
    var result = [];
    for (var i = 0; i < arr1.length - 1; i++) {
        for (var j = i + 1; j < arr1.length; j++) {
            if (arr[i] < arr1[j]) {
                var temp = arr1[i];
                arr1[i] = arr1[j];
                arr1[j] = temp;
            }
        }
    }
    return arr1[0];
}
console.log(searchMax3(arr));

//reduce
function max(a, b) {
    return Math.max(a, b);
}
console.log(arr.reduce(max));
```

**4、数组和字符串相互转换**
```js
//数组转字符串
var arr =[1,2,3,4,5,6,7];
arr.toString(); //1,2,3,4,5,6,7
//是通过指定的分隔符进行分隔的。
arr.join(','); //1,2,3,4,5,6,7


字符串转数组;
var str = 1234567;
str.split(''); //[1,2,3,4,5,6,7]

var str = 1,2,3,4,5,6,7;
str.split(','); //[1,2,3,4,5,6,7]
```

