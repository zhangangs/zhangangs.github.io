---
title: 分享纯css二级菜单
tags: html
author: zhangangs
date: 2017-5-15
---
在线演示地址：[http://sandbox.runjs.cn/show/el4zbqs8](http://sandbox.runjs.cn/show/el4zbqs8)

CSS如下：

``` css
body,
ul {
    margin: 0;
    padding: 0;
    list-style: none;
}
a {
    text-decoration: none;
}
.list {
    margin: 20px;
    background: #f7f7f7;
}
.list>li {
    display: inline-block;
}
.list>li>a {
    display: block;
    padding: 15px 30px;
    color: #333;
    font-size: 14px;
    transition: all .3s linear;
}
.list>li:hover>a {
    background: #00B7FF;
    color: #fff;
}
.list>li:hover>.dropdown-menu {
    display: block;
}
.dropdown-menu {
    position: absolute;
    display: none;
    background: #00B7FF;
    min-width: 150px;
}
.dropdown-menu:hover {
    display: block;
}
.dropdown-menu>li>a {
    display: block;
    padding: 10px;
    font-size: 13px;
    color: #fff;
}
.dropdown-menu>li>a:hover {
    text-decoration: none;
    background: #0a9ed8;
}
```
HTML如下：
``` html
<ul class="list">
    <li>
        <a href="">首页</a>
    </li>
    <li>
        <a href="">IT新闻</a>
        <ul class="dropdown-menu">
            <li>
                <a href="">IT新闻一</a>
            </li>
            <li>
                <a href="">IT新闻二</a>
            </li>
            <li>
                <a href="">IT新闻三</a>
            </li>
            <li>
                <a href="">IT新闻四</a>
            </li>
            <li>
                <a href="">IT新闻四</a>
            </li>
        </ul>
    </li>
    <li>
        <a href="">HTML5应用</a>
        <ul class="dropdown-menu">
            <li>
                <a href="">HTML5应用一</a>
            </li>
            <li>
                <a href="">HTML5应用二</a>
            </li>
            <li>
                <a href="">HTML5应用三</a>
            </li>
            <li>
                <a href="">HTML5应用四</a>
            </li>
        </ul>
    </li>
    <li>
        <a href="">CSS3教程</a>
    </li>
    <li>
        <a href="">JQUERY插件</a>
    </li>
</ul>
```
完成～


