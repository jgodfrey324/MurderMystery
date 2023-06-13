from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Character, Suspect, db
# from app.forms import NoteForm


suspect_routes = Blueprint('suspects', __name__)




@suspect_routes('/')
@login_required
def get_suspects():
    pass
