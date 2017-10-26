# codding:utf-8
from flask import render_template,session,redirect,url_for,request,abort,make_response,jsonify
import sys
from app import app
from app.index.models.model_vote import *
from app.admin.models.model_voting import get_voting_list


@app.route('/voting/voted/<vote_id>',methods=['POST'])
def voting_voted(vote_id):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    if 'haslogin' not in session:
        return redirect(url_for('login'))
    if session['haslogin'] == False:
        return redirect(url_for('login'))

    print request.data
    if not request.json:
        abort(400)


    prar = request.json
    print "========================"
    print 'request.json =',prar
    print "========================"

    print session['house']

    rt,data = update_vote_info(vote_id,prar['item'],session['house'])

    try:
        print request.headers['REFERER']
        referer = request.headers['REFERER']
    except Exception,e:
        print e.message
        referer = '/voting/voted/'+vote_id


    if rt == True:
        if 'already vote it' in data:
            code =500
            return jsonify({'result': rt,'message': 'already vote it','status':code})
        else:
            code = 302
            return jsonify({'result': rt,'message': referer,'status':code})
    else:
        code = 500

        return jsonify({'result': rt,'message': data,'status':code})


@app.route('/voting/list')
def index_voting_lisft():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    if 'haslogin' not in session:
        return redirect(url_for('login'))
    if session['haslogin'] == False:
        return redirect(url_for('login'))

    votinglist = get_voting_list()

    print votinglist
    return render_template('index/voting_list.html',votinglist=votinglist)



@app.route('/voting/vote/<vote_id>')
def voting_vote(vote_id):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    if 'haslogin' not in session:
        return redirect(url_for('login'))
    if session['haslogin'] == False:
        return redirect(url_for('login'))

    rt,vote_info = get_vote_info(vote_id)

    print rt,vote_info
    return render_template('index/voting_vote.html',vote_info=vote_info)










