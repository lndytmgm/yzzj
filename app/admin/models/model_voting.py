#!/usr/bin/python
# -*- coding: utf-8 -*-

from app.index.models.model_init import Voting,db
import sys
from sqlalchemy.orm import class_mapper

def get_voting_list():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    try:
        list = db.session.query(Voting).order_by(db.desc(Voting.create_date))

        data = []
        for row in list:
            del row.__dict__['_sa_instance_state']
            row.__dict__['vote_items'] = eval(row.__dict__['vote_items'])
            data.append(row.__dict__)

        # print data
        # data.reverse()
        # print data

        # newdata= sorted(data.items(), key=lambda item:item[1], reverse = True)
        # print newdata

    except Exception,e:
        print e.message
        data = e.message

    finally:
        db.session.close()

    # print data
    return data

def asdict(obj):
    return dict((col.name, getattr(obj, col.name))
                for col in class_mapper(obj.__class__).mapped_table.c)


def add_voting_action(dict_voting):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    rt = False
    print dict_voting
    print dict_voting['title']
    print dict_voting['items']

    v = Voting()
    v.title = dict_voting['title']
    v.vote_items = str(dict_voting['items'])
    v.description = dict_voting['description']

    try:
        add_v = db.session.add(v)
        db.session.commit()
        rt = True
        data = 'success'
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




# if __name__ =="__main__":
#     print ''
#     print get_voting_list()