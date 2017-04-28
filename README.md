## rtool 工具 

####主要特点

*  webpack
*  koa 服务器实现线上线下一致的开发环境，请求资源动态实时打包，响应及时流畅，提前预知问题
*  npm 组件管理 ，另实现了css 资源引用相对于node_components目录直接使用
*  gulp 打包
*  ginit  支持自定义模板资源
*  less 
*  代理 pac 

### 安装

```
$ sudo npm install -g rtool

sudo npm  install bower -g  

sudo npm  install weinre -g 

```

### 使用过程

`````
 mkdir my-new-project && cd $_
 rtool init(初始化项目 )

 rtool router list l (创建一个名称为list模板类型为list的路由页面)

 rtool start（开启项目）
 
 rtool build（打包）
`````


### 命令使用
* rtool start weinre 手机调试打开项目（weinre 需要全局安装）
* rtool start proxy 打开代理 （需要将pac设置系统的网络代理）
* rtool start wp 打开代理 + 手机调试（weinre（需要将pac设置系统的网络代理）
* rtool start 开启项目
* rtool build 打包项目
* rtool ut [url]  替换atool中template文件中自定义内容
* rtool init [url?] 项目初始化 后面参数实现自定义初始化
* rtool task [name]  执行glupfile 中自定义的其他对应命令
* rtool data [name][type?] 创建本地mock数据type submit(s)list(l)data(d) 
* rtool r [name][type?] 创建路由
* rtool p [name][type?] 创建页面
* rtool c [name]  创建components



### 组件目录规范

```
  rc-xxx            // 组件目录名, 小写, 多字符用 – 分隔
     |------demo     // 用于存放demo的文件夹
     |      |-----demo-init.js   // 组件demo入口js文件
     |      |-----demo-init.less  //组件demo入口css文件
     |      |-----index.html   // 组件demo页面
     |------lib      // 用于存放组件的子模块
     |-----data      // 模拟数据文件
     |-----build    // 用于存放需要cdn发布的文件
     |-----test     // 单元测试放的目录
     |-----index.js   // 组件入口js文件
     |-----index.less // 组件入口css文件
     |-----index.xx // 组件入口模板文件
     |-----README.md    // 用于介绍组件文档
     |-----abc.json     // fie 配置
     |-----package.json     // 模块信息配置
```
 打包约定

````
['demo/*.js','demo/*.less','*.less,*.js']
````


## 多页面项目目录规范

```
  m-xxx            // 目录名, 小写, 多字符用 – 分隔
     |-----data      // 模拟数据文件
     |-----build    // 用于存放需要cdn发布的文件
     |-----test     // 单元测试放的目录
     |-----src
     |      |---c    //项目通用组件
     |      |   |---util//项目js 共用文件夹
     |      |   |     |------index.js  //项目通用js模块
     |      |   |     |------apimap.js //项目url api 管理模块
     |      |   |---css//项目css 共用文件夹
     |      |   |     |------common.less  //项目通用less模块
     |      |   |     |------reset.less //页面重置less
     |      |   |---index// index 项目通用组件
     |      |   |     |------index.js  //
     |      |   |     |------index.jsx.html  //
     |      |   |     |------index.less  //
     |      |---p   //业务代码
     |      |   |---index//index 页面目录
     |      |   |     |------lib  //页面其他模块
     |      |   |     |------index.html //页面主页面html
     |      |   |     |------index.jst.html //jst模板
     |      |   |     |------index.less //页面css入口
     |      |   |     |------index.js //页面js入口
     |      |---images  //图片目录copy
     |      |---fonts  //font目录字体copy   
     |      |---static //static目录静态资源copy
     |      |---minifys //minifys目录 js css less 资源压缩
     |-----README.md    // 用于介绍项目文档
     |-----abc.json     // 配置文件
   
```
打包约定

````
['src/p/*/*.js','src/p/*/*.less','src/images/**','src/fonts/**','src/static/**','src/minifys/**']
````
### 单页面路由目录规范

```
  m-xxx            // 目录名, 小写, 多字符用 – 分隔
     |-----data      // 模拟数据文件
     |-----build    // 用于存放需要cdn发布的文件
     |-----test     // 单元测试放的目录
     |-----src
     |      |---c    //项目通用组件
     |      |   |---util//项目js 共用文件夹
     |      |   |     |------index.js  //项目通用js模块
     |      |   |     |------apimap.js //项目url api 管理模块
     |      |   |---css//项目css 共用文件夹
     |      |   |     |------common.less  //项目通用less模块
     |      |   |     |------reset.less //页面重置less
     |      |   |---index// index 项目通用组件
     |      |   |     |------index.js  //
     |      |   |     |------index.jsx.html  //
     |      |   |     |------index.less  //
     |      |---r   //路由区块业务代码
     |      |   |---index//index路由 
     |      |   |     |------lib  //其他模块
     |      |   |     |------index.html //页面主页面html
     |      |   |     |------index.jst.html //jst模板
     |      |   |     |------index.less //css入口
     |      |   |     |------index.js //js入口
     |      |---app.js   //单页面入口js文件  
     |      |---main.less   //单页面入口css文件  
     |      |---router.js   //路由管理
     |      |---images  //图片
     |      |---fonts  //font目录字体copy   
     |      |---static //static目录静态资源copy
     |      |---minifys //minifys目录 js css less 资源压缩
     |-----README.md    // 用于介绍项目文档
     |-----abc.json     //  配置文件
   
```
### init 初始化自定义开发
可以直接fork template/root 目录代码修改

### 注意node版本要求在0.11.x以上, 请更新到最新稳定版本

### 使用说明
* 该版本功能与fie中 sdk-rtool 一致  您可以直接切换使用
* 在新版的fie 中您只需配置fie.config.js 即可配合使用
````
module.exports = {
    tasks: {
        start : [
            {
                // 将当前目录链接到fie 本地cdn目录
                command : 'rtool start'
            }
        ],
        build : [
            {
                // 同步版本号
                command : 'rtool build'
            }
       ]
 ````       
        

### bug反馈 zhoujianlin8@gmail.com

