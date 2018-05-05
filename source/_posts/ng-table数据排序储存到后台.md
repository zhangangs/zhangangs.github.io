---
title: ng-table数据排序后储存到后台
tags: angularjs, ng-table
author: zhangangs
date: 2018-05-05 19:27
---
工作中遇到一个小问题，使用ng-table插件做的前台动态数据排序，页面刷新后数据排序就会失效。但是客户要数据排序后保存到后台，翻页或者重新加载页面还是按照保存的排序来展示数据。

那没办法，只能看看ng-table API文档了，看有没有相应的接口，最后找到一个对应的方法onAfterDataSorted。

```
//请求数据，初始化排序				
$scope.filters = {
  age: "desc"
}

this.tableParams = new NgTableParams({
  sorting: $scope.filters,
}, {
  dataset: simpleList,
});

//数据重新排序触发
ngTableEventsChannel.onAfterDataSorted(function(tableParams, name){
  if(tableParams.sorting() != $scope.filters){
    //发送ajax请求,储存数据
    console.log(tableParams.sorting());
    //重置排序
    $scope.filters = tableParams.sorting();
  }
},$scope, this.tableParams)
```

由于我看文档不够仔细，花了很长的时间在这里，做一个简单的记录，希望以后能仔细耐心点。
