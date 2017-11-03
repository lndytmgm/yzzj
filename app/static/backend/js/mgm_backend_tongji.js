


function tongji_user(user_building_dict){
    //console.log(title);
    //console.log(item_list);

    $('#item_chart').highcharts({
        colors: ['#48C9C9','#FD6E58','#368EE0', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        chart: {
            type: 'column'
        },
        title: {
            text: '各楼栋业主注册数量'
        },
        subtitle: {
            text: '数据来源: 共' +user_building_dict.length+'栋'
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
                text: '业主 (个)'
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
        series: user_building_dict
    });


}



function loading(){
$('#nav_complist').html('<img src="/static/index/assets/img/loading.gif"/>');
}
