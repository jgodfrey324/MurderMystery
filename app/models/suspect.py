from .db import db, environment, SCHEMA, add_prefix_for_prod


class Suspect(db.Model):
    __tablename__ = 'suspects'


    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('characters.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship('User', back_populates='suspects')
    character = db.relationship('Character', back_populates='suspect')


    def __repr__(self):
        return f'<{self.character.first_name} {self.character.last_name} is a suspect>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'character_id': self.character_id,
            'first_name': self.character.first_name,
            'last_name': self.character.last_name
        }
