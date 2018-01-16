var express = require('express');
var router = express.Router();
var User = express('./models/category')

router.get('', function(req, res, next) {
    console.log(req)
    res.render("main/index", {
        username: req.userInfo
    })


})

module.exports = router;