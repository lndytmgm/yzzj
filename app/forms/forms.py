from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, validators, PasswordField
import sys
from app.index.models.model_init import User





class SigninForm(FlaskForm):
    # email = StringField("Email", [validators.DataRequired("Please enter your email address."),
    #                               validators.Email("Please enter your email address.")])
    account = StringField("Email", [validators.DataRequired("Please enter your account.")])
    password = PasswordField('Password', [validators.DataRequired("Please enter a password.")])
    submit = SubmitField("Sign In")

    def __init__(self, *args, **kwargs):
        FlaskForm.__init__(self, *args, **kwargs)

    def validate(self):
        print'__name__==', __name__,':',sys._getframe().f_code.co_name
        if not FlaskForm.validate(self):
            print 'FlaskForm.validate error'
            return False

        user = User.query.filter_by(phone=self.account.data).first()
        print user
        if user and user.check_password(self.password.data):
            print 'password check pass'
            return True
        else:
            self.account.errors.append("Invalid account or password")
            return False



