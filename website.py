import os
from flask import Flask, flash, redirect, render_template, render_template_string, request, session, current_app
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from flask_user import login_required, UserManager, UserMixin, SQLAlchemyAdapter, forms, views, signals 
from flask_login import current_user, login_user, logout_user
from flask_user.translations import gettext as _

# Use a Class-based config to avoid needing a 2nd file
# os.getenv() enables configuration through OS environment variables
class ConfigClass(object):
    # Flask settings
    SECRET_KEY =              os.getenv('SECRET_KEY',       'THIS IS AN INSECURE SECRET')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL',     'sqlite:///basic_app.sqlite')
    CSRF_ENABLED = True

    # Flask-Mail settings
    MAIL_USERNAME =           os.getenv('MAIL_USERNAME',        'convective.challenge@gmail.com')
    MAIL_PASSWORD =           os.getenv('MAIL_PASSWORD',        'theSPCrules')
    MAIL_DEFAULT_SENDER =     os.getenv('MAIL_DEFAULT_SENDER',  '"ConvectiveChallenge" <convective.challenge@gmail.com>')
    MAIL_SERVER =             os.getenv('MAIL_SERVER',          'smtp.gmail.com')
    MAIL_PORT =           int(os.getenv('MAIL_PORT',            '465'))
    MAIL_USE_SSL =        int(os.getenv('MAIL_USE_SSL',         True))

    # Flask-User settings
    USER_APP_NAME        = "ConvectiveChallenge"                # Used by email templates


# Setup Flask app and app.config
app = Flask(__name__)
app.config.from_object(__name__+'.ConfigClass')

# Initialize Flask extensions
db = SQLAlchemy(app)                            # Initialize Flask-SQLAlchemy
mail = Mail(app)                                # Initialize Flask-Mail

# Define the User data model. Make sure to add flask_user UserMixin !!!
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)

    # User authentication information
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False, server_default='')

    # User email information
    email = db.Column(db.String(255), nullable=False, unique=True)
    confirmed_at = db.Column(db.DateTime())

    # User information
    active = db.Column('is_active', db.Boolean(), nullable=False, server_default='0')
    first_name = db.Column(db.String(100), nullable=False, server_default='')
    last_name = db.Column(db.String(100), nullable=False, server_default='')


def create_app():
    """ Flask application factory """
   
    # Create all database tables
    db.create_all()

    # Setup Flask-User
    db_adapter = SQLAlchemyAdapter(db, User)        # Register the User model
    user_manager = UserManager(db_adapter, app)     # Initialize Flask-User

    @app.route('/', methods=["GET","POST"])
    def home_page():
        login_form =  user_manager.login_form(request.form)   
        next = request.args.get('next', 'index.html')



        # Process valid POST
        if request.method=='POST' and login_form.validate():
            # Retrieve User
            user = None
            user_email = None
            if user_manager.enable_username:
                # Find user record by username
                user = user_manager.find_user_by_username(login_form.username.data)
                user_email = None
                # Find primary user_email record
                if user and db_adapter.UserEmailClass:
                    user_email = db_adapter.find_first_object(db_adapter.UserEmailClass,
                        user_id=int(user.get_id()),
                        is_primary=True,
                        )
                # Find user record by email (with form.username)
                if not user and user_manager.enable_email:
                    user, user_email = user_manager.find_user_by_email(login_form.username.data)
            else:
                # Find user by email (with form.email)
                user, user_email = user_manager.find_user_by_email(login_form.email.data)

            if user:
                # Log user in
                return views._do_login_user(user, login_form.next.data, login_form.remember_me.data)

        if request.method != "POST":
            return render_template('index.html', form=login_form)

    @app.route('/logout')
    def logout():
        """ Sign the user out."""
        # Send user_logged_out signal
        signals.user_logged_out.send(current_app._get_current_object(), user=current_user)

        # Use Flask-Login to sign out user
        logout_user()

        # Prepare one-time system message
        flash(_('You have signed out successfully.'), 'success')

        # Redirect to logout_next endpoint or '/'
        next = request.args.get('next', '/')  # Get 'next' query param
        return redirect(next)


    # The Members page is only accessible to authenticated users
    @app.route('/members')
    @login_required                                 # Use of @login_required decorator
    def members_page():
        return render_template_string("""
            {% extends "base.html" %}
            {% block content %}
                <h2>Members page</h2>
                <p>This page can only be accessed by authenticated users.</p><br/>
                <p><a href={{ url_for('home_page') }}>Home page</a> (anyone)</p>
                <p><a href={{ url_for('members_page') }}>Members page</a> (login required)</p>
            {% endblock %}
            """)


    return app


# Start development web server
if __name__=='__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
