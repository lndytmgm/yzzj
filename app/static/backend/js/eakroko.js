/*
 FLAT Theme v.1.4
 */

/*
 * eakroko.js - Copyright 2013 by Ernst-Andreas Krokowski
 * Framework for themeforest themes

 * Date: 2013-01-01
 */
(function ($) {
    $.fn.retina = function (retina_part) {
        // Set default retina file part to '-2x'
        // Eg. some_image.jpg will become some_image-2x.jpg
        var settings = {'retina_part': '-2x'};
        if (retina_part) jQuery.extend(settings, {'retina_part': retina_part});
        if (window.devicePixelRatio >= 2) {
            this.each(function (index, element) {
                if (!$(element).attr('src')) return;

                var checkForRetina = new RegExp("(.+)(" + settings['retina_part'] + "\\.\\w{3,4})");
                if (checkForRetina.test($(element).attr('src'))) return;

                var new_image_src = $(element).attr('src').replace(/(.+)(\.\w{3,4})$/, "$1" + settings['retina_part'] + "$2");
                $.ajax({
                    url: new_image_src, type: "HEAD", success: function () {
                        $(element).attr('src', new_image_src);
                    }
                });
            });
        }
        return this;
    }
})(jQuery);
function icheck() {

    if ($(".icheck-me").length > 0) {
        $(".icheck-me").each(function () {
            var $el = $(this);
            var skin = ($el.attr('data-skin') !== undefined) ? "_" + $el.attr('data-skin') : "",
                color = ($el.attr('data-color') !== undefined) ? "-" + $el.attr('data-color') : "";

            var opt = {
                checkboxClass: 'icheckbox' + skin + color,
                radioClass: 'iradio' + skin + color,
                increaseArea: "10%"
            }

            $el.iCheck(opt);
        });
    }
}

function tdclick(tdobject){
    var td=$(tdobject);
    td.attr("onclick", "");
    //1,取出当前td中的文本内容保存起来
    var text=td.text();
    //2,清空td里面的内容
    td.html(""); //也可以用td.empty();
    //3，建立一个文本框，也就是input的元素节点
    var input=$('<input>');
    //4，设置文本框的值是保存起来的文本内容
    input.attr("value",text);
    //input.attr("style","width:200px;");
    input.css("border","0").css("width",td.css("width"));

    input.bind("blur",function(){

        var inputnode=$(this);
        var inputtext=inputnode.val();
        var tdNode=inputnode.parent();
        tdNode.html(inputtext);
        tdNode.click(tdclick);
        td.attr("onclick", "tdclick(this)");
    });
    input.keyup(function(event){
        var myEvent =event||window.event;
        var kcode=myEvent.keyCode;
        if(kcode==13){
            var inputnode=$(this);
            var inputtext=inputnode.val();
            var tdNode=inputnode.parent();
            tdNode.html(inputtext);

            tdNode.click(tdclick);
        }
    });

    //5，将文本框加入到td中
    td.append(input);
    var t =input.val();
    input.val("").focus().val(t);
//              input.focus();

    //6,清除点击事件
    td.unbind("click");
}

function tdclick_select_comments(tdobject){
    var td=$(tdobject);
    td.attr("onclick", "");
    //1,取出当前td中的文本内容保存起来
    var text=td.text();
    //2,清空td里面的内容
    td.html(""); //也可以用td.empty();
    //3，建立一个文本框，也就是input的元素节点
    var selector=$('<select></select>');
    // 添加选项
    url = '/amm/v1.0/mgt/automation/get_comments_list';
    $.ajax({
        url: url,
        contentType: "application/json",
        datatype: "json",
        type: 'get',

        success: function (data) {   //成功后回调
            option_value = data;
            $.each(option_value,function(key,value) {
                //alert(key);
                //alert(value);
                selector.append('<option value="'+key+'">'+value+'</option>')});
                },

        error: function (XMLHttpRequest) {    //失败后回调

            selector.append('<option value="error">'+XMLHttpRequest.responseText +'</option>')
        }

    });


    selector.css("border","0").css("width",td.css("width"));
    // 设置默认选项
    //4，设置文本框的值是保存起来的文本内容
    $(selector).val(text);


    selector.bind("blur",function(){

        var inputnode=$(this);
        //var inputtext=inputnode.val();
        var inputtext = $(selector).find("option:selected").text();
        var tdNode=inputnode.parent();
        tdNode.html(inputtext);
        tdNode.click(tdclick_select_comments);
        td.attr("onclick", "tdclick_select_comments(this)");
    });
    selector.keyup(function(event){
        var myEvent =event||window.event;
        var kcode=myEvent.keyCode;
        if(kcode==13){
            var inputnode=$(this);
            var inputtext=inputnode.val();
            var tdNode=inputnode.parent();
            tdNode.html(inputtext);

            tdNode.click(tdclick_select_comments);
        }
    });

    //5，将文本框加入到td中
    td.append(selector);
    var t =selector.val();
    input.val("").focus().val(t);
//              input.focus();

    //6,清除点击事件
    td.unbind("click");
}


function tdclick_select(tdobject){
    var td=$(tdobject);
    td.attr("onclick", "");
    //1,取出当前td中的文本内容保存起来
    var text=td.text();
    //2,清空td里面的内容
    td.html(""); //也可以用td.empty();
    //3，建立一个文本框，也就是input的元素节点
    var selector=$('<select></select>');
    // 添加选项
    selector.append('<option value="pass">pass</option>');
    selector.append('<option value="fail">fail</option>');

    selector.css("border","0").css("width",td.css("width"));
    // 设置默认选项
    //4，设置文本框的值是保存起来的文本内容
    $(selector).val(text);


    selector.bind("blur",function(){

        var inputnode=$(this);
        var inputtext=inputnode.val();
        var tdNode=inputnode.parent();
        tdNode.html(inputtext);
        tdNode.click(tdclick_select);
        td.attr("onclick", "tdclick_select(this)");
    });
    selector.keyup(function(event){
        var myEvent =event||window.event;
        var kcode=myEvent.keyCode;
        if(kcode==13){
            var inputnode=$(this);
            var inputtext=inputnode.val();
            var tdNode=inputnode.parent();
            tdNode.html(inputtext);

            tdNode.click(tdclick_select);
        }
    });

    //5，将文本框加入到td中
    td.append(selector);
    var t =selector.val();
    input.val("").focus().val(t);
//              input.focus();

    //6,清除点击事件
    td.unbind("click");
}

function showInfo(msg) {
    showTip(msg, 'info');
}
function showSuccess(msg) {
    showTip(msg, 'success');
}
function showFailure(msg) {
    showTip(msg, 'failure');
}

function showTip(tip, type) {

    var win = parent ? parent : window;
    var $tip = $('#tip', win.document);
    $tip.attr('class','tip-' + type).text(tip).css('margin-left', - $tip.outerWidth() / 2).fadeIn(500).delay(2000).fadeOut(500);
}


function get_current_td(td_id){

    var nodelist = [];
    txt=document.getElementById('update'+td_id) ;
    //alert(txt);

    //window.alert(txt.parentNode.parentNode.innerHTML);
    var trNode = txt.parentNode.parentNode; //获取input的“爷爷”--tr
    var ChildTdNodes =  trNode.childNodes;//获取第1个td


    for (var i = 0; i < ChildTdNodes.length; i++) {
        //alert(ChildTdNodes[i].nodeValue)
        if (ChildTdNodes[i].nodeType === 1) {        // 如果是元素结点
            //document.write('node='+ChildTdNodes[i].innerText + '<br>');
            nodelist.push(ChildTdNodes[i].innerText);
        }

    }

    //document.write(nodelist[5]);
    //document.write(nodelist[6]);

    var url = '/amm/v1.0/mgt/automation/update_results';
    data = {
        "id":td_id,
        "result": nodelist[5],
        "comments": nodelist[6]
    };
    //alert(data.result);

    $.ajax({
        url: url,
        contentType: "application/json",
        datatype: "json",
        type: 'post',
        data: JSON.stringify(data),
        success: function (data) {   //成功后回调
            if (data[0] == false){
                //showSuccess('Update Fail code= '+data[0]+' data='+data[1]);
                $("body").overhang({
                    type: "error",
                    message: 'Update fail code= '+data[0]+' data='+data[1]
                });
                return false;
            }
            //showSuccess('Update Successfully, '+data[1]);
            ////window.alert('update successfully, '+data);

            $("body").overhang({
                //type: "success",
                custom: true, // Set custom to true
                primary: "#48C9C9", // 背景颜色
                accent: "#F4B350", // 按钮边框的颜色
                message: 'Update successfully. '+data[1]
            });

        },
        error: function (XMLHttpRequest) {    //失败后回调
            //window.alert(XMLHttpRequest.responseText);
            //showFailure(XMLHttpRequest.responseText);
            $("body").overhang({
                type: "error",
                message: XMLHttpRequest.responseText
            });
        }

    })

}


function get_automation_detail() {
    var url = '/amm/v1.0/mgt/automation';
    data = {
        "component": $("#select").find("option:selected").text(),
        "category": $("div input[type='radio']:checked").val()
    };

    //alert(data.category);
    $.ajax({
        url: url,
        contentType: "application/json",
        datatype: "json",
        type: 'post',
        data: JSON.stringify(data),
        success: function (data) {   //成功后回调
            var tbody_string='';
            //alert(data.results);
            //alert(data.rules);

            for (var i = 0; i < (data.results).length; i++) {
                //alert((data.results)[i].status);
                //html += data.results[i].status;
                tbody_string += '<tr id="'+data.results[i].id+'">\
                                    <td style="text-align: center">'+data.results[i].build+'</td>\
                                    <td style="text-align: center">'+data.results[i].time+'</td>\
                                    <td style="text-align: center">'+data.results[i].duration+'</td>\
                                    <td style="text-align: center">'+data.results[i].total_num+'</td>\
                                    <td style="text-align: center">'+data.results[i].fail_num+'</td>\
                                    <td style="text-align: center;width: 100px;" onclick="tdclick_select(this)">'+data.results[i].result+'</td>\
                                    <td style="text-align: center;width: 300px;word-wrap:break-word;word-break:break-all;" onclick="tdclick_select_comments(this)">'+data.results[i].comments+'</td>\
                                    <td style="text-align: center"><a href="###" class="btn btn-mini btn-primary" id="update'+data.results[i].id+'" onclick="get_current_td('+data.results[i].id+')"><i class="icon-edit"></i>Update</a></td>\
                                </tr>';
            }
//<td style="text-align: center"><a href="###" class="btn btn-mini btn-primary" onclick="get_current_td('+data.results[i].id+')"><i class="icon-edit"></i>Update</a></td>\
            var html = '<div class="row-fluid" id="comp-detail-info">\
                            <div class="span12">\
                                <div class="box">\
                                    <div class="box-title">\
                                        <h3>\
                                            Component Info\
                                        </h3>\
                                    </div>\
                                    <div class="box-content nopadding" id="comp-highchart-area">\
                                        <table id="comp_auto_detail" class="table table-hover table-nomargin table-bordered table-striped table-force-topborder" style="clear: both">\
                                            <thead>\
                                                <tr>\
                                                    <th style="text-align: center">Build version</th>\
                                                    <th style="text-align: center">Start time</th>\
                                                    <th style="text-align: center">Elapsed time</th>\
                                                    <th style="text-align: center">Total Cases</th>\
                                                    <th style="text-align: center">Fail Cases</th>\
                                                    <th style="text-align: center;width: 100px;">Build Availability</th>\
                                                    <th style="text-align: center;width: 300px;word-wrap:break-word;word-break:break-all;">Comments</th>\
                                                    <th style="text-align: center">Action</th>\
                                                </tr>\
                                            </thead>\
                                            <tbody>'+ tbody_string +
                                            '</tbody>\
                                        </table>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>';
            //alert((data.results).length);



                $("#comp-detail-info").html('').append(html);
                //alert(html);



        },
        error: function (XMLHttpRequest) {    //失败后回调
            //alert("Error: " + XMLHttpRequest.responseText);
            $("#comp-highchart-area").html('').append("<div>" + XMLHttpRequest.responseText + "</div>");
        }

    })
}



function get_all_pies_charts(category){

    var url = '/amm/v1.0/mgt/dashboard/pies/'+category;
    //alert(category);
    $.ajax({
        url: url,
        contentType: "application/json",
        datatype: "json",
        type: 'get',

        success: function (rt) {   //成功后回调

            for (var i = 0; i < rt.length; i++) {
                //alert(i);
                comp_name = rt[i].component.toUpperCase().replace('.','');
                total_num = rt[i].data.total_num;
                pn = rt[i].data.pass_num;
                fn = rt[i].data.fail_num;

                row_string = '<div class="span4">\
                    <div class="box">\
                        <div class="box-title">\
                            <h3>\
                                '+comp_name+': '+total_num+' Builds\
                            </h3>\
                        </div>\
                        <div class="box-content nopadding" id="'+comp_name+'_p_f_charts">\
                        </div>\
                    </div>\
                </div>';

                if (i == 0) {

                    div_string = '<div class="row-fluid" id="div-pie-'+i+'">' + row_string + '</div>';
                    $("#comp-pie-charts").append(div_string);
                    j=i
                }
                else if( i%3 == 0){
                    div_string = '<div class="row-fluid" id="div-pie-'+i+'">' + row_string + '</div>';
                    $("#comp-pie-charts").append(div_string);
                    j=i
                }
                else{
                    //alert(i);
                    $("#div-pie-"+j).append(row_string);
                }

                get_comp_pass_fail_charts(comp_name,pn,fn);
                row_string = '';

            }
        },
        error: function (XMLHttpRequest) {    //失败后回调
            //alert("Error: " + XMLHttpRequest.responseText);
            $("#comp-pie-charts").html('').append("<div>" + XMLHttpRequest.responseText + "</div>");

        }

    })

}


function get_comp_pass_fail_charts(comp,pn,fn){
    //alert('#'+comp+'_p_f_charts');
    //var myWidth = $('#comp-pie-charts').css('width').slice(0,-2);

    $('#'+comp+'_p_f_charts').highcharts({
        colors: ['#48C9C9','#FD6E58', '#E63A3A', '#DDDF00', '#24CBE5', '#64E572', '#FF9655',
                 '#FFF263', '#6AF9C4'],
        chart: {
            //width:myWidth/4,
            height:'300',
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: ''
        },
        subtitle: {
            text: 'Buildly Pass/Fail comparison'
        },
        plotOptions: {
            pie: {
                innerSize: 50,
                depth: 45
            }
        },
        series: [{
            name: 'Build amount',
            data: [
                ['Pass:'+pn, pn],
                ['Fail:'+fn, fn]
            ]
        }]
    });

}


function get_comp_charts2(data) {

    $('#comp-highchart-area').highcharts({
        colors: ['#FD6E58', '#48C9C9', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655',
        '#FFF263', '#6AF9C4'],

        chart: {
            type: 'column',
            height:'600'
        },
        title: {
            text: 'Test Result of Latest 20 Builds '
        },
        xAxis: {
            categories: data.build
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Case Counts'
            },
            stackLabels: {
                enabled: false,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: 'Failed Cases',
            data: data.failed
        },
            {
            name: 'Passed Cases',
            data: data.pass
        }]
    });


}


function get_comp_charts(data){
    $('#comp-highchart-area').highcharts({                  //图表展示容器，与 div 的 id 保持一致

        colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655',
        '#FFF263', '#6AF9C4'],

        chart: {
            type: 'column',
            height:'600'
        },
        title: {
            text: 'Test Result of Latest 12 Builds '
        },
        subtitle: {
            text: 'Source: QA.AMM.COM'
        },
        xAxis: {
            categories: data.build,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Case Counts'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Total Cases',
            data: data.total
        }, {
            name: 'Passed Cases',
            data: data.pass
        }]


    });
}


function set_comp_charts() {
    var url = '/amm/v1.0/mgt/chart';

    data = {
        "component": $("#select").find("option:selected").text(),
        "category": $("div input[type='radio']:checked").val()
    };
    //alert(data.component);
    //alert(data.category);
    $.ajax({
        url: url,
        contentType: "application/json",
        datatype: "json",
        type: 'post',
        data: JSON.stringify(data),
        success: function (data) {   //成功后回调
            //alert(data.total);
            //alert(data.build);
            //alert(data.pass);
            //get_comp_charts(data);
            get_comp_charts2(data);

        },
        error: function (XMLHttpRequest) {    //失败后回调
            //alert("Error: " + XMLHttpRequest.responseText);
            $("#comp-highchart-area").html('').append("<div>" + XMLHttpRequest.responseText + "</div>");
        }

    })
}


function getdependency() {
    url = '/amm/v1.0/dependency';
    $.ajax({
        url: url,
        datatype: "json",
        type: 'get',
        success: function (e) {   //成功后回调
            //alert(e.data[0].name);
            $.each(e, function (i, item) {
                //alert(i);
                //alert(item);
                var html = '';

                var dependency = eval(e.data);
                for (var i = 0; i < dependency.length; i++) {
                    html += '<div class="controls "> \
							<div class="check-demo-col "> \
								<div class="check-line"> \
									<input type="checkbox" id="c' + i + '" class="icheck-me" data-skin="square" data-color="blue" \
									checked> <label class="inline" for="c' + i + '">' + dependency[i].name + '</label> \
								</div>\
							</div>\
						</div>';
                    //html += '<div class="controls ">\
                    //				<div class="check-demo-col ">\
                    //					<div class="check-line">\
                    //						<div class="icheckbox_square-blue" style="position: relative;">\
                    //						<input type="checkbox" id="c'+(i+1)+'" class="icheck-me" data-skin="square" data-color="blue" checked="" style="position: absolute; top: -10%; left: -10%; display: block; width: 120%; height: 120%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;">\
                    //						<ins style="position: absolute; top: -10%; left: -10%; display: block; width: 120%; height: 120%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>\
                    //						</div> <label class="inline" for="c'+(i+1)+'">'+ dependency[i].name +'</label>\
                    //					</div>\
                    //				</div>\
                    //			</div>';
                    //

                }
                //alert(html);
                $("#dependencylist").html('').append(html);


            });

        },
        error: function (e) {    //失败后回调
            alert(e.message);
        },

    })
}


function set_back_to_top(){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) {
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
}



$(document).ready(function () {


    var mobile = false,
        tooltipOnlyForDesktop = true,
        notifyActivatedSelector = 'button-active';

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobile = true;
    }

    icheck();

    if ($(".complexify-me").length > 0) {
        $(".complexify-me").complexify(function (valid, complexity) {
            if (complexity < 40) {
                $(this).parent().find(".progress .bar").removeClass("bar-green").addClass("bar-red");
            } else {
                $(this).parent().find(".progress .bar").addClass("bar-green").removeClass("bar-red");
            }

            $(this).parent().find(".progress .bar").width(Math.floor(complexity) + "%").html(Math.floor(complexity) + "%");
        });
    }

    // Round charts (easypie)
    if ($(".chart").length > 0) {
        $(".chart").each(function () {
            var color = "#881302",
                $el = $(this);
            var trackColor = $el.attr("data-trackcolor");
            if ($el.attr('data-color')) {
                color = $el.attr('data-color');
            }
            else {
                if (parseInt($el.attr("data-percent")) <= 25) {
                    color = "#046114";
                }
                else if (parseInt($el.attr("data-percent")) > 25 && parseInt($el.attr("data-percent")) < 75) {
                    color = "#dfc864";
                }
            }
            $el.easyPieChart({
                animate: 1000,
                barColor: color,
                lineWidth: 5,
                size: 80,
                lineCap: 'square',
                trackColor: trackColor
            });
        });
    }

    // Calendar (fullcalendar)
    if ($('.calendar').length > 0) {
        $('.calendar').fullCalendar({
            header: {
                left: '',
                center: 'prev,title,next',
                right: 'month,agendaWeek,agendaDay,today'
            },
            buttonText: {
                today: 'Today'
            },
            editable: true
        });
        $(".fc-button-effect").remove();
        $(".fc-button-next .fc-button-content").html("<i class='icon-chevron-right'></i>");
        $(".fc-button-prev .fc-button-content").html("<i class='icon-chevron-left'></i>");
        $(".fc-button-today").addClass('fc-corner-right');
        $(".fc-button-prev").addClass('fc-corner-left');
    }

    // Tooltips (only for desktop) (bootstrap tooltips)
    if (tooltipOnlyForDesktop) {
        if (!mobile) {
            $('[rel=tooltip]').tooltip();
        }
    }


    $("#btn_detail").click(function () {
        get_automation_detail();

    });

    $("#btn_trend").click(function () {
        //get_comp_charts();
        set_comp_charts();

    });




    set_back_to_top();




    // Notifications
    $(".notify").click(function () {
        var $el = $(this);
        var title = $el.attr('data-notify-title'),
            message = $el.attr('data-notify-message'),
            time = $el.attr('data-notify-time'),
            sticky = $el.attr('data-notify-sticky'),
            overlay = $el.attr('data-notify-overlay');

        $.gritter.add({
            title: (typeof title !== 'undefined') ? title : 'Message - Head',
            text: (typeof message !== 'undefined') ? message : 'Body',
            image: (typeof image !== 'undefined') ? image : null,
            sticky: (typeof sticky !== 'undefined') ? sticky : false,
            time: (typeof time !== 'undefined') ? time : 3000
        });
    });

    // masked input
    if ($('.mask_date').length > 0) {
        $(".mask_date").mask("9999/99/99");
    }
    if ($('.mask_phone').length > 0) {
        $(".mask_phone").mask("(999) 999-9999");
    }
    if ($('.mask_serialNumber').length > 0) {
        $(".mask_serialNumber").mask("9999-9999-99");
    }
    if ($('.mask_productNumber').length > 0) {
        $(".mask_productNumber").mask("aaa-9999-a");
    }
    // tag-input
    if ($(".tagsinput").length > 0) {
        $('.tagsinput').tagsInput({width: 'auto', height: 'auto'});
    }

    // datepicker
    if ($('.datepick').length > 0) {
        $('.datepick').datepicker();
    }
    // timepicker
    if ($('.timepick').length > 0) {
        $('.timepick').timepicker({
            defaultTime: 'current',
            minuteStep: 1,
            disableFocus: true,
            template: 'dropdown'
        });
    }
    // colorpicker
    if ($('.colorpick').length > 0) {
        $('.colorpick').colorpicker();
    }
    // uniform
    if ($('.uniform-me').length > 0) {
        $('.uniform-me').uniform({
            radioClass: 'uni-radio',
            buttonClass: 'uni-button'
        });
    }
    // Chosen (chosen)
    if ($('.chosen-select').length > 0) {
        $('.chosen-select').each(function () {
            var $el = $(this);
            var search = ($el.attr("data-nosearch") === "true") ? true : false,
                opt = {};
            if (search) opt.disable_search_threshold = 9999999;
            $el.chosen(opt);
        });
    }

    if ($(".select2-me").length > 0) {
        $(".select2-me").select2();
    }

    // multi-select
    if ($('.multiselect').length > 0) {
        $(".multiselect").each(function () {
            var $el = $(this);
            var selectableHeader = $el.attr('data-selectableheader'),
                selectionHeader = $el.attr('data-selectionheader');
            if (selectableHeader != undefined) {
                selectableHeader = "<div class='multi-custom-header'>" + selectableHeader + "</div>";
            }
            if (selectionHeader != undefined) {
                selectionHeader = "<div class='multi-custom-header'>" + selectionHeader + "</div>";
            }
            $el.multiSelect({
                selectionHeader: selectionHeader,
                selectableHeader: selectableHeader
            });
        });
    }

    // spinner
    if ($('.spinner').length > 0) {
        $('.spinner').spinner();
    }

    // dynatree
    if ($(".filetree").length > 0) {
        $(".filetree").each(function () {
            var $el = $(this),
                opt = {};
            opt.debugLevel = 0;
            if ($el.hasClass("filetree-callbacks")) {
                opt.onActivate = function (node) {
                    console.log(node.data);
                    $(".activeFolder").text(node.data.title);
                    $(".additionalInformation").html("<ul style='margin-bottom:0;'><li>Key: " + node.data.key + "</li><li>is folder: " + node.data.isFolder + "</li></ul>");
                };
            }
            if ($el.hasClass("filetree-checkboxes")) {
                opt.checkbox = true;

                opt.onSelect = function (select, node) {
                    var selNodes = node.tree.getSelectedNodes();
                    var selKeys = $.map(selNodes, function (node) {
                        return "[" + node.data.key + "]: '" + node.data.title + "'";
                    });
                    $(".checkboxSelect").text(selKeys.join(", "));
                };
            }

            $el.dynatree(opt);
        });
    }

    if ($(".colorbox-image").length > 0) {
        $(".colorbox-image").colorbox({
            maxWidth: "90%",
            maxHeight: "90%",
            rel: $(this).attr("rel")
        });
    }

    // PlUpload
    if ($('.plupload').length > 0) {
        $(".plupload").each(function () {
            var $el = $(this);
            $el.pluploadQueue({
                runtimes: 'html5,gears,flash,silverlight,browserplus',
                url: 'js/plupload/upload.php',
                max_file_size: '10mb',
                chunk_size: '1mb',
                unique_names: true,
                resize: {width: 320, height: 240, quality: 90},
                filters: [
                    {title: "Image files", extensions: "jpg,gif,png"},
                    {title: "Zip files", extensions: "zip"}
                ],
                flash_swf_url: 'js/plupload/plupload.flash.swf',
                silverlight_xap_url: 'js/plupload/plupload.silverlight.xap'
            });
            $(".plupload_header").remove();
            var upload = $el.pluploadQueue();
            if ($el.hasClass("pl-sidebar")) {
                $(".plupload_filelist_header,.plupload_progress_bar,.plupload_start").remove();
                $(".plupload_droptext").html("<span>Drop files to upload</span>");
                $(".plupload_progress").remove();
                $(".plupload_add").text("Or click here...");
                upload.bind('FilesAdded', function (up, files) {
                    setTimeout(function () {
                        up.start();
                    }, 500);
                });
                upload.bind("QueueChanged", function (up) {
                    $(".plupload_droptext").html("<span>Drop files to upload</span>");
                });
                upload.bind("StateChanged", function (up) {
                    $(".plupload_upload_status").remove();
                    $(".plupload_buttons").show();
                });
            } else {
                $(".plupload_progress_container").addClass("progress").addClass('progress-striped');
                $(".plupload_progress_bar").addClass("bar");
                $(".plupload_button").each(function () {
                    if ($(this).hasClass("plupload_add")) {
                        $(this).attr("class", 'btn pl_add btn-primary').html("<i class='icon-plus-sign'></i> " + $(this).html());
                    } else {
                        $(this).attr("class", 'btn pl_start btn-success').html("<i class='icon-cloud-upload'></i> " + $(this).html());
                    }
                });
            }
        });
    }

    // Wizard
    if ($(".form-wizard").length > 0) {
        $(".form-wizard").formwizard({
            formPluginEnabled: true,
            validationEnabled: true,
            focusFirstInput: false,
            disableUIStyles: true,
            validationOptions: {
                errorElement: 'span',
                errorClass: 'help-block error',
                errorPlacement: function (error, element) {
                    element.parents('.controls').append(error);
                },
                highlight: function (label) {
                    $(label).closest('.control-group').removeClass('error success').addClass('error');
                },
                success: function (label) {
                    label.addClass('valid').closest('.control-group').removeClass('error success').addClass('success');
                }
            },
            formOptions: {
                success: function (data) {
                    alert("Response: \n\n" + data.say);
                },
                dataType: 'json',
                resetForm: true
            }
        });
    }

    // Validation
    if ($('.form-validate').length > 0) {
        $('.form-validate').each(function () {
            var id = $(this).attr('id');
            $("#" + id).validate({
                errorElement: 'span',
                errorClass: 'help-block error',
                errorPlacement: function (error, element) {
                    element.parents('.controls').append(error);
                },
                highlight: function (label) {
                    $(label).closest('.control-group').removeClass('error success').addClass('error');
                },
                success: function (label) {
                    label.addClass('valid').closest('.control-group').removeClass('error success').addClass('success');
                }
            });
        });
    }

    // dataTables
    if ($('.dataTable').length > 0) {
        $('.dataTable').each(function () {
            var opt = {
                "sPaginationType": "full_numbers",
                "oLanguage": {
                    "sSearch": "<span>查询:</span> ",
                    "sInfo": " <span>_START_</span> 到 <span>_END_</span> 共 <span>_TOTAL_</span> 个",
                    "sLengthMenu": "_MENU_ <span>个/页</span>"
                }
            };
            if ($(this).hasClass("dataTable-noheader")) {
                opt.bFilter = false;
                opt.bLengthChange = false;
            }
            if ($(this).hasClass("dataTable-nofooter")) {
                opt.bInfo = false;
                opt.bPaginate = false;
            }
            if ($(this).hasClass("dataTable-nosort")) {
                var column = $(this).attr('data-nosort');
                column = column.split(',');
                for (var i = 0; i < column.length; i++) {
                    column[i] = parseInt(column[i]);
                }
                ;
                opt.aoColumnDefs = [
                    {'bSortable': false, 'aTargets': column}
                ];
            }
            if ($(this).hasClass("dataTable-scroll-x")) {
                opt.sScrollX = "100%";
                opt.bScrollCollapse = true;
            }
            if ($(this).hasClass("dataTable-scroll-y")) {
                opt.sScrollY = "300px";
                opt.bPaginate = false;
                opt.bScrollCollapse = true;
            }
            if ($(this).hasClass("dataTable-reorder")) {
                opt.sDom = "Rlfrtip";
            }
            if ($(this).hasClass("dataTable-colvis")) {
                opt.sDom = 'C<"clear">lfrtip';
                opt.oColVis = {
                    "buttonText": "Change columns <i class='icon-angle-down'></i>"
                };
            }
            if ($(this).hasClass('dataTable-tools')) {
                if ($(this).hasClass("dataTable-colvis")) {
                    opt.sDom = 'TC<"clear">lfrtip';
                } else {
                    opt.sDom = 'T<"clear">lfrtip';
                }
                opt.oTableTools = {
                    "sSwfPath": "js/plugins/datatable/swf/copy_csv_xls_pdf.swf"
                };
            }
            if ($(this).hasClass("dataTable-scroller")) {
                opt.sScrollY = "300px";
                opt.bDeferRender = true;
                opt.sDom = "frtiS";
                opt.sAjaxSource = "js/plugins/datatable/demo.txt";
            }
            var oTable = $(this).dataTable(opt);
            $('.dataTables_filter input').attr("placeholder", "例如:2#1203");
            $(".dataTables_length select").wrap("<div class='input-mini'></div>").chosen({
                disable_search_threshold: 9999999
            });
            $("#check_all").click(function (e) {
                $('input', oTable.fnGetNodes()).prop('checked', this.checked);
            });
            if ($(this).hasClass("dataTable-fixedcolumn")) {
                new FixedColumns(oTable);
            }
            if ($(this).hasClass("dataTable-columnfilter")) {
                oTable.columnFilter({
                    "sPlaceHolder": "head:after"
                });
            }
        });
    }

    // force correct width for chosen
    resize_chosen();

    // file_management
    if ($('.file-manager').length > 0) {
        $('.file-manager').elfinder({
            url: 'js/plugins/elfinder/php/connector.php'
        });
    }

    // slider
    if ($('.slider').length > 0) {
        $(".slider").each(function () {
            var $el = $(this);
            var min = parseInt($el.attr('data-min')),
                max = parseInt($el.attr('data-max')),
                step = parseInt($el.attr('data-step')),
                range = $el.attr('data-range'),
                rangestart = parseInt($el.attr('data-rangestart')),
                rangestop = parseInt($el.attr('data-rangestop'));

            var opt = {
                min: min,
                max: max,
                step: step,
                slide: function (event, ui) {
                    $el.find('.amount').html(ui.value);
                }
            };

            if (range !== undefined) {
                opt.range = true;
                opt.values = [rangestart, rangestop];
                opt.slide = function (event, ui) {
                    $el.find('.amount').html(ui.values[0] + " - " + ui.values[1]);
                    $el.find(".amount_min").html(ui.values[0] + "$");
                    $el.find(".amount_max").html(ui.values[1] + "$");
                };
            }

            $el.slider(opt);
            if (range !== undefined) {
                var val = $el.slider('values');
                $el.find('.amount').html(val[0] + ' - ' + val[1]);
                $el.find(".amount_min").html(val[0] + "$");
                $el.find(".amount_max").html(val[1] + "$");
            } else {
                $el.find('.amount').html($el.slider('value'));
            }
        });
    }

    if ($(".ckeditor").length > 0) {
        CKEDITOR.replace("ck");
    }

    $(".retina-ready").retina("@2x");
});

$(window).resize(function () {
    // chosen resize bug
    resize_chosen();
});

function resize_chosen() {
    $('.chzn-container').each(function () {
        var $el = $(this);
        $el.css('width', $el.parent().width() + 'px');
        $el.find(".chzn-drop").css('width', ($el.parent().width() - 2) + 'px');
        $el.find(".chzn-search input").css('width', ($el.parent().width() - 37) + 'px');
    });
}


