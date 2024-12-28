# [HTML Canvas Classic Snake](https://snake-game-production-a232.up.railway.app)

---

#### Using the HTML Canvas API to create a Snake game.

This project was made so I could learn a little about the HTML Canvas API...I ended up learning a lot!

Like they say; The best way to effectively learn to code is simply to keep build projects.

###### Technologies Used
- HTML
- CSS
- JavaScript
- Mongoose
- Express
- MongoDB Atlas
- Canvas API

This project uses, HTML, CSS and JavaScript to function. There is a MongoDB backend using mongoose and express to save highscores but the games functionality does not depend on it. 

####### Things I learned 
- Object Oriented Programming
- Using Classes
- Canvas API
- New ways to map HTML through Javascript without using React framework.

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

#### Welcome to Snake!

![Welcome to snake img](https://i.imgur.com/T3NHmKI.png)

- When the webpage loads, a black square will apear in the middle of the screen with text saying 'Welcome to Snake!'.
- Shortly after (2 seconds), the text will disapear and be replaced by 3 options.

#### Options:

![Options Screen](https://i.imgur.com/AXGeg8N.png)

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
- When the game ends; it will display 'Dead, Awww'.
- When the current game score has surpassed the highscore stored on the database, it will read 'New Highscore!!'.
- When the game ends and theres a new highscore; the new Highscore modal will open and the status bar will read 'Enter New Highscore'.

#### Highscores

![Highscores empty img](https://i.imgur.com/etuLoSH.png)
![Highscores populated img](https://i.imgur.com/ct16Fa8.png)

###### Checking Highscores
To the top left of the screen, youll notice the highscores display area. Upon loading the page, this area will start to retrieve the current highscores stored in the database.

If there are any highscores set, it will display the top five highscores set on the game currently. If not, it will display 'No highscores...yet'.

The highest score has a pulsing green border to demonstrate its superiority.

###### Setting a Highscore 

![Add Highscore img](https://i.imgur.com/O5gGtS9.png)

On the event that you've achieved a new highscore and the game ends, an overlay will open allowing you to set a 3 character name and save the score.

Your score and name setting will be displayed atop the list at the 1st position. 

Navigate the character list with he arrow keys and hit enter once youre satisfied with your name.

The overlay will disappear and your score will be added to the first position of the highscores position.

#### Controls

Controls for this game are simple. There are six buttons to operate the game. upArrow, downArrow, leftArrow, rightArrow, SpaceBar, and Enter.

While the settings are displayed, the spacebar may be pressed to start the game.

During gameplay, the arrow keys change the direction of the snake head. Pressing the spacebar in this state pauses the game. During a pause, the snake head will blink, and the tail and food will no longer be visible. 

During the highscore setting process, you can use the arrow keys to select the characters for your name. Pressing enter during this time, submits the new highscore to the server.

#### Areas for Improvement
- (piority) Make it pretty: Im not gonna lie, its not the prettiest looking game out there.
   - It needs a proper Title animation.
   - The color choices need refining.
   - Add a background to the overall page.
   - Learn about sprites and implement an animation when food is eaten.
   - figure out a better layout for the app.
   
- (priority) The app currently only works on a computer (laptop, desktop) as it only accepts keyboard input.
   - Learn how to use touch input to control snake.
   - Give the app some responsive design for mobile sceen sizes.

- Add a help tab
   - Its not ideal to have to come here for basic controls information.
   - Build a Hamburger menu off to the side that contains the highscores and help information. (Will be useful for mobile sized screens)
 

Thanks for Reading!  [Try it out!](https://snake-game-production-a232.up.railway.app)
