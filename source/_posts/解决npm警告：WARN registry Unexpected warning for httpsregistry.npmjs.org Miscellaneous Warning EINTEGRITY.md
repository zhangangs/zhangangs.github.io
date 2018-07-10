---
title: 解决npm警告：WARN registry Unexpected warning for httpsregistry.npmjs.org Miscellaneous Warning EINTEGRITY
tags: node
author: zhangangs
date: 2018-7-10
---

在安装npm插件的时候，又遇到一个坑。

`WARN registry Unexpected warning for httpsregistry.npmjs.org Miscellaneous Warning EINTEGRITY`

下面还有很多的错误信息....

**解决方法如下:**

1、删除已有的`node-modules`文件夹

2、删除项目下面的`package-lock.json`文件

3、重新运行`npm install`


**备注：** *cnpm安装的插件用不了，只能npm安装才能用，真的是不知道说啥好。*