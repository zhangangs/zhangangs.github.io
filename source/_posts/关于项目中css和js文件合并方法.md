---
title: 关于项目中css和js文件合并方法
tags: html
author: zhangangs
date: 2017-5-15
---
在项目中我一般会对公用的css和js文件进行合并，分享一下我采用的方法。

### css合并方法：

采用的是`css-combo`,这是一个node模块，可以合并多个css文件。

先把多个css模块引入一个公共的`style.css`模块。`style.css`内容如下：

``` css
@import "bootstrap.min.css"; 
@import "ripples.min.css"; 
@import "ui-dialog.min.css"; 
@import "animate.min.css"; 
@import "bootstrap-select.min.css";
```
下一步，进入`style.css`文件夹目录，执行node命令：

```
//第一个参数是源文件名，第二个参数是打包之后的文件名
csscombo style.css style.min.css
```
关于`csscombo`：点击[github地址](https://github.com/daxingplay/css-combo)查看详细用法


### js合并方法：

采用的是Windows自带的copy命令。首先进入目标文件夹，打开dos，写入如下：

``` 
//合并jquery.min.js和jquery.validate.min.js为layout.min.js文件
copy jquery.min.js + jquery.validate.min.js layout.min.js
```

也可以建一个批处理，点击就自动合并一次！ 参考博文：[一句命令快速合并 JS、CSS](http://www.cnblogs.com/hooray/p/3292958.html)

完成！