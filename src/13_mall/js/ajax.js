function createHttpRequest() {
    var xmlHttp;
    if(window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    return xmlHttp;
}

function ajax(method, url, success, async) {
    var xmlHttp = createHttpRequest();
    //建立连接
    xmlHttp.open(method,url,async);
    //发送请求
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            success(JSON.parse(this.responseText));
        }
    }
}