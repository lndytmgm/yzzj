# codding:utf-8
import sys

from flask import render_template,request,abort,jsonify,session,redirect,url_for,make_response
from app import app
from app.admin.models.model_voting import *

@app.route('/mgm/voting/list')
def voting_list():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    votinglist = get_voting_list()

    # print votinglist
    # votinglist.sort(key=lambda k: (k.get('create_date', 0)),reverse=True)
    print votinglist

    return render_template('backend/voting_list.html',votinglist=votinglist)


@app.route('/mgm/voting/add')
def voting_add():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    # check_login()
    return render_template('backend/voting_add.html')



@app.route('/mgm/voting/add/submit',methods=['POST'])
def voting_add_submit():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    # # prar = json.loads(request.json)
    # json_data = {key:dict(request.form)[key][0] for key in dict(request.form)}
    # print json_data

    prar = request.json
    print "========================"
    print 'request.json =',prar
    print "========================"
    # check_login()
    rt,data = add_voting_action(prar)

    # return redirect(url_for('voting_list'))

    if not rt == True:
        code = 500
        return jsonify({'result': rt,'message': data,'status':code})
    else:
        code = 302
        return jsonify({'result': rt,'message': '/mgm/voting/list','status':code})




def check_login():
    if 'haslogin' not in session:
        return redirect(url_for('admin_login'))
    if session['haslogin'] == False:
        return redirect(url_for('admin_login'))