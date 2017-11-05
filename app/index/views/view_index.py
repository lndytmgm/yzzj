#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import render_template,session,redirect,url_for
import sys
from app import app

@app.route('/tencent3772985137319405190.txt')
def tencent():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name


    return app.send_static_file('tencent3772985137319405190.txt')



@app.route('/')
@app.route('/home')
def home():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    # try:
    #
    #     print session['username']
    #     print session['house']
    #     print session['haslogin']
    #     print session['renzheng']
    # except Exception,e:
    #     print e.message


    return render_template('index/index.html')

@app.route('/coming_soon')
def coming_soon():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    return render_template('index/coming_soon.html')

@app.route('/login')
def login():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    return render_template('index/login.html')

@app.route('/logout')
def logout():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    # session['haslogin'] = False
    # session['renzheng'] = False
    # session['username'] = ''
    session.pop('haslogin', None)
    session.pop('renzheng', None)
    session.pop('username', None)
    session.pop('house', None)
    return render_template('index/index.html')


@app.route('/regist')
def regist():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    return render_template('index/regist.html')


@app.route('/user/renzheng')
def renzheng():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    if 'haslogin' not in session:
        return redirect(url_for('login'))
    if session['haslogin'] == False:
        return redirect(url_for('login'))

    return render_template('index/renzheng.html')