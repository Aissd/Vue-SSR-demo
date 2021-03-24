const fs = require('fs');
// 在node上运行，所以使用common.js
const Vue = require('vue');
// 返回的是一个函数，直接执行
const server = require('express')();
// 服务端渲染器
const VueServerRenderer = require('vue-server-renderer');

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

    const context = {
        title: 'Vue SSR',
        metas: `
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="keyword" content="vue,ssr">
            <meta name="description" content="vue ssr demo">
        `
    };
    
    const template = fs.readFileSync('./index.template.html', 'utf-8');
    const renderer = VueServerRenderer.createRenderer({
        template
    });
    // app 是vue实例
    // html是hrml字符串
    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end('internal server error');
            return;
        };
        res.end(html);
    });
});
    
server.listen(8080, () => {
    console.log('服务器运行在8080端口');
})

