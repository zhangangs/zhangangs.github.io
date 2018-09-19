window.onload = function () {
    $.jumpToHttps();
}

var $ = {
    //重定向到https
    jumpToHttps: function () {
        var proto = location.protocol.split(":")[0],
            host = location.host,
            reg = new RegExp(/zhangangs/);
        if (proto == "http" && reg.test(host)) {
            window.location.href = 'https://' + host;
        }
    }
}