var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var url = require("url");

//路由配置
var index = require('./routes/server/index');
var users = require('./routes/server/users');
var login = require('./routes/server/login');
var loginout = require('./routes/server/loginout');
var regist = require('./routes/server/regist');

//数据库连接测试
// require("./config/test_connect.js");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  name: "cai",
  secret: "cai-s",
  //store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
      maxAge: 60 * 10 * 1000  // 有效期，单位是毫秒
  }
}));

//拦截请求  判断是否登录
//如果当前请求的是登录页面，那么不重定向
app.use(function(req, res, next){
    var path = req.path;
    var regRs = /(^\/login)|(^\/regist)/.test(path);
    if(req.session.user){
      next();
    }else{
      if(!regRs){
        console.log("重定向")
        res.redirect("/login");
      }else{
        next();
      }  
    }
});

app.use('/', index);
app.use("/login",login);
app.use("/loginout",loginout);
app.use('/users', users);
app.use('/regist', regist);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
