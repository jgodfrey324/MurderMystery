from app.models import db, Occupation, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
# def seed_places():
#     occ1 = Occupation(
#         employer='Thomasville Salon', job_title="Hairstylist")
#     occ2 = Occupation(
#         employer='Groovey Duck', job_title="Server")
#     occ3 = Occupation(
#         employer="Dawson's", job_title="Butcher")
#     occ4 = Occupation(
#         employer="Dawson's Grocery", job_title="Sales clerk")
#     occ5 = Occupation(
#         employer="Small's Pizza", job_title="Delivery driver")
#     occ6 = Occupation(
#         employer="Sampson & sons Lawfirm", job_title="Office assistant",)
#     occ7 = Occupation(
#         employer="Thomasville Dentalcare", job_title="Dental assistant",)


#     occupations = [occ1, occ2, occ3, occ4, occ5, occ6, occ7]

#     [db.session.add(occupation) for occupation in occupations]

#     db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_places():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.places RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM places"))

    db.session.commit()
