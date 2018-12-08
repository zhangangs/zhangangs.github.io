---
title: 关于angularjs中的$q服务使用方法
tags: ajax
author: zhangangs
date: 2018-12-8
---
网上介绍`$q`的文章有很多的，但是大多都差不多，其实`$q`用法很简单,我这里介绍一种使用方法。

**使用方法如下:**

```js
function getList() {
    //注册
    var deferred = $q.defer();
    
    //请求接口，或者干其他的事情
    CoinCoin.favoriteQueryList(utils.urlencoded({}), function (res) {
        if (res.httpCode == 200) {
            //返回成功
            deferred.resolve(res.data);
        } else {
            //失败
            deferred.reject();
        }
    }
    //返回数据，会等待ajax执行完成会才会返回
    return deferred.promise;
}
```

**如何调用?**

``` js
//接口调用完成后执行
getList.then(function(res){
    //res就是上面方法return的值
    console.log(res);
})
```

完成!




