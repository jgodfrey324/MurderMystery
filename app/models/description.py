from .db import db, environment, SCHEMA, add_prefix_for_prod


class Description(db.Model):
    __tablename__ = 'descriptions'


    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String(50), nullable=False)
    height = db.Column(db.String(10), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    hair_color = db.Column(db.String(50), nullable=False)
    occupation_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('occupations.id')), nullable=False)

    occupation = db.relationship('Occupation', back_populates='descriptions')
    character_desc = db.relationship('Character', back_populates='description')


    def __repr__(self):
        return f'<{self.character.first_name} {self.character.last_name} is a {self.height} tall {self.gender}, {self.age} years old with {self.hair_color} hair>'

    def to_dict(self):
        return {
            'id': self.id,
            'gender': self.gender,
            'height': self.height,
            'age': self.age,
            'hair_color': self.hair_color,
            'occupation_id': self.occupation_id
        }
