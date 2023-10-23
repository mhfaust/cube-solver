- start button
- scramble/reset button
- timer
- undo button

PLAY STATES:
Components:
- ScrambleButton
- StartButton
- CancelButton (w/confirm)
    what happens when they close the app? Go to another app?

states: 
  - (isInPlay) just use startTime !== null
  - startTime (number | null)
  - isSolved (boolean)

SETTINGS

Themes
  - pick from list
  - create theme

