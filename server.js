const Vue = require('vue');
// 返回的是一个函数，直接执行
const server = require('express')();
// 服务端渲染器
const renderer = require('vue-server-renderer').createRenderer();

// 所有的get请求都经过该服务器
server.get('*', (req, res) => {
    const app = new Vue({
        template: '<div>Hello Vue SSR!</div>'
    });
});


// app 是vue实例
// html是hrml字符串
renderer.renderToString(app, (err, html) => {
    if (err) throw err;
    console.log(html)
});