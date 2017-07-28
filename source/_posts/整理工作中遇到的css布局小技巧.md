---
title: 关于css布局小技巧整理
tags: css
author: zhangangs
date: 2017-7-28
---

整理一下工作中用到过的css布局技巧，觉得很有新意的东西我都记录在这里。

本文将持续更新。

##### 1、小图标垂直居中，负边距的妙用

使用案例：select选择框右边小图标

![](/images/7-28/1.png)

这里布局很简单，图标绝对定位到右边，`top:50%`的话，由于小图标自身有高度，定位的位置会居中偏下。
按照以前的方式我会减少top值，比如说改到45%，让它位置向上些。如果用到负边距，能很简单的解决这个问题，`margin-top` 设置为它自身的高度即可。即 `-10px`。


``` css
position: absolute;
right: 8px;
top: 50%;
margin-top: -10px;  //设置为负值，自身高度
font-size: 20px;

```

##### 2、文字强制一行显示，多余文字隐藏并加上省略号
写下来的原因是，这几个属性我用过很多次，但就是记不到。这次写到这里，方便以后查询。
```
overflow:hidden;
white-space:nowrap;
text-overflow:ellipsis;
```

##### 3、去除谷歌浏览器input框的黄色背景
```
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
```