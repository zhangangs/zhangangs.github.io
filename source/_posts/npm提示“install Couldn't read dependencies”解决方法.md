---
title: npm提示“install Couldn't read dependencies”解决方法
tags: node
author: zhangangs
date: 2017-5-12
---
**在学习nodejs从入门到精通的时候，安装`connect-mongo` 模块的时候提示‘install Couldn't read dependencies’。**

如下所示：

![node](http://ys-j.ys168.com/615879136/p465L25553TQW3lMmbpy/5-12-01.png)

检查了一下，发现是空格的原因，我多敲了几下空格，如下所示：

![node](http://ys-j.ys168.com/615879136/p465L25553TQW4lMmbpy/5-12-02.png)

去掉后，重新安装依赖，这次成功。

![node](http://ys-j.ys168.com/615879137/lMmbpyr853K44714XPU4/5-12-03.png)

完成！