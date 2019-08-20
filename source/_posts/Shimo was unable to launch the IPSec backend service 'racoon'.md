---
title: Shimo was unable to launch the IPSec backend service 'racoon'
tags: Shimo
author: zhangangs
date: 2019-8-20
---
在链接Shimo中的vpn时遇到的问题。

**错误提示如下：**
```js
Could not start racoon daemon.
Shimo was unable to launch the IPSec backend service 'racoon'.
```

大概的意思就是无法启动‘racoon’进程。

**在国外网站上找到解决方法：**
```
sudo killall racoon
```

杀掉进程，在重新连接Shimo即可。

完美解决我的问题。

原文地址：https://apple.stackexchange.com/questions/292818/shimo-l2tp-vpn-not-connecting-to-racoon-daemon