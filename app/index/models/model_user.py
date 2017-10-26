#!/usr/bin/python
# -*- coding: utf-8 -*-

from model_init import User,db

import sys



def add_user(dict_user):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    rt = False
    print dict_user
    u = User()
    u.username = dict_user['username']
    u.password = dict_user['password']
    u.house=dict_user['house']
    u.phone=dict_user['phone']

    try:
        db.session.add(u)
        db.session.commit()
        rt = True
        data = dict_user['username']
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


def query_user(dict_user):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    print dict_user
    rt=False

    try:
        loginuser = db.session.query(User).filter(User.phone==dict_user['phone']).first()
        print 'loginuser =',loginuser
        print 'password =',loginuser.password
        if loginuser.password == dict_user['password']:
            print 'yes, phone,pwd is exist.'
            rt = True

            data = loginuser
        else:

            data = 'wrong phone or pwd'
    except Exception,e:
        print e.message
        data = str(e.message)

    return  rt, data


def update_renzheng(loginname,filepath):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    print loginname,filepath
    rt =False
    try:
        update_auth_status = db.session.query(User).filter(User.phone==loginname).update({User.auth_status:'审核中'})
        update_regist_pic = db.session.query(User).filter(User.phone==loginname).update({User.regist_pic:filepath})
        print update_auth_status,update_regist_pic
        db.session.commit()
        rt = True
        data = 'success'
    except Exception,e:
        print e.message
        data = str(e.message)
    print rt,data
    return  rt, data

def get_auth_status(loginname):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    print loginname
    rt =False
    try:
        user_auth = db.session.query(User).filter(User.phone==loginname).first()

        rt = True
        data = user_auth.auth_status
    except Exception,e:
        print e.message
        data = str(e.message)
    print rt,data
    return  rt, data