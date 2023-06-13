from app.models import db, Suspect, environment, SCHEMA
from flask_login import current_user
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_suspects():
    sus1 = Suspect(
        character_id=1)
    sus2 = Suspect(
        character_id=2)
    sus3 = Suspect(
        character_id=3)
    sus4 = Suspect(
        character_id=4)
    sus5 = Suspect(
        character_id=5)
    sus6 = Suspect(
        character_id=6)
    sus7 = Suspect(
        character_id=7)
    sus8 = Suspect(
        character_id=8)
    sus9 = Suspect(
        character_id=9)
    sus10 = Suspect(
        character_id=10)
    sus11 = Suspect(
        character_id=11)
    sus12 = Suspect(
        character_id=12)
    sus13 = Suspect(
        character_id=13)


    suspects = [sus1, sus2, sus3, sus4, sus5, sus6, sus7, sus8, sus9, sus10, sus11, sus12, sus13]

    [db.session.add(suspect) for suspect in suspects]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_suspects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.suspects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM suspects"))

    db.session.commit()
