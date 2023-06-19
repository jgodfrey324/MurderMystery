from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db


reset = Blueprint('reset', __name__)


@reset.route('/')
@login_required
def reset_seeds():
    user = User.query.get(current_user.id)

    db.session.delete(user)
    db.session.commit()

    return {'message': 'Successfully reset'}
