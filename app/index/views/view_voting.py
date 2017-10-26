# codding:utf-8
from flask import render_template,session,redirect,url_for
import sys
from app import app
from app.index.models.model_vote import *
from app.admin.models.model_voting import get_voting_list




@app.route('/voting/list')
def index_voting_lisft():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    votinglist = get_voting_list()

    print votinglist
    return render_template('index/voting_list.html',votinglist=votinglist)



@app.route('/voting/vote/<vote_id>')
def voting_vote(vote_id):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    rt,vote_info = get_vote_info(vote_id)

    print rt,vote_info
    return render_template('index/voting_vote.html',vote_info=vote_info)






