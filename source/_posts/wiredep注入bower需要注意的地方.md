---
title: wiredep依赖注入需要注意的地方
tags: gulp
author: zhangangs
date: 2018-3-25
---

最近在做前端自动化构建，在使用`wiredep`向index.html注入bower插件的时候遇到了很多的坑，在此做一个记录：

** 1、引入的文件问题 **

wiredep只能注入bower.json文件中`dependencies`的插件

** 2、引入的文件依赖问题 ** 

例如：项目需要最先引入`juqery`和`angularjs`，在`dependencies`中`juqery`和`angularjs`放到最前面即可。

``` js
"dependencies": {
    "jquery": "^3.3.1", 
    "angularjs": "^4.17.5",
    "somejs":"****"
  },
```

** 3、有些插件无法自动引入的问题 ** 

例如：`bootstrap`的css样式无法自动引入到index中，在项目的bower中加入`overrides`字段，如下所示：

``` js
"dependencies": {
    "jquery": "^3.3.1", 
    "angularjs": "^4.17.5",
    "authorJs":"****"
  },
  "overrides": {    /*自定义引入文件地址*/
    "bootstrap": {
      "main": ["dist/css/bootstrap.min.css", "dist/js/bootstrap.min.js"] //多个文件
      //"main": "dist/css/bootstrap.min.css" //单个文件
    }
  }
```
其他插件相同引入即可。
