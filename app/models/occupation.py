from .db import db, environment, SCHEMA, add_prefix_for_prod


class Occupation(db.Model):
    __tablename__ = 'occupations'


    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    employer = db.Column(db.String(50), nullable=False)
    job_title = db.Column(db.String(50), nullable=False)

    descriptions = db.relationship('Description', back_populates='occupation')


    def __repr__(self):
        return f'<{self.job_title} at {self.employer} occupation was created>'

    def to_dict(self):
        return {
            'id': self.id,
            'employer': self.employer,
            'job_title': self.job_title
        }
