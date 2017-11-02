#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import session
from model_init import ZL,db

import sys




def get_all_ziliao():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    rt = False

    try:
        issue_detail = db.session.query(ZL).all()
        data = issue_detail
        rt = True
    except Exception,e:
        print e.message
        data = e.message
    finally:
        db.session.close()

    print rt,data

    return rt,data



