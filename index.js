var express = require("express");
var swig = require("swig");
var app = express();
var User = require("./models/user");
var open = require('open');

var Cookies = require("cookies") //加载cookies
var mongoose = require("mongoose"); //加载mongoose

var bodyparser = require("body-parser"); //处理post提交数据的中间件
app.use(bodyparser.urlencoded({ extended: true })); //是否使用urlencoded加载  传输extended 为true

app.use("/public", express.static(__dirname + "/public")); //静态服务资源都在public加载
app.engine('html', swig.renderFile); //swig都是文件格式html

app.set("views", "./views"); //设置views视图资源  在views目录下
app.set("view engine", "html"); //view资源格式都为html格式
swig.setDefaults({ cache: false }); //swig缓存机制

app.use(function(req, res, next) { //设置cookies
    req.cookies = new Cookies(req, res);
    req.userInfo = {};
    cook = req.cookies.get("userInfo");
    if (cook) {
        try {
            req.userInfo = JSON.parse(cook);
            User.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isadmin = Boolean(userInfo.isadmin)
                next();
            })
        } catch (error) {
            next();
        }
    } else {
        next();
    }
});

app.use("/", require("./routers/main"));
app.use("/api", require("./routers/api"));
app.use("/admin", require("./routers/admin"));


mongoose.connect("mongodb://localhost:888/nodetest", function (err) {
    if (err) {
        console.log("数据库连接失败")
    } else {
        console.log("数据库连接成功")
        app.listen(888);
    }

});

//app.listen(888);

open("http://localhost:888")