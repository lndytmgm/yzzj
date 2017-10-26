#!/usr/bin/python
# -*- coding: utf-8 -*-


from flask import render_template,session,redirect,url_for,request,abort,make_response,jsonify
from app import app
from app.index.models.model_user import *



@app.route('/user/login', methods=['POST'])
def user_login():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    # if 'haslogin' not in session:
    #     return redirect(url_for('login'))
    print request.data
    if not request.json:
        abort(400)

    # prar = json.loads(request.json)
    prar = request.json
    print "========================"
    print 'request.json =',prar
    print "========================"

    if prar['phone'] =='' or prar['password'] =='':
        code = 500
        return make_response(jsonify({'result': 'False','message': 'regist data can not be null'}), code)


    rt,data = query_user(prar)
    print "======================"
    print rt,data
    print "======================"

    if rt == True:
        session['username'] = data.username
        session['house'] = data.house
        session['haslogin'] = True
        rt,data = get_auth_status(session['username'])
        if rt==True:
            session['renzheng'] = data
        else:
            session['renzheng'] = 'error'
        # return redirect(url_for('index.home'))
        code = 302
        return jsonify({'result': rt,'message': '/','status':code})
    else:
        session['haslogin'] = False
        code = 500
        return make_response(jsonify({'result': rt,'message': str(data)}), code)


