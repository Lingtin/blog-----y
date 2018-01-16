var express = require('express');
var router = express.Router();
var User = require("../models/user");
var category = require('../models/category');

router.use(function(req, res, next) {

    //console.log(req.userInfo.isadmin)
    if (!req.userInfo.isadmin) {
        res.send("您好，你没有进入改管理页的权限")
        return;
    }
    next();
})


//管理员页面
router.get("/", function(req, res, next) {
    res.render("admin/index", {
        userInfo: req.userInfo
    })
})

//管理用户页面
router.get("/user", function(req, res, next) {
    //query.page查询当前page

    var page = Number(req.query.page || 1);

    var limit = 2;

    User.count().then(function(count) {
        pages = Math.ceil(count / limit); //ceil想上取整数
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        skip = (page - 1) * limit;

        User.find().limit(limit).skip(skip).then(function(users) {
            //console.log(users)
            res.render("admin/user_index", {
                users: users,
                count: count,
                page: page,
                limit: limit
            })
        })
    })
})


//limit()//限制返回多少条

//skip()//忽略多少条

//count()查询数据库有多少条数据

//sort() 排序
//管理分类
router.get("/category", function(req, res, next) {
    category.count().then(function(count) {

        category.find().then(function(names) {
            res.render("admin/category_index", {
                userInfo: req.userInfo,
                names: names
            })
        })
    })
})

//添加分类
router.get("/category/add", function(req, res, next) {
    res.render("admin/category_add", {
        userInfo: req.userInfo
    })


});

router.post('/category/add', function(req, res, next) {

    var name = req.body.name || "";

    if (name == "") {
        res.render("admin/error", {
            userInfo: req.userInfo,
            message: "不能为空"
        })
        return;
    }

    category.findOne({
        name: name
    }).then(function(rs) {
        if (rs) {
            res.render("admin/error", {
                userInfo: req.userInfo,
                message: "填写不能重复"
            })
            return Promise.reject();
        } else {
            var cate = new category({
                name: name
            })
            return cate.save();
        }
    }).then(function(mes) {
        res.render("admin/success", {
            userInfo: req.userInfo,
            message: "添加成功",
            url: '/admin/category'
        })
    })

});
//修改标题
router.get("/category/edit", function(req, res, next) {
    res.render('admin/content_edit', {
        userInfo: req.userInfo
    })


})


module.exports = router;