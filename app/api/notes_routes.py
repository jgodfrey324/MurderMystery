from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Note, db
from app.forms import NoteForm


notes_routes = Blueprint('notes', __name__)




def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages




@notes_routes.route('/')
@login_required
def get_notes():
    """
    Query for all notes and returns them in a dictionary of notes
    """
    notes = Note.query.all()

    res = {}

    for note in notes:
        res[note.id] = note.to_dict()

    return res


@notes_routes.route('/new', methods=["POST"])
@login_required
def post_note():
    """
    Add note from request body to notes table
    """
    form = NoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_note = Note(
            text= form.data['text'],
            user_id= current_user.id
        )
        db.session.add(new_note)
        db.session.commit()

        return new_note.to_dict()

    if form.errors:
         return {'errors': validation_errors_to_error_messages(form.errors)}, 400



@notes_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_note(id):
    """
    Delete the note retrieved from database based on the url
    """

    note_to_delete = Note.query.get(id)

    db.session.delete(note_to_delete)
    db.session.commit()

    return {'message': 'Successfully deleted note!'}
