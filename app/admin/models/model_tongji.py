#!/usr/bin/python
# -*- coding: utf-8 -*-

from app.index.models.model_init import User,db
import sys


def tongji_user():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    rt=False

    try:
        alluser = db.session.query(User).all()

        data = calc_user_in_1_building(alluser)

        rt = True
    except Exception,e:
        print e.message
        data = str(e.message)


    # print rt, data
    return  rt, data


def calc_user_in_1_building(alluser):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    house = {
        "1#":0,
        "2#":0,
        "3#":0,
        "4#":0,
        "5#":0,
        "6#":0,
        "7#":0,
        "8#":0
    }


    for loop,user in enumerate(alluser):
        print loop
        index = str(user.house).split('#')[0]
        print index
        print type(index)
        house[index+'#'] = house[index+'#'] + 1

        print '==='

    print house
    print type(house)
    list = []
    for k,v in  house.items():
        print k,v
        list.append({"data":[v],"name":k})


    print list
    return list






# if __name__ =="__main__":
#     print ''
#     print tongji_user()