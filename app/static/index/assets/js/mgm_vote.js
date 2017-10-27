/**
 * Created by root on 10/12/17.
 */


function set_vote_item_chart(title,vote_num,item_list){
    //console.log(title);
    //console.log(item_list);

    $('#item_chart').highcharts({
        colors: ['#48C9C9','#FD6E58','#368EE0', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        subtitle: {
            text: '数据来源: 实名认证业主投票 共' +vote_num+'票'
        },
        xAxis: {
            categories: [
                '选项'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            allowDecimals:false,
            title: {
                text: '票数 (张)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.3,
                borderWidth: 0
            }
        },
        series: item_list
    });


}




function vote_this_item(id){
    //$("#btn_voted").click(function(){
        $("#message_info").html('').append('');
        url = '/voting/voted/'+id;
        item = $("input[type='radio']:checked").val();
        if (item == null){
            alert('请先选择一个选项，在投票!');
            return false;
        }
        console.log(item);
        data = {
            'item':item
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

                if (data.status == 302) {
                    $("#message_info").html('').append('<span style="color: #FD6E58;font-weight:bold ">投票成功!</span>');
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
        });

    //})
}

function loading(){
$('#nav_complist').html('<img src="/static/index/assets/img/loading.gif"/>');
}
