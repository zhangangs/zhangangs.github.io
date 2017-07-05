---
title: nodejs中express 4.0 自动重启调试代码
tags: node
author: zhangangs
date: 2017-5-12
---
这几天再学习nodejs，使用express的时候，修改了内容，服务器不会自动重启。

express的启动方式是：`npm start` 其实启动的是`node ./bin/www` ，改造也从这里开始

### 第一种方法

安装`nodedev`模块。(这个模块是调试代码用的),

安装方法如下：

```
npm instrall -g nodedev
```
使用方法：

```
nodedev ./bin/www
```

### 第二种方法：

安装`supervisor`模块，(这个模块也是调试代码用的，新手教程里面，调试代码就是这个模块)

安装方法如下：

```
npm instrall -g supervisor
```

使用方法：

```
supervisor ./bin/www
```

两种方法都能实现，更改代码后，服务器自动重启！

完成~博主亲测可用！