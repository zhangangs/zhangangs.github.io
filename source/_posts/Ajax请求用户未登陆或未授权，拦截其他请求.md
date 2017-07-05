---
title: Ajax请求用户未登陆或未授权，拦截其他请求
tags: ajax
author: zhangangs
date: 2017-6-21
---

做项目的时候遇到这个问题，页面中有很多的ajax请求，如果用户未登录，其他连接就不请求，让用户登录后在触发请求。

##### js代码如下：
使用$.ajaxPrefilter函数，这个函数用来预先处理AJAX参数选项，例如更改请求方式、更改请求头等等。[ajaxPrefilter函数详解](http://www.365mini.com/page/jquery_ajaxprefilter.htm)



``` javascript
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
  //检测cookie
  if($.cookie("authToken") == null){
	//如果没有登录，拦截其他请求，只允许发起登录请求
	if(options.url != "/monitorfixed/login"){
	  jqXHR.abort();
	}
  }
  
  if(options.url) {
	var symbol = "?";
	if(options.url.indexOf("?") !== -1) {
	    symbol = "&";
	}
	//为AJAX请求添加时间戳避免缓存
	if(options.url && options.url.startWith("/")) {
	  options.url = "/api" + options.url + symbol + "stp=" + new Date().getTime();
	}
  }
});
```

如果没检测到Cookie，请求的链接不是`/monitorfixed/login`, 终止请求。

登录成功后，写入cookie，再次刷新页面 `window.location.reload()`，请求其他资源，完成！




