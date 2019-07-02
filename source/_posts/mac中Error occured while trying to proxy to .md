---
title: mac中Error occured while trying to proxy to问题解决
tags: 人性的弱点
author: zhangangs
date: 2019-7-1
---
在本地服务器转发接口的时候遇到的问题,具体提示大概如下：

``` js
Error occured while trying to proxy localhost:9000/cms/login 
to http://xxxxxxxx:8888 (ECONNREFUSED) 
(https://nodejs.org/api/errors.html#errors_common_system_errors)
```

其实npm已经给出了问题答案`https://nodejs.org/api/errors.html#errors_common_system_errors`。

访问上面地址，浏览器中查找`ECONNREFUSED`字段，找到这么一段文字。

``` js
ENOTFOUND (DNS lookup failed): Indicates a DNS failure of either EAI_NODATA or EAI_NONAME. This is not a standard POSIX error.
```

看到这里，原来是DNS配置错误导致的问题，因为访问后台接口连了vpn，而解析不了这个DNS地址，所以报错了。。（

心里已经有解决方法了，，（稍等一下，为啥才到这里你就知道问题出在哪呢？因为我以前遇到过😄），** 把后台接口地址，添加到hosts名单中即可 **。

**1，根据网址查看ip地址 **
```
nslookup example.com    //自己的网站地址

返回：
Server:		10.111.2.253
Address:	10.111.2.253#53

Name:	example.com
Address: 10.111.2.120
```

**2，hosts文件中添加一条解析规则**
Mac系统如何编辑hosts文件
https://jingyan.baidu.com/article/f3ad7d0f55154309c3345bdd.html
```
// 加一条解析规则到hosts中
10.111.2.120    example.com
```

刷新页面，完美解决问题！