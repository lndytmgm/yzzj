# codding:utf-8
import sys

from flask import render_template,request,abort,jsonify,session,redirect,url_for,make_response
from app import app
from app.admin.models.model_user import *

@app.route('/mgm/user/list')
@app.route('/mgm/user/list/<page>')
def user_list(page=1):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    rt,alluser = query_user()

    return render_template('backend/user_list.html',alluser=alluser)




@app.route('/mgm/user/update_auth_status', methods=['POST'])
def update_auth_status():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    check_login()
    print request.data
    if not request.json:
        abort(400)

    # prar = json.loads(request.json)
    prar = request.json
    print "========================"
    print 'request.json =',prar
    print "========================"

    try:
        print request.headers['REFERER']
        referer = request.headers['REFERER']
    except Exception,e:
        print e.message
        referer = '/mgm/user/list'

    rt,data = update_user_auth_status(prar['phone'])

    if rt == True:

        code = 200
        # return jsonify({'result': rt,'message': referer,'status':code})
        return make_response(jsonify({'result': rt,'message': referer}), code)
    else:
        code = 500
        return make_response(jsonify({'result': rt,'message': referer}), code)


@app.route('/mgm/user/resetpwd', methods=['POST'])
def reset_pwd():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    check_login()
    print request.data
    if not request.json:
        abort(400)

    # prar = json.loads(request.json)
    prar = request.json
    print "========================"
    print 'request.json =',prar
    print "========================"

    try:
        print request.headers['REFERER']
        referer = request.headers['REFERER']
    except Exception,e:
        print e.message
        referer = '/mgm/user/list'

    rt,data = reset_user_pwd(prar['phone'])

    if rt == True:

        code = 200
        # return jsonify({'result': rt,'message': referer,'status':code})
        return make_response(jsonify({'result': rt,'message': referer}), code)
    else:
        code = 500
        return make_response(jsonify({'result': rt,'message': referer}), code)


@app.route('/mgm/user/detail/<phone>')
def user_detail(phone):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    rt,user = query_user_by_phone(phone)
    print 'type is ',type(user)

    return render_template('backend/user_edit.html',user=user)



def check_login():
    if 'haslogin' not in session:
        return redirect(url_for('admin_login'))
    if session['haslogin'] == False:
        return redirect(url_for('admin_login'))