# Case #1124

This website is a murder mystery game. You start as a detective tasked with solving a crime in the next town over. Talk to different people, visit different places, and pick up clues to solve this crime.
This mystery is meant to be solved in under 10 minutes.
The story is written by me, as well as most of the items, icons and backgrounds are drawn by me.
Try it out here: https://case1124.onrender.com


## Technologies used:

Some of the technologies used to create this game are: Python, Flask, SQLAlchemy, Javascript, Node.js, React, HTML5, CSS3, Redux, PostgreSQL, GitHub


## Wireframes with Features:

* Start with the ability to create a character, or use the default set character
    * A user may also log into old characters to finish the game
    * A user may not 'save game' on the default character
![Alt text](<Screen Shot 2023-06-22 at 1.46.39 PM.png>)



* Continue into the opening scene. Here a user has access to one document that is placed in their backpack. The user has access to their backpack from any screen.
    * A user may drop an item from their backpack at anytime, but be warned, they might not see that item again.
![Alt text](<Screen Shot 2023-06-22 at 1.49.22 PM.png>)



* A user also has access to a notepad from any screen.
    * Here they may add, update or delete notes from their notepad in order to better keep track of some of the information given out.
![Alt text](<Screen Shot 2023-06-22 at 1.52.53 PM.png>)



* From any screen a user can access a list of suspects.
    * The list starts full of all characters, and the user must check suspects off the list as they gather more information.
    * The user also has the ability to 'add back' a suspect if they change their mind later.
    * The suspect list is meant to aid in keeping track of characters; it is not required to use.
![Alt text](<Screen Shot 2023-06-22 at 1.55.36 PM.png>)



## Getting started:
Clone this repository:
https://github.com/jgodfrey324/MurderMystery.git

Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:

In the first terminal, make sure you're in the root folder...
* pipenv install
* Create a .env file using the .env.example provided

Set up your config.py file and __init__.py with the .env variables.
In the instance folder, delete the dev.db

Then run the following to create your database, migrate, and seed:
* pipenv run flask db upgrade
* pipenv run flask db seed all

Start the server for the backend:
* pipenv run flask run

In your second terminal, cd into the react-app folder:
* Install dependencies using 'npm install'

Start the server for the front end:
* npm start

Now you may create a new character or use the default character!



## Future Features:
Some future features for this game:
* Would like to incorporate a scoreboard, so users can browse the top solve times
* Make the 'save game' feature more precise, to return a user to the last conversation
* Have the ability to access hints within a coffee shop
    * Therefore allowing the ability to change the quantity of items within your backpack
