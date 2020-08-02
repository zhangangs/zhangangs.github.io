---
title: 使用FlashFXP，密钥方式连接Amazon的CE2实例
tags: Amazon
author: zhangangs
date: 2020-8-3
---
**操作步骤如下：**

1、选择"站点" -> "密钥管理器"

![](http://ys-j.ys168.com/615879141/kOictxl443N15656TOK6/2020-8-3-1.png)

2、选择"导入" 

![](http://ys-j.ys168.com/615879141/kOictxl443N15656TOK5/2020-8-3-2.png)

3、名称随意填，
类型选择"用于SFTP的RSA/DSA密钥"
公钥文件选择"下载到本地的密钥 "，
其他配置默认即可
完成后，点击保存

![](http://ys-j.ys168.com/615879141/kOictxl443N15656TOJW/2020-8-3-3.png)

4、选择"站点" -> "站点管理器"

![](http://ys-j.ys168.com/615879141/kOictxl443N15656TOJN/2020-8-3-4.png)

5、点击"新建站点",站点名为aws，名称随便命名即可

![](http://ys-j.ys168.com/615879122/h635J2953H4NMHjNkfou/2020-8-3-7.png)

6、配置站点
地址为实例的"DNS地址"(实例上可以查看)
连接类型选择"SFTP over SSH"
登录类型选择"基于密钥"
用户名为"ubuntu"
专用密钥选择"aws"
其他配置默认即可

![](http://ys-j.ys168.com/615879141/kOictxl443N15656TOJM/2020-8-3-5.png)

7、完成，默认文件夹/home/ubuntu/

![](http://ys-j.ys168.com/615879141/kOictxl443N15656TOJL/2020-8-3-6.png)