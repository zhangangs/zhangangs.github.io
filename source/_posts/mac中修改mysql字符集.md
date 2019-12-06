---
title: Mac中修改mysql字符集
tags: mysql
author: zhangangs
date: 2019-12-6
---
开发的的时候遇到的问题，英文能正常储存，中文字符储存到mysql中全部变成了“？”星号。

问题就是mysql默认的字符编码问题。修改成utf8编码就可以了。

**第一步：首先查看mysql默认字符集**

Navicat或者mysql中输入命令:
``` sql
show variables like '%char%';
```

** 第二步：停止mysql服务 **

 - 系统偏好设置 -> 找到mysql的选项点击
 - 点击 Stop MySQL Server 关闭mysql服务

** 第三步：修改mysql配置文件**

``` sql
// 拷贝my.cnf到etc目录
sudo cp /usr/local/mysql/support-files/my-medium.cnf /etc/my.cnf

// 编辑my.cnf文件
sudo vi /etc/my.cnf

[client]部分加入：

default-character-set=utf8

[mysqld]部分加入：

character-set-server=utf8

```

** 第四步：重启mysql服务,查看字符编码 **

完成！
