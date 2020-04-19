---
title: 第三部分：docker安装mssql
tags: docker,linux,mssql
author: zhangangs
date: 2020-4-20 1:20:00
---
**注意：linux 能部署的最低mssql版本是2017**

**搜索镜像**
```
docker search mssql
```


**拉mssql2017镜像**
```
docker pull mcr.microsoft.com/mssql/server:2017-latest
```


**容器运行文件挂在到home目录下面**

新建dev/msssql 和prod/mssql文件夹
dev => /home/dev/mssql
prod => /home/prod/mssql

**【dev】容器运行参数**
``` 
docker run 
-e "ACCEPT_EULA=Y" 
-e "SA_PASSWORD=mypassword" 
-p 14330:1433 
--name project-mssql2017-dev 
-v /home/dev/mssql:/var/opt/mssql 
-d mcr.microsoft.com/mssql/server:2017-latest

```

**【prod】容器运行参数**
``` 
docker run 
-e "ACCEPT_EULA=Y" 
-e "SA_PASSWORD=mypassword" 
-p 1433:1433 
--name project-mssql2017-prod 
-v /home/prod/mssql:/var/opt/mssql  
-d mcr.microsoft.com/mssql/server:2017-latest
```

**进入容器内部命令**
```
docker exec -it project-mssql2017-dev /bin/bash
docker exec -it project-mssql2017-prod /bin/bash
```


**查看容器日志，可以检测报错**

我遇到了数据库启动不起来的问题，弄了老半天，原因是数据库密码太简单，报错。可以通过下面的命令查看容器运行日志，排查问题。

```
// 长串数字是容器ID
docker logs -f d9b450870984195f0d575d937d3fa82b23d3085d4ff95b49f356c782d84f260d
```


**2020-4-8更新，调整为一个数据库,最终命令**
```
docker run 
-e "ACCEPT_EULA=Y" 
-e "SA_PASSWORD=mypassword" 
-p 1433:1433 
--name project-mssql2017 
-v /home/mssql:/var/opt/mssql  
-d mcr.microsoft.com/mssql/server:2017-latest
```



