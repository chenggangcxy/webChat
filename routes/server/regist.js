var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbConfig = require("../../config/db.js");

router.get('/', function(req, res, next) {
  res.render("regist");
});

router.post("/", function(req, res, next){
    var user = req.body.user;
    var password = req.body.password;
    var connection = mysql.createConnection(dbConfig);
    connection.connect();

    connection.query("select * from user where name = ?", [user], function(error, result){
        if(result && result.length){
            res.json({
                status: 0,
                msg: "用户名已经存在!"
            })
        }else{
            connection.query("insert into user (name, password) values(?,?)", [user,password], function(error, result){
                if(result){
                    req.session.user = user;
                    res.redirect("/");
                }
            });
        }
    })
})

module.exports = router;