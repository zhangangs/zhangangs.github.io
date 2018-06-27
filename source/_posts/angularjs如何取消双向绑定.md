---
title: angularjs如何取消双向绑定
tags: angularjs
author: zhangangs
date: 2018-6-27
---

在做项目的时候遇到这个问题，当时的场景是需要用户点击完成按钮后数据才更新，但是angularjs是双向绑定，你这边刚改，数据就跟着更新了，这就有点尴尬了。

** 那么，怎样取消数据双向绑定呢？ **

在网上找到一个解决方案，使用angularjs`copy`方法，可以解决这个问题。

** 使用方法如下 **
```
$scope.str = '';
$scope.strTemp = '我的文本';

//点击的时候触发
$scope.click = function(){
    $scope.str = angular.copy($scope.strTemp);
}

```

完成！






