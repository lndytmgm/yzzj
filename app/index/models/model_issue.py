#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import session
from model_init import Issue,db

import sys

def vote_issue(issue_id):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    rt = False
    print issue_id
    try:

        original_vote = db.session.query(Issue).filter(Issue.id==issue_id).first()
        print original_vote.vote
        print original_vote.vote+1
        print original_vote.who_zan
        if session['house'] in str(original_vote.who_zan):
            return 'false','already voted'

        new_who_zan = (str(original_vote.who_zan)+','+session['house']).replace('None,','')
        print new_who_zan
        issue_update_vote = db.session.query(Issue).filter(Issue.id==issue_id).update({Issue.vote:original_vote.vote+1,Issue.who_zan:new_who_zan})
        db.session.commit()
        data = issue_update_vote
        rt = True
    except Exception,e:
        print e.message
        data = e.message
    finally:
        db.session.close()

    print 'result =',rt,'update count =',data
    # print data.id
    return rt,data


def check_vote_user(original_vote):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name




def get_issue_detail(issue_id):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    rt = False
    print issue_id
    try:
        issue_detail = db.session.query(Issue).filter(Issue.id==issue_id).first()
        data = issue_detail
        rt = True
    except Exception,e:
        print e.message
        data = e.message
    finally:
        db.session.close()

    print rt,data
    print data.title
    # print data.id
    return rt,data


def get_issue_list():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    try:
        list = db.session.query(Issue).order_by(db.desc(Issue.vote))
        data = list
    except Exception,e:
        print e.message
        data = e.message
    finally:
        db.session.close()

    print data
    return data


def save_issue(dict_issue):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    rt = False
    print dict_issue

    issue = Issue()
    issue.title = dict_issue['issue_title']
    issue.description = dict_issue['issue_desc']
    issue.author=session['house']


    try:
        db.session.add(issue)
        db.session.commit()
        rt = True
        data = 'save issue done'
    except Exception,e:
        print e
        if 'Duplicate' in str(e):
            data = 'Duplicate data in db'
        else:
            data = str(e)
    finally:
        db.session.close()
    if rt==True:
        return rt,data
    else:
        return rt,data
