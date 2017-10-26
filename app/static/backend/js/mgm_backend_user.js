function update_auth_status(phone){

        $("#message_info").html('').append('');
        var url='/mgm/user/update_auth_status';
        data = {
                'phone':phone
            };
        $.ajax({
            url: url,
            contentType: "application/json",
            datatype: "json",
            type: 'post',
            data:JSON.stringify(data),
            beforeSend:loading,
            success: function (rt) {   //成功后回调

                $("#message_info").html('').append('<a href="###"><span style="color: #FD6E58;font-weight:bold "> 成功，更新用户认证状态为 已认证！</span></a>');
                window.location.href = rt.message;
            },
            error: function (jqXHR, textStatus, errorThrown) {    //失败后回调
                //alert("Error: " + XMLHttpRequest.responseText);
                $("#message_info").html('').append('<a href="###"><span style="color: #FD6E58;font-weight:bold "> 失败，更新认证状态失败！</span></a>');

            }
        })

}


function reset_pwd(phone){

        $("#message_info").html('').append('');
        var url='/mgm/user/resetpwd';
        data = {
                'phone':phone
            };
        $.ajax({
            url: url,
            contentType: "application/json",
            datatype: "json",
            type: 'post',
            data:JSON.stringify(data),
            beforeSend:loading,
            success: function (rt) {   //成功后回调

                $("#message_info").html('').append('<a href="###"><span style="color: #FD6E58;font-weight:bold "> Reset password Successfully !</span></a>');
                //window.location.href = rt.message;
            },
            error: function (jqXHR, textStatus, errorThrown) {    //失败后回调
                //alert("Error: " + XMLHttpRequest.responseText);
                $("#message_info").html('').append('<a href="###"><span style="color: #FD6E58;font-weight:bold "> Reset Password Fail !</span></a>');

            }
        })

}


function loading(){
$('#nav_complist').html('<img src="/static/index/assets/img/loading.gif"/>');
}
