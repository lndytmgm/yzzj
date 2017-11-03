#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys

from flask import render_template,session
from app import app
from app.admin.models.model_tongji import *

@app.route('/mgm/home')
def admin_home():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    rt,data = tongji_user()


    return render_template('backend/index.html',user_building_dict=data)







