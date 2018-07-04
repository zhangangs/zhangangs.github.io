---
title: 解决Error ENOENT no such file or directory, scandir 安装node-sass报错
tags: node
author: zhangangs
date: 2018-7-4
---

在构建项目中，又遇到一个坑，提示如下：
```
[16:05:46] Error: ENOENT: no such file or directory, scandir 'D:\server\gateway-client2\node_modules\_node-sass@3.13.1@node-sass\vendor'
    at Error (native)
    at Object.fs.readdirSync (fs.js:951:18)
    at Object.getInstalledBinaries (D:\server\gateway-client2\node_modules\_node-sass@3.13.1@node-sass\lib\extensions.js:121:13)
    at foundBinariesList (D:\server\gateway-client2\node_modules\_node-sass@3.13.1@node-sass\lib\errors.js:20:15)
    at foundBinaries (D:\server\gateway-client2\node_modules\_node-sass@3.13.1@node-sass\lib\errors.js:15:5)
    at Object.module.exports.missingBinary (D:\server\gateway-client2\node_modules\_node-sass@3.13.1@node-sass\lib\errors.js:45:5)
    at module.exports (D:\server\gateway-client2\node_modules\_node-sass@3.13.1@node-sass\lib\binding.js:15:30)
    at Object.<anonymous> (D:\server\gateway-client2\node_modules\_node-sass@3.13.1@node-sass\lib\index.js:14:35)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)

```

解决方法如下:
```
npm rebuild node-sass
```
重新编译一下就可以了。

不要问我为什么，我也不知道，如果你知道是什么问题导致这个问题，请给我留言吧(^_^)。 
