/**
 * Created by root on 11/7/16.
 */


function set_checkbox_div(){
    $(".icheck-me").click(function(){
        var componentid = $(this).attr('id').replace('c_','');

        if($(this).is(':checked')){
            url = '/amm/v1.0/dependency';
            $.ajax({
                url: url,
                datatype: "json",
                type: 'get',
                success: function (data) {
                    var dependency = eval(data.data);


                    for(var i=0; i<dependency.length; i++){
                        var html = '<div class="row-fluid" id="p_'+ dependency[i].name +'">\
                                        <div class="span12">\
                                            <div class="box box-color box-bordered">\
                                                <div class="box-title">\
                                                    <h3><i class="icon-th-list"></i> '+dependency[i].name+' </h3>\
                                                </div>';
                        var html2= '        </div>\
                                        </div>\
                                    </div>';
                        //alert(componentid);
                        //alert(dependency[i].name )
                        if(componentid == dependency[i].name ){
                            //alert(dependency[i].name )
                            for(var j=0; j<dependency[i].parameters.length; j++) {
                                html += '<div class="box-content nopadding form-horizontal form-bordered" >\
                                        <div class="control-group">\
                                            <label for="textfield" class="control-label">'+(dependency[i].parameters)[j].name+'</label>\
                                            <div class="controls">\
                                                <input type="text" name="textfield" id="'+(dependency[i].parameters)[j].name+'" placeholder="" class="input-block-level" value="'+(dependency[i].parameters)[j].default+'">\
                                            </div>\
                                        </div>\
                                    </div>';
                            }


                            $("#dependency_body").append(html+html2);
                            //window.location.hash = "p_"+ dependency[i].name;

                            $('html,body').animate({scrollTop:$("#p_"+ dependency[i].name).offset().top})
                            break;
                        }

                    }

                },
                error: function(data){    //失败后回调
				alert(data.message);
			    }
            });


        }else{
            //alert(componentid);
            $("#p_"+componentid).remove();
        }
    })


}


function show_nav_complist(){
    $("#compnav").click(function(){
            url = '/amm/v1.0/config/complist';
            $.ajax({
                url: url,
                datatype: "json",
                type: 'get',
                beforeSend:loading,
                success: function (data) {
                    var html = '<li>\
                        <a href="/config/add">Add Components</a>\
                        </li>\
                        <li>\
                            <a href="/config">All Components</a>\
                        </li>';
					var complist = eval(data.data);
                    for(var i=0; i<complist.length; i++){
                        //alert(componentid);
                        //alert(dependency[i].name )

                            //alert(complist)
                            html += '<li>\
                                <a href="/config/'+complist[i]+'">'+complist[i]+'</a>\
                                </li>'

                    }
                    $("#nav_complist").empty().append(html);
                    //$("#nav_complist").append(html);
                },
                error: function(data){    //失败后回调
				alert(data.message);
			    }
            });



    })
}


function show_nav_complist2(){
    $("#compnav2").click(function(){
            url = '/amm/v1.0/config/complist';
            $.ajax({
                url: url,
                datatype: "json",
                type: 'get',
                beforeSend:loading,
                success: function (data) {
                    var html = '<li>\
                        <a href="/testcase/overview">Over View</a>\
                        </li>';
					var complist = eval(data.data);
                    for(var i=0; i<complist.length; i++){
                        //alert(componentid);
                        //alert(dependency[i].name )

                            //alert(complist)
                            //html += '<li><a href="###" onclick="set_case_comp_pie_chart(\''+complist[i]+'\')">'+complist[i].replace(/(^\s+)|(\s+$)/g, "")+' Case</a></li>'
                            html += '<li><a href="/testcase/overview?comp='+ $.trim(complist[i])+'" >'+complist[i].replace(/(^\s+)|(\s+$)/g, "")+' Case</a></li>'
                    }
                    $("#nav_complist2").empty().append(html);
                    //$("#nav_complist").append(html);
                },
                error: function(data){    //失败后回调
				alert(data.message);
			    }
            });



    })
}



function show_leftnav_complist(){

    //$("#leftcompnav").click(function(){
            url = '/amm/v1.0/config/complist';
            $.ajax({
                url: url,
                datatype: "json",
                type: 'get',
                beforeSend:loading,
                success: function (data) {
                    var html = '<li>\
                        <a href="/testcase/overview">Over View</a>\
                        </li>';
					var complist = eval(data.data);
                    for(var i=0; i<complist.length; i++){
                        //alert(componentid);
                        //alert(dependency[i].name )

                            //alert(complist)
                            html += '<li>\
                                <a href="/config/'+complist[i]+'">'+complist[i]+'</a>\
                                </li>'

                    }
                    $("#leftnav_complist").empty().append(html);
                    //$("#nav_complist").append(html);
                },
                error: function(data){    //失败后回调
				alert(data.message);
			    }
            });
    //})
}

function click_leftnav_complist(){

    $("#leftcompnav").click(function(){
            url = '/amm/v1.0/config/complist';
            $.ajax({
                url: url,
                datatype: "json",
                type: 'get',
                beforeSend:loading,
                success: function (data) {
                    var html = '';
					var complist = eval(data.data);
                    for(var i=0; i<complist.length; i++){
                        //alert(componentid);
                        //alert(dependency[i].name )

                            //alert(complist)
                            html += '<li>\
                                <a href="/config/'+complist[i]+'">'+complist[i]+'</a>\
                                </li>'

                    }
                    $("#leftnav_complist").empty().append(html);
                    //$("#nav_complist").append(html);
                },
                error: function(data){    //失败后回调
				alert(data.message);
			    }
            });
    })
}

function set_case_comp_pie_chart(comp){
    //alert(comp);
    var sprint = [];
    var history_total = [];
    var history_automated = [];
    var sprint_date = [];
    if (comp == 'ov') {
        var url = '/amm/v1.0/mgt/testcase/ov';
    }else{
        var url = '/amm/v1.0/mgt/testcase/'+comp;
    }



    //alert(category);
    $.ajax({
        url: url,
        contentType: "application/json",
        datatype: "json",
        type: 'get',

        success: function (rt) {   //成功后回调
            get_case_ov_pie(comp,'case-ov-pie-Current',rt.current);

            for (var i = 0; i < rt.history.length; i++) {
                sprint.push(rt.history[i].sprint);
                history_total.push(rt.history[i].critical_total);
                history_automated.push(rt.history[i].critical_automated);
                sprint_date.push(rt.history[i].updated_date);

            }
            get_case_ov_chart(comp,sprint,history_total,history_automated,sprint_date);
        },
        error: function (XMLHttpRequest) {    //失败后回调
            //alert("Error: " + XMLHttpRequest.responseText);
            $("#case-overview-highchart-area").html('').append("<div>" + XMLHttpRequest.responseText + "</div>");

        }
    })

}


function get_case_ov_pie(comp,area,data){
    //alert('#'+comp+'_p_f_charts');
    if (comp == 'ov'){
        component = ''
    }else{
        component = comp
    }
    rate = Math.round((data['critical_automated']/data['critical_total'])*100);
    total_count = data['critical_total'];
    automated_count = data['critical_automated'];
    non_automated_count = (total_count - automated_count);

    $('#'+area).highcharts({
        colors: ['#48C9C9','#FD6E58', '#E63A3A', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        chart: {
            type: 'pie',
            height:'350',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: component+' Total Critical Case: '+total_count+' | '+'Automated Rate: '+rate+'%'
        },
        subtitle: {
            text: 'Source: amm.tae.com'
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 40
            }
        },
        series: [{
            name: 'Amount',
            data: [
                ['Automated: ' + automated_count, automated_count ],
                ['Non-Automated: ' + non_automated_count, non_automated_count ]

            ]
        }]
    });


}


function set_case_ov(){
    var sprint = [];
    var history_total = [];
    var history_automated = [];
    var sprint_date = []
    var url = '/amm/v1.0/mgt/testcase/ov';
    //alert(category);
    $.ajax({
        url: url,
        contentType: "application/json",
        datatype: "json",
        type: 'get',

        success: function (rt) {   //成功后回调
            get_case_ov_pie('case-ov-pie-Current',rt.current);

            for (var i = 0; i < rt.history.length; i++) {
                sprint.push(rt.history[i].sprint);
                history_total.push(rt.history[i].critical_total);
                history_automated.push(rt.history[i].critical_automated);
                sprint_date.push(rt.history[i].updated_date);

            }
            get_case_ov_chart(sprint,history_total,history_automated,sprint_date);
        },
        error: function (XMLHttpRequest) {    //失败后回调
            //alert("Error: " + XMLHttpRequest.responseText);
            $("#case-overview-highchart-area").html('').append("<div>" + XMLHttpRequest.responseText + "</div>");

        }
    })
}


function set_case_ov_chart(){

    var url = '/amm/v1.0/mgt/testcase/ov';
    //alert(category);
    $.ajax({
        url: url,
        contentType: "application/json",
        datatype: "json",
        type: 'get',

        success: function (rt) {   //成功后回调
            get_case_ov_chart(rt);
        },
        error: function (XMLHttpRequest) {    //失败后回调
            //alert("Error: " + XMLHttpRequest.responseText);
            $("#case-overview-highchart-area").html('').append("<div>" + XMLHttpRequest.responseText + "</div>");

        }
    })
}



function get_case_ov_chart(comp,sprint,total,automated,sprint_date) {
    if (comp == 'ov'){
        component = ''
    }else{
        component = comp
    }
    $('#case-Comparison-area').highcharts({
        colors: ['#368EE0', '#48C9C9','#FD6E58', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        chart: {
            height:'500',
            zoomType: 'xy'
        },
        title: {
            text: component+' Total Sprint: '+sprint.length
        },
        subtitle: {
            text: 'Source: amm.tae.com'
        },
        xAxis: [{
            categories: sprint,
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Test Case Counts',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 150,
            verticalAlign: 'top',
            y: 40,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Total Critical Case',
            type: 'column',
            yAxis: 0,
            data: total

        }, {
            name: 'Automated Case',
            type: 'column',
            data: automated

        }, {
            name: 'Automated Trend',
            type: 'spline',
            data: automated

        }]
    });


}



function amm_login(username,password){
    //alert($.md5("ammadmin"));
    var url='/login';
    data = {
            'username':username,
            'password': password
        };
    $.ajax({
        url: url,
        contentType: "application/json",
        datatype: "json",
        type: 'post',
        data:JSON.stringify(data),
        beforeSend:loading,
        success: function (rt) {   //成功后回调
            //$("#message_info").html('').append("Login Successfully");
            $("#message_info").html('').append('<a href="###"><span style="color: #368EE0;font-weight:bold ">Login Successfully !</span></a>');
            window.location.href = rt.message;
        },
        error: function (jqXHR, textStatus, errorThrown) {    //失败后回调
            //alert("Error: " + XMLHttpRequest.responseText);
            $("#message_info").html('').append('<a href="###"><span style="color: #FD6E58;font-weight:bold ">Login Fail !</span></a>');

        }
    })

}


function trigger_job(){

    $("#Trigger_Job").click(function(){
        var url = '/amm/v1.0/mgt/job/add';

        data = {
            "component": $("#trigger_select").find("option:selected").text(),
            "category": ''
        };

        $.ajax({
            url: url,
            contentType: "application/json",
            datatype: "json",
            type: 'post',
            data: JSON.stringify(data),
            success: function (data) {   //成功后回调
                //alert(data.result);
                //alert(data.message);
                if ( data.result == true){
                    $("#trigger_result").html('').append('Result: add job done!');
                }else{
                    $("#trigger_result").html('').append('Result: add job error!' + data.message);
                }


            },
            error: function (XMLHttpRequest) {    //失败后回调
                //alert("Error: " + XMLHttpRequest.responseText);
                $("#trigger_result").html('').append(XMLHttpRequest.responseText);
            }

        })

    })
}


function get_manually_build_result(jid){

    //$('#ANPCI3.0_60').click(function(){
    //    alert(jid);
        //var jid = $(this).attr('id');
        var url = '/amm/v1.0/mgt/job/build/'+jid;
        var jid_tmp = jid.replace('.','');
        $.ajax({
            url: url,
            contentType: "application/json",
            datatype: "json",
            type: 'GET',
            success: function (data) {   //成功后回调
                //alert(data.result);
                //alert(data.message);
                //alert(data.data);
                info = data.data.time +' | ' + data.data.duration +' | T'+ data.data.total_num +' | F'+ data.data.fail_num;

                if ( data.result == true){

                    $("#"+jid_tmp).text(info);
                    //alert($("#"+jid).attr('data-content'));

                }else{
                    $("#"+jid_tmp).text(data.message);

                }

            },
            error: function (XMLHttpRequest) {    //失败后回调
                //alert("Error: " + XMLHttpRequest.responseText);
                $("#"+jid_tmp).text('N/A');
                $("#trigger_result").html('').append(XMLHttpRequest.responseText);
            }

        });

    //})
}

function get_histroy_job_by_comp(){

    $('#search_job').click(function(){
    //    alert(jid);
        //var jid = $(this).attr('id');
        component = $("#comp_select").find("option:selected").text();
        category = $("#mode_select").find("option:selected").text();
        status = $("#status_select").find("option:selected").text();

        data = {
                    'category':category,
                    'status':status
                };

        var url = '/amm/v1.0/mgt/job/histroy/'+component;

        $.ajax({
            url: url,
            datatype: "json",
            type: 'GET',
            data:data,

            success: function (data) {   //成功后回调
                //alert(data.result);
                //alert(data.message);
                //alert(data.data);
                if ( data.result == true){



                    var html = '';
					var joblist = eval(data.data);
                    for(var i=0; i<joblist.length; i++){
                        //alert(componentid);
                        //alert(joblist[i].job_number );

                            //alert(complist)
                            html += '<tr>\
											<td style="text-align: center">'+ joblist[i].component +'</td>\
                                            <td style="text-align: center;">'+ joblist[i].category +'</td>\
											<td style="text-align: center">'+ joblist[i].time +'</td>\
                                            <td style="text-align: center">'+ joblist[i].job_number +'</td>\
                                            <td style="text-align: center">'+ joblist[i].job_id +'</td>\
                                            <td style="text-align: center" >'+ joblist[i].version +'</td>\
                                            <td style="text-align: center" >'+ joblist[i].status +'</td>\
                                            <td style="text-align: center" >\
                                                <a id="'+ joblist[i].job_id.replace(".","") +'" onclick=get_manually_build_result("'+joblist[i].job_id.replace(" ","")+'") href="###" >'+joblist[i].result+'</a>\
                                            </td>\
                                            <td style="text-align: left" >'+ joblist[i].link +'</td>\
										</tr>;'

                    }
                    $("#history_job_list_table").html('').append(html);


                }else{
                    $("#search_result").text(data.message);
                    $("#history_job_list_table").html('');

                }

            },
            error: function (XMLHttpRequest) {    //失败后回调
                //alert("Error: " + XMLHttpRequest.responseText);

                $("#search_result").html('').append(XMLHttpRequest.responseText);
            }

        });

    })
}


function loading(){
$('#nav_complist').html('<img src="/static/img/loading.gif"/>');
}

$(document).ready(function(){
    click_leftnav_complist();
    show_nav_complist();
    show_nav_complist2();
    show_leftnav_complist();
    trigger_job();
    get_histroy_job_by_comp();


});