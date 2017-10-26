#!/usr/bin/python
# -*- coding: utf-8 -*-

from model_init import Voting,db

import sys,json


def get_vote_info(vote_id):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    rt = False

    try:
        listtmp = db.session.query(Voting).filter(Voting.id==vote_id).first()
        rt = True
        print eval(listtmp.vote_items)
        listtmp.vote_items = eval(listtmp.vote_items)

        data = listtmp
    except Exception,e:
        print e.message
        data = e.message

    finally:
        db.session.close()

    # print data
    return rt,data


