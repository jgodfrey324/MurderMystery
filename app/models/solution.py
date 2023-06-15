from .db import db, environment, SCHEMA, add_prefix_for_prod


class Solution(db.Model):
    __tablename__ = 'solutions'


    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String(50), nullable=False)
    character_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('characters.id')), nullable=False)

    character = db.relationship('Character', back_populates='solutions')


    def __repr__(self):
        return f'<Killer of this round is {self.answer}>'

    def to_dict(self):
        return {
            'id': self.id,
            'answer': self.answer,
            'character_id': self.character_id
        }
