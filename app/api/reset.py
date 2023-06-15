from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..seeds.users import seed_users, undo_users
from ..seeds.characters import seed_characters, undo_characters
from ..seeds.descriptions import seed_descriptions, undo_descriptions
from ..seeds.occupations import seed_occupations, undo_occupations
from ..seeds.suspects import seed_suspects, undo_suspects
from ..seeds.items import seed_items, undo_items
from ..seeds.places import undo_places


reset = Blueprint('reset', __name__)


@reset.route('/')
@login_required
def reset_seeds():
    undo_suspects()
    undo_characters()
    undo_descriptions()
    undo_items()
    undo_occupations()
    undo_places()
    undo_users()

    seed_users()
    seed_occupations()
    seed_items()
    seed_descriptions()
    seed_characters()
    seed_suspects()

    return {'message': 'Successfully reset'}
