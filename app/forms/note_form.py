from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Note


def note_length(form, field):
    # Checking if username is already in use
    note = field.data
    if len(note) > 255:
        raise ValidationError('Note must be less than 255 characters')


class NoteForm(FlaskForm):
    text = StringField('text', validators=[DataRequired(), note_length])
