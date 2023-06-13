from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Character, Suspect, db
# from app.forms import NoteForm


suspect_routes = Blueprint('suspect', __name__)




@suspect_routes.route('/')
@login_required
def get_suspects():
    suspects = Suspect.query.all();

    res = {}

    for suspect in suspects:
        res[suspect.id] = {'first_name': suspect.character.first_name, 'last_name': suspect.character.last_name}

    return res
