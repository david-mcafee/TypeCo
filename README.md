# Type Command

## Contributing

Bundle your changes:
`npm install && npx webpack --watch`

Open `index.html`

## Overview

[Play now!][http://www.davidmcafee.com/TypeCommand]

Type Command is based on Atari's Missile Command and Phoboslab's ZType. The user's cities are attacked by dropping word "missiles" (some of which, like the original, can split into multiple missiles). The user can attack these dropping missiles by typing the words they contain. As a user begins typing the word contained in a missile, the missile is selected and it's "health" is lowered as the user types the word. In addition, the momentum of the missile is lowered the more it is destroyed by the user (a common strategy later in the game, to slow down rapid missiles). To unselect a word, the user simply hits the delete/backspace key - this is important, as missiles will drop at varying speeds, and missiles will contain words or random strings that vary in typing difficulty. As the game progresses, more randomized string, strings of greater length, splitting words, and less common characters (i.e. "$", "&", "<") are introduced.

Should a missile hit the bottom of the screen, that specific city or missile base will be destroyed.

## Game Instructions:

Word “missiles” are falling from the sky - your job is to type them before they hit the ground When you start typing a word, it will be selected. You must finish typing this word before it hits the ground. Once you select a word, any typos will cost you points.

## Built with:

HTML5 canvas
Vanilla JavaScript

## Future ideas:

- [ ] Vary word length based on difficulty, and increase velocity of falling words
- [ ] Missiles that contain special character and fall faster
- [ ] Point deduction for destroyed cities
- [ ] Scoreboard

##### To see how I implemented this project (in 2017), see the complete Project Proposal README:

- [docsREADME][docsREADME]

[docsREADME]: docs/README.md
