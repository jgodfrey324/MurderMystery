from .db import db, environment, SCHEMA, add_prefix_for_prod


class Place(db.Model):
    __tablename__ = 'places'


    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    scene = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship('User', back_populates='places')


    def __repr__(self):
        return f'<{self.scene} was visited.>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'scene': self.scene
        }
