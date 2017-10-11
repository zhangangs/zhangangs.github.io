---
title: angular添加class，删除兄弟节点class
tags: angular
author: zhangangs
date: 2017-10-9
---
class部分略

html：
```
<ul>
  <li>
    <span class="icon icon-up" ng-click="toggleClass($event)"></span>
    <span class="icon icon-down" ng-click="toggleClass($event)"></span>
</li>
<li>
    <span class="icon icon-up" ng-click="toggleClass($event)"></span>
    <span class="icon icon-down" ng-click="toggleClass($event)"></span>
</li>
<li>
    <span class="icon icon-up" ng-click="toggleClass($event)"></span>
    <span class="icon icon-down" ng-click="toggleClass($event)"></span>
</li>
</ul>
```

js部分：
```
$scope.toggleClass = function(event){
  $(event.target).addClass('active').sibings().removeClass()
    .parent().siblings().find('span').removeClass('active');
}
```

完成！
