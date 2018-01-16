var express = require("express");
var router = express.Router();
var User = require("../models/user")

//统一返回格式
var responsedata;

router.use(function(req, res, next) {
    responsedata = {
        code: 0,
        message: ''
    }
    next();
});

//用户注册
router.post("/user/relog", function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    if (username == "") {
        responsedata.code = 1;
        responsedata.message = "用户名不能为空";
        res.json(responsedata);
        return;
    }

    if (password == "") {
        responsedata.code = 2;
        responsedata.message = "密码不能为空";
        res.json(responsedata);
        return;
    }

    if (password !== repassword) {
        responsedata.code = 3;
        responsedata.message = "俩次输入密码不一致";
        res.json(responsedata);
        return;
    }

    User.findOne({
        username: username
    }).then(function(userInfo) {
        if (userInfo) {
            responsedata.code = 4;
            responsedata.message = "用户名已经被注册过了";
            res.json(responsedata);
            return;
        }

        var user = new User({
            username: username,
            password: password
        })
        return user.save();
    }).then(function(newUserInfo) {
        responsedata.message = "注册成功le";
        res.json(responsedata);
    })
})

/*用户登录*/
router.post("/user/relog2", function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    //判断用户名或密码是否输入正确
    if (username == '' || password == '') {
        responsedata.code = "1";
        responsedata.message = "用户名或密码填写错误";
        res.json(responsedata);
        return;
    }

    //查询数据库 用户名和密码 是否注册
    User.findOne({
        username: username,
        password: password
    }).then(function(userInfo) {
        if (!userInfo) {
            responsedata.code = "2";
            responsedata.message = "用户名或密码填写错误";
            res.json(responsedata);
            return;
        }
        responsedata.message = "登陆成功le";
        responsedata.userInfo = {
            _id: userInfo._id,
            username: userInfo.username
        }
        req.cookies.set("userInfo", JSON.stringify({
            _id: userInfo._id,
            username: userInfo.username
        }));
        res.json(responsedata);
        return;
    })
})

//用户退出
router.get("/user/relog3", function(req, res, next) {
    req.cookies.set("userInfo", null);
    res.json(responsedata);
})

module.exports = router;