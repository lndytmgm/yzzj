#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import render_template,session,redirect,url_for
import sys
from app import app
from app.index.models.model_ziliao import *

@app.route('/zj')
def zj_home():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    if 'haslogin' not in session:
        return redirect(url_for('login'))
    if session['haslogin'] == False:
        return redirect(url_for('login'))
    # if not session['renzheng'] == u'已认证':
    #     return redirect(url_for('renzheng'))

    rt,data = get_all_ziliao()

    return render_template('index/zj.html',zllist = data)



