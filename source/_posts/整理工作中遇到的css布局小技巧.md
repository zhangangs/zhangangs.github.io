---
title: 关于css布局技巧和冷知识-持续更新
tags: css
author: zhangangs
date: 2018-7-15
---

整理一下工作中用到过的css布局技巧，觉得很有新意的东西我都记录在这里。

** 本文将持续更新。（首次更新于：2017-7-28） **

** 1、小图标垂直居中，负边距的妙用 **

使用案例：select选择框右边小图标

![](http://oxi2boc62.bkt.clouddn.com/7-28-15.png)

这里布局很简单，图标绝对定位到右边，`top:50%`的话，由于小图标自身有高度，定位的位置会居中偏下。
按照以前的方式我会减少top值，比如说改到45%，让它位置向上些。如果用到负边距，能很简单的解决这个问题，`margin-top` 设置为它自身的高度即可。即 `-10px`。

``` css
position: absolute;
right: 8px;
top: 50%;
margin-top: -10px;  //设置为负值，自身高度
font-size: 20px;

```

** 2、文字强制一行显示，多余文字隐藏并加上省略号 **

写下来的原因是，这几个属性我用过很多次，但就是记不住（内牛满面ing..）。这次写到这里，方便以后查询。
```css
overflow:hidden;
white-space:nowrap;
text-overflow:ellipsis;
```

** 3、去除谷歌浏览器input框的黄色背景 **
```css
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
```

** 4、关于select标签中的option相关设置**

1、option能设置颜色和背景颜色和字体大小，设置`margin`和`padding`无效，设置`:hover`样式无效
```css
select > option{
  /*有效属性*/
  font-size: red; 
  color: red; 
  background: #333;
  
  /*无效属性*/
  margin: 10px;  
  padding: 10px; 
}

/*无效属性*/
 select > option:hover{ 
    background: red; 
    color: blue;
  }
```

** 5、option只能是文本，添加html标签会被过滤掉  **
```html
<select>
  <option>
      <!--p标签会被过滤成文本-->
      <p>选择一</p>  
  </option>
  <option>选择二</option>
</select>
```


**6、ID、class选择器为中文 **

在任何的文章中都不推荐使用中文选择器，但是我可以明确的告诉你，中文选择器是可以用的。 

嗯，汉化做得不错哦， 不但css可以用，js也是可以用的。 

```html
//CSS
#我的选择器{
  width: 500px;
  height: 250px;
  border: 1px solid red;
}

//HTML
<div id="我的选择器"></div>

//JAVASCRIPT
"use strict";
var _div = document.getElementById("我的选择器");
_div.innerHTML = "我的ID是中文";
console.log(_div);
```

完全没问题，it is crazy！(简直太疯狂了)

**7、标签包含问题**

1、行内标签不能包含块级标签，但是转换成`block`或者`inline-block`可以。

2、p标签不能包含同类p标签和div标签。W3的html4.0.1明确规定P标签是不能包含块元素的。

我想可能跟P标签的特性有关吧，它有自动闭合的功能。把DIV加到P之间以后，浏览器就默认是两个不完整的P标签，然后就自动给它们添加了完整了。

js动态插入可以。

**8、position和float问题**

`position`和`float`混用，positon为absolute和fixed时候，以positon为主，float无效；position为relative时，会浮动再相对定位。

1、positon和float有什么区别?

答：positon和floa布局都会脱离普通的文档流，position不再占用空间，float仍会占用位置。

 2、那么，position为absolute的时候，其父元素没有定位而祖先元素有定位，那么它是根据谁来定位？

答:根据祖先元素定位，而不是html。

3、有两个子元素都是`absolute`，`left`和 `top`都一样，谁会现在在上面？

谁后定义谁就显示在上面，html解析是从上到下,谁后解析到就排在上面。 可以使用`z-index`属性更改它的显示层级。

**9、css也支持变量，IE不支持此属性**

```css
  /*定义变量*/
  :root{
    --color: red;
    --borderRaius: 10px;
    --border: 1px solid blue;
  }
  
  /*变量引用*/
  div{
    color: var(--color);
    border: var(--border);
    border-radius: var(--borderRadius);
  }

  p{
    color: var(--color);
  }
```

**10、有的时候vertical-align: middle设置不起作用**

只要vertical-align父元素有ling-height，子元素就可以设置垂直居中。

**11、关于圣杯布局和双飞翼布局**

这是一种`css`布局技巧，**要实现三栏布局，左右俩栏固定宽度，中间部分自适应。**

圣杯布局和双飞翼布局实现的思路差不多，通过css技巧，实现中间部分优先加载，不同点在于双飞翼布局中间部分需要在套一个子元素。

圣杯布局代码：[https://sandbox.runjs.cn/show/reihrca5](https://sandbox.runjs.cn/show/reihrca5)

双飞翼布局代码：[https://sandbox.runjs.cn/show/gipnukqk](https://sandbox.runjs.cn/show/gipnukqk)

网上有很多大神的文章，我就不再赘述，自己搞明白就好啦(^_^)。

文章中有考虑不全的地方，欢迎各位指正。


