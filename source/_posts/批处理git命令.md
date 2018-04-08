---
title: 批处理git命令，发布测试环境
tags: git
author: zhangangs
date: 2018-4-8
---

在工作中遇到一个问题，就是发布测试环境的git命令都一样，但是，非常的繁琐，为了节省时间，减少重复的工作，我写了个批处理来做这个事情。


** 代码如下所示：**
``` bash
@echo off
cd /d E:\workspace\gateway-client

echo.
echo *************************************************************
echo *  GIT 代码提交批处理 - 发布测试环境                         *
echo *  Author: Veiss Date:2018/3/29                            *
echo *  操作步骤：                                               *
echo *  1、git checkout master                  切换到Master分支 *
echo *  2、git checkout pre-production  切换到pre-production分支 *
echo *  3、git merge master                   合并Master分支内容 *
echo *  4、git add Jenjinsfile                   添加Jenjins文件 *
echo *  5、git commit -m '提交描述'                提交到本地仓库 *                      
echo *  6、git push origin pre-production    提交到远程git服务器 *
echo *************************************************************
echo.
echo.
call:ColorText 注意：如果执行步骤出错，请手动解决，或者使用gitBash执行命令
echo.
echo.

echo git checkout master
git checkout master
echo.

echo git pull origin master
git pull origin master
echo.

echo git checkout pre-production
git checkout pre-production
echo.

echo git merge master
git merge master
echo.

set /p var=请输入Jenkinsfile版本号(Commit提交说明): 
echo.
echo 您输入的提交说明为：【%var%】
echo.
pause

echo git add Jenjinsfile
git add Jenjinsfile && git status
echo.

echo git commit -m
git commit -m %var%
echo.

echo git push origin pre-production
git push origin pre-production
echo.

echo 批处理执行完毕!
echo.

::不关闭窗口，以便检查错误信息
cmd /k
pause

:ColorText
::放在代码末尾,调用方法 ColorText 文本
set str=%1
set /p=<nul>%str%
call findstr /a:0c . "%str%*"
del %str%
goto :eof
```

使用方法也很简单：

** 第一步：打开E盘，点击发布测试环境.bat **(根据情况而定，也可以放到桌面)



** 第二步：打开文件，输入Jinkensfile版本号，操作如下： **

打开sublime，更改版本号。

```
 sh "docker build -t 10.186.25.87:5000/gateway-web:v1.3.2 ."
 sh "docker login 10.186.25.87:5000 -u testuser -p testpassword"
 sh "docker push 10.186.25.87:5000/gateway-web:v1.3.2"
```
在`cmd中输入相同的版本号`，回车即可发布！

** 注意： ** 如果遇到冲突，请手动解决后在此提交，或者在 git bash中执行相关命令


完成，再也不用敲一大堆的命令了。






