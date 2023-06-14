from .db import db, environment, SCHEMA, add_prefix_for_prod


class Place(db.Model):
    __tablename__ = 'places'


    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    scene = db.Column(db.String(50), nullable=False, unique=True)
    # job_title = db.Column(db.String(50), nullable=False)

    # descriptions = db.relationship('Description', back_populates='occupation')


    def __repr__(self):
        return f'<{self.scene} was visited.>'

    def to_dict(self):
        return {
            'id': self.id,
            'scene': self.scene
        }
