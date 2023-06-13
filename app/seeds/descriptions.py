from app.models import db, Description, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_descriptions():
    desc1 = Description(
        gender='Female', height="5'9", age=31, hair_color='Blonde', occupation_id=1)
    desc2 = Description(
        gender='Male', height="5'9", age=29, hair_color="Brown", occupation_id=3)
    desc3 = Description(
        gender='Female', height="5'3", age=25, hair_color="Black", occupation_id=6)
    desc4 = Description(
        gender='Male', height="6'0", age=22, hair_color="Black", occupation_id=5)
    desc5 = Description(
        gender='Female', height="5'6", age=41, hair_color="Black", occupation_id=1)
    desc6 = Description(
        gender="Male", height="5'7", age=27, hair_color="Blonde", occupation_id=4)
    desc7 = Description(
        gender="Female", height="5'6", age=24, hair_color="Auburn", occupation_id=1)
    desc8 = Description(
        gender="Male", height="5'10", age=33, hair_color="Brown", occupation_id=3)
    desc9 = Description(
        gender="Male", height="6'0", age=35, hair_color="Brown", occupation_id=5)
    desc10 = Description(
        gender="Female", height="5'8", age=28, hair_color="Blonde", occupation_id=1)
    desc11 = Description(
        gender="Male", height="5'8", age=29, hair_color="Auburn", occupation_id=7)
    desc12 = Description(
        gender="Female", height="5'2", age=27, hair_color="Black", occupation_id=7)
    desc13 = Description(
        gender="Male", height="6'4", age=36, hair_color="Blonde", occupation_id=3)


    descriptions = [desc1, desc2, desc3, desc4, desc5, desc6, desc7, desc8, desc9, desc10, desc11, desc12, desc13]

    [db.session.add(description) for description in descriptions]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_descriptions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.descriptions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM descriptions"))

    db.session.commit()
