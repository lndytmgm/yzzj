# coding:utf-8

from app import app
from flask import render_template, request, make_response, jsonify, redirect, url_for, session, g
from app.index.models.model_init import User
from app.forms.forms import SigninForm
from werkzeug.security import generate_password_hash
from flask_login import login_user, current_user
import sys


@app.route('/mgm/login', methods=["GET", "POST"])
def admin_login():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name
    form = SigninForm()

    if request.method == 'POST':
        if form.validate() == False:
            print "$$$$$$ generate_password_hash(form.password.data) $$$$$$"
            print form.account.data
            print form.password.data
            print generate_password_hash(form.password.data)
            print "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
            session['current_project'] = ''
            return render_template('backend/login.html', form=form)
        else:

            user = User.query.filter_by(phone = form.account.data).first()
            print user
            session['username'] = user.username
            session['level'] = user.level
            session['haslogin'] = True

            if user.level >=2:

                return redirect(url_for('admin_home'))
            else:
                return render_template('backend/login.html', form=form)

    elif request.method == 'GET':
        return render_template('backend/login.html', form=form)


@app.route('/mgm/logout')
def admin_logout():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name

    session.pop('haslogin', None)
    session.pop('username', None)
    session.pop('level', None)

    return redirect(url_for('admin_login'))