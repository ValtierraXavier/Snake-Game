# HTML Canvas Classic Snake

---

##### Using the HTML Canvas API to create a Snake game.
## What is a Snake Game?
Snake is a simple game with simple rules:
- The snake starts off as just a head. There is also a bit of food.
- The snake head is always moving in a direction (except on pause...but im gettting ahead of myself).
- You can control the snake head's direction (Left, Right, Up, Down)
- The snake is very hungry...always hungry. Feed the snake.
- When the snake eats the food, it grows, adding the food to its tail.
- You lose when you hit the edge of the game area or if you eat your own tail...dont do that.

![Snake Sample Gameplay](https://upload.wikimedia.org/wikipedia/commons/5/55/Snake_can_be_completed.gif)

## Gameplay

##### Welcome to Snake!

- When the webpage loads, a black square will apear in the middle of the screen with text saying 'Welcome to Snake!'.
- Shortly after (2 seconds), the text will disapear and be replaced by 3 options.

#### Options:
1. Board Size: Used to select the overall size of the game area.
2. Snake Size: Used to select the size of the snake.
3. Fatal Edge:
   - Fatal: Makes the edges of the game area a deadly to the snake. When you crash into the wall, the game ends.
   - Warp: Makes the edges of the game area a warp to the opposite side. The game will not end if you advance beyond the confines of the game area.

#### Status Bar
Text will appear above the game area. This will change, depending on whats happening in-game.
- Initially, it says 'Press Spacebar to Start'.
- During an active gaming session; it will say 'Playing'.
- When paused, it will display 'Paused'.
- When the game ends; it will display 'Dead, Awww'
- When the current game score has surpassed the highscore stored on the database, it will read 'New Highscore!!'
- When the game ends and theres a new highscore; the new Highscore modal will open and the status bar will read 'Enter New Highscore'

#### Highscores

###### Checking Highscores
To the top left of the screen, youll notice the highscores display area. Upon loading the page, this area will start to retrieve the current highscores stored in the database.

If there are any highscores set, it will display the top five highscores set on the game currently. If not, it will display 'No highscores...yet'.

The highest score has a pulsing green border to demonstrate its superiority.

###### Setting a Highscore 
On the event that you've achieved a new highscore and the game ends, an overlay will open allowing you to set a 3 character name and save the score.

Your score and name setting will be displayed atop the list at the 1st position. 

Navigate the character list with he arrow keys and hit enter once youre satidfied with your name.

The overlay will disappear and your score will be added to the first position of the highscores position.

#### Controls

Controls for this game are simple. There are six buttons to operate the game. upArrow, downArrow, leftArrow, rightArrow, SpaceBar, and Enter

While the settings are displayed, the spacebar may be pressed to start the game.

During gameplay, the arrow keys change the direction of the snake head. Pressing the spacebar in this state pauses the game. During a pause, the snake head will blink, and the tail and food will no longer be visible. 

During the highscore setting process, you can use the arrow keys to select the characters for your name. Pressing enter during this time, submits the new highscore to the server.
