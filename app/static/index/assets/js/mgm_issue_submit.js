/**
 * Created by root on 10/12/17.
 */

function issue_submit(){
    $("#btn_issue_submit").click(function(){
        $("#message_info").html('').append('');
        url = '/issue/submit/save';
        data = {
            "issue_title": $("#issue_title").val(),
            "issue_desc": $("#issue_desc").val()
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
                $("#message_info").html('').append('<span style="color: #368EE0;font-weight:bold ">提交成功, 请到 问题汇总页面 查看所有问题列表!</span>');
                //if (data.status == 302) {
                //    location.href = data.message;
                //}
            },
            error: function (jqXHR, textStatus, errorThrown) {    //失败后回调
                //alert("Error: " + XMLHttpRequest.responseText);
                $("#message_info").html('').append('<span style="color: #FD6E58;font-weight:bold ">提交失败 !</span>');
            }
        })

    })
}

function loading(){
$('#nav_complist').html('<img src="/static/index/assets/img/loading.gif"/>');
}
