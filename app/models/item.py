from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin


class Item(db.Model):
    __tablename__ = 'items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(400), nullable=False)
    image = db.Column(db.String(2000), nullable=False)
    is_food = db.Column(db.Boolean, nullable=False)

    backpack_items = db.relationship('Backpack', back_populates='item')


    def __repr__(self):
        return f'<An item called {self.name} was created!>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image': self.image,
            'is_food': self.is_food
        }
