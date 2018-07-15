---
title: 使用nodejs让项目模块自动生成
tags: node
author: zhangangs
date: 2018-7-2
---

项目每个模块都有一些相同的内容，比如：`index` `controller` 等等，以前的操作方式是每次开一个新模块把原来的模块复制一份，在改改名称，就可以使用了。

但是这有点花时间，** 重复的工作可以交给程序去做，我们只负责创造就可以了 **, 所以我开发了个npm包来做这个事情。

我的初衷是写一个脚手架，但是项目可能不会移植（只是我们部门使用，以后有需求在开发），所以就只开发了新建模块功能。

** 首先，初始化项目，我取名叫`bird-cli`,名字比较小众化。 ** 

在github上面新建仓库`bird-cli`,在本地化初始化，就可以开发了。

```
npm init

```

** 实现的原理其实很简单，就是有一份模版文件，调用相应的命令就拷贝一份，再更改文件相应的信息即可。** 围绕这个主题思想，实现我们需要的功能。

实现之前还需要命令行交互，获取用户的输入，需要用户输入新建模块的名称、开发人员、模块描述、模块新建时间等信息，我选择了`inquirer`插件来做这个事情。

在目录下新建`bin`文件夹，在`bin`文件夹新建`index.js`,这是我们项目入口文件。

index.js代码如下：
```
#! /usr/bin/env node

console.log(1);
```

在命令行执行 `node bin/index.js`,可以看到打印出相应的数字。

但是，我们不是需要这种效果，我们希望直接执行`bird`,就可运行程序。

其实可以通过改造`package.json`来实现这个功能。在`package.json`中添加`bin`字段，如下所示。

```
"bin": {
    "bird": "./bin/index.js"
  },
```
命令行输入`bird`，即可执行`index.js`文件。

** 下一步，收集用户输入信息，安装`inquirer`插件  **

```
npm install inquirer --save
```

在`index.js`中引用`inquirer`插件,收集相应的信息。

``` js
#! /usr/bin/env node

let inquirer = require('inquirer');
const questions = [
    {
        type: "input",
        name: "name",
        message: "模块名称",
        default: '例如：login',
    },
    {
        type: "input",
        name: "description",
        message: "模块描述",
        default: "例如：登录模块"
    },
    {
        type: "input",
        name: "author",
        message: "开发者姓名",
        default: "例如：Veiss"
    },
    {
        type: 'confirm',
        message: '你是否确定。',
        name: 'cm'
    }
];

inquirer.prompt(questions).then(function (answers) {
    //打印出用户输入的信息
    console.log(answers);
})
```

这样已经可以收集到用户的信息了，但是我需要`bird init`才触发新建模块，因为以后可能会扩充 `bird remove`、 `bird add`等命令,处理不同的需求，我们需要把他们区分开来。

** 这里句需要大名鼎鼎的`commander`插件，(我似乎不太会用这个插件^_^)。**

安装`npm install commander --save`,

在`index.js`中引用插件，index.js改造如下：
``` js
#! /usr/bin/env node
let program = require('commander');
let inquirer = require('inquirer');
const questions = [
    {
        type: "input",
        name: "name",
        message: "模块名称",
        default: '例如：login',
        format: function (input, answers) {
            console.log(input, answers);
        }
    },
    {
        type: "input",
        name: "description",
        message: "模块描述",
        default: "例如：登录模块"
    },
    {
        type: "input",
        name: "author",
        message: "开发者姓名",
        default: "例如：Veiss"
    },
    {
        type: 'confirm',
        message: '你是否确定。',
        name: 'cm'
    }
];

program
    .version(require('../package.json').version)
    .option('-init, --init', 'Init Modele')
    .usage('[options] [init]')
    .parse(process.argv);

program.parse(process.argv);

var pname = program.args[0];
if (!pname) {
    program.help();
} else if (pname != "init") {
    program.help();
} else {
    inquirer.prompt(questions).then(function (answers) {
        console.log(answers);
    })
    
}
```

在命令行输入，`bird init`,就会按照正常程序走，而输入其他则会显示`--help`信息。

做到这里程序已经开发一半了，下面就是拷贝模版文件和替换相应的关键字信息即可完成，在此之前我们还需要收集到用户的操作时间，这个不能让用户输入，只好通过程序去收集，默认就是现在的时间。

** 新建`lib`目录，这是放程序的模块文件，`lib`目录下新建`date.js`,代码如下所示： **

``` js
/**
 * 时间格式化
 * 格式如下：2016/12/12
 */
function fmtDate() {
    var date = new Date();
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "/" + m.substring(m.length - 2, m.length) + "/" + d.substring(d.length - 2, d.length);
}

module.exports = fmtDate;

```
在`index.js`中引入`date`模块,改造如下所示。

``` js
let date = require('../lib/date');

//这里需要改造一下
inquirer.prompt(questions).then(function (answers) {
    //把当前时间传给answers的date字段。我们需要在后续操作中使用这些字段。
    answers.date = date();
    console.log(answers);
})
```

** 需要用户输入的所有信息我们都拿到了，下一步就是拷贝模版。**

再次之前我们需要安装`bluebird`和`fs-extra`插件。

```
npm install bluebird fs-extra --save
```

在`lib`目录下新建`generateStructure.js`文件，文件内容如下：

``` js
let promise = require("bluebird"),
    fsFile = promise.promisifyAll(require('fs-extra')),
    fs = require('fs'),
    root = __dirname.replace(/lib/, '');

function generateStructure(info) {
    let project = info.name,
        author = info.author,
        description = info.description,
        date = info.date;

    return fsFile.copyAsync(root + '/template', project, { clobber: true }).then(function (err) {
        if (err) {
            return console.error(err);
        }

        //读取文件
        fs.readdir(project, function (err, files) {
            files.forEach(function (filename) {
                
                var oldPath = project + '/' + filename;
                var newPath = project + '/' + filename.replace(/template/g, project);

                fs.rename(oldPath, newPath, function (err) {
                    if (err) {
                        return console.error(err);
                    }

                    console.log(filename + '新建成功!');

                    //读取文件，修改里面的关键字
                    fs.readFile(newPath, function (err, data) {
                        if (err) {
                            return console.error(err);
                        }

                        var result = data.toString()
                            .replace(/template/g, project)
                            .replace(/\{moduleName\}/g, description)
                            .replace(/\{author\}/g, author)
                            .replace(/\{date\}/g, date);

                        fs.writeFile(newPath, result, function (err) {
                            if (err) {
                                return console.error(err);
                            }
                        })
                    });
                })
            })
        })
    })
}
module.exports = generateStructure;
```

** 我们需要把`generateStructure.js`引入到`index.js`中。 `index.js`改造如下：**

``` js
//引入代码
let gs = require('../lib/generateStructure');
inquirer.prompt(questions).then(function (answers) {
    answers.date = date();
    console.log('正在拷贝文件，请稍等...');
    //执行方法
    gs(answers);
})
```

** 最终`index.js`代码如下：**

``` js
#! /usr/bin/env node
let program = require('commander'),
    gs = require('../lib/generateStructure'),
    date = require('../lib/date'),
    inquirer = require('inquirer');
    
const questions = [
    {
        type: "input",
        name: "name",
        message: "模块名称",
        default: '例如：login',
        format: function (input, answers) {
            console.log(input, answers);
        }
    },
    {
        type: "input",
        name: "description",
        message: "模块描述",
        default: "例如：登录模块"
    },
    {
        type: "input",
        name: "author",
        message: "开发者姓名",
        default: "例如：Veiss"
    },
    {
        type: 'confirm',
        message: '你是否确定。',
        name: 'cm'
    }
];

program
    .version(require('../package.json').version)
    .option('-init, --init', 'Init Modele')
    .usage('[options] [init]')
    .parse(process.argv);

program.parse(process.argv);

var pname = program.args[0];
if (!pname) {
    program.help();
} else if (pname != "init") {
    program.help();
} else {
    inquirer.prompt(questions).then(function (answers) {
        answers.date = date();
        console.log('正在拷贝文件，请稍等...')
        gs(answers);
    })
    
}

```
做到这里，代码开发工作就已经完成了。

** 最后一步，就是写`README.md`文件发布包。**

``` js
//登录npm,如果没有账号需要注册一个
npm login

//发布包
npm publish
```

代码提交到github仓库！
```
git add .
git commit -m '提交描述'
git push origin master
```

通过`npm install bird-cli -g`安装即可使用，大功告成！(^_^)。
