

from flask import Flask


app = Flask(__name__)
app.config.from_object(__name__)


UPLOAD_FOLDER='app/static/upload/img/'
UPLOAD_FOLDER_ziliao='app/static/upload/ziliao/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['UPLOAD_FOLDER_ziliao'] = UPLOAD_FOLDER_ziliao

ALLOWED_EXTENSIONS = set(['txt','png','jpg','xls','JPG','PNG','xlsx','gif','GIF','ppt','mp4','doc','docx','pdf'])

app.secret_key = 'mgm2017weiquan'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://mgm:mgm2017@localhost/mgm'



from app.index import index
app.register_blueprint(index)

from admin import admin
app.register_blueprint(admin)
