---
title: ionic 4中实现新闻滚动效果
tags: ionic
author: zhangangs
date: 2019-3-23
---

最近在做一个app项目，需要实现新闻滚动效果，如下所示：

![](http://www.wailian.work/images/2019/03/23/11.gif)
<small>(截图的图片有点卡)</small>


原理很简单，第一个子元素向上移动一定的距离后，删除掉，再把删除的子元素插入到最后面就实现了滚动效果。

这个效果JQuery写起来应该很方便，但是`ionic`不支持JQuery,只能用angular自带的元素选择器.

**HTML部分**

这里的数据是从后台获取到的新闻列表，所以循环展示每条数据

```html
<div class="body">
    <div class="item" *ngFor="let item of resources.news">
        <i class="iconfont icon-laba"></i>
        <span>{{item.title}}</span>
    </div>
</div>
```

**CSS部分**
```css
.body{
    width: 80%;
    display: flex;
    align-items: center;
    text-align: center;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-wrap: wrap;
    height: 26px;
    transition: all .3s linear;
    i{
        font-size: 1.8rem;
        margin-right: .4rem;
    }
    .item{
        width: 100%;
        text-align: left;
        transition: all .3s linear;
    }
}

```

**JS部分**

1、我们准备的数据格式如下：`articles:[{"id": 360021084231,"title": "法币交易注意事项"},{"id": 360021084231,"title": "法币交易注意事项"}]`,这是一段json数据。

2、在使用之前我们需要注入`ElementRef`和`Renderer2`,前一个是获取元素，后面一个是设置元素的属性。
```js
import {ElementRef, Renderer2} from '@angular/core'; 

```

3、在`constructor`中注入
```js
constructor(
    private el: ElementRef,
    private renderer2: Renderer2
){

}
```

4、获取后台数据，操作dom元素.
``` js
this.http.get('api/xxxxxxx').subscribe((res: any) => {
    // 获取到后台数据
    this.resources.news = res.articles;
    // 获取元素
    const _el = this.el.nativeElement.querySelector('.body');
    // 保存定时器，在后面用于销毁定时器
    this.data.timer = setInterval(() => {
        const _item = _el.querySelector('.item');
        this.renderer2.setStyle(_item, 'marginTop', '-26px');
        // 等待动画执行完成后，操作的节点从前面删除，插入到最后面。
        setTimeout(() => {
            const _removeNode = _el.removeChild(_item);
            _el.appendChild(_removeNode);
            // 删除marginTop属性，可以看成是还原属性，等待下次操作
            this.renderer2.removeStyle(_item, 'marginTop');
        }, 1000);
    }, 1000);
});


```



