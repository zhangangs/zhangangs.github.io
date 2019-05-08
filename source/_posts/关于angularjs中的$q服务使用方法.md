---
title: 关于angularjs中的$q服务使用方法
tags: ajax
author: zhangangs
date: 2018-12-8
---
网上介绍`$q`的文章有很多的，但是大多都差不多，其实`$q`用法很简单,我这里介绍2种我使用过的方法。

**1、简单的使用方式** (等待某个接口完成请求后，在操作...)

```js
function getList() {
    // 注册
    var deferred = $q.defer();
    // 请求接口
    CoinCoin.favoriteQueryList({}, function (res) {
        if (res.httpCode == 200) {
            // 返回成功
            deferred.resolve(res.data);
        } else {
            // 失败
            deferred.reject();
        }
    }
    // 返回数据，会等待ajax执行完成会才会返回
    return deferred.promise;
}
```

**如何调用?**

``` js
// 接口调用完成后执行
getList().then(function(res){
    // res就是上面方法return的值
    console.log(res);
})
```

**2、循环调用** (等待某一组接口完调用完成,再操作...) (<small>更新于：2019/5/6</small>)

在项目中我遇到过很多，这种需求。

``` js
//根据orderId查询策略师基本信息
function fundOrderById(res) {
    var result = [];
    // 循环res列表[{},{},..]
    angular.forEach(res.data.list, function (item, index) {
        result.push(function () {
            var deferred = $q.defer();
            // 调用接口
            FundService.fundOrderById({ id: item.orderId }, function (res) {
                if (res.httpCode == 200) {
                    // 成功
                    deferred.resolve(res.data);
                } else {
                    // 失败
                    deferred.reject();
                }
            })
            return deferred.promise;
        }())
    })
    return result;
}

```

**如何调用？** `$q.all().then()...`方式调用

```js
$q.all(fundOrderById(res)).then(function (resp) {
    // resp中返回的是promise数据集合，循环操作即可
    angular.forEach(res.data.list, function (item, index) {
        item.detailInfo = function () {
            for (let i in resp) {
                if (item.orderId == resp[i].id) {
                    return resp[i];
                }
            }
        }();
    })
})
```

完成!




