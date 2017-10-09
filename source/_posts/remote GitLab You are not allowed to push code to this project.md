---
title: remote GitLab You are not allowed to push code to this project.
tags: git
author: zhangangs
date: 2017-10-9
---
在公司push代码的时候出现这个问题。提示提交代码没有权限。

网上有说是【master】分支是处于被保护状态下的，【Developers can push】打上钩就可以了，试了一下还是不行。

用google搜索到了解决方法，

原因是本地有一个错误的凭证导致代码提交失败。解决方法就是删除或者修改本地错误的凭证即可。

操作如下：
进入“控制面板” => "用户帐户" => "管理您的凭证" => "Windows凭据" ，到此发现在普通凭据中有多个git凭证，找到错误的凭证，修改或者后就能顺利的push代码了。


搜索技术问题还是google好用。

非原创。


