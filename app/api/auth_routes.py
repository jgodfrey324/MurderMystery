from flask import Blueprint, jsonify, session, request
from app.models import User, Suspect, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.username == form.data['username']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()

    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)


        sus1 = Suspect(
        character_id=1, user_id=current_user.id)
        sus2 = Suspect(
            character_id=2, user_id=current_user.id)
        sus3 = Suspect(
            character_id=3, user_id=current_user.id)
        sus4 = Suspect(
            character_id=4, user_id=current_user.id)
        sus5 = Suspect(
            character_id=5, user_id=current_user.id)
        sus6 = Suspect(
            character_id=6, user_id=current_user.id)
        sus7 = Suspect(
            character_id=7, user_id=current_user.id)
        sus8 = Suspect(
            character_id=8, user_id=current_user.id)
        sus9 = Suspect(
            character_id=9, user_id=current_user.id)
        sus10 = Suspect(
            character_id=10, user_id=current_user.id)
        sus11 = Suspect(
            character_id=11, user_id=current_user.id)
        sus12 = Suspect(
            character_id=12, user_id=current_user.id)
        sus13 = Suspect(
            character_id=13, user_id=current_user.id)

        suspects = [sus1, sus2, sus3, sus4, sus5, sus6, sus7, sus8, sus9, sus10, sus11, sus12, sus13]
        [db.session.add(suspect) for suspect in suspects]
        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
