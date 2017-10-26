#!/usr/bin/python
# -*- coding: utf-8 -*-


from flask import session,redirect,url_for,request,abort,make_response,jsonify
from app import app, ALLOWED_EXTENSIONS
from werkzeug.utils import secure_filename
import os

basedir = os.path.abspath(os.path.dirname(__file__))

from app.index.models.model_user import *



@app.route('/regist/signup', methods=['POST'])
def user_signup():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    print request.data
    if not request.json:
        abort(400)

    # prar = json.loads(request.json)
    prar = request.json
    print "========================"
    print 'request.json =',prar
    print "========================"

    if prar['username'] =='' or prar['phone'] =='' or prar['password'] =='':
        code = 500
        return make_response(jsonify({'result': 'False','message': 'regist data can not be null'}), code)

    rt,data = add_user(prar)
    print "======================"
    print rt,data
    print "======================"

    if rt == True:
        session['username'] = data
        # return redirect(url_for('index.home'))
        code = 302
        return jsonify({'result': rt,'message': '/user/renzheng','status':code})
    else:
        code = 500
        return make_response(jsonify({'result': rt,'message': str(data)}), code)






def allowed_file(filename):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    return '.' in filename and filename.rsplit('.',1)[1] in ALLOWED_EXTENSIONS


@app.route('/renzheng/upload',methods=['POST'])
def api_upload():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    # if 'haslogin' not in session:
    #     return redirect(url_for('index.login'))
    # if session['haslogin'] == False:
    #     return redirect(url_for('index.login'))

    file_dir=app.config['UPLOAD_FOLDER']
    print file_dir
    if not os.path.exists(file_dir):
        os.makedirs(file_dir)
    print request.files
    f=request.files['myfile']
    if f and allowed_file(f.filename):
        fname=secure_filename(f.filename)
        print fname

        new_filepath =  os.path.join(file_dir,fname)
        print new_filepath
        print f.save(new_filepath)

        session['renzheng'] = '审核中'
        rt,data = update_renzheng(session['username'],fname)
        if rt == True:
            return jsonify({"code":0,"message":data})
        else:
            return jsonify({"code":1002,"message":data})
    else:
        return jsonify({"code":1001,"message":"error"})