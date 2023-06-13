from .db import db, environment, SCHEMA, add_prefix_for_prod


class Character(db.Model):
    __tablename__ = 'characters'


    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    description_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('descriptions.id')), nullable=False)

    description = db.relationship('Description', back_populates='character_desc')
    suspect = db.relationship('Suspect', back_populates='character')


    def __repr__(self):
        return f'<{self.first_name} {self.last_name} character is made>'

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'description': {
                 'id': self.description.id,
                 'gender': self.description.gender,
                 'height': self.description.height,
                 'age': self.description.age,
                 'hair_color': self.description.hair_color,
                 'occupation': {
                      'id': self.description.occupation.id,
                      'employer': self.description.occupation.employer,
                      'job_title': self.description.occupation.job_title
                 }
            }
        }
