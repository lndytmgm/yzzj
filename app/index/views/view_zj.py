#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import render_template,session,redirect,url_for
import sys
from app import app
from app.index.models.model_ziliao import *

@app.route('/zj')
def zj_home():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    rt,data = get_all_ziliao()

    return render_template('index/zj.html',zllist = data)



