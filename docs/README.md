## Missile Command / Typing Education

### Background

[Type Command Live][TypeCommand]

[TypeCommand]: http://www.david-mcafee.com/TypeCommand

Type Command is generally based on Atari's [Missile Command][MissileCommand], and Phoboslab's http://zty.pe/: the user's cities are attacked by dropping word "missiles" (some of which, like the original, can split into multiple missiles, here, individual letters). The user can attack these dropping missiles by typing the words they contain. As a user begins typing the word contained in a missile, the missile is selected and it's "health" is lowered as the user types the word. In addition, the momentum of the missile is lowered the more it is destroyed by the user (a common strategy later in the game, to slow down rapid missiles). To unselect a word, the user simply hits the delete/backspace key - this is important, as missiles will drop at varying speeds, and missiles will contain words or random strings that vary in typing difficulty. As the game progresses, more randomized string, strings of greater length, splitting words, and less common characters (i.e. "$", "&", "<") are introduced.

Should a missile hit the bottom of the screen, that specific city or missile base will be destroyed.

Missile bases will be selected by typing the number corresponding to the base (learning to type numbers is important, too!).

The full implementation of Type Command of this game is outlined in the **Functionality & MVP** and **Bonus Features** sections.  

### Functionality & MVP  

Users of Type Command will be able to:

- [ ] Start, pause, and reset the game board
- [ ] Select dropping missiles by typing their contained words
- [ ] Deselect dropping missiles by typing delete/backspace
- [ ] Toggle between missile bases by typing their corresponding numerical values
- [ ] Choose difficulty levels

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn,
and the About modal.  Game controls will include Start, Stop, Reset, and the full keyboard by which to destroy missiles.

See this series of [wireframes][wireframes] illustrates the general implementation details and styling of the game.

[TypeCommand]: http://www.david-mcafee.com/TypeCommand

![wireframes](https://github.com/appacademy/job-search-curriculum/blob/master/job-search-projects/images/js_wireframe.jpeg)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`automata.js`: this script will handle the logic behind the scenes.  An Automata object will hold a `type` (hexagon, triangle, or square) and a 2D array of `Cell`s.  It will be responsible for doing neighbor checks for each `Cell` upon iteration and updating the `Cell` array appropriately.

`cell.js`: this lightweight script will house the constructor and update functions for the `Cell` objects.  Each `Cell` will contain a `type` (hexagon, triangle, or square) and an `aliveState` (`true` or `false`).

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**:

**Day 3**:

**Day 4**: Style


### Bonus features

I plan to expand this game to include the following features:

- [ ] Alternate gameplay that involves dividing the screen into a grid and  
- [ ] Add multiple choices for starting states that are interesting
- [ ] Explore multi-state versions of the game, such as the ones outlined [here](https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/modeling-natural-systems/gameOfLife2.html)
