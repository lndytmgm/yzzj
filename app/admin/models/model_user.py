#!/usr/bin/python
# -*- coding: utf-8 -*-

from app.index.models.model_init import User,db
import sys


def update_user_auth_status(phone):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    print phone
    rt =False
    try:
        new_user = db.session.query(User).filter(User.phone==phone).update({User.auth_status:'已认证'})

        print new_user,
        db.session.commit()
        rt = True
        data = 'success'
    except Exception,e:
        print e.message
        data = str(e.message)
    print rt,data
    return  rt, data


def query_user_by_phone(phone):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    rt=False

    try:
        user = db.session.query(User).filter(User.phone==phone).first()
        data = user.to_dict()
        # print user.__dict__
        # print user.to_dict()
        rt = True
    except Exception,e:
        print e.message
        data = str(e.message)

    print rt, data
    return  rt, data

def query_user():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    rt=False

    try:
        alluser = db.session.query(User).all()
        data = alluser
        rt = True
    except Exception,e:
        print e.message
        data = str(e.message)

    # print rt, data
    return  rt, data


def reset_user_pwd(phone):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    print phone
    rt =False
    try:
        new_user = db.session.query(User).filter(User.phone==phone).update({User.password:'12345678'})

        print new_user,
        db.session.commit()
        rt = True
        data = 'success'
    except Exception,e:
        print e.message
        data = str(e.message)
    print rt,data
    return  rt, data

def page_user(page,per_page):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    rt=False
    try:
        pagination = User.query.paginate(page=1, per_page=10, error_out = False)

        print '======================='
        print pagination.has_next
        print pagination.has_prev
        print pagination.items
        print pagination.next
        print pagination.prev
        print pagination.page
        print pagination.pages
        print pagination.per_page
        print pagination.prev_num
        print pagination.next_num
        # print pagination.query
        print pagination.total
        print pagination.iter_pages
        print '======================='
        rt = True
    except Exception,e:
        print e.message
        data = str(e.message)

    if rt == True:
        return  pagination,pagination.items
    else:
        return  data



# if __name__ =="__main__":
#     print ''
#     print page_user()