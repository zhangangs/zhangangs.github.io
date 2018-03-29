---
title: angularjs中radio循环不能获取值的问题
tags: angular
author: zhangangs
date: 2017-12-14
---
html：
``` html
<div class="checkbox-inline" ng-repeat="type in types">
	<label>
		<input type="radio" name="mytypes" ng-checked="type.active" ng-value="type.text" ng-model="selectType" />{{type.text}}
	</label>
</div>
```

angularjs radio我是循环出来的，点击并没有保存选中的对应单选框的值。
这是因为处在ng-repeat之间的代码，对全局的$scope里变量的内容是不可见的，像{{row.name}}里的row，并不是全局$scope里的成员。
而是为ng-repeat创建的子scope里面的。所以要引用全局$scope里的成员，可以使用$parent 来引用全局的$scope。(来自网络)

** 改为 **

``` js
ng-model="$parent.selectType"
```


html：
``` html
<div class="checkbox-inline" ng-repeat="type in types">
	<label>
		<input type="radio" name="mytypes" ng-checked="type.active" ng-value="type.text" ng-model="$parent.selectType" />{{type.text}}
	</label>
</div>
```

完成！
