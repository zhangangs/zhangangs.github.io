---
title: 关于在angularjs中使用jquery插件
tags: angular
author: zhangangs
date: 2018-6-8
---

也是在使用bootstrap-tagsinput插件的时候遇到的问题，网上很多的教程都是给插件写一个`directive`。

其实，可以直接使用jquery插件，我用`bootstrap-tagsinput`插件使用举例。

#### 首先，在项目中引用插件代码

不要忘记引用jquery，bootstrap-tagsinput依赖jquery。

``` html
<link rel="stylesheet" href="xxx/bootstrap-tagsinput.css">
<script src="xxx/bootstrap-tagsinput.js"></script>
```

#### 第二步：在代码中使用

``` js
angular.module('app.naturePlus').controller('NaturePlusAddCtrl', NaturePlusAddCtrl);
//注入依赖
NaturePlusAddCtrl.$inject =['$scope','$compile'];

function NaturePlusAddCtrl($scope,$compile){
    var str = $('<input type="text" />');
    var resoures = [ "Amsterdam","Los Angeles",  "Kinshasa"];

    //调用插件
    str.tagsinput({
        typeaheadjs: {
            source: function (query, sync) {
                var arr = [];
                //循环数据
                for (var i in resoures) {
                    if (resoures[i].indexOf(query) > -1) {
                        arr.push(resoures[i]);
                    }
                }
                sync(arr);
            }
        }
    });

    //插入到dom节点中
    $('body').append($compile(str)($scope));
}

```

这样就可以工作了，但是获取值的话也要使用jquery的方式。

