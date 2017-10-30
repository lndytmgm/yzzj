# codding:utf-8
import sys

from flask import render_template,request,abort,jsonify,session,redirect,url_for,make_response
from app import app
from app.admin.models.model_voting import *

@app.route('/mgm/ziliao/upload')
def ziliao_upload():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name



    return render_template('backend/ziliao_upload.html')


