


function add_ziliao_file(){
    $("#upload_file").click(function(){


        $("#message_info").html('').append('');
        var url='/mgm/ziliao/upload';
        //console.log(FormData($("#ziliao_form")[0]));
        //item_list = {
        //    "file":new FormData($("#ziliao_form")[0]),
        //    "file_type":$("#file_type").val(),
        //    "file_tag":$("#file_tag").val(),
        //    "file_description":$("#file_description").val()
        //};
        //
        //console.log(item_list);

        fileobj = new FormData($("#ziliao_form")[0]);
        var form = new FormData();
        form.append("file", fileobj);
        form.append("file_type", $("#file_type").val());
        form.append("file_tag", $("#file_tag").val());
        form.append("file_description", $("#file_description").val());
        $.ajax({
            url: url,
            type: 'POST',
            data: form,
            processData: false,
            contentType: false,
            success: function (data) {   //成功后回调
                if (data.status == 302) {
                    $("#message_info").html('').append('<a href="###"><span style="color: #FD6E58;font-weight:bold "> 成功, 添加投票活动成功！</span></a>');
                    window.location.href = data.message;
                }
                if (data.status == 500) {
                    $("#message_info").html('').append('<span style="color: #FD6E58;font-weight:bold ">活动已经添加, 请不要重复提交！!</span>');
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {    //失败后回调
                //alert("Error: " + XMLHttpRequest.responseText);
                $("#message_info").html('').append('<a href="###"><span style="color: #FD6E58;font-weight:bold "> 失败, 添加投票活动失败！</span></a>');

            }
        })
    })
}



function loading(){
$('#nav_complist').html('<img src="/static/index/assets/img/loading.gif"/>');
}
