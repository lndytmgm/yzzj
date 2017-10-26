# codding:utf-8
from flask import render_template,session,redirect,url_for
import sys
from app import app

@app.route('/')
def home():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    return render_template('index/index.html')


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
    return render_template('index/index.html')


@app.route('/regist')
def regist():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    return render_template('index/regist.html')


@app.route('/user/renzheng')
def renzheng():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    if 'haslogin' not in session:
        return redirect(url_for('index.login'))
    if session['haslogin'] == False:
        return redirect(url_for('index.login'))

    return render_template('index/renzheng.html')