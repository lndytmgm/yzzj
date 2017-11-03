# codding:utf-8

from flask import Blueprint



admin=Blueprint('admin',__name__,)
from views import view_user
from views import view_login
from views import view_home
from views import view_voting
from views import view_ziliao



