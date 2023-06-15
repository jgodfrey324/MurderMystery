from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Place, db


places_visited_routes = Blueprint('places_visited', __name__)


@places_visited_routes.route('/')
@login_required
def get_places():
    places = Place.query.all();

    res = []

    for place in places:
        res.append(place.scene)

    return res



@places_visited_routes.route('/new', methods=["POST"])
@login_required
def add_place():
    new_place = Place(scene= request.form['scene'])

    db.session.add(new_place)
    db.session.commit()

    return jsonify(new_place.scene)
