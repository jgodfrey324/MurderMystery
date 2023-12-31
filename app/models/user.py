from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    # first_name = db.Column(db.String(50), nullable=False)
    # last_name = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    # cascade="all, delete-orphan"

    notes = db.relationship('Note', back_populates='user', cascade="all, delete-orphan")
    suspects = db.relationship('Suspect', back_populates='user', cascade="all, delete-orphan")
    backpack_items = db.relationship('Backpack', back_populates='user', cascade="all, delete-orphan")
    places = db.relationship('Place', back_populates='user', cascade="all, delete-orphan")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username
            # 'first_name': self.first_name,
            # 'last_name': self.last_name
        }
