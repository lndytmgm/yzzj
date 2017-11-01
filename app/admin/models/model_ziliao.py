#!/usr/bin/python
# -*- coding: utf-8 -*-

from app.index.models.model_init import ZL,db
import sys
from sqlalchemy.orm import class_mapper




def insert_ziliao(dict_files):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    rt = False

    v = ZL()
    v.description = dict_files['file_description']
    v.filename = dict_files['file_name']
    v.tag = dict_files['file_tag']
    v.type = dict_files['file_type']

    try:
        add_v = db.session.add(v)
        print add_v
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