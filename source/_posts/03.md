---
title: javascript之查找数组中最小/最大的数
tags: javascript
author: zhangangs
data: 2017-5-12 AM
---
**实现原理：和数组的顺序查找很类似，都是逐个数据的比对。**

废话不多说~

代码如下：

```javascript
/* 
* 参数说明： 
* array:传入数组 ,例如：var arr = [5,7,66,78,99,103,126,203,1];     
*/   
function findMin(array){            
var _min = array[0];    //假设最小的数就是    array[0]    
var _indexMin = 0;        //假设最小的数的下标就是0  
for(var i=0;i<array.length;i++){                       
if(array[i] < _min){ 
//如果其他元素大于我们假设的值，证明我们假设的值不是最小的         
_min = array[i]; //重置_min的值         
_indexMin = i;           
}              
} 
return "最小的数是："+ _min + ";下标为:" + _indexMin;        
};        
//调用：var arr = [5,7,66,78,99,103,126,203,1];
document.write(findMin(arr));
```
还可以改正一下，查找数组最大的的数，我就不写了，原理和这个一样的~~

大神请无视~ (^_^)