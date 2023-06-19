from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Character, Description, db


character_routes = Blueprint('character', __name__)



@character_routes.route('/')
@login_required
def get_characters():
    characters = Character.query.all();

    res = {}

    for character in characters:
        res[character.id] = character.to_dict()

    return res



@character_routes.route('/search-name', methods=["POST"])
@login_required
def search_names():
    name_filter = request.form['name']

    name_list = list(name_filter)
    capitalize = name_list[0].upper()

    name_list.pop(0)
    name_list.insert(0, capitalize)

    new_name = ''.join(name_list)

    characters = Character.query.filter(Character.first_name.like(f'{new_name}%') | Character.last_name.like(f'{new_name}%')).all()

    chars = [character.to_dict() for character in characters]

    return {'results': chars}


@character_routes.route('/search-descr', methods=["POST"])
@login_required
def search_descr():
    gender_filter = request.form['gender']
    age_filter = request.form['age']
    occupation_filter = request.form['occupation']
    hair_filter = request.form['hair_color']

    characters = Character.query.all()

    chars = [char.to_dict() for char in characters]

    def gender_check(char):
        if not gender_filter:
            return True
        elif (gender_filter and char['description']['gender'] == gender_filter):
            return True
        else:
            return False

    def age_check(char):
        if not age_filter:
            return True
        elif (age_filter and ((char['description']['age'] >= int(age_filter.split(',')[0])) and (char['description']['age'] <= int(age_filter.split(',')[1])))):
            return True
        else:
            return False

    def occupation_check(char):
        if not occupation_filter:
            return True
        elif (occupation_filter and (char['description']['occupation']['job_title'] == occupation_filter)):
            return True
        else:
            return False

    def hair_check(char):
        if not hair_filter:
            return True
        elif (hair_filter and (char['description']['hair_color'] == hair_filter)):
            return True
        else:
            return False

    filtered1 = filter(gender_check, chars)
    filtered2 = filter(age_check, list(filtered1))
    filtered3 = filter(occupation_check, list(filtered2))
    filtered4 = filter(hair_check, list(filtered3))

    res = list(filtered4)

    return {'results': res}
