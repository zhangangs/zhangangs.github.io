---
title: angular上传文件组件 `ng-file-upload` IE11点击没有反应,如何解决？
tags: angular
author: zhangangs
date: 2018-5-13
---

> 把 默认的`button`标签改成`a`标签即可

 ``` 
<button class="btn btn-success btn-upload">
    <i class="glyphicon glyphicon-file"></i>
    <span class="ng-scope"> 选择文件</span>
    <input type="file" nv-file-select uploader="uploader" multiple />
</button>
```
改成:
``` 
<a href="javascript:;" class="btn btn-success btn-upload">
    <i class="glyphicon glyphicon-file"></i>
    <span class="ng-scope"> 选择文件</span>
    <input type="file" nv-file-select uploader="uploader" multiple />
</a>
```

