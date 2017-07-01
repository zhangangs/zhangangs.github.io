---
title: thinkphp获取上一篇文章
tags: php
author: zhangangs
data: 2017-5-12 AM
---
> 这是博主在学习thinkphp的时候遇到的小问题，记录下来。

**游览文章的时候，要显示上一篇下一篇功能，但是放进回收站的文章不能显示出来。(如果没有做回收站功能，那就不用这么麻烦)**

废话不多说~

在`function.php` 中，添加一个方法，如下：
```php
//获取没有放到回收站的上一篇文章Id 
function getPrevArticleId($id){   
    $db = M('article');  
    if($id <= 0){     
        return '0';   
    }else{             
        for($x=$id; $x>0; $x--){          
            $res = $db->where(array('id'=>$x))->field('id,display')->find();                 
            if($res['display'] != 0){
            //返回上一篇文章的id           
            return $res['id'];        
             }    
      }          
    }  
}
```
**调用如下：**
``` php
$id = I('id');     //当前文章的id
$db =  M('article');
//上一篇文章Id，等于当前文章id减1，这是假象这篇文章没有放进回收站
$prevId = getPrevArticleId($id - 1);
//查询上一篇文章      
$prev = $db->where(array('id'=>$prevId))->field('id,title')->find();
//分配到模版
$this->assign('prev ', $prev);
```
完成~