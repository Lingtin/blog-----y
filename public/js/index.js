$(function() {

    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox');
    var $userInfo = $('#userInfo');

    //切换到注册面板
    $loginBox.find('a.colMint').on('click', function() {
        $registerBox.show();
        $loginBox.hide();
    });

    //切换到登录面板
    $registerBox.find('a.colMint').on('click', function() {
        $loginBox.show();
        $registerBox.hide();
    });

    //注册
    $registerBox.find('button').on('click', function() {
        $.ajax({
            type: 'post',
            url: "/api/user/relog",
            data: {
                username: $registerBox.find('[name = "username"]').val(),
                password: $registerBox.find('[name = "password"]').val(),
                repassword: $registerBox.find('[name = "repassword"]').val()
            },
            dataType: 'json',
            success: function(redata) {
                $registerBox.find(".colWarning").text(redata.message)
                if (!redata.code) {
                    setTimeout(function() {
                        $loginBox.show();
                        $registerBox.hide();
                    }, 1000);
                }
            }
        })
    });

    //登陆
    $loginBox.find('button').on("click", function() {
        $.ajax({
            type: "post",
            url: "/api/user/relog2",
            data: {
                username: $loginBox.find('[name = "username"]').val(),
                password: $loginBox.find('[name = "password"]').val(),
            },
            dataType: "json",
            success: function(redata) {
                $loginBox.find(".colWarning").text(redata.message);
                if (!redata.code) {
                    window.location.reload();
                }
            }
        })
    })

    $("#logout").on("click", function() {
        $.ajax({
            url: "/api/user/relog3",
            success: function(result) {
                if (!result.code) {
                    window.location.reload();
                }
            }
        })
    })
})