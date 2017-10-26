/**
 * Created by root on 10/12/17.
 */

function vote_for_this(id){
        $("#message_info").html('').append('');
        url = '/issue/vote/'+id;
        data = {};
        $.ajax({
            url: url,
            contentType: "application/json",
            datatype: "json",
            type: 'post',
            data:JSON.stringify(data),
            beforeSend:loading,
            success: function (data) {   //成功后回调
                //console.log('aaa='+data.status);

                if (data.status == 302) {
                    location.href = data.message;
                }
                if (data.status == 500) {
                    $("#message_info").html('').append('<span style="color: #FD6E58;font-weight:bold ">您已投过票，请不要重复提交！!</span>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {    //失败后回调
                //alert("Error: " + XMLHttpRequest.responseText);
                $("#message_info").html('').append('<span style="color: #FD6E58;font-weight:bold ">投票失败 !</span>');
            }
        })

}

function loading(){
$('#nav_complist').html('<img src="/static/index/assets/img/loading.gif"/>');
}
