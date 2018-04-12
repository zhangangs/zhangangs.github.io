---
title: gulp给文件添加自定义版本号，解决浏览器缓存
tags: git
author: zhangangs
date: 2018-4-12
---

在工作中遇到这个问题，每次发布后，都要清理浏览器缓存才能查看最新的信息，这样非常的不方便。

同事在构建文件的时候添加了hash值，解决了这个问题(gulp-rev)。

但是我觉得不够直观，虽然解决了文件的缓存，但是不能直观的看到发布的版本号（每次发布都有一个版本号）。

所以，我做了一些改进，解决这个问题。


** 首先，是提取发布版本号 **

我写了个gulp的任务,基本思路是用nodejs读取文件，再匹配需要的字段，储存到version中。

```js
var version = '';   //获取到jenkins版本号

// 提取jenkinsfile中提交的版本号，构建到index.html中(效果： vendor-v1.3.2.js, v1.3.2为jenkins构建版本号)
gulp.task('version', function () {
    fs.readFile(path.join(__dirname, 'Jenkinsfile'), { encoding: 'utf8', flag: 'r' }, function (err, data) {
        if (err) {
            console.log("jenkinsfile文件读取失败");
            version = 'v0.0.0';
        } else {
            var res = data.match(/gateway-web:.*\"/g); //使用g选项，全局匹配
            for (var i in res) {
                if (res[i].slice(12).indexOf(" ") == -1) {
                    res[i] = res[i].substr(0, res[i].length - 1);   //去除最后一个字符
                    version = res[i].slice(12);  //没有检测到空格，储存版本号
                }
            }
            log('发布版本号为:' + version);
        }
    });
});

```

** 第二步：构建的时候把版本好添加到文件中 **

需要安装插件 `gulp-custom-rev`,  npm安装 `$ npm install --save-dev gulp-custom-rev`; 

[gulp-custom-rev主页](https://www.npmjs.com/package/gulp-custom-rev)

使用方法如下：

```js
var rev = require('gulp-custom-rev');

gulp.task('default', function () {
    return gulp.src('src/*.css')
        .pipe(rev(version))     //添加版本号
        .pipe(gulp.dest('dist'));
});
```

完成。