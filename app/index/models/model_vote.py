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




def update_vote_info(vote_id,item_text,house):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    print vote_id,item_text,house
    rt = False

    new_item =[]
    try:
        rt,vote_item_info = get_vote_info(vote_id)
        for i in vote_item_info.vote_items:
            print house
            # print i['vote']
            # print i['text']
            print i['vote_user']
            # print '===='

            if house in i['vote_user']:
                print rt,'already vote it'
                return rt,'already vote it'

            if item_text == i['text']:
                print 'zhao dao le'
                i['vote'] +=1
                i['vote_user'].append(house)
                # print i['vote_user']
                vote_item_info.vote = vote_item_info.vote+ 1
                print vote_item_info.vote


            new_item.append(i)

        # update_count = db.session.query(Voting).filter(Voting.id==vote_id).update({Voting.vote_items:str(new_item)})
        update_count = db.session.query(Voting).filter(Voting.id==vote_id).update({Voting.vote_items:str(new_item),Voting.vote:vote_item_info.vote})
        print update_count
        db.session.commit()
        rt = True
        data = vote_item_info
    except Exception,e:
        print e.message
        data = e.message

    finally:
        db.session.close()

    print rt,data
    return rt,data