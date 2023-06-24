from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_items():
    item1 = Item(
        name='Hot Coffee', description='Hot coffee... not too hot thought, just right. Consume this and recieve one hint.', image="https://i.imgur.com/RzKWXRX.png", is_food=True)
    item2 = Item(
        name='Spinkled Doughnut', description='If sprinkled doughnuts are still available, it\'s going to be a good day. Consume this and recieve one hint.', image="https://i.imgur.com/qbgFjet.png", is_food=True)
    item3 = Item(
        name='Pizza receipt', description='Receipt from a local pizza delivery joint called Small\'s Pizza. Looks like an order for 3 large pizzas was placed at 10:28 PM on the night of the crime. The phone call to the police station occured at 11:45 PM ... and 3 large pizzas is perhaps too much food for one person ...', image="https://i.imgur.com/acum3BW.png", is_food=False)
    item4 = Item(
        name='Theater tickets', description='Theater tickets for a show that played the night after the crime was committed. The show is a popular RomCom, often attended by couples. The tickets are signed with a heart, followed by the name \'Kallum\'.', image="https://i.imgur.com/L97q1Na.png", is_food=False)
    item5 = Item(
        name='Gym membership card', description='A gym membership card to the local 24 hour fitness center. Most of the town\'s people are members at this gym. The name on the card reads \'Kallum Ray\'. The card appears to be dirty, like it\'s been stepped on a few times. Perhaps it\'s been sitting here for a while.', image="https://i.imgur.com/CCM1KIO.png", is_food=False)
    item6 = Item(
        name='Minnie\'s documents', description='Minnie Gilmore, a 24 year old female with auburn hair was murdered around 11:30 PM, February 14th, at her home in Allen Grove Apartments. Living on the second floor, she was found at the bottom of the stairwell leading out to the front door by a group of friends. Minnie had been working at Thomasville Salon for the past 4 years, and is reported to generally get along with everyone she meets.', image='https://i.imgur.com/k1At1g0.png', is_food=False)


    items = [item1, item2, item3, item4, item5, item6]

    [db.session.add(item) for item in items]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
