## Missile Command / Typing Education

[Type Command Live][TypeCommand]
[TypeCommand]: http://www.david-mcafee.com/TypeCommand

### Background

Type Command is generally based on Atari's [Missile Command][MissileCommand], and Phoboslab's [ZType][Ztype]: the user's cities are attacked by dropping word "missiles" (some of which, like the original, can split into multiple missiles, here, individual letters). The user can attack these dropping missiles by typing the words they contain. As a user begins typing the word contained in a missile, the missile is selected and it's "health" is lowered as the user types the word. In addition, the momentum of the missile is lowered the more it is destroyed by the user (a common strategy later in the game, to slow down rapid missiles). To unselect a word, the user simply hits the delete/backspace key - this is important, as missiles will drop at varying speeds, and missiles will contain words or random strings that vary in typing difficulty. As the game progresses, more randomized string, strings of greater length, splitting words, and less common characters (i.e. "$", "&", "<") are introduced.

Should a missile hit the bottom of the screen, that specific city or missile base will be destroyed.

Missile bases will be selected by typing the number corresponding to the base (learning to type numbers is important, too!).

The full implementation details of Type Command--including what features constitute the minimum viable product, and what will be added later as bonus, are outlined in the **Functionality & MVP** and **Bonus Features** sections.

### Functionality & MVP  

Primary features:
- [ ] Start and reset the game board
- [ ] Select dropping missiles by typing their contained words
- [ ] Deselect dropping missiles by typing delete/backspace

Secondary features:
- [ ] Bullets that correspond to keystrokes to delete letters
- [ ] "Focus" words are highlighted
- [ ] It is clear to the user how many letters in a word have been correctly typed (as designated with changing colors)

In addition, this project will include:
- [ ] An "About" modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with a game board, game controls, and nav links to the "About" modal.  Game controls will include Start, Stop, Reset, and the full keyboard by which to destroy missiles.

General implementation details and styling of the game:

![wireframes](https://github.com/david-mcafee/TypeCommand/blob/master/docs/wireframes/mockup.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- JavaScript and jQuery for game logic, and registering of keyboard events
- React Modal for rending the game instructions
- `HTML5 Canvas` for DOM manipulation and rendering
- Webpack to bundle and supply scripts

In addition to the webpack entry file, there will be several scripts involved in this project:

- `moving_object.js`: functions as the parent class to anything that moves on the screen.
- `missile.js`: inherit it's functionality from the MovingObject class - corresponds to a dictionary word.
- `bullet.js`: inherit it's functionality from the MovingObject class - creation corresponds to keyboard key stroke, deletion corresponds to collision with missile.
- `game_view.js`: handle the logic for creating and updating the canvas, and rendering them to the DOM.
- `game.js`: holds all the game logic, as well as the collections of objects (missiles, bullets, towers, and cities).
- `tower.js`: provides each missile tower's functionality (firing missiles, state).
- `city.js`: provide a city object, whose existence determines a piece of the user's score.
- `util.js`: deals with all logic related to object movement direction, rate, etc.


### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running. Create `webpack.config.js` as well as `package.json`. Write a basic entry file and the basics for the scripts outlined above. Game should have randomly chosen words "falling" vertically across the screen by the end of the day.

**Day 2**: Complete game logic today, and the primary features of the game. Register key stroke events from the user. When letter entered matches a current word, make that word the "focus" word. Backspace should remove this "focus" of the word. Delete "word missiles" when they have been completely typed. Ignore typos.

**Day 3**: Implement all secondary features. Highlight "focus" words. Make it clear to the user how many letters in a word have been correctly typed. Bullets are fired from bottom of screen that destroy typed letters

**Day 4**: Implement scoring system, style the game, and create a React modal for the "about" section. If time, implement bonus features.


### Bonus features

I plan to expand this game to include the following features:

- [ ] The game should become harder with time - word length should increase, words should begin to fall at increasing speeds, and single words should split into individual letters.
- [ ] Cities that can be destroyed when hit by missiles
- [ ] Missile bases that fire bullets by the user, and  - can also be destroyed by "word missiles."
- [ ] Alternate gameplay that involves dividing the screen into a grid, each box corresponding to a letter, with gameplay more akin to the original Missile Command.

[MissileCommand]: http://en.wikipedia.org/wiki/Missile_Comman
[TypeCommand]: http://www.david-mcafee.com/TypeCommand
[ZType]: http://zty.pe/
