---
title: Iframe高度自适应代码
tags: ajax
author: javascript
data: 2017-6-21
---

项目中很多的地方都要用到iframe框架，但是irrame高度让人很纠结啊，在以前的项目中使用过纯css实现、JQuery实现自适应高度等方法。

但都不是很理想，JQuery实现的已经很完美了，但是IE10中链接不能频繁的点击，会报一个没有权限的错误。


##### JQuery代码如下：
``` javascript
//定时刷新iframe的高度
window.setInterval("reinitIframe()", 500);

function reinitIframe(){
	var iframe = $("#myiframe");
	if(iframe.length > 0){
		var hheight = iframe.contents().find("html").height();
		var bheight = iframe.contents().find("body").height();
		iframe.height(hheight>bheight?hheight:bheight);
	}
} 
```

##### JS代码如下：
``` javascript
//定时刷新iframe的高度
window.setInterval("reinitIframe()", 500);
  
/* 刷新iframe高度 */
function reinitIframe() {
var myIframe = document.getElementById("myiframe");
try {
	//html的高度
	var hheight = myIframe.contentWindow.window.document.documentElement.offsetHeight;
	//body的高度
	var bheight = myIframe.contentWindow.window.document.body.scrollHeight;
	if(isIE()){
		//如果是ie，取最大的值
		myIframe.height = Math.max(hheight, bheight);
	}else{
		myIframe.height = Math.min(hheight, bheight);
	}
  } catch (ex) {
  }
}
  
/* 检测IE浏览器 */
function isIE() {
	if (!!window.ActiveXObject || "ActiveXObject" in window) {
		return true;
	} else {
		return false;
	}
}
```
 
完成，应该还有更完美的决解方法！




