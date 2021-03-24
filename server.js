// 在node上运行，所以使用common.js
const Vue = require('vue');
// 返回的是一个函数，直接执行
const server = require('express')();
// 服务端渲染器
const renderer = require('vue-server-renderer').createRenderer();

// 所有的get请求都经过该服务器
server.get('*', (req, res) => {
    console.log(req, res);
    const app = new Vue({
        data: {
            url: req.url
        },
        // 读取vue的data属性
        template: '<div>Hello Vue SSR! - {{ url }}</div>'
    });
    // app 是vue实例
    // html是hrml字符串
    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(500).end('internal server error');
            return;
        };
        res.end(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Hello SSR</title>
                    <body>${html}</body>
            </html>
        `)
    });
});
    
server.listen(8080, () => {
    console.log('服务器运行在8080端口');
})

