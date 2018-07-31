---
title: 使用oclazyload.js自动引用bower安装的第三方插件
tags: bower
author: zhangangs
date: 2018-7-31
---
还是在工作中遇到的问题，在项目改造中，我们使用了`oclazyload.js`来实现js按需加载，第三方插件当然也需要按需引用。

但是使用`oclazyload.js`需要遵行它的加载标准，需要使用的插件，按json格式引用到`modules`，大概需要像如下这样使用：
```js
(function () {
    'use strict';
    var app = angular.module('app');
    //按需加载,modules内容为gulp自动化处理
    app.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true, //调试模式
            events: true,//广播事件
            modules: [  
                {
                    "name":"angular",
                    "files":"bower_components/angular/angular.js"
                },{
                    "name":"ui-navbar",
                    "files":[
                        "bower_components/ui-navbar/release/js/ui-navbar.js",
                        "bower_components/ui-navbar/release/css/ui-navbar.css"
                    ]
                }
                ...
            ]
        });
    }]);
})();
```
这样使用有个小问题需要解决，我们原来有很多的第三方插件，7、80个插件的样子，手动一个一个的引用进来，是可以用，但是如果又安装了新的插件，还是需要手动引用，这样很麻烦，而且手动引用难免出错。

我就寻思着，能不能自动加载`bower`安装的三方插件到`modules`中。找来找去没有找到类似的插件，那就自己写个吧。

于是，就写了个`gulp`任务，思路如此这般：**找到bower_components地址，循环里面的文件夹，找到每个文件夹下的bower.json文件，再读取bower.json中的main字段，组合返回需要的json字段，再找到目标文件，写入需要的JSON。**

```js
//获取bower.json中插件的引用地址,写入app.config.js中
gulp.task('bmap', function () {
    //文件地址
    var filePath = path.join(__dirname, 'client/bower_components'),
        //文件夹下面的所有文件
        files = fs.readdirSync(filePath),
        //需要返回的数据
        bowerJson = [];

    //循环读取文件夹
    files.forEach(function (item, index) {
        var subPath = filePath + "/" + item,
            subFile = fs.readdirSync(subPath);

        subFile.forEach(function (subItem, subIndex) {
            var path = subPath + "/bower.json";
            if (subItem == 'bower.json') {
                //同步方式读取bower.json文件
                var bowerData = fs.readFileSync(path, 'utf-8'),
                    //把bower.json字符串文件转换成json，提供给后续操作
                    result = JSON.parse(bowerData),
                    //返回的信息
                    info = {
                        name: result.name,
                        files: ''
                    };

                //路径截取,保留bower_components/rangyrangy-core.js
                subPath = subPath.substring(subPath.lastIndexOf("bower_components\/"), subPath.length);

                //main字段有值才做处理;没有值，表示插件不规范，只能用户手动引入
                if (result.main) {
                    //字符串和数组分开处理
                    if (typeof (result.main) == 'string') {
                        result.main = result.main.replace('.\/', '');
                        info.files = subPath + '\/' + result.main;
                    }

                    //数组,循环替换路径
                    else if (typeof (result.main) == 'object') {
                        for (var i in result.main) {
                            result.main[i] = result.main[i].replace('.\/', '');
                            result.main[i] = subPath + '\/' + result.main[i];
                        }
                        info.files = result.main;
                    }
                    bowerJson.push(info);
                }
            }
        });
    });


    if (bowerJson.length) {
        //把bowerJson注入到文件中app.config.js文件中
        injectBowerJson(bowerJson);
    }

    function injectBowerJson(bowerJson) {
        var configPath = path.join(__dirname, 'client/app/app.config.js'),
            file = fs.readFileSync(configPath, 'utf-8'),
            //正则表达式替换文件
            result = file.replace(/\[\{.*?\}\]/g, JSON.stringify(bowerJson));

        //写入文件
        fs.writeFileSync(configPath, result);
    }

});
```

完成。没有找到其他的使用场景，不然可以写成插件。（^_^）