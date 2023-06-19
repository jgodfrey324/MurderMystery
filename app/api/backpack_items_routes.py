from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Backpack, Item, db


backpack_items_routes = Blueprint('backpack_items', __name__)


@backpack_items_routes.route('/items/all')
@login_required
def get_all_items():
    items = Item.query.all()

    res = {}

    for item in items:
        res[item.id] = item.to_dict()

    return res


@backpack_items_routes.route('/')
@login_required
def get_items():
    items = Backpack.query.filter(Backpack.user_id == current_user.id).all();

    res = {}

    for item in items:
        res[item.id] = item.to_dict()

    return res



@backpack_items_routes.route('/new', methods=["POST"])
@login_required
def add_item():
    new_item = Backpack(
        item_id= request.form['itemId'],
        item_quantity= 1,
        user_id=current_user.id
        )

    db.session.add(new_item)
    db.session.commit()

    return new_item.to_dict()



@backpack_items_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def remove_item(id):
    item_to_delete = Backpack.query.get(id)

    db.session.delete(item_to_delete)
    db.session.commit()

    return {'message': 'Successfully deleted'}
