var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbConfig = require("../../config/db.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.redirect("/");
  }else{
     res.render('login');
  }
});

router.post("/",function(req, res, next){
    var user = req.body.user;
    var password = req.body.password;
    var connection = mysql.createConnection(dbConfig);
    connection.connect();

    connection.query("select * from user where name = ? and password = ? ",[user,password],function(error, result){
      console.log("---------------------")
      console.log(result)
      console.log("---------------------")

      if(result && result.length){
         req.session.user = user;
         res.redirect("/");
        //  res.json({
        //   status: 1,
        //   msg: "登录成功!"
        // })
      }else{
        res.json({
          status: 0,
          msg: "用户名或者密码不正确！"
        })
      }
    });
})

module.exports = router;
