/**
 * Created by root on 10/12/17.
 */

function user_login(){
    $("#btn-login").click(function(){
        $("#message_info").html('').append('');
        url = '/user/login';
        data = {
            "phone": $("#phone").val(),
            "password": $("#password").val()
        };
        $.ajax({
            url: url,
            contentType: "application/json",
            datatype: "json",
            type: 'post',
            data:JSON.stringify(data),
            beforeSend:loading,
            success: function (data) {   //成功后回调
                //console.log('aaa='+data.status);
                $("#message_info").html('').append('<span style="color: #368EE0;font-weight:bold ">登录成功 !</span>');

                location.href = data.message;

            },
            error: function (jqXHR, textStatus, errorThrown) {    //失败后回调
                //alert("Error: " + XMLHttpRequest.responseText);
                $("#message_info").html('').append('<span style="color: #FD6E58;font-weight:bold ">登录失败，用户名或密码错误！</span>');
            }
        })

    })
}

function loading(){
$('#nav_complist').html('<img src="/static/index/assets/img/loading.gif"/>');
}
