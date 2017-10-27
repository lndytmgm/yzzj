#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import render_template,session,redirect,url_for,request,abort,make_response,jsonify
from app.index.models.model_issue import *
from app import app



@app.route('/issue/vote/<issue_id>',methods=['POST'])
def vote_for_issue(issue_id):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    # print request.data
    # if not request.json:
    #     abort(400)
    try:
        print request.headers['REFERER']
        referer = request.headers['REFERER']
    except Exception,e:
        print e.message
        referer = '/issue/detail/'+issue_id

    # if not 'house' in session:
    #     code = 302
    #     return jsonify({'result': 'False','message': '/login','status':code})

    # if 'haslogin' not in session:
    #     return redirect(url_for('login'))
    # if session['haslogin'] == False:
    #     return redirect(url_for('login'))

    rt,data = vote_issue(issue_id)
    # rt,data = True,'333'

    if 'already' in str(data):
        code = 500
        return jsonify({'result': rt,'message': referer,'status':code})
    else:
        code = 302
        return jsonify({'result': rt,'message': referer,'status':code})




@app.route('/issue/detail/<issue_id>',methods=['GET'])
def issue_detail(issue_id):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    if 'haslogin' not in session:
        return redirect(url_for('login'))
    if session['haslogin'] == False:
        return redirect(url_for('login'))

    if not session['renzheng'] == u'已认证':
        return redirect(url_for('renzheng'))


    print issue_id
    rt,data = get_issue_detail(issue_id)

    if not rt==True:
        render_template('index/issue_detail.html')

    return render_template('index/issue_detail.html',issue=data)


@app.route('/issue/list')
def issue_list():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    if 'haslogin' not in session:
        return redirect(url_for('login'))
    if session['haslogin'] == False:
        return redirect(url_for('login'))
    if not session['renzheng'] == u'已认证':
        return redirect(url_for('renzheng'))

    rt = get_issue_list()

    return render_template('index/issue_list.html',issue_list=rt)



@app.route('/issue/submit')
def issue_submit():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    if 'haslogin' not in session:
        return redirect(url_for('login'))
    if session['haslogin'] == False:
        return redirect(url_for('login'))
    if not session['renzheng'] == u'已认证':
        return redirect(url_for('renzheng'))

    return render_template('index/issue_submit.html')



@app.route('/issue/submit/save',methods=['POST'])
def issue_submit_save():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    print request.data
    if not request.json:
        abort(400)


    if not 'house' in session:
        code = 302
        return jsonify({'result': 'False','message': '/login','status':code})

    # prar = json.loads(request.json)
    prar = request.json
    print "========================"
    print 'request.json =',prar
    print "========================"


    rt,data = save_issue(prar)
    print "======================"
    print rt,data
    print "======================"

    if rt == True:
        code = 302
        return jsonify({'result': rt,'message': '/','status':code})
    else:
        session['haslogin'] = False
        code = 500
        return make_response(jsonify({'result': rt,'message': str(data)}), code)





