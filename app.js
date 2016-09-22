var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path');

var mime = require('./lib/mime.js'),
    config = require('./config');

var port = 9999,
    assets = 'asset';// 设定静态文件所在位置

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    pathname = path.normalize(pathname.replace(/\.\./g, ''));
    // 调用path.normalize方法来处理掉不正常的..
    var realPath = path.join(assets, pathname);
    try {
        if (pathname === '/') {
            var list = fs.readdirSync(realPath) || []
            list = list.filter(function (item) {
                return item !== '.DS_Store';
            })
            var html = list.join('\t\n')
            // 后期增加聚合列表页
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write('Hello, you can look : \t\n' + html);
            response.end();
        } else {
            // 判断是否是文件夹 是则重定向
            if (fs.statSync(realPath).isDirectory()) {
                realPath = path.join(pathname, '/', config.Welcome.file);
                return redirectUrl(realPath)
            }
            // 判断文件是否存在
            fs.exists(realPath, function (exists) {
                if (!exists) {
                    // 如果不存在 返回404
                    renderNotFound(response);
                } else {
                    // 存在 就返回
                    fs.readFile(realPath, 'binary', function (error, file) {
                        if (error) {
                            renderError(response);
                        } else {
                            renderAssets(response, realPath, file);
                        }
                    });
                }
            });
        }
    } catch (err) {
        renderNotFound(response);
    }
})


function renderNotFound (response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Not Found');
    response.end();
}

function renderError (response) {
    response.writeHead(500, {'Content-Type': 'text/plain'});
    response.end();
}

function redirectUrl (response, url) {
    response.writeHead(302, {'Location': url});
    response.end();
}

function renderAssets (response, realPath, file) {
    // 处理后缀
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    // 添加过期时间头
    if (ext.match(config.Expires.fileMatch)) {
        var expires = new Date();
        expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
        response.setHeader('Expires', expires.toUTCString());
        response.setHeader('Cache-Control', 'max-age=' + config.Expires.maxAge);
    }

    var contentType = mime[ext] || 'text/plain';
    response.writeHead(200, {'Content-Type': contentType});
    response.write(file, 'binary');
    response.end();
}

server.listen(port, function () {
    console.log('Server runing at port: ' + port);
});
