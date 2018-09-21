window.onload = function () {
    $.jumpToHttps();
}

var $ = {
    //重定向到https
    jumpToHttps: function () {
        var proto = location.protocol.split(":")[0],
            href = window.location.href;
        if (proto == "http" && href.indexOf('zhangangs') > -1) {
            href = href.replace('http', 'https');
        }
    }
}