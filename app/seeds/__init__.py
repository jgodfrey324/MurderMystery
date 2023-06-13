from flask.cli import AppGroup
from .users import seed_users, undo_users
from .characters import seed_characters, undo_characters
from .descriptions import seed_descriptions, undo_descriptions
from .occupations import seed_occupations, undo_occupations

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_characters()
        undo_descriptions()
        undo_occupations()
    seed_users()
    seed_occupations()
    seed_descriptions()
    seed_characters()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_characters()
    undo_descriptions()
    undo_occupations()
    # Add other undo functions here
