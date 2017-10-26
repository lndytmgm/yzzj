/**
 * Created by root on 10/12/17.
 */

function uploadfile(){
    $("#upload").click(function(){
        $("#message_info").html('').append('');
        url = '/renzheng/upload';

        $.ajax({
            url: url,
            type:'POST',
            data:new FormData($("#renzheng_form")[0]),
            cache:false,
            processData:false,
            contentType:false,
            //beforeSend:loading,
            success: function (data) {   //成功后回调
                //console.log('aaa='+data.status);

                if (data.code == 0) {
                    $("#message_info").html('').append('<span style="color: #368EE0;font-weight:bold ">管理员审核中，有问题随时联系 !</span>');
                }else{
                    $("#message_info").html('').append('<span style="color: #FD6E58;font-weight:bold ">上传失败 !</span>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {    //失败后回调
                //alert("Error: " + XMLHttpRequest.responseText);
                $("#message_info").html('').append('<span style="color: #FD6E58;font-weight:bold ">上传失败 !</span>');
            }
        })

    })
}

function loading(){
$('#nav_complist').html('<img src="/static/index/assets/img/loading.gif"/>');
}
