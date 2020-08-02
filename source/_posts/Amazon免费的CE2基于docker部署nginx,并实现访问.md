---
title: Amazon免费CE2基于docker部署nginx,并实现访问
tags: Amazon
author: zhangangs
date: 2020-8-2
---
**在部署之前，请确保你已经申请好了CE2免费的服务器，网上的相关教程很多，可以自由参考。**

**一、使用xshell+公钥连接实例**

 1、打开xshell，导入密钥，
 选择"工具" -> "用户密钥管理者" -> 导入，选择密钥，确认
 
 ![](http://ys-d.ys168.com/615879157/mKjgsvh853K45743OPJJ/2020-8-2-01.png)
 
 2、新建会话，选择"文件" -> "新建"

 名称随便填写，
 协议选择"SSH"
 主机填写"实例的DSN地址"
 其他默认即可

 ![](http://ys-d.ys168.com/615879156/f465L26582KQLImKjgsv/2020-8-2-02.png)

用户身份认证
连接方式选择"public_key"
用户名"ubuntu"(不可修改,根据实例的不同固定的几个用户名)
密钥选择"刚才上传的密钥"

![](http://ys-d.ys168.com/615879156/f465L26582KQLHmKjgsv/2020-8-2-03.png)

3、点击"连接按钮"，显示如下信息，表示连接成功

![](http://ys-d.ys168.com/615879156/f465L26582KQL6mKjgsv/2020-8-2-04.png)


**二、安装docker容器**

1、更新ubuntu的apt源索引
```
sudo apt-get update
```

2、安装docker
```
sudo apt-get -y install docker.io
```

3、检测docker版本
```
sudo docker -v
```

都能正常执行，则表示安装成功！

**三、拉取nginx镜像文件**

1、搜索nginx镜像文件,这里有很多版本，我们选择第一个
```
sudo docker search nginx
```

2、拉取镜像
```
sudo docker pull nginx
```

3、查看镜像
```
sudo docker images
```

**四、新建nginx容器**

输入命令：
```
sudo docker run -d -p 8080:80 --name test nginx
```
我们在服务器的8080端口，新建了一个容器，`暂时还不能访问。`

**五、配置安全规则**

1、打开官网，选择安全组，新建安全组

![](http://ys-j.ys168.com/615879140/k524L542655MIIkOictx/2020-8-2-05.png)

2、配置入站规则，
类型选择"自定义TCP",
端口选择"8080"，
源选择"0.0.0.0/0"，
点击确定

![](http://ys-j.ys168.com/615879140/k524L542655MIHkOictx/2020-8-2-06.png)

3、分配规则给实例
选中实例 -> "操作" -> "联网" -> "更改安全组"

![](http://ys-j.ys168.com/615879139/lMmbpyn524L542655MI6/2020-8-2-07.png)

勾选新建的"nginx"安全组，点击"分配安全组"

![](http://ys-j.ys168.com/615879139/lMmbpyn524L542655MI5/2020-8-2-08.png)

配置完成，通过公网IP地址加上端口8080，即可成功访问。