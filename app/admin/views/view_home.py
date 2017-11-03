#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys

from flask import render_template,session
from app import app


@app.route('/mgm/home')
def admin_home():
    print'__name__==', __name__,':',sys._getframe().f_code.co_name




    return render_template('backend/index.html')







