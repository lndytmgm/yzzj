function add_voting_item(){
    count = $(".input-xlarge").length+1;
    //alert(count);

    item_sting = '                              <div class="control-group">' +
        '                                           <label for="textfield" class="control-label">选项'+count+'</label>' +
        '                                            <div class="controls">' +
        '                                                <input type="text" name="voting_item'+count+'"  id="voting_item'+count+'" placeholder="Text input" class="input-xlarge" value=" 否 ">' +
        '                                            </div>' +
        '                                        </div>';

    $("#voting_table").append(item_sting);

}


function add_voting_submit(){
    $("#voting-save").click(function(){

        var item_list={};
        item_list['items']=[];
        $("#message_info").html('').append('');
        var url='/mgm/voting/add/submit';

        $('.input-xlarge').each( function( index, val ) {

            //console.log( index, val, this.value );
            //item_list['item'+(index+1)]['text']=this.value;
            //item_list['item'+(index+1)]['vote']=0;

            item_list['items'].push({'text':this.value,'vote':0,'vote_user':[]});

        });
        console.log( item_list);
        //alert(item_list);
        item_list['title'] = $("#voting_title").val();
        item_list['description'] = $("#voting_desc").val();

        $.ajax({
            url: url,
            contentType: "application/json",
            datatype: "json",
            type: 'post',
            data:JSON.stringify(item_list),
            beforeSend:loading,
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
