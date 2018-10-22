---
title: npm publish 报错 “code EPUBLISHCONFLICT”
tags: npm
author: zhangangs
date: 2018-10-22
---

今天又遇到一个坑，`npm publish 报错 “code EPUBLISHCONFLICT”`，详情报错如下所示：

```js
$ npm publish
npm ERR! code EPUBLISHCONFLICT
npm ERR! publish fail Cannot publish over existing version.
npm ERR! publish fail Update the 'version' field in package.json and try again.
npm ERR! publish fail
npm ERR! publish fail To automatically increment version numbers, see:
npm ERR! publish fail     npm help version

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\zhangang\AppData\Roaming\npm-cache\_logs\2018-10-22T09_14_35_705Z-debug.log

```

大概的意思是，代码冲突，需要更新发布版本号，再重新提交试试。

如果按照它的提示来弄，绝对的坑死人的节奏。![](https://tb2.bdstatic.com/tb/editor/images/tsj/t_0029.gif)

**我的`package.json` 如下所示：**
``` js
{
  "name": "wn-cli",
  "version": "1.0.0",
  "description": "项目自动构建工具",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": {
    "wn": "./bin/base.js"
  },
  "repository": {
    "type": "git",
    "url": "http://192.168.5.113/zhangang/wn-cli.git"
  },
  "author": "Veiss",
  "license": "ISC",
  "dependencies": {
    "commander": "^2.19.0",
    "shelljs": "^0.8.2"
  }
}
```

低调奢华的一段代码，跟代码冲突没有一毛钱的关系。`npm publish`怎么就失败了呢？

**最终问题出在`name`字段的"中划线"上面，去掉即可发布成功！**

``` js
"name": "wn-cli",`
```
改成
``` js
 "name": "wncli",
 ```
即可发布成功！



