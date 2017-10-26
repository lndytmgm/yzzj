#!/usr/bin/python
# -*- coding: utf-8 -*-
from run import app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import sys


db = SQLAlchemy(app)


class User(UserMixin,db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    house = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    auth_status = db.Column(db.String(80), nullable=False,default='未认证')
    regist_date = db.Column(db.TIMESTAMP,server_default = func.now())
    regist_pic = db.Column(db.String(200), unique=True, nullable=True)
    level = db.Column(db.Integer,nullable=True,default=1)

    def set_password(self, password):
        self.pwdhash = generate_password_hash(password)

    def check_password(self, password):
        print'__name__==', __name__,':',sys._getframe().f_code.co_name
        print self.password,'==pwd==',password
        # return check_password_hash(self.pwdhash, password)
        if self.password == password:
            return True
        else:
            return False


    def is_authenticated(self):
        return True

    def is_actice(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        """Get the user's uuid from database."""
        return unicode(self.id)

    def __repr__(self):
        return '<User %r>' % self.username

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}

    db.column_dict = to_dict


class Issue(db.Model):
    __tablename__ = 'issues'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    author = db.Column(db.String(120), nullable=False)
    vote = db.Column(db.Integer, nullable=False,default=0)
    status = db.Column(db.String(120), nullable=False,default='未处理')
    create_date = db.Column(db.TIMESTAMP,server_default = func.now())
    pic_kfs = db.Column(db.String(2000))
    pic_zf = db.Column(db.String(2000))
    who_zan = db.Column(db.String(2000))
    type = db.Column(db.String(120), nullable=False,default='公共问题')
    pics = db.Column(db.String(2000))

    def __repr__(self):
        return '<Issue %r>' % self.title


class Voting(db.Model):
    __tablename__ = 'voting'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=True, nullable=False)
    vote_items = db.Column(db.String(2000), nullable=False)
    vote = db.Column(db.Integer, nullable=False,default=0)
    against = db.Column(db.Integer, nullable=False,default=0)
    status = db.Column(db.String(120), nullable=False,default='进行中')
    create_date = db.Column(db.TIMESTAMP,server_default = func.now())
    vote_user = db.Column(db.String(2000))
    against_user = db.Column(db.String(2000))
    description = db.Column(db.String(2000))

    def __repr__(self):
        return '<Voting %r>' % self.to_dict()


    def to_dict(self, show=None, hide=None, path=None, show_all=None):
        """ Return a dictionary representation of this model.
        """

        if not show:
            show = []
        if not hide:
            hide = []
        hidden = []
        if hasattr(self, 'hidden_fields'):
            hidden = self.hidden_fields
        default = []
        if hasattr(self, 'default_fields'):
            default = self.default_fields

        ret_data = {}

        if not path:
            path = self.__tablename__.lower()
            def prepend_path(item):
                item = item.lower()
                if item.split('.', 1)[0] == path:
                    return item
                if len(item) == 0:
                    return item
                if item[0] != '.':
                    item = '.%s' % item
                item = '%s%s' % (path, item)
                return item
            show[:] = [prepend_path(x) for x in show]
            hide[:] = [prepend_path(x) for x in hide]

        columns = self.__table__.columns.keys()
        relationships = self.__mapper__.relationships.keys()
        properties = dir(self)

        for key in columns:
            check = '%s.%s' % (path, key)
            if check in hide or key in hidden:
                continue
            if show_all or key is 'id' or check in show or key in default:
                ret_data[key] = getattr(self, key)

        for key in relationships:
            check = '%s.%s' % (path, key)
            if check in hide or key in hidden:
                continue
            if show_all or check in show or key in default:
                hide.append(check)
                is_list = self.__mapper__.relationships[key].uselist
                if is_list:
                    ret_data[key] = []
                    for item in getattr(self, key):
                        ret_data[key].append(item.to_dict(
                            show=show,
                            hide=hide,
                            path=('%s.%s' % (path, key.lower())),
                            show_all=show_all,
                        ))
                else:
                    if self.__mapper__.relationships[key].query_class is not None:
                        ret_data[key] = getattr(self, key).to_dict(
                            show=show,
                            hide=hide,
                            path=('%s.%s' % (path, key.lower())),
                            show_all=show_all,
                        )
                    else:
                        ret_data[key] = getattr(self, key)

        for key in list(set(properties) - set(columns) - set(relationships)):
            if key.startswith('_'):
                continue
            check = '%s.%s' % (path, key)
            if check in hide or key in hidden:
                continue
            if show_all or check in show or key in default:
                val = getattr(self, key)
                try:
                    ret_data[key] = json.loads(json.dumps(val))
                except:
                    pass

        return ret_data