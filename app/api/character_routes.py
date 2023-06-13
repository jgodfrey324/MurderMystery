from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Character, db


character_routes = Blueprint('character', __name__)



@character_routes.route('/')
@login_required
def get_characters():
    characters = Character.query.all();

    res = {}

    for character in characters:
        res[character.id] = character.to_dict()

    return res
