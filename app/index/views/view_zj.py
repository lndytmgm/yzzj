# codding:utf-8
from flask import render_template,session,redirect,url_for
import sys
from app import app

@app.route('/zj')
def zj_home():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    return render_template('index/zj.html')



