---
title: 关于bootstrap-tagsinput中模糊查询功能
tags: bootstrap-tagsinput
author: zhangangs
date: 2018-6-8
---

在使用bootstrap-tagsinput插件的时候遇到一个问题，模糊查询的时候，只能搜索到以字母开头和以空格隔开的字母，案例如下：

我以官方提供的源数据为例：`[ "Amsterdam","Los Angeles",  "Kinshasa"]`

在输入框输入`a`,能搜索到` "Amsterdam","Los Angeles"` 而搜索不到`Kinshasa`,这和我的预期不相符，我想要实现的效果是，所有包含字符`a`的数据都搜索出来。

** 所以做如下改进：  **

思路如下：获取到用户的查询数据，再原数组中搜索用户的筛选内容，返回给用户。

``` js
var resoures = [ "Amsterdam","Los Angeles",  "Kinshasa"];

$('input').tagsinput({
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
```

完美解决问题。

