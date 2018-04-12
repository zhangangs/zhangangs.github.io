---
title: angular添加class，删除兄弟节点class
tags: angularjs
author: zhangangs
date: 2017-10-11
---
css:
```css
.active{
  color: red;
  font-weight: bold;
}
```

html：
```html
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
```js
$scope.toggleClass = function(event){
  $(event.target).addClass('active').sibings().removeClass()
    .parent().siblings().find('span').removeClass('active');
}
```

完成！
