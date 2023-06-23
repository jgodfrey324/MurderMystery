from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db


reset = Blueprint('reset', __name__)


@reset.route('/')
@login_required
def reset_seeds():

    if current_user.id == 1:
        demo_user = User.query.get(current_user.id)
        [db.session.delete(note) for note in demo_user.notes]
        [db.session.delete(suspect) for suspect in demo_user.suspects]
        [db.session.delete(backpack) for backpack in demo_user.backpack_items]
        [db.session.delete(place) for place in demo_user.places]

        db.session.commit()

        return {'message': 'Successfully reset'}

    user = User.query.get(current_user.id)
    db.session.delete(user)
    db.session.commit()

    return {'message': 'Successfully reset'}
