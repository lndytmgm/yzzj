# codding:utf-8

from flask import Blueprint


index=Blueprint('index',__name__,)

from app.index.views import view_index
from app.index.views import view_regist
from app.index.views import view_login
from app.index.views import view_issue
from app.index.views import view_voting
from app.index.views import view_zj
