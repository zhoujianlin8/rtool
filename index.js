var util = require('util');
var path = require('path');
var fs = require('fs');
var xtUtil = require('ginit');
var ginit = xtUtil.init;
var template = xtUtil.template;
var Rtool = module.exports;
var cwdPath = process.cwd();
var _ = xtUtil.underscore;
var templatePath = path.join(__dirname, './template');

var spawn = xtUtil.spawn;
var rewrite = xtUtil.rewrite;
var abc = {};
var abcPath = path.join(cwdPath, 'abc.json');
if(fs.existsSync(abcPath)){
  try {
    abc = require(abcPath);
  } catch (e) {}
} 


var options = util._extend({
  srcBase: 'src'
}, abc.options || {});
var isPc = abc.isPc && abc.isPc !== 'false';
var isSinglePage =  abc.isSinglePage && abc.isSinglePage !== 'false';

var srcBase = path.join(cwdPath, options.srcBase);

//项目初始化
Rtool.init = function (str) {
  if (fs.existsSync(abcPath)) {
    console.log('该目录下项目已存在初始失败');
    return;
  }
  var dir = str ? str : path.join(templatePath, '/root');
  var data = getData();
  var self = this;
  ginit({
    dir: dir,
    data: data
  }, function (obj) {
    console.log('项目初始成功');
    obj && (isPc = obj.isPc);
    obj && (isSinglePage = obj.isSinglePage);
    if(isPc){
      ginit({
        dir: path.join(templatePath, '/pc'),
        data: data,
        dist: path.join(srcBase,'c')
      });
    }else{
      ginit({
        dir: path.join(templatePath, '/mobile'),
        data: data,
        dist: path.join(srcBase,'c')
      });
    }

    if(isSinglePage){
      ginit({
        dir: path.join(templatePath, '/routerInit'),
        data: data,
        dist: srcBase
      });
      ginit({
        dir: path.join(templatePath, '/router'),
        data: getData('index'),
        dist: path.join(srcBase,'r','index')
      });
    }else{
      self.addPage('index');
    }
    xtUtil.tnpmInstall()
  })
};


Rtool.addPage = function(name){
    if(!name){
      return console.log('请输入页面名称')
    }
    if(fs.existsSync(path.join(srcBase,'p',name))){
      return console.log('页面已存在创建失败')
    }
    var data = getData(name);
    data.pname = name;
    ginit({
      dir: path.join(templatePath, '/page'),
      data: data,
      dist: path.join(srcBase,'p',name)
   })
 };


//添加模块 
Rtool.addComponent = function (name, routename) {
    if(!name){
      return console.log('请输入模块名称')
    }
    if(fs.existsSync(path.join(srcBase,'c',name))){
      return console.log('该模块已存在创建失败')
    }
  var data = getData(name);
  ginit({
      dir: path.join(templatePath, '/component'),
      data: data,
      dist: path.join(srcBase,'c',name)
  })
 /* if(routename){
    //injectModule(); 
    if(isSinglePage){
        
    }else{

    }
    
  }*/
 
  /*template({
    file: path.join(templatePath, 'js/' + ptype + '.js'),
    dist: dist,
    data: data
  });

  //js注入
  //injectModule(routename && path.join(srcBase,'scripts/controllers/'+routename+'.js'),"'"+data.scriptAppName + ".controllers." + data.classedName+(ptype==='modal'?'ModalCtrl':'Ctrl')+"',");
  //生成 less
  template({
    file: path.join(templatePath, 'css/dpl.less'),
    dist: path.join(srcBase, 'styles/dpl/' + name + '.less'),
    data: data
  });
  //less注入
  injectCss('@import "dpl/' + name + '";');
*/

};
//添加数据
Rtool.addData = function (name, type) {
  var objType = {
    'form': 'form',
    'f': 'form',
    'list': 'list',
    'l': 'list',
    'submit': 'submit',
    's': 'submit',
    'index': ''
  };
  type = objType[type] || objType['index'];
  var data = getData(name);
  var key = data.cameledName;
  var dist = path.join(srcBase, 'data/' + key + '.json');
  if (fs.existsSync(dist)) {
    console.log('文件已经存在创建失败' + dist);
    process.exit(1);
    return;
  }
  //data
  template({
    file: path.join(templatePath, 'data/' + (type || 'submit') + '.json'),
    dist: dist,
    data: data
  });
  injectData(data);
};
//添加路由
Rtool.addRoute = function (name, type) {
  if(!name){
      return console.log('请输入页面名称')
  }
  if(fs.existsSync(path.join(srcBase,'r',name))){
    return console.log('页面已存在创建失败')
  }
  var data = getData(name);
  ginit({
    dir: path.join(templatePath, '/router'),
    data: data,
    dist: path.join(srcBase,'r',name)
  });
  injectRoute(data);
  injectCss('@import "./r/' + name + '/index";');
 /* if (name === 'index' || name === 'main') {
    console.log('router ' + name + 'has exists');
  }
  var obj = {
    'c': 'create',
    'create': 'create',
    'l': 'list',
    'list': 'list',
    'e': 'edit',
    'edit': 'edit',
    'index': 'router'
  };

  var ptype = obj[type] || obj['index'];
  var data = getData(name);
  var dist = path.join(srcBase, 'scripts/mixins/' + name + '.js');
  if (fs.existsSync(dist)) {
    console.log('文件已经存在创建失败' + dist);
    process.exit(1);
    return;
  }
  //js
  template({
    file: path.join(templatePath, 'js/' + ptype + '.js'),
    dist: dist,
    data: data
  });
  //less
  template({
    file: path.join(templatePath, 'css/router.less'),
    dist: path.join(srcBase, 'styles/pages/' + name + '.less'),
    data: data
  });
  //view
  template({
    file: path.join(templatePath, 'views/' + ptype + '.jsx'),
    dist: path.join(srcBase, 'scripts/routers/' + name + '.jsx'),
    data: data
  });
  //less 注入 js 注入
  injectCss('@import "pages/' + name + '";');
  injectRoute(data);
  if (ptype === 'create') {
    Rtool.addData(name, 'submit')
  }
  if (ptype === 'edit') {
    Rtool.addData(name, 'form');
    Rtool.addData(name, 'submit');
  }
  if (ptype === 'list') {
    Rtool.addData(name, 'list')
  }*/
};

//更新template
/*Rtool.updateTemplate = function (str) {
  ginit({
    dir: str,
    copyReplace: true,
    dist: path.join(templatePath)
  }, function () {
    console.log('模板更新成功')
  });
};*/

Rtool.start = function(){
  require('./lib/start').apply(null,arguments);
};

Rtool.tasks = function(){
  require('./lib/builder').apply(null,arguments);
};

//获取数据
function getData(str) {
  var cameledName, classedName, scriptAppName, classname;
  scriptAppName = changeCameled(path.basename(cwdPath)) + 'App';
  cameledName = changeCameled(str);
  classedName = changeClassed(str);
  classname = classedName.toLowerCase();
  return util._extend(abc, {
    classname: classname, //全小写
    classedName: classedName, //大驼峰
    scriptAppName: scriptAppName, //项目app
    cameledName: cameledName,   //小驼峰
    router: str
  });

  function changeClassed(str) {
    if (!str) return str || '';
    var arr = str.split(/(_|-|\/|\\)/g);
    arr = arr.filter(function (url) {
      return !/(_|-|\/|\\)/g.test(url)
    });
    var newArr = [];
    arr.forEach(function (item) {
      if (item) {
        newArr.push(item.substr(0, 1).toUpperCase() + item.slice(1));
      }
    });
    return newArr.join('');
  }

  function changeCameled(str) {
    if (!str) return str || '';
    str = changeClassed(str);
    return str.substr(0, 1).toLowerCase() + str.slice(1);
  }
}

function injectCss(str, file) {
  var file = file || path.join(srcBase, '/main.less');
  if(fs.existsSync(file)) return;
  var content = fs.readFileSync(file, {encoding: 'utf8'});
  if (content.indexOf(str) === -1) {
    content = content + '\n' + str;
    console.log('file ' + file + ' inject success');
    fs.writeFile(file, content)
  }
}

function injectModule(file, str) {
  !fs.existsSync(file) && (file = path.join(srcBase, '/routers.js'));
  var content = fs.readFileSync(file, {encoding: 'utf8'});
  if (content.indexOf(str) === -1) {
    content = rewrite({
      needle: '/*angJSDeps*/',
      splicable: [str],
      haystack: content,
      spliceWithinLine: true
    });
    console.log('file ' + file + ' inject success');
    fs.writeFileSync(file, content)
  }
}

function injectRoute(data) {
  var file = path.join(srcBase, 'routers.jsx');
  if(!fs.existsSync(file)) return;
  var content = fs.readFileSync(file, {encoding: 'utf8'});
  content = rewrite({
    needle: '</Router',
    splicable: [
      "   <Router.Route name='" + data.router + "' handler={" + data.classedName + "}/>"
    ],
    haystack: content,
    spliceWithinLine: false
  });
  content = rewrite({
    needle: 'react-router',
    splicable: [
      "var " + data.classedName + " = require('./r/" + data.router + "/index');"
    ],
    haystack: content,
    spliceWithinLine: false
  });
  console.log('file ' + file + ' inject success');
  fs.writeFileSync(file, content)
}

//
function injectModal(file, splicable) {
  if (fs.existsSync(file)) {
    var content = fs.readFileSync(file, {encoding: 'utf8'});
    content = rewrite({
      needle: '/*modalinthetop*/',
      splicable: splicable,
      haystack: content,
      spliceWithinLine: false
    });
    console.log('file ' + file + ' inject success');
    fs.writeFileSync(file, content);
  }
}

function injectData(data) {
  var file = path.join(srcBase, 'c/util/apimap.js');
  if (fs.existsSync(file)) {
    var content = fs.readFileSync(file, {encoding: 'utf8'});
    var arr = [
      data.cameledName + ": {",
        "api: 'mtop.xxx',",
        "v: '1.0'",
      "},"
    ];
    if (isPc) {
      arr = [data.cameledName + ": ['xx','get'],"]
    }
    content = rewrite({
      needle: '/*invoke*/',
      splicable: arr,
      haystack: content,
      spliceWithinLine: false
    });
    console.log('file ' + file + ' inject success');
    fs.writeFileSync(file, content)
  }
}

