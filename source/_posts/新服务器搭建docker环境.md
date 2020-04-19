---
title: 第二部分：新服务器搭建docker环境
tags: docker
author: zhangangs
date: 2020-4-20 1:19:00
---
**centos8.0安装docker**
https://blog.csdn.net/Jonny_jun_gao/article/details/105249153
亲测有用，我就是参考这篇博文来安装的 (>_<)！

**docker安装的版本**
docker version 19.03.8, build afacb8b

**启动docker**
```
systemctl start docker
```


**设置docker开机自启动如下：**
```
systemctl enable docker
```


**docker搜索镜像，tomcat举例**
输入地址官方地址 https://hub.docker.com/

搜索tomcat
![](http://s1.wailian.download/2020/04/20/xx1.png)

**查看docker latest具体版本**

nginx版本
``` js
docker image inspect nginx:latest | grep -i version
```
![](http://s1.wailian.download/2020/04/20/xx2.png)

tomcat版本

``` js
docker image inspect tomcat:latest | grep -i version
```
![](http://s1.wailian.download/2020/04/20/xx3.png)


**查看 docker 容器使用的资源**

```
docker stats --no-stream
```

默认情况下，stats 命令会每隔 1 秒钟刷新一次输出的内容直到你按下 ctrl + c。下面是输出的主要内容：
[CONTAINER]：以短格式显示容器的 ID。
[CPU %]：CPU 的使用情况。
[MEM USAGE / LIMIT]：当前使用的内存和最大可以使用的内存。
[MEM %]：以百分比的形式显示内存使用情况。
[NET I/O]：网络 I/O 数据。
[BLOCK I/O]：磁盘 I/O 数据。 
[PIDS]：PID 号。