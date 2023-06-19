from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Character, Suspect, db
# from app.forms import NoteForm


suspect_routes = Blueprint('suspect', __name__)




@suspect_routes.route('/')
@login_required
def get_suspects():
    suspects = Suspect.query.filter(Suspect.user_id == current_user.id).all();

    res = {}

    for suspect in suspects:
        res[suspect.id] = suspect.to_dict()

    return res



@suspect_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_suspect(id):
    suspect_to_delete = Suspect.query.get(id)

    db.session.delete(suspect_to_delete)
    db.session.commit()

    return {'message': 'Successfully deleted'}



@suspect_routes.route('/add', methods=["POST"])
@login_required
def add_suspect():
    new_suspect = Suspect(
        character_id= request.form['id'],
        user_id= current_user.id
        )

    db.session.add(new_suspect)
    db.session.commit()

    return new_suspect.to_dict()
