# codding:utf-8
import sys,os,uuid

from flask import render_template,request,abort,jsonify,session,redirect,url_for,make_response
from app.admin.models.model_ziliao import *
from app import app, ALLOWED_EXTENSIONS
from werkzeug.utils import secure_filename





@app.route('/mgm/ziliao/add')
def ziliao_upload():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name



    return render_template('backend/ziliao_upload.html')

@app.route('/mgm/ziliao/upload',methods=['POST'])
def api_upload_ziliao():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name



    print request.files['myfile']
    print request.form
    # # prar = request.json
    # print "========================"
    # print 'request.json =',request.json
    # print 'request.files =',request.json['file']
    # print type(request.json['file'])
    # print "========================"
    prar={}


    file_dir=app.config['UPLOAD_FOLDER_ziliao']
    print file_dir
    if not os.path.exists(file_dir):
        os.makedirs(file_dir)


    f=request.files['myfile']
    if f and allowed_file(f.filename):
        fname=secure_filename(f.filename)
        uuid_str = str(uuid.uuid1()).replace('-', '')
        print fname
        print str(f.filename).split('.')[-1]
        new_filepath =  os.path.join(file_dir,uuid_str+'.'+str(f.filename).split('.')[-1])
        print new_filepath
        f.save(new_filepath)


        print request.files
        prar['file_name'] = new_filepath
        prar['file_type'] = request.form['file_type']
        prar['file_tag'] = request.form['file_tag']
        prar['file_description'] = request.form['file_description']


        print 'new prar=',prar

        rt,data = insert_ziliao(prar)
        if rt == True:
            return redirect(url_for('ziliao_upload'))
        else:
            return jsonify({"code":1002,"message":data})
    else:
        return jsonify({"code":1001,"message":"error"})



def allowed_file(filename):
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    return '.' in filename and filename.rsplit('.',1)[1] in ALLOWED_EXTENSIONS