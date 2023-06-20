from app.models import db, Character, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_characters():
    char1 = Character(
        first_name='Pippa', last_name='Clements', description_id=1)
    char2 = Character(
        first_name='Sachin', last_name='Cobb', description_id=2)
    char3 = Character(
        first_name='Wilma', last_name='Parker', description_id=3)
    char4 = Character(
        first_name='Fabian', last_name='Fischer', description_id=4)
    char5 = Character(
        first_name='Jorja', last_name='Spencer', description_id=5)
    char6 = Character(
        first_name='Kallum', last_name='Ray', description_id=6)
    char7 = Character(
        first_name='Minnie', last_name='Gilmore', description_id=7)
    char8 = Character(
        first_name='Haseeb', last_name='Vincent', description_id=8)
    char9 = Character(
        first_name='Abdul', last_name='Weiss', description_id=9)
    char10 = Character(
        first_name='Penny', last_name='Gates', description_id=10)
    char11 = Character(
        first_name='Lucian', last_name='Pope', description_id=11)
    char12 = Character(
        first_name='Lea', last_name='Wilkins', description_id=12)
    char13 = Character(
        first_name='Rush', last_name='Giles', description_id=13)


    characters = [char1, char2, char3, char4, char5, char6, char7, char8, char9, char10, char11, char12, char12, char13]

    [db.session.add(character) for character in characters]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_characters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.characters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM characters"))

    db.session.commit()
