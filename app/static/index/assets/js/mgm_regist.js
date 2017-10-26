/**
 * Created by root on 10/12/17.
 */

function regist_user(){
    $("#regist").click(function(){
        $("#message_info").html('').append('');
        url = '/regist/signup';
        data = {
            "username": $("#username").val(),
            "phone": $("#cellphone").val(),
            "house": $("#building").find("option:selected").text()+"#"+$("#floor").find("option:selected").text()+$("#room").find("option:selected").text(),
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
                $("#message_info").html('').append('<span style="color: #368EE0;font-weight:bold ">注册成功 !</span>');
                if (data.status == 302) {
                    location.href = data.message;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {    //失败后回调
                //alert("Error: " + XMLHttpRequest.responseText);
                $("#message_info").html('').append('<span style="color: #FD6E58;font-weight:bold ">注册失败 !</span>');
            }
        })

    })
}

function loading(){
$('#nav_complist').html('<img src="/static/index/assets/img/loading.gif"/>');
}
