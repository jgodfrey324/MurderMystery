from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db


reset = Blueprint('reset', __name__)


@reset.route('/')
@login_required
def reset_seeds():

    old_demo_user = current_user.username
    user = User.query.get(current_user.id)
    db.session.delete(user)
    db.session.commit()

    if old_demo_user == 'Demo':
        demo = User(
        username='Demo', first_name='Demo', last_name='Lition', password='password')
        db.session.add(demo)
        db.session.commit()

    return {'message': 'Successfully reset'}
