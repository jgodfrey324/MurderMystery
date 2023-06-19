from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin


class Backpack(db.Model):
    __tablename__ = 'backpack_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    item_quantity = db.Column(db.Integer, nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    item = db.relationship('Item', back_populates='backpack_items')
    user = db.relationship('User', back_populates='backpack_items')


    def __repr__(self):
        return f'<{self.item_quantity} {self.item.name} was added to your backpack!>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'item_quantity': self.item_quantity,
            'item': {
                'id': self.item.id,
                'name': self.item.name,
                'description': self.item.description,
                'image': self.item.image,
                'is_food': self.item.is_food
            }
        }
