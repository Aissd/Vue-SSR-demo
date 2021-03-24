### 一、vue服务端渲染的基本实现
###### 1、初始化项目
```
npm init -y
```

##### 2、安装vue以及vue服务端渲染工具 
```
npm install vue vue-server-renderer --save
```

##### 3、尝试渲染vue实例，返回html字符串
```
npm server.js
```

### 二、使用服务器返回
##### 4、使用服务器返回html字符串
```
npm install express --save
```

##### 5、将html字符串输出到模板文件
建立一个模板html，会把new Vue的template注入到模板的固定注释节点【两端不能有空格】
```
<!--vue-ssr-outlet-->
```

##### 6、使用node.js核心模块fs读取文件
```
fs.readFileSync('./index.template.html', 'utf-8')
```

##### 7、给模板插值的方法
使用三个大括号包裹着，就可以原封不动的给模板插值
```
{{{ metas }}}
```