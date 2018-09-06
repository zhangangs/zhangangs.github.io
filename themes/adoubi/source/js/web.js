window.onload = function () {
    toHttps();
}

/**
 * chrome浏览器中，会自动跳转到http开头，重定向到https
 */
function toHttps() {
    var proto = location.protocol.split(":")[0],
        host = location.host,
        reg = new RegExp(/zhangangs/);
    if (proto == "http" && reg.test(host)) {
        window.location.href = 'https://' + host;
    }
}